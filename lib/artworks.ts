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
  /** Images sharing a stack key hang one above the other in the catalog. */
  stack?: string;
  /** In the catalog, hang at the shared row height instead of the shared long edge. */
  sameHeight?: boolean;
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

// Red Thread closes on the Unravel frame (leaving, the thread stretched
// across the sand) in place of frame 10, which moves to the Archive.
const redThreadFrames = exhibitionSequence("red-thread", "red-thread", 10, "Red Thread");
export const redThreadWorks: Artwork[] = [
  ...redThreadFrames.slice(0, 9),
  {
    src: "/art/archive/unravel-original/unravel-original-05.jpg",
    alt: "Red Thread, image 10 of 10.",
  },
];
export const redThreadRetired: Artwork = {
  ...redThreadFrames[9],
  alt: "Red Thread, earlier closing frame: the figure dissolving as the thread runs toward the camera.",
};

// Body of Water: the first frame 03 was withdrawn (it had been upscaled).
// 03-v2 is the artist's re-edit from a file that was never upscaled,
// hung in the same position (October 2026).
// October 20: 01, 05 and 07 replaced with the artist's re-exports closer to the
// originals (the earlier files showed upscaler/denoise texture at full size).
// October 22: the underwater frame (04) moves to the Archive's further work;
// with Threshold now about the waterline seen from below, it belongs there.
export const bodyOfWaterWorks: Artwork[] = ["01-v2", "02", "03-v2", "05-v2", "06", "07-v2", "08"].map(
  (n, i) => ({
    src: `/art/body-of-water/body-of-water-${n}.jpg`,
    alt: `Body of Water, image ${i + 1} of 7.`,
  }),
);

export const mariaWorks: Artwork[] = Array.from({ length: 11 }, (_, index) => ({
  src: `/art/maria/maria-index-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: `Maria Burns Her Wedding Dress, image ${index + 1} of 11.`,
}));

// Current / Index edit: object → ignition → burning → carried flame → trace.
// (The second burning-dress frame, image 4, was cut in October 2026.)
// The full 11-image witnessed sequence remains available in Archive.
export const mariaCurrentWorks: Artwork[] = [1, 2, 5, 8, 7].map((number) => ({
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

// Fear Not: six frames from night video and photographs in the vines.
const fearNotAlts = [
  "Fear Not, 1 of 6. Standing in dark vines at night, both hands covering the face.",
  "Fear Not, 2 of 6. Back turned, looking over the shoulder toward the camera, vines at the waist.",
  "Fear Not, 3 of 6. Deep in the night vines, eyes closed, face and shoulders blurred in warm light, honeysuckle above.",
  "Fear Not, 4 of 6. Biting a green apple among the vines, eyes raised, one hand low against the body.",
  "Fear Not, 5 of 6. Close, deep in the vines, an arm raised over the bowed head, a hand in the foreground holding a small snake.",
  "Fear Not, 6 of 6. A close portrait among the leaves, a direct gaze, a metal serpent necklace at the throat.",
];

// Trial (October 2026): the serpent portrait (fear-not-06) closes the
// installed work, with the snake frame (fear-not-07b) just before it; the
// earlier closing frame (fear-not-05) is in the Archive's further work.
// October 17: fear-not-08 replaces the soft glowing frame (fear-not-03),
// which moves to the Archive's further work.
const fearNotFiles = ["01", "02", "08", "04", "07b", "06"];

export const fearNotWorks: Artwork[] = fearNotAlts.map((alt, i) => ({
  src: `/art/fear-not/fear-not-${fearNotFiles[i]}.jpg`,
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
