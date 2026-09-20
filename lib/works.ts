import type { Artwork } from "@/lib/artworks";
import {
  artworkSets,
  bodyOfWaterWorks,
  miscarriageWorks,
  relativePairs,
  thresholdPairs,
} from "@/lib/artworks";
import { reflections } from "@/lib/editorial";

export type WorkId =
  | "relative"
  | "daffodils"
  | "fear-not"
  | "taste-and-see"
  | "miscarriage"
  | "phase"
  | "threshold"
  | "red-thread"
  | "membrane"
  | "body-of-water"
  | "maria";

export type MuseumWork = {
  id: WorkId;
  title: string;
  room: string;
  year: string;
  medium: string;
  href: string;
  statement: string;
  question: string;
  exhibition: Artwork[];
  archive: Artwork[];
  reflection?: string[];
  archiveNote?: string;
};

const flattenPairs = (
  pairs: Array<{ a: Artwork; b: Artwork }>,
): Artwork[] => pairs.flatMap((pair) => [pair.a, pair.b]);

const archiveSequence = (
  folder: string,
  filenames: string[],
  title: string,
): Artwork[] =>
  filenames.map((filename, index) => ({
    src: `/art/archive/${folder}/${filename}`,
    alt: `${title}, archive image ${index + 1}.`,
  }));

const numberedArchive = (
  folder: string,
  prefix: string,
  count: number,
  title: string,
): Artwork[] =>
  archiveSequence(
    folder,
    Array.from({ length: count }, (_, index) =>
      `${prefix}-${String(index + 1).padStart(2, "0")}.jpg`,
    ),
    title,
  );

const relativeArchive = archiveSequence(
  "relative",
  ["01", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"].map(
    (n) => `relative-index-${n}.jpg`,
  ),
  "Relative",
);

const miscarriageArchive: Artwork[] = [
  ["miscarriage-stay-archive-01.jpg", "Stay"],
  ["miscarriage-slide-archive-02.jpg", "Slide"],
  ["miscarriage-follicle-portal-drain-archive-03.jpg", "Follicle, Portal, Drain"],
  ["miscarriage-drift-archive-06.jpg", "Drift"],
  ["miscarriage-passage-archive-05.jpg", "Passage"],
  ["miscarriage-want-archive-04.jpg", "Want"],
].map(([filename, title]) => ({
  src: `/art/archive/miscarriage/${filename}`,
  title,
  alt: `A Miscarriage, ${title}.`,
}));

