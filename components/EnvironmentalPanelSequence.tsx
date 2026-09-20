type EnvironmentalPanel = {
  src: string;
  alt?: string;
};

type Props = {
  panels: EnvironmentalPanel[];
  className?: string;
};

export function EnvironmentalPanelSequence({ panels, className = "" }: Props) {
  const classes = ["environmental-panel-sequence", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-hidden="true">
      {panels.map((panel, index) => (
        <div
          key={panel.src}
          className="environmental-panel-sequence__panel-wrap"
          data-panel-index={index}
        >
          <img
            className="environmental-panel-sequence__panel"
            src={panel.src}
            alt={panel.alt ?? ""}
            loading="eager"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
