"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type EnvironmentKey =
  | "exterior"
  | "vestibule"
  | "gallery"
  | "garden"
  | "quiet"
  | "grotto"
  | "red-water-narthex"
  | "cloisters"
  | "film-room"
  | "exit";

type Environment = {
  src: string;
  gain: number;
  panDepth: number;
};

const ENVIRONMENTS: Record<EnvironmentKey, Environment> = {
  exterior: {
    src: "/media/audio/exterior-new.mp3",
    gain: 0.86,
    panDepth: 0.055,
  },
  vestibule: {
    src: "/media/audio/vestibule.mp3",
    gain: 1.18,
    panDepth: 0.045,
  },
  gallery: {
    src: "/media/audio/front-gallery-back-gallery-current.mp3",
    gain: 0.74,
    panDepth: 0.065,
  },
  garden: {
    src: "/media/audio/garden.mp3",
    // The Garden source is substantially quieter than the other room files.
    // Compensate here rather than altering the source master.
    gain: 1.42,
    panDepth: 0.085,
  },
  quiet: {
    src: "/media/audio/reading-room-index-archive-grotto.mp3",
    gain: 0.72,
    panDepth: 0.04,
  },
  grotto: {
    src: "/media/audio/reading-room-index-archive-grotto.mp3",
    gain: 0.60,
    panDepth: 0.04,
  },
  "red-water-narthex": {
    src: "/media/audio/red-room-water-room-narthex.mp3",
    gain: 0.76,
    panDepth: 0.06,
  },
  cloisters: {
    src: "/media/audio/cloister-new.mp3",
    gain: 0.70,
    panDepth: 0.075,
  },
  "film-room": {
    src: "/media/audio/red-room-water-room-narthex.mp3",
    // Keep the room present but leave headroom for the visitor-started film.
    gain: 0.38,
    panDepth: 0.035,
  },
  exit: {
    src: "/media/video/exterior/exit-01.mp4",
    gain: 0.76,
    panDepth: 0.055,
  },
};

const MASTER_GAIN = 0.48;
const CROSSFADE_SECONDS = 3.4;
const GARDEN_GROTTO_CROSSFADE_SECONDS = 7.5;
const PAN_MOVE_SECONDS = 18;
const UNIFORM_PAN_DEPTH = 0.14;

function transitionDuration(from: EnvironmentKey, to: EnvironmentKey) {
  if (
    (from === "garden" && to === "grotto") ||
    (from === "grotto" && to === "garden")
  ) {
    return GARDEN_GROTTO_CROSSFADE_SECONDS;
  }
  return CROSSFADE_SECONDS;
}

function environmentForPath(pathname: string): EnvironmentKey {
  if (pathname === "/") return "exterior";
  if (pathname.startsWith("/vestibule")) return "vestibule";
  if (pathname.startsWith("/red-room")) return "red-water-narthex";
  if (pathname.startsWith("/water-room")) return "red-water-narthex";
  if (pathname.startsWith("/narthex")) return "red-water-narthex";
  if (pathname.startsWith("/current")) return "gallery";
  if (pathname.startsWith("/cloisters")) return "cloisters";
  if (pathname.startsWith("/film-room")) return "film-room";
  if (pathname.startsWith("/reading-room")) return "quiet";
  if (pathname.startsWith("/index")) return "quiet";
  if (pathname.startsWith("/archive")) return "quiet";
  if (pathname.startsWith("/exit")) return "exit";
  if (pathname.startsWith("/exhibition")) return "gallery";
  return "quiet";
}


function environmentForJump(pathname: string, jumpTarget: string | null): EnvironmentKey | null {
  if (!jumpTarget) return null;

  if (pathname.startsWith("/exhibition")) {
    if (jumpTarget === "relative") return "gallery";
    if (jumpTarget === "garden" || jumpTarget === "fear-not" || jumpTarget === "taste-and-see") return "garden";
    if (jumpTarget === "grotto" || jumpTarget === "a-miscarriage" || jumpTarget === "phase") return "grotto";
    if (jumpTarget === "threshold" || jumpTarget === "threshold-end") return "gallery";
  }

  if (pathname.startsWith("/red-room")) return "red-water-narthex";
  if (pathname.startsWith("/water-room")) return "red-water-narthex";
  return null;
}


