export type Artwork = {
  src: string;
  alt: string;
  title?: string;
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
    alt: `${title}, work ${i + 1}. Provisional curatorial alt text pending.`,
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
    alt: `${title}, work ${i + 1}. Provisional curatorial alt text pending.`,
  }));
}

export const miscarriageWorks: Artwork[] = [
  {
    src: "/art/miscarriage/miscarriage-stay-01.jpg",
    title: "Stay",
    alt: "A Miscarriage, Stay.",
  },
  {
    src: "/art/miscarriage/miscarriage-slide-03.jpg",
    title: "Slide",
    alt: "A Miscarriage, Slide.",
  },
  {
    src: "/art/miscarriage/miscarriage-follicle-portal-drain-04a.jpg",
    title: "Follicle, Portal, Drain",
    alt: "A Miscarriage, Follicle, Portal, Drain.",
  },
  {
    src: "/art/miscarriage/miscarriage-drift-05.jpg",
    title: "Drift",
    alt: "A Miscarriage, Drift.",
  },
  {
    src: "/art/archive/miscarriage/miscarriage-passage-06.jpg",
    title: "Passage",
    alt: "A Miscarriage, Passage.",
  },
  {
    src: "/art/miscarriage/miscarriage-want-02.jpg",
    title: "Want",
    alt: "A Miscarriage, Want.",
  },
];

export const relativePairs: RelativePair[] = [
  ["01", "side-by-side"],
  ["02", "stagger-b"],
  ["05", "side-by-side"],
  ["04", "stagger-a"],
  ["10", "side-by-side"],
  ["06", "stagger-b"],
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
  alt: `Maria Burns Her Wedding Dress, work ${index + 1}. Provisional curatorial alt text pending.`,
}));

export const artworkSets = {
  membrane: membraneWorks,
  miscarriage: miscarriageWorks,
  daffodils: exhibitionSequence(
    "daffodils",
    "daffodils",
    11,
    "This Morning I Was Gathering Daffodils",
  ),
  fearNot: exhibitionSequence("fear-not", "fear-not", 5, "Fear Not"),
  taste: exhibitionSequence("taste", "taste-and-see", 6, "Taste and See"),
  phase: exhibitionSequence("phase", "phase", 5, "Phase"),
  maria: mariaWorks,
  threshold: sequence("threshold", 3, "Threshold"),
  relative: sequence("relative", 6, "Relative"),
  bodyOfWater: bodyOfWaterWorks,
  selectedWorks: sequence("selected-works", 13, "Selected Works"),
  redThread: redThreadWorks,
  shelter: sequence("shelter", 12, "It Was Shelter Before It Was a Lie"),
  unravel: sequence("unravel", 7, "Unravel"),
};
