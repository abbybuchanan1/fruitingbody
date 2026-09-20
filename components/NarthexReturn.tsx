import Link from "next/link";

const returns = [
  { href: "/exhibition?jump=threshold-end&return=1", label: "Exhibition" },
  { href: "/red-room?jump=membrane-end&return=1", label: "Red Room" },
  { href: "/water-room?jump=body-of-water-end&return=1", label: "Water Room" },
];

export function NarthexReturn() {
  return (
    <nav className="narthex-room__returns" aria-label="Return to exhibition rooms">
      <span className="narthex-room__returns-label">Return to</span>
      <div className="narthex-room__return-links">
        {returns.map((item) => (
          <Link key={item.href} className="narthex-room__return" href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
