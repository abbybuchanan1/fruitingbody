export type Artwork = {
  src: string;
  alt: string;
  title?: string;
};

export type RelativePair = {
  id: string;
  a: Artwork;
  b: Artwork;
  layout:
    | "side-by-side"
    | "stagger-a"
    | "stagger-b"
    | "wide"
    | "stacked";
};

export type ThresholdPair = {
  id: string;
  a: Artwork;
  b: Artwork;
};


/*
  Existing archive / prototype sequences.

  These continue using the original numbered WebP files
  where we have not yet replaced them with canonical
  exhibition JPG exports.
*/

function sequence(
  slug: string,
  count: number,
  title: string
): Artwork[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/art/${slug}/${String(i + 1).padStart(2, "0")}.webp`,
    alt: `${title}, work ${
      i + 1
    }. Provisional image description; final curatorial alt text pending.`,
  }));
}


/*
  Current canonical exhibition sequences.

  These use the newly exported JPG files whose filenames
  include the series name.
*/

function exhibitionSequence(
  folder: string,
  filename: string,
  count: number,
  title: string
): Artwork[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/art/${folder}/${filename}-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `${title}, work ${
      i + 1
    }. Provisional image description; final curatorial alt text pending.`,
  }));
}


/* ========================================

   A MISCARRIAGE — CANONICAL EXHIBITION EDIT

   ======================================== */

/*
  A Miscarriage is intentionally handled
  explicitly rather than generated automatically.

  These are the only individual works in the
  current museum sequence whose titles will be
  displayed with the photographs.

  Filename order = exhibition order.
*/

export const miscarriageWorks: Artwork[] = [
  {
    src: "/art/miscarriage/miscarriage-stay-01.jpg",
    title: "Stay",
    alt: "A Miscarriage, Stay. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/miscarriage/miscarriage-want-02.jpg",
    title: "Want",
    alt: "A Miscarriage, Want. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/miscarriage/miscarriage-slide-03.jpg",
    title: "Slide",
    alt: "A Miscarriage, Slide. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/miscarriage/miscarriage-follicle-portal-drain-04a.jpg",
    title: "Follicle, Portal, Drain",
    alt: "A Miscarriage, Follicle, Portal, Drain. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/miscarriage/miscarriage-drift-05.jpg",
    title: "Drift",
    alt: "A Miscarriage, Drift. Provisional curatorial alt text pending.",
  },
];

/* ========================================

   RELATIVE — CANONICAL DIPTYCH EDIT

   ======================================== */

/*
  A and B always remain one conceptual unit.

  Layout controls installation geometry only;
  it never breaks the pair apart.
*/

export const relativePairs: RelativePair[] = [
  {
    id: "01",

    a: {
      src: "/art/relative/relative-01A.jpg",
      alt: "Relative, pair 01, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/relative/relative-01B.jpg",
      alt: "Relative, pair 01, image B. Provisional curatorial alt text pending.",
    },

    layout: "side-by-side",
  },


  {
    id: "02",

    a: {
      src: "/art/relative/relative-02A.jpg",
      alt: "Relative, pair 02, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/relative/relative-02B.jpg",
      alt: "Relative, pair 02, image B. Provisional curatorial alt text pending.",
    },

    layout: "stagger-b",
  },


  {
    id: "05",

    a: {
      src: "/art/relative/relative-05A.jpg",
      alt: "Relative, pair 05, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/relative/relative-05B.jpg",
      alt: "Relative, pair 05, image B. Provisional curatorial alt text pending.",
    },

    layout: "side-by-side",
  },


  {
    id: "04",

    a: {
      src: "/art/relative/relative-04A.jpg",
      alt: "Relative, pair 04, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/relative/relative-04B.jpg",
      alt: "Relative, pair 04, image B. Provisional curatorial alt text pending.",
    },

    layout: "stagger-a",
  },


  {
    id: "10",

    a: {
      src: "/art/relative/relative-10A.jpg",
      alt: "Relative, pair 10, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/relative/relative-10B.jpg",
      alt: "Relative, pair 10, image B. Provisional curatorial alt text pending.",
    },

    layout: "side-by-side",
  },


  {
    id: "06",

    a: {
      src: "/art/relative/relative-06A.jpg",
      alt: "Relative, pair 06, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/relative/relative-06B.jpg",
      alt: "Relative, pair 06, image B. Provisional curatorial alt text pending.",
    },

    layout: "stagger-b",
  },


  {
    id: "07",

    a: {
      src: "/art/relative/relative-07A.jpg",
      alt: "Relative, pair 07, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/relative/relative-07B.jpg",
      alt: "Relative, pair 07, image B. Provisional curatorial alt text pending.",
    },

    layout: "side-by-side",
  },


  {
    id: "09",

    a: {
      src: "/art/relative/relative-09A.jpg",
      alt: "Relative, pair 09, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/relative/relative-09B.jpg",
      alt: "Relative, pair 09, image B. Provisional curatorial alt text pending.",
    },

    layout: "stacked",
  },
];


/* ========================================

   THRESHOLD — CANONICAL DIPTYCH EDIT

   ======================================== */

/*
  Threshold remains organized as three diptychs.

  A and B remain one conceptual unit, just as
  they do in Relative, although Threshold will
  have its own installation geometry.
*/

export const thresholdPairs: ThresholdPair[] = [
  {
    id: "01",

    a: {
      src: "/art/threshold/threshold-01A.jpg",
      alt: "Threshold, pair 01, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/threshold/threshold-01B.jpg",
      alt: "Threshold, pair 01, image B. Provisional curatorial alt text pending.",
    },
  },


  {
    id: "02",

    a: {
      src: "/art/threshold/threshold-02A.jpg",
      alt: "Threshold, pair 02, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/threshold/threshold-02B.jpg",
      alt: "Threshold, pair 02, image B. Provisional curatorial alt text pending.",
    },
  },


  {
    id: "03",

    a: {
      src: "/art/threshold/threshold-03A.jpg",
      alt: "Threshold, pair 03, image A. Provisional curatorial alt text pending.",
    },

    b: {
      src: "/art/threshold/threshold-03B.jpg",
      alt: "Threshold, pair 03, image B. Provisional curatorial alt text pending.",
    },
  },
];

/* ========================================

   MEMBRANE — RED ROOM EXHIBITION EDIT

   ======================================== */

/*
  Explicit sequence because the canonical filenames
  intentionally preserve their selected image numbers.

  Current order:
  01 → 02 → 03 → 04 → 06 → 07
*/

export const membraneWorks: Artwork[] = [
  {
    src: "/art/membrane/membrane-01.jpg",
    alt: "Membrane, work 1. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/membrane/membrane-02.jpg",
    alt: "Membrane, work 2. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/membrane/membrane-03.jpg",
    alt: "Membrane, work 3. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/membrane/membrane-04.jpg",
    alt: "Membrane, work 4. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/membrane/membrane-06.jpg",
    alt: "Membrane, work 5. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/membrane/membrane-07.jpg",
    alt: "Membrane, work 6. Provisional curatorial alt text pending.",
  },
];
/* ========================================

   RED THREAD — RED ROOM EXHIBITION EDIT

   ======================================== */

/*
  Canonical ten-image Red Thread sequence.

  The filenames preserve the final exhibition order.
  This curated sequence incorporates work originating
  in Red Thread, Shelter, and Unravel as one work.
*/

export const redThreadWorks: Artwork[] = [
  {
    src: "/art/red-thread/red-thread-01.jpg",
    alt: "Red Thread, work 1. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/red-thread/red-thread-02.jpg",
    alt: "Red Thread, work 2. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/red-thread/red-thread-03.jpg",
    alt: "Red Thread, work 3. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/red-thread/red-thread-04.jpg",
    alt: "Red Thread, work 4. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/red-thread/red-thread-05.jpg",
    alt: "Red Thread, work 5. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/red-thread/red-thread-06.jpg",
    alt: "Red Thread, work 6. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/red-thread/red-thread-07.jpg",
    alt: "Red Thread, work 7. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/red-thread/red-thread-08.jpg",
    alt: "Red Thread, work 8. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/red-thread/red-thread-09.jpg",
    alt: "Red Thread, work 9. Provisional curatorial alt text pending.",
  },

  {
    src: "/art/red-thread/red-thread-10.jpg",
    alt: "Red Thread, work 10. Provisional curatorial alt text pending.",
  },
];
/* ========================================

   ARTWORK SETS

   ======================================== */

export const artworkSets = {
  membrane: membraneWorks,


  /*
    Canonical Grotto exhibition edit.

    A Miscarriage uses explicit titled works.
  */

  miscarriage: miscarriageWorks,


  /*
    Current Garden exhibition edits.
  */

  daffodils: exhibitionSequence(
    "daffodils",
    "daffodils",
    11,
    "This Morning I Was Gathering Daffodils"
  ),

  fearNot: exhibitionSequence(
    "fear-not",
    "fear-not",
    5,
    "Fear Not"
  ),

  taste: exhibitionSequence(
    "taste",
    "taste-and-see",
    6,
    "Taste and See"
  ),


  /*
    Canonical Grotto Phase edit.

    The current exhibition contains five JPGs.
  */

  phase: exhibitionSequence(
    "phase",
    "phase",
    5,
    "Winter / Phase"
  ),


  maria: sequence(
    "maria",
    5,
    "Maria Burns Her Wedding Dress"
  ),


  /*
    Legacy Threshold sequence remains available
    temporarily for any older prototype route.

    The new continuous exhibition will use
    thresholdPairs above instead.
  */

  threshold: sequence(
    "threshold",
    3,
    "Threshold"
  ),


  /*
    Legacy Relative sequence remains available
    for older collection/prototype code.

    The museum Relative installation uses
    relativePairs above.
  */

  relative: sequence(
    "relative",
    6,
    "Relative"
  ),


  bodyOfWater: sequence(
    "body-of-water",
    7,
    "Body of Water"
  ),

  selectedWorks: sequence(
    "selected-works",
    13,
    "Selected Works"
  ),

  redThread: redThreadWorks,

  shelter: sequence(
    "shelter",
    12,
    "It Was Shelter Before It Was a Lie"
  ),

  unravel: sequence(
    "unravel",
    7,
    "Unravel"
  ),
};