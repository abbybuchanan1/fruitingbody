export type MuseumRoomId =
  | "exterior"
  | "vestibule"
  | "front-gallery"
  | "garden"
  | "grotto"
  | "rear-gallery"
  | "red-room"
  | "water-room"
  | "film-room"
  | "current"
  | "narthex"
  | "reading-room"
  | "index"
  | "archive"
  | "cloisters"
  | "exit-exterior";

export type MuseumRoom = {
  id: MuseumRoomId;
  title: string;
  href: string;
  mapGroup:
    | "exterior"
    | "main"
    | "red"
    | "water"
    | "current"
    | "narthex"
    | "hidden";
  showOnMap: boolean;
  audioEnvironment?: string;
  circadian?: boolean;
};

export type MuseumCollection = {
  id: string;
  title: string;
  href: string;
  room: MuseumRoomId;
  showInIndex: boolean;
};

export const museumRooms: MuseumRoom[] = [
  {
    id: "exterior",
    title: "Exterior",
    href: "/",
    mapGroup: "exterior",
    showOnMap: true,
    circadian: true,
  },
  {
    id: "vestibule",
    title: "Vestibule",
    href: "/vestibule",
    mapGroup: "main",
    showOnMap: true,
    audioEnvironment: "vestibule",
    circadian: true,
  },

  // MAIN SPINE
  {
    id: "front-gallery",
    title: "Front Gallery",
    href: "/exhibition#relative",
    mapGroup: "main",
    showOnMap: true,
    audioEnvironment: "front-gallery",
  },
  {
    id: "garden",
    title: "Garden",
    href: "/exhibition#garden",
    mapGroup: "main",
    showOnMap: true,
    audioEnvironment: "garden",
  },
  {
    id: "grotto",
    title: "Grotto",
    href: "/exhibition#grotto",
    mapGroup: "main",
    showOnMap: true,
    audioEnvironment: "grotto",
  },
  {
    id: "rear-gallery",
    title: "Rear Gallery",
    href: "/exhibition#threshold",
    mapGroup: "main",
    showOnMap: true,
    audioEnvironment: "rear-gallery",
  },

  // SIDE WINGS
  {
    id: "red-room",
    title: "Red Room",
    href: "/red-room",
    mapGroup: "red",
    showOnMap: true,
    audioEnvironment: "red-room",
  },
  {
    id: "water-room",
    title: "Water Room",
    href: "/water-room",
    mapGroup: "water",
    showOnMap: true,
    audioEnvironment: "water-room",
  },
  {
    id: "film-room",
    title: "Film Room",
    href: "/film-room",
    mapGroup: "water",
    showOnMap: true,
    audioEnvironment: "film-room",
  },
  {
    id: "current",
    title: "Current",
    href: "/current",
    mapGroup: "current",
    showOnMap: true,
    audioEnvironment: "current",
  },

  // NARTHEX + REFERENCE SPACES
  {
    id: "narthex",
    title: "Narthex",
    href: "/narthex",
    mapGroup: "narthex",
    showOnMap: true,
    audioEnvironment: "narthex",
    circadian: true,
  },
  {
    id: "reading-room",
    title: "Reading Room",
    href: "/reading-room",
    mapGroup: "narthex",
    showOnMap: true,
  },
  {
    id: "index",
    title: "Index",
    href: "/index",
    mapGroup: "narthex",
    showOnMap: true,
  },
  {
    id: "archive",
    title: "Archive",
    href: "/archive",
    mapGroup: "narthex",
    showOnMap: true,
  },

  // MAP-ONLY RESPITE
  {
    id: "cloisters",
    title: "Cloisters",
    href: "/cloisters",
    mapGroup: "hidden",
    showOnMap: true,
    audioEnvironment: "cloisters",
    circadian: true,
  },

  // POSSIBLE REAR EXTERIOR
  {
    id: "exit-exterior",
    title: "Exterior",
    href: "/exit",
    mapGroup: "exterior",
    showOnMap: false,
    circadian: true,
  },
];

export const museumCollections: MuseumCollection[] = [
  {
    id: "relative",
    title: "Relative",
    href: "/exhibition#relative",
    room: "front-gallery",
    showInIndex: true,
  },
  {
    id: "daffodils",
    title: "This Morning I Was Gathering Daffodils",
    href: "/exhibition#garden",
    room: "garden",
    showInIndex: true,
  },
  {
    id: "fear-not",
    title: "Fear Not",
    href: "/exhibition#garden",
    room: "garden",
    showInIndex: true,
  },
  {
    id: "taste-and-see",
    title: "Taste and See",
    href: "/exhibition#garden",
    room: "garden",
    showInIndex: true,
  },
  {
    id: "miscarriage",
    title: "A Miscarriage",
    href: "/exhibition#grotto",
    room: "grotto",
    showInIndex: true,
  },
  {
    id: "phase",
    title: "Phase",
    href: "/exhibition#grotto",
    room: "grotto",
    showInIndex: true,
  },
  {
    id: "threshold",
    title: "Threshold",
    href: "/exhibition#threshold",
    room: "rear-gallery",
    showInIndex: true,
  },
  {
    id: "red-thread",
    title: "Red Thread",
    href: "/red-room#red-thread",
    room: "red-room",
    showInIndex: true,
  },
  {
    id: "membrane",
    title: "Membrane",
    href: "/red-room#membrane",
    room: "red-room",
    showInIndex: true,
  },
  {
    id: "body-of-water",
    title: "Body of Water",
    href: "/water-room",
    room: "water-room",
    showInIndex: true,
  },
];

export const mapRooms = museumRooms.filter((room) => room.showOnMap);

export const indexedCollections = museumCollections.filter(
  (collection) => collection.showInIndex
);