function environmentForMapRoom(roomId: string): EnvironmentKey {
  switch (roomId) {
    case "exterior": return "exterior";
    case "vestibule": return "vestibule";
    case "front-gallery":
    case "rear-gallery":
    case "current":
      return "gallery";
    case "garden":
      return "garden";
    case "grotto":
      return "grotto";
    case "red-room":
    case "water-room":
    case "narthex":
      return "red-water-narthex";
    case "cloisters":
      return "cloisters";
    case "film-room":
      return "film-room";
    case "reading-room":
    case "index":
    case "archive":
      return "quiet";
    case "exit-exterior":
      return "exit";
    default:
      return "quiet";
  }
}

export function MuseumAudio() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jumpTarget = searchParams.get("jump");
  const audioRefs = [
    useRef<HTMLAudioElement | null>(null),
    useRef<HTMLAudioElement | null>(null),
  ];
  const contextRef = useRef<AudioContext | null>(null);
  const sourceNodesRef = useRef<Array<MediaElementAudioSourceNode | null>>([null, null]);
  const gainNodesRef = useRef<Array<GainNode | null>>([null, null]);
  const panNodesRef = useRef<Array<StereoPannerNode | null>>([null, null]);
  const masterRef = useRef<GainNode | null>(null);
  const activeIndexRef = useRef<0 | 1>(0);
  const environmentRef = useRef<EnvironmentKey>("exterior");
  const soundOnRef = useRef(false);
  const panTimerRef = useRef<number | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  const ensureGraph = () => {
    if (contextRef.current) return contextRef.current;

    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = MASTER_GAIN;
    master.connect(context.destination);

    audioRefs.forEach((ref, index) => {
      const audio = ref.current;
      if (!audio) return;
      const source = context.createMediaElementSource(audio);
      const gain = context.createGain();
      const pan = context.createStereoPanner();
      gain.gain.value = 0;
      pan.pan.value = 0;
      source.connect(gain);
      gain.connect(pan);
      pan.connect(master);
      sourceNodesRef.current[index] = source;
      gainNodesRef.current[index] = gain;
      panNodesRef.current[index] = pan;
    });

    contextRef.current = context;
    masterRef.current = master;
    return context;
  };

  const schedulePanDrift = (index: 0 | 1, key: EnvironmentKey) => {
    if (panTimerRef.current !== null) {
      window.clearTimeout(panTimerRef.current);
    }

    const context = contextRef.current;
    const panNode = panNodesRef.current[index];
    if (!context || !panNode || !soundOnRef.current) return;

    const depth = UNIFORM_PAN_DEPTH;
    const move = () => {
      if (!soundOnRef.current || activeIndexRef.current !== index) return;
      const now = context.currentTime;
      const target = (Math.random() * 2 - 1) * depth;
      panNode.pan.cancelScheduledValues(now);
      panNode.pan.setValueAtTime(panNode.pan.value, now);
      panNode.pan.linearRampToValueAtTime(target, now + PAN_MOVE_SECONDS);
      panTimerRef.current = window.setTimeout(move, (PAN_MOVE_SECONDS + 5 + Math.random() * 4) * 1000);
    };

    move();
  };

  const transitionTo = async (nextKey: EnvironmentKey, immediate = false) => {
    const previousKey = environmentRef.current;
    environmentRef.current = nextKey;
    if (!soundOnRef.current) return;

    const context = ensureGraph();
    await context.resume();

    const currentIndex = activeIndexRef.current;
    const nextEnvironment = ENVIRONMENTS[nextKey];
    const currentAudio = audioRefs[currentIndex].current;
    const currentGain = gainNodesRef.current[currentIndex];

    if (currentAudio?.src.endsWith(nextEnvironment.src)) {
      const now = context.currentTime;
      currentGain?.gain.cancelScheduledValues(now);
      currentGain?.gain.setTargetAtTime(nextEnvironment.gain, now, 0.35);

      // Shared atmospheres should continue across rooms, but recover cleanly
      // if a route change or browser suspension left the element paused.
      if (currentAudio.paused) {
        try {
          await currentAudio.play();
        } catch {
          soundOnRef.current = false;
          setSoundOn(false);
          return;
        }
      }

      schedulePanDrift(currentIndex, nextKey);
      return;
    }

    const nextIndex = (currentIndex === 0 ? 1 : 0) as 0 | 1;
    const nextAudio = audioRefs[nextIndex].current;
    const nextGain = gainNodesRef.current[nextIndex];
    const nextPan = panNodesRef.current[nextIndex];
    if (!nextAudio || !nextGain) return;

    nextAudio.src = nextEnvironment.src;
    nextAudio.loop = true;
    nextAudio.currentTime = 0;
    nextAudio.preload = "auto";

    const now = context.currentTime;
    nextGain.gain.cancelScheduledValues(now);
    nextGain.gain.setValueAtTime(0, now);
    nextPan?.pan.cancelScheduledValues(now);
    nextPan?.pan.setValueAtTime(0, now);

    try {
      await nextAudio.play();
    } catch {
      soundOnRef.current = false;
      setSoundOn(false);
      return;
    }

    const duration = immediate ? 0.45 : transitionDuration(previousKey, nextKey);
    nextGain.gain.linearRampToValueAtTime(nextEnvironment.gain, now + duration);

    if (currentAudio && currentGain) {
      currentGain.gain.cancelScheduledValues(now);
      currentGain.gain.setValueAtTime(currentGain.gain.value, now);
      currentGain.gain.linearRampToValueAtTime(0, now + duration);
      window.setTimeout(() => {
        currentAudio.pause();
        currentAudio.removeAttribute("src");
        currentAudio.load();
      }, duration * 1000 + 120);
    }

    activeIndexRef.current = nextIndex;
    schedulePanDrift(nextIndex, nextKey);
  };

  const startSound = async () => {
    const context = ensureGraph();
    await context.resume();
    soundOnRef.current = true;
    setSoundOn(true);

    const key = environmentRef.current;
    const index = activeIndexRef.current;
    const audio = audioRefs[index].current;
    const gain = gainNodesRef.current[index];
    const pan = panNodesRef.current[index];
    if (!audio || !gain) return;

    const environment = ENVIRONMENTS[key];
    audio.src = environment.src;
    audio.loop = true;
    audio.currentTime = 0;
    audio.preload = "auto";
    pan?.pan.setValueAtTime(0, context.currentTime);
    gain.gain.setValueAtTime(0, context.currentTime);

    try {
      await audio.play();
      gain.gain.linearRampToValueAtTime(environment.gain, context.currentTime + 0.9);
      schedulePanDrift(index, key);
    } catch {
      soundOnRef.current = false;
      setSoundOn(false);
    }
  };

  const stopSound = () => {
    const context = contextRef.current;
    const now = context?.currentTime ?? 0;
    soundOnRef.current = false;
    setSoundOn(false);

    if (panTimerRef.current !== null) {
      window.clearTimeout(panTimerRef.current);
      panTimerRef.current = null;
    }

    gainNodesRef.current.forEach((gain) => {
      if (!gain || !context) return;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setTargetAtTime(0, now, 0.16);
    });

    window.setTimeout(() => {
      audioRefs.forEach((ref) => ref.current?.pause());
    }, 650);
  };

  useEffect(() => {
    const handleMapAudioRoom = (event: Event) => {
      const customEvent = event as CustomEvent<{ roomId?: string }>;
      const roomId = customEvent.detail?.roomId;
      if (!roomId) return;
      void transitionTo(environmentForMapRoom(roomId));
    };

    window.addEventListener("museum-audio-room", handleMapAudioRoom);
    return () => window.removeEventListener("museum-audio-room", handleMapAudioRoom);
  }, []);

  useEffect(() => {
    const key = environmentForJump(pathname, jumpTarget) ?? environmentForPath(pathname);
    environmentRef.current = key;
    void transitionTo(key);

    if (!pathname.startsWith("/exhibition")) return;

    let frame = 0;
    const updateZone = () => {
      frame = 0;
      const zones = Array.from(
        document.querySelectorAll<HTMLElement>("[data-audio-zone]"),
      );
      if (!zones.length) return;

      const targetY = window.innerHeight * 0.48;
      let best: { key: EnvironmentKey; distance: number } | null = null;

      zones.forEach((zone) => {
        const rect = zone.getBoundingClientRect();
        const key = zone.dataset.audioZone as EnvironmentKey | undefined;
        if (!key) return;

        const distance =
          targetY >= rect.top && targetY <= rect.bottom
            ? 0
            : Math.min(Math.abs(targetY - rect.top), Math.abs(targetY - rect.bottom));

        if (!best || distance < best.distance) best = { key, distance };
      });

      if (best && best.key !== environmentRef.current) {
        void transitionTo(best.key);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateZone);
    };

    const attachZoneTracking = () => {
      updateZone();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    };

    const settleTimer = window.setTimeout(
      attachZoneTracking,
      jumpTarget ? 760 : 0,
    );

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname, jumpTarget]);

  useEffect(() => {
    const resumeIfNeeded = () => {
      if (!soundOnRef.current) return;
      const context = contextRef.current;
      if (context?.state === "suspended") {
        void context.resume().catch(() => undefined);
      }

      const activeAudio = audioRefs[activeIndexRef.current].current;
      if (activeAudio?.paused) {
        void activeAudio.play().catch(() => undefined);
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") resumeIfNeeded();
    };

    window.addEventListener("pageshow", resumeIfNeeded);
    window.addEventListener("focus", resumeIfNeeded);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("pageshow", resumeIfNeeded);
      window.removeEventListener("focus", resumeIfNeeded);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => () => {
    if (panTimerRef.current !== null) window.clearTimeout(panTimerRef.current);
    audioRefs.forEach((ref) => ref.current?.pause());
    void contextRef.current?.close();
  }, []);

  return (
    <>
      <audio ref={audioRefs[0]} aria-hidden="true" />
      <audio ref={audioRefs[1]} aria-hidden="true" />

      {pathname === "/" && !soundOn ? (
        <div className="soundscape-invitation" role="group" aria-label="Optional museum soundscape">
          <p className="soundscape-invitation__eyebrow">Soundscape</p>
          <p className="soundscape-invitation__copy">
            Optional spatial sound accompanies the museum.
          </p>
          <button
            type="button"
            className="soundscape-invitation__button"
            onClick={() => void startSound()}
          >
            Turn on sound
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="ambient-sound-control ambient-sound-control--global"
          onClick={() => {
            if (soundOnRef.current) stopSound();
            else void startSound();
          }}
          aria-pressed={soundOn}
        >
          <span className="ambient-sound-control__icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" focusable="false">
              <path d="M3.5 8h3l3.8-3.2v10.4L6.5 12h-3z" />
              <path d="M13 7.2c1.05.75 1.7 1.7 1.7 2.8s-.65 2.05-1.7 2.8" />
              <path d="M15.2 5.2c1.55 1.3 2.5 2.9 2.5 4.8s-.95 3.5-2.5 4.8" />
            </svg>
          </span>
          <span>{soundOn ? "Sound off" : "Sound"}</span>
        </button>
      )}
    </>
  );
}
