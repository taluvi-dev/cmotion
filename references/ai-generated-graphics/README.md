# AI-generated motion-graphics references

External examples worth keeping around as visual reference — what
the wider AI-motion-graphics field is currently producing, what we
might want to be able to render (or visibly out-render), and what
the common visual languages look like.

These are *not* cmotion output and shouldn't be used as branding;
they're inspiration / benchmark material.

---

## `whiteboard-explainer-2chars` — morphing-blob 2D explainer video

A still frame from a 2D motion graphic. Two cartoon-bean figures
present at a board labelled **"Rigid Methodology"** vs
**"Starburst Innovation"**; a red bean watches with a thought
bubble **"Which path…?"** Cream background with black +
burnt-orange organic blob shapes framing the scene.

**The interesting bit is the motion, not the composition.** The
blob shapes (the framing black + orange splats around the
characters and board) aren't static — they *float and morph into
different shapes over time*. Smoothly-deforming closed curves,
each defined by a small handful of control points, animated by
sliding those control points around or sampling them through
noise / sine sources.

Style markers:
- Hand-drawn / sketched aesthetic (paper texture, organic
  outlines).
- 2D vector-shape characters with squash-and-stretch limbs.
- Soft pastel palette — cream + black + burnt-orange + dusty red.
- Text-heavy slides as a narrative device.
- Bold abstract blobs as visual framing (the morphing element).

Implementation likely shape (worth investigating later):
- Each blob is a closed cubic-Bezier curve with 4-8 anchor points.
- Anchor positions are animated continuously (e.g. each anchor
  has a per-axis `sin(2π·t/period + phase)` term).
- Probably composited in a 2D animation tool (After Effects with
  Trapcode / Form, or Cavalry, or a Lottie/Rive runtime). Could
  also be SVG with SMIL or D3-style frame-by-frame morphing.

Why it's here: current AI motion-graphics tools (Sora / Veo /
Runway / similar) produce this register — hand-drawn-feeling,
character-driven, with organic morphing shapes. cmotion is
aiming for a *different* register (code-described, deterministic,
typography-driven), but understanding what users currently expect
from "AI motion graphics" informs the cmotion language's design
direction and what scenes our renderer should be able to
express.

Specifically — the morphing-blob technique is *exactly the kind
of thing* a small set of cmotion primitives should be able to
describe in a few dozen lines: a closed path with animated
anchor points. Worth a future commit to:
1. Add `path(...)` to the renderer (cubic Bezier outline + fill).
2. Express the per-anchor `wave` / `animate` motion using the
   existing sampler.
3. Render the result and compare.

(Image file: add `whiteboard-explainer-2chars.png` next to this
note when the binary is available. Currently captured only as
a description from a session attachment.)
