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
  parent?: MuseumRoomId;
  mapRole?: "room" | "nested" | "surrounding";
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
    mapRole: "room",
    circadian: true,
  },
  {
    id: "vestibule",
    title: "Vestibule",
    href: "/vestibule",
    mapGroup: "main",
    showOnMap: true,
    parent: "exterior",
    mapRole: "room",
    audioEnvironment: "vestibule",
    circadian: true,
  },

  // PRIMARY CONTINUOUS ROUTE
  {
    id: "front-gallery",
    title: "Front Gallery",
    href: "/exhibition?jump=relative",
    mapGroup: "main",
    showOnMap: true,
    parent: "vestibule",
    mapRole: "room",
    audioEnvironment: "front-gallery",
  },
  {
    id: "garden",
    title: "Garden",
    href: "/exhibition?jump=garden",
    mapGroup: "main",
    showOnMap: true,
    parent: "front-gallery",
    mapRole: "room",
    audioEnvironment: "garden",
  },
  {
    id: "grotto",
    title: "Grotto",
    href: "/exhibition?jump=grotto",
    mapGroup: "main",
    showOnMap: true,
    parent: "garden",
    mapRole: "room",
    audioEnvironment: "grotto",
  },
  {
    id: "rear-gallery",
    title: "Rear Gallery",
    href: "/exhibition?jump=threshold",
    mapGroup: "main",
    showOnMap: true,
    parent: "grotto",
    mapRole: "room",
    audioEnvironment: "rear-gallery",
  },

  // SIDE WINGS FROM THE VESTIBULE
  {
    id: "red-room",
    title: "Red Room",
    href: "/red-room?jump=red-room-start",
    mapGroup: "red",
    showOnMap: true,
    parent: "vestibule",
    mapRole: "room",
    audioEnvironment: "red-room",
  },
  {
    id: "water-room",
    title: "Water Room",
    href: "/water-room?jump=water-room-start",
    mapGroup: "water",
    showOnMap: true,
    parent: "vestibule",
    mapRole: "room",
    audioEnvironment: "water-room",
  },
  {
    id: "film-room",
    title: "Film Room",
    href: "/film-room",
    mapGroup: "water",
    showOnMap: true,
    parent: "water-room",
    mapRole: "nested",
    audioEnvironment: "film-room",
  },
  {
    id: "current",
    title: "Current",
    href: "/current",
    mapGroup: "current",
    showOnMap: true,
    parent: "vestibule",
    mapRole: "room",
    audioEnvironment: "current",
  },

  // THE CLOISTERS SURROUND THE INNER GARDEN / GROTTO PATH.
  // They remain discoverable from the Map rather than ordinary Index navigation.
  {
    id: "cloisters",
    title: "Cloisters",
    href: "/cloisters",
    mapGroup: "main",
    showOnMap: true,
    parent: "garden",
    mapRole: "surrounding",
    audioEnvironment: "cloisters",
    circadian: true,
  },

  // TERMINAL INFORMATIONAL / NAVIGATION SPACE
  {
    id: "narthex",
    title: "Narthex",
    href: "/narthex?arrived=1",
    mapGroup: "narthex",
    showOnMap: true,
    parent: "rear-gallery",
    mapRole: "room",
    audioEnvironment: "narthex",
    circadian: true,
  },
  {
    id: "reading-room",
    title: "Reading Room",
    href: "/reading-room",
    mapGroup: "narthex",
    showOnMap: true,
    parent: "narthex",
    mapRole: "nested",
  },
  {
    id: "index",
    title: "Index",
    href: "/directory",
    mapGroup: "narthex",
    showOnMap: true,
    parent: "narthex",
    mapRole: "nested",
  },
  {
    id: "archive",
    title: "Archive",
    href: "/archive",
    mapGroup: "narthex",
    showOnMap: true,
    parent: "narthex",
    mapRole: "nested",
  },

  {
    id: "exit-exterior",
    title: "Exit",
    href: "/exit",
    mapGroup: "exterior",
    showOnMap: true,
    parent: "narthex",
    mapRole: "room",
    circadian: true,
  },
];

export const museumCollections: MuseumCollection[] = [
  {
    id: "relative",
    title: "Relative",
    href: "/exhibition?jump=relative",
    room: "front-gallery",
    showInIndex: true,
  },
  {
    id: "daffodils",
    title: "This Morning I Was Gathering Daffodils",
    href: "/exhibition?jump=garden",
    room: "garden",
    showInIndex: true,
  },
  {
    id: "fear-not",
    title: "Fear Not",
    href: "/exhibition?jump=fear-not",
    room: "garden",
    showInIndex: true,
  },
  {
    id: "taste-and-see",
    title: "Taste and See",
    href: "/exhibition?jump=taste-and-see",
    room: "garden",
    showInIndex: true,
  },
  {
    id: "miscarriage",
    title: "A Miscarriage",
    href: "/exhibition?jump=a-miscarriage",
    room: "grotto",
    showInIndex: true,
  },
  {
    id: "phase",
    title: "Phase",
    href: "/exhibition?jump=phase",
    room: "grotto",
    showInIndex: true,
  },
  {
    id: "threshold",
    title: "Threshold",
    href: "/exhibition?jump=threshold",
    room: "rear-gallery",
    showInIndex: true,
  },
  {
    id: "red-thread",
    title: "Red Thread",
    href: "/red-room?jump=red-thread",
    room: "red-room",
    showInIndex: true,
  },
  {
    id: "membrane",
    title: "Membrane",
    href: "/red-room?jump=membrane",
    room: "red-room",
    showInIndex: true,
  },
  {
    id: "body-of-water",
    title: "Body of Water",
    href: "/water-room?jump=water-room-start",
    room: "water-room",
    showInIndex: true,
  },
];

export const mapRooms = museumRooms.filter((room) => room.showOnMap);

export const indexedCollections = museumCollections.filter(
  (collection) => collection.showInIndex,
);
