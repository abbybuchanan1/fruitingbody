export type Poem = {
  slug: string;
  title: string;
  year?: string;
  pdf: string;
  preview: string[];
};

export const poems: Poem[] = [
  {
    slug: "for-c",
    title: "For C",
    year: "2024",
    pdf: "/media/reading-room/For%20C%20(1).pdf",
    preview: ["Hi.", "Hello.", "Nice to meet you.", "Let’s be friends."],
  },
  {
    slug: "may-2024",
    title: "May, 2024",
    year: "2024",
    pdf: "/media/reading-room/May%2C%202024%20(v%202).pdf",
    preview: ["The yard where my mother", "plants flowers.", "Where my sister hangs", "window boxes."],
  },
  {
    slug: "that-it-was",
    title: "That It Was",
    year: "2026",
    pdf: "/media/reading-room/That%20it%20was.pdf",
    preview: ["Laughing for the first time since yesterday", "Eyelids swollen, tear-brined like little", "martini onions"],
  },
  {
    slug: "two-days",
    title: "Two Days",
    year: "2025",
    pdf: "/media/reading-room/Two%20Days.pdf",
    preview: ["If I knew I only had two days with you", "I’d take your hand", "and we’d run to the water."],
  },
  {
    slug: "evidence",
    title: "Evidence",
    pdf: "/media/reading-room/Evidence%20(1).pdf",
    preview: [],
  },
  {
    slug: "rosary",
    title: "Rosary",
    year: "2026",
    pdf: "/media/reading-room/Rosary.pdf",
    preview: ["Earth rotating like a bead", "The bead orbiting a silk cord", "Who is the mantra for—", "Lakshmi or me?"],
  },
];

export function getPoem(slug: string) {
  return poems.find((poem) => poem.slug === slug);
}
