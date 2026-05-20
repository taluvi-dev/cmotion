// Cross-platform "save this Blob to disk" helper. The same function is
// used by /editor and by the homepage preview's "Save video" button.
//
// Three paths in priority order:
//   1. File System Access API (Chrome/Edge desktop) — opens the OS save
//      dialog with a chosen folder + filename. The desktop "destination
//      chooser" users expect.
//   2. Web Share API (iOS Safari / Chrome on iPad) — opens the iOS share
//      sheet which includes "Save to Files". The closest thing to a
//      destination chooser on iOS.
//   3. Anchor click — fallback for everything else (Firefox, older
//      browsers). Saves to the default Downloads folder.
//
// iOS ignores <a download> entirely so the anchor fallback there would
// silently open the blob in a new tab. We force the share path on iOS
// even when canShare is conservative.

export const isiOS =
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    ((navigator as any).platform === "MacIntel" && (navigator as any).maxTouchPoints > 1));

export async function saveOrShare(
  blob: Blob,
  name: string,
): Promise<"saved" | "shared" | "downloaded"> {
  const w = window as any;
  const nav = navigator as any;

  // 1. File System Access (desktop Chrome / Edge): explicit save dialog.
  if (w.showSaveFilePicker) {
    try {
      const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
      const handle = await w.showSaveFilePicker({
        suggestedName: name,
        types: [
          {
            description: blob.type || ext,
            accept: { [blob.type || "application/octet-stream"]: ext ? [ext] : [] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return "saved";
    } catch (e: any) {
      if (e?.name === "AbortError") return "saved"; // user cancelled
      // Permission denied / other → fall through to anchor.
    }
  }

  // 2. Web Share (iOS): present share sheet so "Save to Files" works.
  const file = new File([blob], name, { type: blob.type });
  const canShareFile = nav.canShare && nav.canShare({ files: [file] });
  if (canShareFile || isiOS) {
    try {
      await nav.share({ files: [file], title: name });
      return "shared";
    } catch (e: any) {
      if (e?.name === "AbortError") return "shared";
      // Share genuinely failed → fall through to anchor.
    }
  }

  // 3. Anchor fallback.
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "downloaded";
}
