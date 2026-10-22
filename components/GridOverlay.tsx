// The visible 12-column wireframe grid. Decorative only.
export function GridOverlay() {
  return (
    <div className="grid-overlay" aria-hidden="true">
      <div className="container-wf grid h-full grid-cols-12 gap-4 md:gap-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>
    </div>
  );
}
