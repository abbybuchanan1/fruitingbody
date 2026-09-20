export function VestibuleDapple() {
  return (
    <div className="vestibule__dapple-window" aria-hidden="true">
      <video
        className="vestibule__dapple-video"
        src="/media/atmosphere/vestibule-dapple.mp4"
        muted
        playsInline
        autoPlay
        loop
        preload="metadata"
      />
    </div>
  );
}
