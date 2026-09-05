export function ArtworkPlaceholder({
  label = "Artwork",
  orientation = "portrait",
}: {
  label?: string;
  orientation?: "portrait" | "landscape" | "square";
}) {
  return (
    <figure className={`artwork artwork--${orientation}`}>
      <div className="artwork__surface" role="img" aria-label={`${label} placeholder`}>
        <span>{label}</span>
      </div>
    </figure>
  );
}
