import { artistBio, artistCv, artistStatement, fruitingBodyStatement, processStatement } from "@/lib/editorial";

function PracticeDetails({
  id,
  title,
  paragraphs,
}: {
  id: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <details className="archive-practice-detail" id={id}>
      <summary>{title}</summary>
      <div className="archive-practice-detail__body">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </details>
  );
}

// Artist Statement, Fruiting Body, Process, Bio, CV and Contact as expandable
// sections. Lives at the top of the Index (moved from the Archive, Oct 2026).
export function PracticeSection() {
  return (
      <section className="archive-practice" aria-label="Practice context">
        <PracticeDetails id="artist-statement" title="Artist Statement" paragraphs={artistStatement} />
        <PracticeDetails id="fruiting-body" title="Fruiting Body" paragraphs={fruitingBodyStatement} />
        <PracticeDetails id="process" title="Process" paragraphs={processStatement} />
        <PracticeDetails id="bio" title="Bio" paragraphs={artistBio} />
        <details className="archive-practice-detail" id="cv">
          <summary>CV</summary>
          <div className="archive-practice-detail__body archive-cv">
            {artistCv.map((section) => (
              <section className="archive-cv__section" key={section.heading}>
                <h3>{section.heading}</h3>
                <ul>
                  {section.entries.map((entry) => (
                    <li key={entry.text}>
                      <span className="archive-cv__year">{entry.year}</span>
                      <span className="archive-cv__text">{entry.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </details>
        <details className="archive-practice-detail" id="contact">
          <summary>Contact</summary>
          <div className="archive-practice-detail__body archive-contact-detail__body">
            <p>Abby Buchanan</p>
            <p>Portland, Oregon</p>
            <p><a href="mailto:abby@fruitingbody.works">abby@fruitingbody.works</a></p>
          </div>
        </details>
      </section>
  );
}