export const museumWorks: MuseumWork[] = [
  {
    id: "relative",
    title: "Relative",
    room: "Front Gallery",
    year: "2025",
    medium: "Self-portrait photography",
    href: "/exhibition?jump=relative",
    statement:
      "The work investigates the ways bodies and landscapes participate in the same forces rather than functioning as metaphors for one another.",
    question:
      "What becomes visible when the body is understood as part of the same living system as the land?",
    exhibition: flattenPairs(relativePairs),
    archive: relativeArchive,
    reflection: reflections.relative,
  },
  {
    id: "daffodils",
    title: "This Morning I Was Gathering Daffodils",
    room: "Garden",
    year: "2024-2025",
    medium: "Self-portrait photography",
    href: "/exhibition?jump=garden",
    statement:
      "The work investigates the relationship between agency and inevitability, exploring forms of sovereignty that emerge through participation rather than escape.",
    question:
      "What forms of freedom remain available inside the conditions that make us?",
    exhibition: artworkSets.daffodils,
    archive: numberedArchive("daffodils", "daffodils-index", 22, "This Morning I Was Gathering Daffodils"),
    reflection: reflections.daffodils,
  },
  {
    id: "fear-not",
    title: "Fear Not",
    room: "Garden",
    year: "2025",
    medium: "Self-portrait photography",
    href: "/exhibition?jump=fear-not",
    statement:
      "The work investigates curiosity as a transformative force, reclaiming knowledge, desire, and participation from narratives of transgression and fear.",
    question:
      "What becomes possible when curiosity matters more than certainty?",
    exhibition: artworkSets.fearNot,
    archive: numberedArchive("fear-not", "fear-not-index", 8, "Fear Not"),
    reflection: reflections["fear-not"],
  },
  {
    id: "taste-and-see",
    title: "Taste and See",
    room: "Garden",
    year: "2026",
    medium: "Self-portrait photography",
    href: "/exhibition?jump=taste-and-see",
    statement:
      "The work investigates beauty as an embodied experience rather than a performed identity, asking what remains when beauty is no longer organized around spectatorship.",
    question:
      "What is beauty when it no longer exists for the gaze of others?",
    exhibition: artworkSets.taste,
    archive: numberedArchive("taste-and-see", "taste-and-see-index", 8, "Taste and See"),
    reflection: reflections["taste-and-see"],
  },
  {
    id: "miscarriage",
    title: "A Miscarriage",
    room: "Grotto",
    year: "2017",
    medium: "Self-portrait photography",
    href: "/exhibition?jump=a-miscarriage",
    statement:
      "The work investigates transformation through interruption, exploring longing, absence, and passage as conditions of becoming.",
    question:
      "How does a body continue becoming through loss, longing, and interrupted passage?",
    exhibition: miscarriageWorks,
    archive: miscarriageArchive,
    reflection: reflections.miscarriage,
  },
  {
    id: "phase",
    title: "Phase",
    room: "Grotto",
    year: "2024",
    medium: "Self-portrait photography",
    href: "/exhibition?jump=phase",
    statement:
      "The work investigates identity during periods of dissolution, attending to the unstable interval between one state of being and another.",
    question:
      "Who are we while we are becoming someone we cannot yet recognize?",
    exhibition: artworkSets.phase,
    archive: artworkSets.phase,
    reflection: reflections.phase,
  },
  {
    id: "threshold",
    title: "Threshold",
    room: "Rear Gallery",
    year: "2025",
    medium: "Self-portrait photography",
    href: "/exhibition?jump=threshold",
    statement:
      "The work investigates the unstable territory between states, where transformation has begun but cannot yet be named.",
    question:
      "What occurs in the space between what has ended and what has not yet emerged?",
    exhibition: flattenPairs(thresholdPairs),
    archive: flattenPairs(thresholdPairs),
    reflection: reflections.threshold,
  },
  {
    id: "red-thread",
    title: "Red Thread",
    room: "Red Room",
    year: "2024-2026",
    medium: "Self-portrait photography",
    href: "/red-room?jump=red-thread",
    statement:
      "This work explores the tensions between entanglement, belonging, and becoming.",
    question: "What binds us?",
    exhibition: artworkSets.redThread,
    archive: artworkSets.redThread,
    reflection: reflections["red-thread"],
    archiveNote:
      "The current edit combines work originally developed as Red Thread, Unravel, and It Was Shelter Before It Was a Lie.",
  },
  {
    id: "membrane",
    title: "Membrane",
    room: "Red Room",
    year: "2025",
    medium: "Self-portrait photography",
    href: "/red-room?jump=membrane",
    statement:
      "The work investigates permeability as a condition of becoming, where bodily boundaries function as thresholds rather than fixed edges.",
    question: "What must pass through us in order for us to become?",
    exhibition: artworkSets.membrane,
    archive: numberedArchive("membrane", "membrane-index", 15, "Membrane"),
  },
  {
    id: "body-of-water",
    title: "Body of Water",
    room: "Water Room",
    year: "2024-2026",
    medium: "Self-portrait photography",
    href: "/water-room?jump=water-room-start",
    statement:
      "The work explores what becomes possible when the body adopts the logic of water rather than resisting it.",
    question:
      "What happens when we stop resisting transformation and begin moving with it?",
    exhibition: bodyOfWaterWorks,
    archive: numberedArchive("body-of-water", "body-of-water-index", 11, "Body of Water"),
    reflection: reflections["body-of-water"],
  },
  {
    id: "maria",
    title: "Maria Burns Her Wedding Dress",
    room: "Current",
    year: "2026",
    medium: "Photography",
    href: "/current",
    statement:
      "An unstaged ritual, witnessed rather than arranged. The image documents a ritual event without intervention.",
    question: "What changes when the camera witnesses rather than directs?",
    exhibition: artworkSets.maria,
    archive: artworkSets.maria,
    reflection: reflections.maria,
  },
];

export const museumWorksById = Object.fromEntries(
  museumWorks.map((work) => [work.id, work]),
) as Record<WorkId, MuseumWork>;

export const indexGroups = [
  { room: "Front Gallery", ids: ["relative"] },
  { room: "Garden", ids: ["daffodils", "fear-not", "taste-and-see"] },
  { room: "Grotto", ids: ["miscarriage", "phase"] },
  { room: "Rear Gallery", ids: ["threshold"] },
  { room: "Red Room", ids: ["red-thread", "membrane"] },
  { room: "Water Room", ids: ["body-of-water"] },
  { room: "Current", ids: ["maria"] },
] as const;
