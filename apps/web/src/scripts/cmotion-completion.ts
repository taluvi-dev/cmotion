// Dot-triggered member completion for the cmotion editor.
//
// When the user types a `.` after an identifier chain we know about
// (`std`, `std.shapes`, the alias `text` from `use std.text;`, the
// built-in `easing`, …) we pop up a small menu of members. Typing
// filters; ↑/↓ navigate; Enter/Tab insert; Esc/click-out dismiss.
//
// This is intentionally a hand-curated static table, not a full
// resolver — the cmotion frontend can already parse the source and
// in a later pass we'll consult the AST for the receiver's type and
// drive completion from the stdlib symbol table. For now this is
// "what would the docs at /language/stdlib say is here?".

import { EditorView, keymap, type ViewUpdate } from "@codemirror/view";
import { Prec, type Extension } from "@codemirror/state";

interface Member {
  name: string;
  sig?: string;
}

// Members listed per receiver name (full module path or short alias).
// Source of truth: apps/web/src/content/docs/language/stdlib.md.
const MODULES: Record<string, Member[]> = {
  std: [
    { name: "shapes" }, { name: "text" }, { name: "compose" }, { name: "filter" },
    { name: "mesh3d" }, { name: "lighting" }, { name: "scene3d" },
    { name: "math" }, { name: "anim" }, { name: "color" },
    { name: "transport" }, { name: "audio" },
  ],
  "std.shapes": [
    { name: "rect", sig: "(width: Length, height: Length, fill?: Color)" },
    { name: "circle", sig: "(radius: Length, fill?: Color)" },
    { name: "ellipse", sig: "(rx: Length, ry: Length, fill?: Color)" },
    { name: "path", sig: "(d: String, fill?: Color)" },
    { name: "image", sig: "(src: String, width?: Length, height?: Length)" },
    { name: "sprite", sig: "(src, width?, height?, cols?, rows?, frame?, key?: Color, anchor?, opacity?)" },
    { name: "svg", sig: "(source: String, size?: Length, color?: Color, weight?, opacity?)" },
    { name: "icon", sig: "(name: String, size?: Length, color?: Color, weight?, opacity?)" },
  ],
  "std.text": [
    { name: "glyph", sig: "(string: String, font: String, size?: Length)" },
  ],
  "std.filter": [
    { name: "blur", sig: "(radius: Length)" },
    { name: "color_grade", sig: "(…)" },
  ],
  "std.mesh3d": [
    { name: "extrude", sig: "(path: Path, depth: Length)" },
  ],
  "std.lighting": [
    { name: "ambient", sig: "(intensity: Number)" },
    { name: "directional", sig: "(from: Vec3, intensity: Number)" },
    { name: "point", sig: "(at: Vec3, intensity: Number)" },
  ],
  "std.scene3d": [
    { name: "render3d", sig: "(mesh, lights, camera?)" },
    { name: "perspective", sig: "(fov: Angle)" },
    { name: "orthographic", sig: "(…)" },
  ],
  "std.math": [
    { name: "vec2", sig: "(x: Number, y: Number)" },
    { name: "vec3", sig: "(x: Number, y: Number, z: Number)" },
    { name: "dot", sig: "(a, b) -> Number" },
    { name: "cross", sig: "(a: Vec3, b: Vec3) -> Vec3" },
    { name: "length", sig: "(v) -> Number" },
    { name: "normalize", sig: "(v) -> Vec" },
    { name: "lerp", sig: "(a, b, t: Number)" },
  ],
  "std.anim": [
    { name: "wave", sig: "(amplitude, period: Duration)" },
    { name: "noise", sig: "(seed: Int, period: Duration)" },
  ],
  "std.color": [
    { name: "oklch", sig: "(L, C, h: Angle)" },
    { name: "oklab", sig: "(L, a, b)" },
    { name: "srgb", sig: "(r, g, b)" },
  ],
  "std.transport": [
    { name: "playhead" }, { name: "time" }, { name: "frame" }, { name: "tempo" },
  ],
  "std.audio": [
    { name: "fft" }, { name: "envelope_follow" },
    { name: "beat" }, { name: "onset" }, { name: "sample" },
  ],
  easing: [
    "linear",
    "in_quad", "out_quad", "in_out_quad",
    "in_cubic", "out_cubic", "in_out_cubic",
    "in_quart", "out_quart", "in_out_quart",
    "in_quint", "out_quint", "in_out_quint",
    "in_sine", "out_sine", "in_out_sine",
    "in_expo", "out_expo", "in_out_expo",
  ].map((name) => ({ name })),
};

