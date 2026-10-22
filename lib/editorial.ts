// Interpretive questions ("WHAT BINDS US?") under each wall text.
// Off for launch. Set to true to bring them back everywhere at once;
// the questions themselves are still stored with each work in lib/works.ts.
export const showInterpretiveQuestions = false;

export const artistStatement = [
  "I make self-portraits to understand what it’s like to live in one body that is also part of something larger: the land, the people I love, what I’ve inherited, and time.",
  "In the photographs my body becomes landscape, and sometimes a membrane, a place where things meet. Water, cloth, myth, and grief leave their marks, and who I am shifts with them.",
  "Much of the work is about agency inside conditions I can’t control. Sometimes that means choosing. Sometimes it means witnessing, tending, or deciding how to live inside what I can’t leave. Myth gives me a way into those questions without turning the photographs into illustrations of a story.",
  "Bodies and landscapes are shaped by the same slow forces, like erosion and growth. I think of that as kinship.",
  "Making this work has given me a more solid sense of self, one that can hold motherhood, neurodivergence, art, and my cycles of descent and emergence. Part of my nature is that I’m always changing, and I’m learning to come home to that.",
  "I hope it leaves you more curious about yourself, and less alone.",
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
  "Abby Buchanan is an interdisciplinary artist based in Portland, Oregon, working primarily in self-portrait photography, alongside film, sound and writing.",
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
    "These images began as synesthetic translations of emotional states I lived through in the winter of 2024. For much of my life, an emotional state could feel total. Not I feel hopeless, but I am hopelessness.",
    "This series marks a shift toward distance without disavowal. What if an emotional state is weather moving across me, rather than the ground I stand on?",
    "The photographs stay with the unstable interval, after one state has loosened and before the next has become recognizable.",
  ],
  relative: [
    "The series was first called My Body Is the Land I’m From. It began with a thought: our bodies may be the only land we ever truly own, and even then only for a while, before they change shape again. My body is my home, and land that is mine to steward for as long as I have it.",
    "After years of body shame and dysmorphia, that idea shifted something that had been stuck for a very long time. Seeing waistbands as sediment lines, stretch marks as bark, and skin as terrain gave me another way to look.",
    "Over time the pairing became more literal. Body and land are both shaped by weather, use, repair, and time. The photographs place them side by side as related material.",
  ],
  daffodils: [
    "I came to Persephone as a way to think about power inside a cycle that can’t simply be escaped. Her movement between worlds is imposed and inhabited at the same time. She didn’t choose the descent. But some tellings say she chose the pomegranate.",
    "That is the line I keep tracing in my own life: what is mine to control and what isn’t. Bodies, seasons and circumstances change without asking. What I can shape is my response, my choices and the frameworks I use to make meaning.",
    "The phrase “powerful and powerless” gave me a way to stay inside that tension without resolving it into victimhood or triumph.",
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
    "Threshold began with the sense that my body is itself a threshold. Light comes through my skin the color of blood. My mouth breaks the surface of the water to breathe. Each pair holds two edges: the skin between blood and water, and the waterline between water and air. I feel them spiritually as well. They are doorways.",
    "As I worked, anatomy began behaving like architecture. Folds became passages, openings became rooms, and the body became a spatial boundary that could be approached from either side.",
  ],
  "fear-not": [
    "Fear Not began with Lilith and Eve. I kept coming back to the old warning that ruin awaits the woman who opens her own eyes.",
    "In these photographs curiosity is something the body does: reaching, tasting, looking, and letting what I see change me. The body moves through fear into knowing.",
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
