import type { ReactNode } from "react";

export function Room({
  eyebrow,
  title,
  question,
  environment = "stone",
  children,
}: {
  eyebrow?: string;
  title: string;
  question?: string;
  environment?: string;
  children: ReactNode;
}) {
  return (
    <main className="room" data-environment={environment}>
      <div className="room__inner">
        <header className="room__header">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {question ? <p className="room__question">{question}</p> : null}
        </header>
        {children}
      </div>
    </main>
  );
}
