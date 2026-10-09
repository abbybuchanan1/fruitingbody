// Interpretive questions ("WHAT BINDS US?") under each wall text.
// Off for launch. Set to true to bring them back everywhere at once;
// the questions themselves are still stored with each work in lib/works.ts.
export const showInterpretiveQuestions = false;

export const artistStatement = [
  "I use self-portraiture to investigate what it means to inhabit a body that is singular and also embedded in larger systems: ecological, relational, biological, inherited, and temporal.",
  "Across the work, the body becomes landscape, threshold, archive, membrane, and site of encounter. Identity is not fixed here. It forms, dissolves, and reorganizes through contact with water and land, myth, cloth and ritual objects, grief, desire, lineage, and time.",
  "I return often to agency inside conditions that cannot be fully controlled. Agency may look like choosing, witnessing, tending, or deciding how to inhabit what cannot simply be escaped. Myth gives me a structure for entering those questions without turning the photographs into illustrations of a story.",
  "Landscape works in a similar way. Bodies and landscapes are shaped by many of the same processes: gravity, erosion, growth, permeability, decay, and seasonal change. I think of that relationship as kinship.",
  "Making these photographs has paralleled my own movement toward a more integrated sense of self, one that can hold motherhood, neurodivergence, artistic practice, and repeated cycles of descent and emergence without needing them to resolve into one stable version of me.",
];

export const processStatement = [
  "Each body of work usually begins with a question, a physical state, or something I can’t quite reach through language. I carry it into a material, a place, a gesture, or a repeated action, and let my body enter it first.",
  "Posing for the camera made me so self-conscious I could barely work. I found my stride when I began treating each shoot as a moving meditation: a real-time exploration of an idea through materials and surroundings.",
  "I rarely previsualize individual photographs. I often use video, burst capture, or rapid sequences so the encounter can keep moving without stopping to compose each frame. The camera acts as both mirror and witness. It records what I am doing and returns something I couldn’t fully perceive from inside the experience.",
  "Selection comes afterward. Looking through the images often tells me things I didn’t know while I was making them. The photographs become traces of the encounter and a way of discovering what happened there.",
  "Most images are minimally edited. When blur, distortion, light leaks, reflections, or other accidents belong to the inquiry, I keep them as they were captured. The Fall is a frame from the moment I knocked over my tripod mid-shoot. I hadn’t known how to make an image of Persephone’s descent; looking back through the footage, this frame held the instability of that moment exactly, and I loved that its title became true in more ways than one.",
  "Body of Water is the exception, with more extensive editing of light, contrast, and sharpness.",
  "A Miscarriage and Phase were made with tintype-style editing techniques I learned from photographer Catherine Just.",
  "Hades and The Return, from This Morning I Was Gathering Daffodils, are digital collages built from my own photographic footage. Their color and tone draw on Renaissance and Baroque painting.",
];

export const fruitingBodyStatement = [
  "Fruiting Body is an evolving digital exhibition and archive of my photographic work and poetry.",
  "A fruiting body is the visible, temporary structure through which a larger living system emerges. I think of the works the same way: individual manifestations of longer processes of embodiment, memory, ecology, relationship, and change.",
  "The museum is organized by theme, visual form, and states of transformation rather than chronology. Bodies, landscapes, water, thresholds, cycles, and acts of witnessing return across projects made at different times and under different circumstances.",
  "The site lets each body of work stay distinct while making their deeper relationships visible.",
];

export const artistBio = [
  "Abby Buchanan is a photographic artist based in Portland, Oregon, working primarily in self-portraiture.",
  "After two decades as a licensed massage therapist and bodyworker, she began using photography as a form of embodied inquiry. Her work draws on motherhood, neurodivergence, myth, and the natural world.",
];

// CV — newest first within each section. Add sections (Exhibitions,
// Publications) as they happen; empty headings are left out on purpose.
export const artistCv: Array<{ heading: string; entries: Array<{ year: string; text: string }> }> = [
  {
    heading: "Education",
    entries: [
      { year: "2026", text: "Certificate in User Experience Design, Cornell University, through eCornell" },
      { year: "2005", text: "B.M. in Music Composition, minor in Music Technology, Oral Roberts University, Tulsa, Oklahoma" },
    ],
  },
  {
    heading: "Training",
    entries: [
      { year: "2022", text: "The Art of Candid Photography: Shoot Like a Pro With Any Camera, Greg Williams" },
      { year: "2017", text: "Self-Portraiture as Medicine, Catherine Just" },
    ],
  },
  {
    heading: "Licensure",
    entries: [
      { year: "2010–2020", text: "Licensed Massage Therapist, State of Oregon" },
      { year: "1999–2010", text: "Licensed Massage Therapist, State of Texas" },
    ],
  },
];

