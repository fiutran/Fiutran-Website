// Visible placeholder chip. Never replace with an invented fact: replace with the real one
// and remove the entry from the page's `placeholdersNeeded` in content/pages.ts.
export function Ph({ children, label }: { children?: string; label?: string }) {
  const text = label ?? children ?? '';
  return (
    <span className="ph" data-ph={text}>
      [PLACEHOLDER: {text}]
    </span>
  );
}
