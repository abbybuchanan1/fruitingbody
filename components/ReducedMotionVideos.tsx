"use client";

import { useEffect } from "react";

// For visitors who ask their device for less motion: the films that play on
// their own as part of the rooms (the Entrance and Vestibule projections, the
// Narthex, Cloisters and Courtyard films, the glimpses and passages) hold
// still on their current frame instead of playing. Films the visitor starts
// themselves, with controls (the Film Room, the Archive), are left alone.
// No new controls: the visitor's own setting is the switch.
export function ReducedMotionVideos() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ambient = (video: HTMLVideoElement) => !video.controls;

    const holdAll = () => {
      if (!query.matches) return;
      document.querySelectorAll("video").forEach((video) => {
        if (ambient(video) && !video.paused) video.pause();
      });
    };

    // The room films are silent: the rooms' sound comes from the museum's own
    // audio. React does not always carry the "muted" attribute onto the
    // element, and a browser that trusts this site may then play a looping
    // film with its soundtrack under every room. Mute each one as it
    // appears and again whenever it starts.
    const silence = (video: HTMLVideoElement) => {
      if (!ambient(video)) return;
      video.defaultMuted = true;
      if (!video.muted) video.muted = true;
    };
    const silenceAll = () => document.querySelectorAll("video").forEach(silence);

    // Catch every film the moment it starts, including ones a room starts
    // later (crossfading loops call play() again on their own).
    const onPlay = (event: Event) => {
      const video = event.target;
      if (!(video instanceof HTMLVideoElement)) return;
      silence(video);
      if (query.matches && ambient(video)) video.pause();
    };
    const onLoad = (event: Event) => {
      if (event.target instanceof HTMLVideoElement) silence(event.target);
    };
    const observer = new MutationObserver(silenceAll);
    observer.observe(document.body, { childList: true, subtree: true });
    silenceAll();

    // Turning the setting off again lets the rooms carry on.
    const onChange = () => {
      if (query.matches) {
        holdAll();
        return;
      }
      document.querySelectorAll("video").forEach((video) => {
        if (ambient(video) && video.paused && video.autoplay) void video.play().catch(() => undefined);
      });
    };

    document.addEventListener("play", onPlay, true);
    document.addEventListener("playing", onPlay, true);
    document.addEventListener("loadstart", onLoad, true);
    query.addEventListener("change", onChange);
    holdAll();
    return () => {
      observer.disconnect();
      document.removeEventListener("play", onPlay, true);
      document.removeEventListener("playing", onPlay, true);
      document.removeEventListener("loadstart", onLoad, true);
      query.removeEventListener("change", onChange);
    };
  }, []);

  return null;
}
