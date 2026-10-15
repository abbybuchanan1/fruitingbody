// Light from outside in the Vestibule. The room is dark stone; daylight only
// enters through the doorways, so that is where this light lives: the colour of the
// light (strongest where the light is), sun through leaves on the passage floor, and the same
// dappled sun raking the lit face of the left jamb. The leaf shapes are cut
// from Abby's own footage (the shadows also used on the Entrance).
// The layer is laid out over the photograph itself (same cover crop), so the
// light stays on the doorway at any screen size. What it looks like, or
// whether there is sun at all, follows the time of day. At blue hour the
// halls beyond are lamp-lit instead, warm against the cool stone: see DAYLIGHT in
// museum.css.
export function VestibuleDaylight() {
  return (
    <div className="vestibule-daylight" aria-hidden="true">
      <div className="vestibule-daylight__lamps" />
      <div className="vestibule-daylight__pool vestibule-daylight__pool--floor">
        <span className="vestibule-daylight__leaves vestibule-daylight__leaves--a" />
        <span className="vestibule-daylight__leaves vestibule-daylight__leaves--b" />
      </div>
      <div className="vestibule-daylight__pool vestibule-daylight__pool--jamb">
        <span className="vestibule-daylight__leaves vestibule-daylight__leaves--b" />
        <span className="vestibule-daylight__leaves vestibule-daylight__leaves--a" />
      </div>
    </div>
  );
}
