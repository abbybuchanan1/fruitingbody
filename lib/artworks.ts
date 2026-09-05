export type Artwork = {
  src: string;
  alt: string;
};

function sequence(slug: string, count: number, title: string): Artwork[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/art/${slug}/${String(i + 1).padStart(2, "0")}.webp`,
    alt: `${title}, work ${i + 1}. Provisional image description; final curatorial alt text pending.`,
  }));
}

export const artworkSets = {
  membrane: sequence("membrane", 6, "Membrane"),
  miscarriage: sequence("miscarriage", 6, "A Miscarriage"),
  daffodils: sequence("daffodils", 6, "This Morning I Was Gathering Daffodils"),
  phase: sequence("phase", 8, "Winter / Phase"),
  maria: sequence("maria", 5, "Maria Burns Her Wedding Dress"),
  taste: sequence("taste", 11, "Taste and See"),
  fearNot: sequence("fear-not", 11, "Fear Not"),
  threshold: sequence("threshold", 3, "Threshold"),
  relative: sequence("relative", 6, "Relative"),
  bodyOfWater: sequence("body-of-water", 7, "Body of Water"),
  selectedWorks: sequence("selected-works", 13, "Selected Works"),
  redThread: sequence("red-thread", 18, "Red Thread"),
  shelter: sequence("shelter", 12, "It Was Shelter Before It Was a Lie"),
  unravel: sequence("unravel", 7, "Unravel"),
};
