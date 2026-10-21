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
  /** In the Archive, shown after the installed edit under "Further work". */
  archiveExtra?: Artwork[];
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
    archiveExtra: [
      { src: "/art/archive/daffodils/daffodils-further-01.jpg", alt: "This Morning I Was Gathering Daffodils, further work. A hand in pomegranate seeds, sparks of light." },
      { src: "/art/archive/daffodils/daffodils-further-02.jpg", alt: "This Morning I Was Gathering Daffodils, further work. The pomegranate broken open, very close." },
      { src: "/art/archive/daffodils/daffodils-further-03.jpg", alt: "This Morning I Was Gathering Daffodils, further work. Lying in the dark by a root, a hand on the pomegranate." },
      { src: "/art/archive/daffodils/daffodils-further-04.jpg", alt: "This Morning I Was Gathering Daffodils, further work. Upside down in the sun, red fruit in hand." },
      { src: "/art/archive/daffodils/daffodils-further-05.jpg", alt: "This Morning I Was Gathering Daffodils, further work. A profile in window shadow on a red wall." },
      { src: "/art/archive/daffodils/daffodils-further-06.jpg", alt: "This Morning I Was Gathering Daffodils, further work. A face beside its own shadow on a red wall." },
      { src: "/art/archive/daffodils/daffodils-further-07.jpg", alt: "This Morning I Was Gathering Daffodils, further work. A face blurred among bright green leaves." },
    ],
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
    archiveExtra: [
      { src: "/art/fear-not/fear-not-05.jpg", alt: "Fear Not, further work. Facing the camera with a direct gaze, holding the eaten core of the apple." },
      { src: "/art/archive/fear-not/fear-not-further-01b.jpg", alt: "Fear Not, further work. Hair whipping through the lit vines, the face turned away." },
      { src: "/art/archive/fear-not/fear-not-further-02.jpg", alt: "Fear Not, further work. Head thrown back, vines across the body." },
      { src: "/art/archive/fear-not/fear-not-further-09.jpg", alt: "Fear Not, further work. Eyes closed, chin raised, one hand gripping a vine across the body." },
      { src: "/art/archive/fear-not/fear-not-further-08.jpg", alt: "Fear Not, further work. Eyes lowered, side-lit, the body wrapped in glowing vines." },
      { src: "/art/archive/fear-not/fear-not-further-03.jpg", alt: "Fear Not, further work. Close, biting the apple." },
      { src: "/art/archive/fear-not/fear-not-further-04b.jpg", alt: "Fear Not, further work. The face nearly lost among lit leaves, eyes closed." },
      { src: "/art/archive/fear-not/fear-not-further-05.jpg", alt: "Fear Not, further work. Holding the apple out toward the camera." },
      { src: "/art/archive/fear-not/fear-not-further-06.jpg", alt: "Fear Not, further work. Hands blurred in motion before the face, eyes closed." },
      { src: "/art/archive/fear-not/fear-not-further-07.jpg", alt: "Fear Not, further work. A direct gaze among the leaves, a green stem in hand." },
    ],
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
    // Catalog: three rows of one height each. The three dune frames (the
    // figure in red tulle) close the set; the room's opening image sits
    // between the river and the dunes (the artist's order, October 20).
    archive: [
      ...artworkSets.redThread.slice(1, 6),
      artworkSets.redThread[0],
      ...artworkSets.redThread.slice(6),
    ].map((work, i) => ({
      ...work,
      sameHeight: true,
      breakBefore: i === 4 || i === 7,
    })),
    reflection: reflections["red-thread"],
    archiveNote:
      "The current edit combines work originally developed as Red Thread, Unravel, and It Was Shelter Before It Was a Lie.",
    archiveExtra: [
      { src: "/art/archive/red-thread/red-thread-further-01b.jpg", alt: "Red Thread, further work. Eyes lowered by the river, red thread across the brow, goldenrod and dock in the foreground." },
      { src: "/art/archive/red-thread/red-thread-further-03.jpg", alt: "Red Thread, further work. Standing against an eroded sand bank among exposed roots, wound in red thread and roses." },
      { src: "/art/archive/red-thread/red-thread-further-04.jpg", alt: "It Was Shelter Before It Was a Lie. Standing knee-deep in the Columbia under a wide sky, red cloth drawn across the body, white shell-like forms at the hip." },
    ],
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
    // Archive: the installed six, then the further frames (the archive set
    // was trimmed earlier of near-repeats of the veil over the head).
    archive: artworkSets.membrane,
    archiveExtra: archiveSequence(
      "membrane",
      ["01", "03", "05", "07", "10"].map((n) => `membrane-index-${n}.jpg`),
      "Membrane, further work",
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
    // Archive: the installed seven, then the further frames.
    archive: bodyOfWaterWorks,
    archiveExtra: archiveSequence(
      "body-of-water",
      ["02", "05", "12", "10", "11"].map((n) => `body-of-water-index-${n}.jpg`),
      "Body of Water, further work",
    ),
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
    // Archive: the installed five, then the rest of the witnessed sequence.
    archive: artworkSets.maria,
    archiveExtra: [3, 4, 6, 9, 10, 11].map((n) => mariaWorks[n - 1]),
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
