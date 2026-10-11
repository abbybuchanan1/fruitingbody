import type { Artwork } from "@/lib/artworks";
import {
  artworkSets,
  bodyOfWaterWorks,
  miscarriageWorks,
  phaseFrames,
  mariaWorks,
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
  /** Where the work was made, shown after year and medium. */
  place?: string;
  reflection?: string[];
  archiveNote?: string;
};

const flattenPairs = (
  pairs: Array<{ id: string; title?: string; a: Artwork; b: Artwork }>,
): Artwork[] =>
  pairs.flatMap((pair) => [
    { ...pair.a, group: pair.id, groupTitle: pair.title },
    { ...pair.b, group: pair.id, groupTitle: pair.title },
  ]);

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

// Installed A Miscarriage edit (October 2026): eight frames, all 2017, no tintype edge.
const miscarriageArchive: Artwork[] = miscarriageWorks;

export const museumWorks: MuseumWork[] = [
  {
    id: "relative",
    title: "Relative",
    room: "Front Gallery",
    year: "Ongoing",
    medium: "Self-portrait photography",
    place: "Various locations, Oregon",
    href: "/exhibition?jump=relative",
    statement:
      "Body and land, moved by the same forces.",
    question:
      "What becomes visible when the body is understood as part of the same living system as the land?",
    exhibition: flattenPairs(relativePairs),
    archive: flattenPairs(relativePairs),
    reflection: reflections.relative,
  },
  {
    id: "daffodils",
    title: "This Morning I Was Gathering Daffodils",
    room: "Garden",
    year: "2024-2025",
    medium: "Self-portrait photography and digital collage",
    place: "Portland, Oregon",
    href: "/exhibition?jump=garden",
    statement:
      "A cycle imposed and inhabited at the same time.",
    question:
      "What forms of freedom remain available inside the conditions that make us?",
    exhibition: artworkSets.daffodils,
    // Archive: The Return hangs under The Fall so the six frames read as one row.
    archive: [0, 1, 2, 5, 3, 4].map((i) => {
      const work = artworkSets.daffodils[i];
      return i === 2 || i === 5 ? { ...work, stack: "fall-return" } : work;
    }),
    reflection: reflections.daffodils,
  },
  {
    id: "fear-not",
    title: "Fear Not",
    room: "Garden",
    year: "2025",
    medium: "Self-portrait photography",
    place: "Portland, Oregon",
    href: "/exhibition?jump=fear-not",
    statement:
      "Fear can still be present. The body moves anyway.",
    question:
      "What becomes possible when curiosity matters more than certainty?",
    exhibition: artworkSets.fearNot,
    archive: artworkSets.fearNot,
    reflection: reflections["fear-not"],
  },
  {
    id: "taste-and-see",
    title: "Taste and See",
    room: "Garden",
    year: "2026",
    medium: "Self-portrait photography",
    place: "Seaside, Oregon",
    href: "/exhibition?jump=taste-and-see",
    statement:
      "The body can be seen and still be allowed to want.",
    question:
      "What is beauty when it no longer exists for the gaze of others?",
    exhibition: artworkSets.taste,
    archive: artworkSets.taste,
    reflection: reflections["taste-and-see"],
  },
  {
    id: "miscarriage",
    title: "A Miscarriage",
    room: "Grotto",
    year: "2017",
    medium: "Self-portrait photography",
    place: "Portland, Oregon",
    href: "/exhibition?jump=a-miscarriage",
    statement:
      "Witnessing myself inside an experience I could barely understand.",
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
    place: "Stevenson, Washington",
    href: "/exhibition?jump=phase",
    statement:
      "Not “I am hopelessness,” but “I am experiencing hopelessness.”",
    question:
      "Who are we while we are becoming someone we cannot yet recognize?",
    exhibition: artworkSets.phase,
    archive: phaseFrames,
    reflection: reflections.phase,
  },
  {
    id: "threshold",
    title: "Threshold",
    room: "Rear Gallery",
    year: "2025",
    medium: "Self-portrait photography",
    place: "Portland, Oregon",
    href: "/exhibition?jump=threshold",
    statement:
      "Transformation has begun but cannot yet be named.",
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
    place: "Columbia River Gorge",
    href: "/red-room?jump=red-thread",
    statement:
      "Connection, held as visible tension.",
    question: "What binds us?",
    exhibition: artworkSets.redThread,
    // Catalog: three rows of one height each (1–4, 5–7, 8–10).
    archive: artworkSets.redThread.map((work, i) => ({
      ...work,
      sameHeight: true,
      breakBefore: i === 4 || i === 7,
    })),
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
    place: "Columbia River Gorge",
    href: "/red-room?jump=membrane",
    statement:
      "The experience itself as the site of the photograph.",
    question: "What must pass through us in order for us to become?",
    exhibition: artworkSets.membrane,
    // Trimmed to nine: near-repeats of the veil over the head were removed.
    archive: archiveSequence(
      "membrane",
      ["01", "03", "04", "05", "07", "09", "10", "12", "15"].map((n) => `membrane-index-${n}.jpg`),
      "Membrane",
    ),
    reflection: reflections.membrane,
  },
  {
    id: "body-of-water",
    title: "Body of Water",
    room: "Water Room",
    year: "2024-2025",
    medium: "Self-portrait photography",
    place: "Columbia River Gorge",
    href: "/water-room?jump=water-room-start",
    statement:
      "The pleasure of a body that adopts the logic of water rather than resisting it.",
    question:
      "What happens when we stop resisting transformation and begin moving with it?",
    exhibition: bodyOfWaterWorks,
    // Archive: the underwater light frame (12) opens the second row.
    archive: archiveSequence(
      "body-of-water",
      ["01", "02", "04", "05", "06", "12", "07", "08", "09", "10", "11"].map(
        (n) => `body-of-water-index-${n}.jpg`,
      ),
      "Body of Water",
    ).map((work) => (work.src.endsWith("-12.jpg") ? { ...work, breakBefore: true } : work)),
    reflection: reflections["body-of-water"],
  },
  {
    id: "maria",
    title: "Maria Burns Her Wedding Dress",
    room: "Current",
    year: "2025",
    medium: "Photography",
    place: "Mt. Hood National Forest, Oregon",
    href: "/current",
    statement:
      "A ritual, witnessed rather than directed.",
    question: "Can a deliberate act of witnessing transform identity?",
    exhibition: artworkSets.maria,
    archive: mariaWorks,
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