export const reflections: Record<string, string[]> = {
  phase: [
    "These images began as synesthetic translations of emotional states experienced during the winter of 2024. For much of my life, an emotional state could feel total: not I feel hopeless, but I am hopelessness.",
    "This series marks a shift toward distance without disavowal: I am experiencing hopelessness. The photographs stay with the unstable interval where one state has loosened and another has not yet become recognizable. Winter keeps only what survives the cold.",
  ],
  relative: [
    "The series was first called My Body Is the Land I’m From. It began with the thought that our bodies may be the only land we can ever actually own, even if only temporarily before they change shape again. They are the one place we inhabit from the inside, and therefore something we are responsible for tending. I was also reckoning with years of body shame and dysmorphia. Seeing waistbands as sediment lines, stretch marks as bark, and skin as terrain gave me another way to look.",
    "Over time the pairing became more literal to me. Body and land are both shaped by pressure, weather, history, use, repair, gravity, and time. The photographs place them beside one another as related material.",
  ],
  daffodils: [
    "I came to Persephone as a way to think about power inside a cycle that cannot simply be escaped. Her movement between worlds is imposed and inhabited at the same time. That led to an exploration of what it might look like to find agency within circumstances we cannot fully control.",
    "The phrase “powerful and powerless” gave me a way to stay inside the tension without resolving it into victimhood or triumph.",
    "“(Persephone) was winter, she was spring. When she ascended, the world awoke. When she descended, it lamented. She left; she returned. One year. Fifty. Five hundred. Forever. Powerful and powerless was she.” — Pádraig Ó Tuama, In a Garden by a Gate",
  ],
  miscarriage: [
    "At the time, I was documenting a real miscarriage as it was happening. I was not thinking about portals or interrupted becoming. I was trying to witness myself inside an experience I could barely understand while I was living it.",
    "The camera gave me a small amount of distance. I think part of that distance was protective: I could be the person in the experience and, for moments, also the observer of it. Much of what I now understand about the work came years later.",
  ],
  "body-of-water": [
    "Body of Water first emerged as an extension of My Body Is the Land I’m From. I entered the water still thinking about the body and landscape as parts of the same living system.",
    "Once I began working in water, the terms of the work changed. Water stopped functioning as setting and became a condition the body had to enter: permeability, movement, buoyancy, exchange, surrender, response. There is pleasure in that surrender for me—not as display, but in the bodily experience of no longer resisting every force acting on me.",
  ],
  "red-thread": [
    "The current Red Thread edit brings together work originally developed across three related series: Red Thread, It Was Shelter Before It Was a Lie, and Unravel.",
    "Across them, connection persists as visible tension. Thread binds and traces. Protection hardens into identity. Blur and movement loosen the figure. Seen together, the three bodies move through entanglement, shelter, release, and becoming.",
  ],
  threshold: [
    "Threshold began with the feeling of being between lives: no longer inside the former shape, not yet able to see the next one clearly. I wanted to stay with that middle long enough to see what it actually felt like.",
    "As I worked, anatomy began behaving like architecture. Folds became passages, openings became rooms, and the body became a spatial boundary that could be approached from either side.",
  ],
  "fear-not": [
    "Fear Not began with Eve and with curiosity. I kept returning to the fact that a woman choosing to open her own eyes is so often framed as the beginning of ruin.",
    "In these photographs, curiosity becomes an action: reaching, tasting, seeing, and accepting that what is seen changes the one who sees it. Fear can still be present. The body moves anyway.",
  ],
  "taste-and-see": [
    "The first images began with Venus imagery and the long visual history of arranging feminine beauty for a viewer. Appetite gradually moved to the center of the work.",
    "Honey, flowers, anointing, pleasure, and excess let the body become an experiencing subject. Beauty could include hunger. The body could be seen and still be allowed to want.",
  ],
  membrane: [
    "Membrane was the first work I made in the river using the process that now underlies much of my practice: carrying something into the water, moving with a material, and letting video frames or a fast shutter reveal what I could not previsualize.",
    "I remember the mist of river water coming through the fabric and the warmth of the sun on my body. I walked out of the river understanding that the experience itself could be the site of the photograph, and that photography might be able to carry things I had not been able to communicate in another form.",
  ],
  maria: [
    "My dear friend Maria invited me to witness a ritual she created. I did not direct her or arrange any part of it. My role was to stay present and make photographs without interrupting what was unfolding.",
  ],
};
