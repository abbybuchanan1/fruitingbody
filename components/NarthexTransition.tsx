"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Source = "red-room" | "water-room" | "exhibition";
type Props = { from: Source; startImmediately?: boolean; id?: string };

const HANDOFF_MS = 180;

export function NarthexTransition({ from, startImmediately = false, id }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returning = searchParams.get("return") === "1";
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const arrivedRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const [started, setStarted] = useState(startImmediately && !returning);
  const [armed, setArmed] = useState(!returning);
  const [failed, setFailed] = useState(false);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    router.prefetch("/narthex");
  }, [router]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !started) return;
    video.currentTime = 0;
    video.playbackRate = 1;
    void video.play().catch(() => setFailed(true));
  }, [started]);

  useEffect(() => {
    if (startImmediately && !returning) {
      setStarted(true);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (returning && !armed) {
          if (!entry.isIntersecting) setArmed(true);
          return;
        }
        if (armed && entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.28 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [startImmediately, returning, armed, started]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const arrive = () => {
    if (arrivedRef.current) return;
    arrivedRef.current = true;
    router.replace(`/narthex?from=${encodeURIComponent(from)}&arrived=1`);
  };

  const finish = () => {
    if (arrivedRef.current) return;
    setFinishing(true);
    timerRef.current = window.setTimeout(arrive, HANDOFF_MS);
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`narthex-transition${started ? " is-playing" : ""}${finishing ? " is-finishing" : ""}`}
      aria-label="Passage into the Narthex"
    >
      <div className="narthex-transition__wash" aria-hidden="true" />
      <div className="narthex-transition__frame">
        <video
          ref={videoRef}
          className="narthex-transition__video"
          src="/media/video/environment/narthex.mp4"
          muted
          playsInline
          preload="auto"
          onEnded={finish}
          onError={() => setFailed(true)}
        />
        <img
          className="narthex-transition__handoff"
          src="/media/video/environment/narthex-arrival.jpg"
          alt=""
          aria-hidden="true"
        />
      </div>

      {failed ? (
        <button className="narthex-transition__fallback" type="button" onClick={arrive}>
          Continue
        </button>
      ) : null}
    </section>
  );
}
