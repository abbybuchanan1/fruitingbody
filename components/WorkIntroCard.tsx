export function WorkIntroCard({
  room,
  title,
  statement,
  roomNote,
  note,
  headingLevel = 2,
}: {
  room: string;
  title: string;
  statement: string;
  roomNote?: string;
  note?: string;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <header className="work-intro-card">
      <p className="work-intro-card__room">{room}</p>
      {roomNote ? <p className="work-intro-card__room-note">{roomNote}</p> : null}
      <Heading>{title}</Heading>
      <p className="work-intro-card__statement">{statement}</p>
      {note ? <p className="work-intro-card__note">{note}</p> : null}
    </header>
  );
}
