export type Artwork = {
  src: string;
  alt: string;
  title?: string;
  /** Shown under the title when a work needs its medium named (e.g. a collage in a photographic series). */
  medium?: string;
  /** Pairs (Relative, Threshold) share a group so the Index and Archive keep them together. */
  group?: string;
  groupTitle?: string;
  /** Start a new row in the Index and Archive catalog before this image. */
  breakBefore?: boolean;
};

export type RelativePair = {
  id: string;
  title?: string;
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
  // In the Index and Archive, Drift opens the second row (four and four).
  breakBefore: slug === "05-drift",
}));

// Relative (October 2026 edit): seven pairs, each named for the force the body
// and the land share. Body image first (a), landscape second (b).
const relativeEdit: Array<[string, string, string]> = [
  ["01", "wind", "Wind"],
  ["02", "insulation", "Insulation"],
  ["03", "gravity", "Gravity"],
  ["04", "striation", "Striation"],
  ["05", "ramification", "Ramification"],
  ["06", "umbra", "Umbra"],
  ["07", "occlusion", "Occlusion"],
];

export const relativePairs: RelativePair[] = relativeEdit.map(([number, slug, title]) => ({
  id: slug,
  title,
  a: {
    src: `/art/relative/relative-${number}-${slug}-a.jpg`,
    alt: `Relative: ${title}. The body.`,
  },
  b: {
    src: `/art/relative/relative-${number}-${slug}-b.jpg`,
    alt: `Relative: ${title}. The land.`,
  },
  layout: "side-by-side",
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

// Body of Water: frame 03 is withdrawn (its background was repaired with
// generative AI). The remaining seven keep their original file numbers.
export const bodyOfWaterWorks: Artwork[] = ["01", "02", "04", "05", "06", "07", "08"].map(
  (n, i) => ({
    src: `/art/body-of-water/body-of-water-${n}.jpg`,
    alt: `Body of Water, image ${i + 1} of 7.`,
  }),
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

// Fear Not: five frames from night video in the vines.
const fearNotAlts = [
  "Fear Not, 1 of 5. Standing in dark vines at night, both hands covering the face.",
  "Fear Not, 2 of 5. Back turned, looking over the shoulder toward the camera, vines at the waist.",
  "Fear Not, 3 of 5. Soft and glowing, eyes lowered, the figure half-dissolved in light among the leaves.",
  "Fear Not, 4 of 5. Biting a green apple among the vines, eyes raised, one hand low against the body.",
  "Fear Not, 5 of 5. Facing the camera with a direct gaze, holding the eaten core of the apple.",
];

export const fearNotWorks: Artwork[] = fearNotAlts.map((alt, i) => ({
  src: `/art/fear-not/fear-not-0${i + 1}.jpg`,
  alt,
}));

// Taste and See: three photographs shown five ways. It opens on a close crop
// of the second frame and ends on a close crop of the fourth.
const tasteAndSeeAlts = [
  "Taste and See, 1 of 5. Close crop of a closed eye; honey runs over the lid and a drop hangs from the lashes, a small white flower at the brow.",
  "Taste and See, 2 of 5. Head bowed, eyes closed, honey running from the forehead over the eyes, nose and lips; white flowers in the honey, a pearl necklace.",
  "Taste and See, 3 of 5. Head tipped back in hard sun, a flower over one eye, mascara smudged beneath the other, honey running down the cheek like tears.",
  "Taste and See, 4 of 5. Facing the camera with a direct gaze, the face covered in honey and petals, a pearl necklace.",
  "Taste and See, 5 of 5. Close crop of an open eye with a gold iris, honey and petals around it.",
];

export const tasteAndSeeWorks: Artwork[] = tasteAndSeeAlts.map((alt, i) => ({
  src: `/art/taste/taste-and-see-0${i + 1}.jpg`,
  alt,
}));

// Phase hangs as one work: six frames in a single grid (2 rows of 3),
// read left to right, top to bottom. The frames also exist on their own
// for the Directory and Archive.
export const phaseWorks: Artwork[] = [
  {
    src: "/art/phase/phase-grid.jpg",
    alt: "Phase. Six self-portraits in a grid of two rows of three, moving from a direct, still gaze through blurred motion and an open red mouth, to a face dissolved and erased, ending in profile, turned away.",
  },
];

export const phaseFrames: Artwork[] = Array.from({ length: 6 }, (_, i) => ({
  src: `/art/phase/phase-frame-0${i + 1}.jpg`,
  alt: `Phase, frame ${i + 1} of 6.`,
}));

export const artworkSets = {
  membrane: membraneWorks,
  miscarriage: miscarriageWorks,
  daffodils: daffodilsCurrentWorks,
  fearNot: fearNotWorks,
  taste: tasteAndSeeWorks,
  phase: phaseWorks,
  maria: mariaCurrentWorks,
  threshold: sequence("threshold", 3, "Threshold"),
  relative: sequence("relative", 6, "Relative"),
  bodyOfWater: bodyOfWaterWorks,
  selectedWorks: sequence("selected-works", 13, "Selected Works"),
  redThread: redThreadWorks,
  shelter: sequence("shelter", 12, "It Was Shelter Before It Was a Lie"),
  unravel: sequence("unravel", 7, "Unravel"),
};
