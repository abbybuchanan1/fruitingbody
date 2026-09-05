import Link from "next/link";

export default function ExitPage() {
  return (
    <main className="exit-page">
      <p className="eyebrow">Narthex</p>
      <h1>Departure</h1>
      <p>The exterior gradually returns. The museum remains available for another visit.</p>
      <div className="exit-links">
        <Link href="/">Step outside</Link>
        <Link href="/reading-room">Reading Room</Link>
        <Link href="/index">Index</Link>
      </div>
    </main>
  );
}