// `use std.X;` and `use std.X.*;` bring `X` into scope as an alias for the
// module. Build short aliases automatically — `shapes` → `std.shapes`, etc.
for (const key of Object.keys(MODULES)) {
  const last = key.split(".").pop()!;
  if (last !== key && !MODULES[last]) MODULES[last] = MODULES[key];
}

// Postfix methods on any expression — shown when the user types `.` right
// after a `)`. Until we have a type-driven resolver, this is the same set
// for every parenthesized call result (matches the std.mesh3d transforms
// in the docs).
const POSTFIX_METHODS: Member[] = [
  { name: "rotate", sig: "(x?: Angle, y?: Angle, z?: Angle)" },
  { name: "translate", sig: "(x?: Length, y?: Length, z?: Length)" },
  { name: "scale", sig: "(s: Number)" },
  { name: "material", sig: "(fill: Color, metalness?, roughness?, emissive?, emissive_intensity?)" },
];

function resolveReceiver(view: EditorView, dotPos: number): { receiver: string; items: Member[] } | null {
  const before = view.state.doc.sliceString(Math.max(0, dotPos - 64), dotPos);
  // Postfix method on a parenthesized expression.
  if (before.endsWith(")")) {
    return { receiver: "<expr>", items: POSTFIX_METHODS };
  }
  const m = /([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)$/.exec(before);
  if (!m) return null;
  const receiver = m[1];
  const items = MODULES[receiver];
  if (!items) return null;
  return { receiver, items };
}

interface PopoverState {
  receiver: string;
  items: Member[];
  filtered: Member[];
  selected: number;
  prefixStart: number;
  prefix: string;
}

export function cmotionCompletion(): Extension {
  let popover: HTMLDivElement | null = null;
  let state: PopoverState | null = null;
  let viewRef: EditorView | null = null;
  let outsideHandler: ((e: MouseEvent) => void) | null = null;

  function ensurePopover(v: EditorView) {
    viewRef = v;
    if (popover) return popover;
    popover = document.createElement("div");
    popover.className = "cm-cmotion-popover";
    // Mount on <body>, not inside .cm-editor — that element has overflow:hidden
    // and clips an absolute-positioned child to the editor's bounds.
    document.body.appendChild(popover);
    outsideHandler = (e) => {
      if (popover && !popover.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", outsideHandler, true);
    return popover;
  }

  function render() {
    if (!popover || !state) return;
    popover.innerHTML = "";
    if (state.filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "cm-cmotion-empty";
      empty.textContent = "no matches";
      popover.appendChild(empty);
      return;
    }
    state.filtered.forEach((item, i) => {
      const row = document.createElement("div");
      row.className = "cm-cmotion-item" + (i === state!.selected ? " sel" : "");
      const name = document.createElement("span");
      name.className = "cm-cmotion-name";
      name.textContent = item.name;
      row.appendChild(name);
      if (item.sig) {
        const sig = document.createElement("span");
        sig.className = "cm-cmotion-sig";
        sig.textContent = item.sig;
        row.appendChild(sig);
      }
      row.addEventListener("mousedown", (e) => {
        e.preventDefault();
        state!.selected = i;
        accept();
      });
      popover.appendChild(row);
    });
  }

  function position() {
    if (!popover || !viewRef || !state) return;
    // `coordsAtPos` returns viewport-relative pixel coords for the given
    // character offset. We anchor the popover just below that point.
    // Since the popover lives on <body> with `position: fixed`, we feed
    // those viewport coords straight through — no scroll math needed.
    const coords = viewRef.coordsAtPos(state.prefixStart);
    if (!coords) return;
    popover.style.left = `${coords.left}px`;
    popover.style.top = `${coords.bottom + 2}px`;
    // If we'd overflow the viewport on the right, nudge left.
    const rect = popover.getBoundingClientRect();
    const vw = window.innerWidth;
    if (rect.right > vw - 8) {
      popover.style.left = `${Math.max(8, vw - rect.width - 8)}px`;
    }
  }

  function open(v: EditorView, info: { receiver: string; items: Member[]; prefixStart: number }) {
    ensurePopover(v);
    state = {
      receiver: info.receiver,
      items: info.items,
      filtered: info.items,
      selected: 0,
      prefixStart: info.prefixStart,
      prefix: "",
    };
    render();
    position();
  }

  function close() {
    if (popover) {
      popover.remove();
      popover = null;
    }
    if (outsideHandler) {
      document.removeEventListener("mousedown", outsideHandler, true);
      outsideHandler = null;
    }
    state = null;
  }

  function filter(prefix: string) {
    if (!state) return;
    state.prefix = prefix;
    const lower = prefix.toLowerCase();
    state.filtered = lower
      ? state.items.filter((it) => it.name.toLowerCase().startsWith(lower))
      : state.items;
    state.selected = 0;
    render();
  }

  function move(dir: 1 | -1) {
    if (!state || state.filtered.length === 0) return;
    state.selected = (state.selected + dir + state.filtered.length) % state.filtered.length;
    render();
  }

  function accept() {
    if (!viewRef || !state || state.filtered.length === 0) return;
    const item = state.filtered[state.selected];
    const from = state.prefixStart;
    const to = from + state.prefix.length;
    viewRef.dispatch({
      changes: { from, to, insert: item.name },
      selection: { anchor: from + item.name.length },
    });
    close();
  }

  const updateListener = EditorView.updateListener.of((u: ViewUpdate) => {
    if (state && u.selectionSet && !u.docChanged) {
      const cursor = u.state.selection.main.head;
      if (cursor < state.prefixStart) close();
    }
    // Reposition when the editor scrolls or its geometry changes.
    if (state && !u.docChanged && (u.geometryChanged || u.viewportChanged)) {
      position();
    }
    if (!u.docChanged) return;

    // Look for a `.` that was just inserted at the cursor. Only consider
    // single-character text insertions — bulk paste shouldn't pop a menu.
    let trigger: { pos: number } | null = null;
    u.changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
      const str = inserted.toString();
      if (fromA === toA && str === ".") trigger = { pos: toB };
    });

    if (state) {
      const cursor = u.state.selection.main.head;
      if (cursor < state.prefixStart) {
        close();
      } else {
        const prefix = u.state.doc.sliceString(state.prefixStart, cursor);
        if (!/^[A-Za-z0-9_]*$/.test(prefix)) {
          close();
        } else {
          filter(prefix);
          position();
        }
      }
    }

    if (trigger) {
      const info = resolveReceiver(u.view, trigger.pos - 1);
      if (info) {
        open(u.view, {
          receiver: info.receiver,
          items: info.items,
          prefixStart: trigger.pos,
        });
      }
    }
  });

  // Keys are wired at highest precedence so they win over CodeMirror's
  // defaults *while the popover is open*; each handler returns false when
  // the popover is closed, letting the default keymap take over.
  const popoverKeymap = Prec.highest(
    keymap.of([
      { key: "ArrowDown", run: () => { if (!state) return false; move(1); return true; } },
      { key: "ArrowUp", run: () => { if (!state) return false; move(-1); return true; } },
      { key: "Enter", run: () => { if (!state) return false; accept(); return true; } },
      { key: "Tab", run: () => { if (!state) return false; accept(); return true; } },
      { key: "Escape", run: () => { if (!state) return false; close(); return true; } },
    ]),
  );

  return [updateListener, popoverKeymap];
}
