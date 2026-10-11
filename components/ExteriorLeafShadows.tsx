// Tree shadows on the entrance wall. The shapes are leaf shadows cut from
// Abby's own footage (the pavement clip the old scrolling pass used); here they
// hang still and sway around a point above the frame, like branches moving in
// a light wind, instead of travelling across the wall.
export function ExteriorLeafShadows({ ready = false }: { ready?: boolean }) {
  return (
    <div className={`museum-exterior__shadow-field museum-exterior__leaves${ready ? " is-ready" : ""}`} aria-hidden="true">
      <div className="museum-exterior__leaf-wall museum-exterior__leaf-wall--left">
        <span className="museum-exterior__leaf museum-exterior__leaf--a" />
        <span className="museum-exterior__leaf museum-exterior__leaf--b" />
      </div>
      <div className="museum-exterior__leaf-wall museum-exterior__leaf-wall--right">
        <span className="museum-exterior__leaf museum-exterior__leaf--b" />
        <span className="museum-exterior__leaf museum-exterior__leaf--a" />
      </div>
    </div>
  );
}
