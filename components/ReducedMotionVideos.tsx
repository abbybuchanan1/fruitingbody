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

    // Catch every film the moment it starts, including ones a room starts
    // later (crossfading loops call play() again on their own).
    const onPlay = (event: Event) => {
      const video = event.target;
      if (query.matches && video instanceof HTMLVideoElement && ambient(video)) video.pause();
    };

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
    query.addEventListener("change", onChange);
    holdAll();
    return () => {
      document.removeEventListener("play", onPlay, true);
      query.removeEventListener("change", onChange);
    };
  }, []);

  return null;
}
