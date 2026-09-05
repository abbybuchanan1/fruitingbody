export type Collection = {
  slug: string;
  title: string;
  question: string;
  environment: "earth" | "water" | "neutral";
};

export const collections: Collection[] = [
  {
    slug: "relative",
    title: "Relative",
    question: "How do bodies and landscapes participate in the same forces?",
    environment: "earth",
  },
  {
    slug: "body-of-water",
    title: "Body of Water",
    question: "What happens when the body enters the logic of water?",
    environment: "water",
  },
  {
    slug: "selected-works",
    title: "Selected Works",
    question: "A concise entry into the practice.",
    environment: "neutral",
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}
