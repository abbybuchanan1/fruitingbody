// The Narthex floor at the top of a side room (Reading Room, Archive): the
// visitor arrives from the Narthex and the floor fades away into the room.
export function NarthexThreshold() {
  return (
    <div className="narthex-threshold" aria-hidden="true">
      <img src="/media/video/environment/narthex-arrival.jpg" alt="" />
    </div>
  );
}
