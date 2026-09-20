import Link from "next/link";

export default function ExitPage() {
  return (
    <main className="exit-exterior" data-museum-location="exit-exterior">
      <video
        className="exit-exterior__video"
        src="/media/video/exterior/exit-exterior.mp4"
        muted
        playsInline
        autoPlay
        loop
        preload="metadata"
      />
      <div className="exit-exterior__veil" aria-hidden="true" />
      <div className="exit-exterior__ui">
        <p className="exit-exterior__label">Exterior</p>
        <Link className="exit-exterior__return" href="/narthex?arrived=1">Return to Narthex</Link>
      </div>
    </main>
  );
}
