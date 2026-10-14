import Link from "next/link";

// A missing page is still a room in the museum: quiet, dark, with a way back.
export default function NotFound() {
  return (
    <main className="not-found-room" data-museum-location="not-found">
      <div className="not-found-room__inner">
        <p className="not-found-room__label">Closed room</p>
        <h1>This room isn&apos;t open.</h1>
        <p className="not-found-room__note">It may have moved, or it may not be hung yet.</p>
        <nav className="not-found-room__ways" aria-label="Ways back">
          <Link href="/vestibule">Return to the Vestibule</Link>
          <Link href="/directory">Index</Link>
        </nav>
      </div>
    </main>
  );
}
