// expo-router treats every incoming URL as a navigation route. Screeb deep
// links (editor/survey/message, `screeb-*` scheme or `…://editor?token=…`)
// are consumed by the SDK through the Linking listener in `_layout.tsx` —
// keep the router out of them, else they land on an Unmatched Route page.
export function redirectSystemPath({ path }: { path: string; initial: boolean }) {
  if (path.includes("token=") || path.includes("screeb-")) {
    return "/";
  }
  return path;
}
