import Link from "next/link";

export default function ArchivePage() {
  return (
    <main className="utility-page">
      <p className="eyebrow">Research</p>
      <h1>Archive</h1>
      <ul className="index-list">
        <li>Biography</li>
        <li>Artist statement</li>
        <li>Project statements</li>
        <li>Curriculum vitae</li>
        <li>Publications</li>
      </ul>
      <Link className="utility-return-to-narthex" href="/narthex?arrived=1">Return to Narthex</Link>
    </main>
  );
}
