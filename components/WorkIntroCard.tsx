export function WorkIntroCard({
  room,
  title,
  statement,
  note,
  headingLevel = 2,
}: {
  room: string;
  title: string;
  statement: string;
  note?: string;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <header className="work-intro-card">
      <p className="work-intro-card__room">{room}</p>
      <Heading>{title}</Heading>
      <p className="work-intro-card__statement">{statement}</p>
      {note ? <p className="work-intro-card__note">{note}</p> : null}
    </header>
  );
}
