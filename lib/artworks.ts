export type Artwork = {
  src: string;
  alt: string;
  title?: string;
  /** Shown under the title when a work needs its medium named (e.g. a collage in a photographic series). */
  medium?: string;
};

export type RelativePair = {
  id: string;
  a: Artwork;
  b: Artwork;
  layout: "side-by-side" | "stagger-a" | "stagger-b" | "wide" | "stacked";
};

export type ThresholdPair = {
  id: string;
  a: Artwork;
  b: Artwork;
};

function sequence(slug: string, count: number, title: string): Artwork[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/art/${slug}/${String(i + 1).padStart(2, "0")}.webp`,
    alt: `${title}, image ${i + 1} of ${count}.`,
  }));
}

function exhibitionSequence(
  folder: string,
  filename: string,
  count: number,
  title: string,
): Artwork[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/art/${folder}/${filename}-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `${title}, image ${i + 1} of ${count}.`,
  }));
}

const miscarriageSequence: Array<[string, string]> = [
  ["01-stay", "Stay"],
  ["02-tear", "Tear"],
  ["03-follicle-portal-drain", "Follicle, Portal, Drain"],
  ["04-slide", "Slide"],
  ["05-drift", "Drift"],
  ["06-pass", "Pass"],
  ["07-want", "Want"],
  ["08-left", "Left"],
];

export const miscarriageWorks: Artwork[] = miscarriageSequence.map(([slug, title]) => ({
  src: `/art/miscarriage/miscarriage-${slug}.jpg`,
  title,
  alt: `A Miscarriage, ${title}.`,
}));

export const relativePairs: RelativePair[] = [
  ["01", "side-by-side"],
  ["02", "side-by-side"],
  ["05", "side-by-side"],
  ["04", "side-by-side"],
  ["10", "side-by-side"],
  ["06", "side-by-side"],
  ["07", "side-by-side"],
  ["09", "side-by-side"],
].map(([id, layout]) => ({
  id,
  a: {
    src: `/art/relative/relative-${id}A.jpg`,
    alt: `Relative, pair ${id}, image A.`,
  },
  b: {
    src: `/art/relative/relative-${id}B.jpg`,
    alt: `Relative, pair ${id}, image B.`,
  },
  layout: layout as RelativePair["layout"],
}));

export const thresholdPairs: ThresholdPair[] = ["01", "02", "03"].map((id) => ({
  id,
  a: {
    src: `/art/threshold/threshold-${id}A.jpg`,
    alt: `Threshold, pair ${id}, image A.`,
  },
  b: {
    src: `/art/threshold/threshold-${id}B.jpg`,
    alt: `Threshold, pair ${id}, image B.`,
  },
}));

export const membraneWorks = exhibitionSequence(
  "membrane",
  "membrane",
  6,
  "Membrane",
).map((work, index) => {
  const numbers = ["01", "02", "03", "04", "06", "07"];
  return {
    ...work,
    src: `/art/membrane/membrane-${numbers[index]}.jpg`,
  };
});

export const redThreadWorks = exhibitionSequence(
  "red-thread",
  "red-thread",
  10,
  "Red Thread",
);

export const bodyOfWaterWorks = exhibitionSequence(
  "body-of-water",
  "body-of-water",
  8,
  "Body of Water",
);

export const mariaWorks: Artwork[] = Array.from({ length: 11 }, (_, index) => ({
  src: `/art/maria/maria-index-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: `Maria Burns Her Wedding Dress, image ${index + 1} of 11.`,
}));

// Current / Index edit: object → ignition → burning → encounter → carried flame → trace.
// The full 11-image witnessed sequence remains available in Archive.
export const mariaCurrentWorks: Artwork[] = [1, 2, 5, 4, 8, 7].map((number) => ({
  ...mariaWorks[number - 1],
  alt: `Maria Burns Her Wedding Dress, current edit, image ${number}.`,
}));

// Installed Daffodils edit (October 2026): six frames, each with its title.
// Vertical frames are the upright body; the two 16:9 frames are where the body
// goes horizontal (the fall, and lying on the ground). Older edits stay in the Archive.
// The first and last frames are digital collages built from Abby's footage;
// the four between are photographs with minimal editing.
const daffodilsTitles = [
  ["01", "hades", "Hades", "Digital collage"],
  ["02", "this-is-my-body", "This Is My Body", "Photograph"],
  ["03", "the-fall", "The Fall", "Photograph"],
  ["04", "take-and-eat", "Take and Eat", "Photograph"],
  ["05", "shadow-queen", "Shadow Queen", "Photograph"],
  ["06", "the-return", "The Return", "Digital collage"],
] as const;

export const daffodilsCurrentWorks: Artwork[] = daffodilsTitles.map(([number, slug, title, medium]) => ({
  src: `/art/daffodils/daffodils-${number}-${slug}.jpg`,
  alt: `This Morning I Was Gathering Daffodils: ${title}. ${medium}.`,
  title,
  medium,
}));

export const artworkSets = {
  membrane: membraneWorks,
  miscarriage: miscarriageWorks,
  daffodils: daffodilsCurrentWorks,
  fearNot: exhibitionSequence("fear-not", "fear-not", 5, "Fear Not"),
  taste: exhibitionSequence("taste", "taste-and-see", 6, "Taste and See"),
  phase: exhibitionSequence("phase", "phase", 5, "Phase"),
  maria: mariaCurrentWorks,
  threshold: sequence("threshold", 3, "Threshold"),
  relative: sequence("relative", 6, "Relative"),
  bodyOfWater: bodyOfWaterWorks,
  selectedWorks: sequence("selected-works", 13, "Selected Works"),
  redThread: redThreadWorks,
  shelter: sequence("shelter", 12, "It Was Shelter Before It Was a Lie"),
  unravel: sequence("unravel", 7, "Unravel"),
};
