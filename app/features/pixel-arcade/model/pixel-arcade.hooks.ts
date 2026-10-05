import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  advanceRound,
  board,
  createRound,
  movePaddle,
  steerAutoplay,
} from "./breakout";
import { drawRound } from "../lib/draw-round";
import { useArcadeLayout } from "./pixel-arcade-layout.hooks";

type Mode = "ready" | "playing" | "paused" | "won" | "lost";

export function usePixelArcade() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const round = useRef(createRound());
  const keys = useRef(new Set<string>());
  const [mode, setMode] = useState<Mode>("ready");
  const [score, setScore] = useState(0);

  useArcadeLayout(layer);

  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    context.imageSmoothingEnabled = false;
    drawRound(context, round.current, mode !== "ready");
    const idle = mode === "ready";
    if (!idle && mode !== "playing") return;
    if (idle && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let frame = 0,
      previous = 0,
      points = round.current.score;
    function tick(now: number) {
      const elapsed = previous ? (now - previous) / 1000 : 0;
      previous = now;
      if (idle) steerAutoplay(round.current);
      advanceRound(
        round.current,
        idle ? elapsed * 0.42 : elapsed,
        Number(keys.current.has("ArrowRight")) -
          Number(keys.current.has("ArrowLeft")),
      );
      drawRound(context!, round.current, !idle);
      if (round.current.result !== "playing") {
        if (idle) round.current = createRound();
        else {
          setScore(round.current.score);
          setMode(round.current.result);
          return;
        }
      }
      if (!idle && points !== round.current.score) {
        points = round.current.score;
        setScore(points);
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    const host = canvas.current?.closest(".left-column");
    const steer = (event: Event) => {
      if (idle || !canvas.current) return;
      const pointer = event as PointerEvent;
      if (pointer.pointerType === "touch") return;
      const box = canvas.current.getBoundingClientRect();
      movePaddle(
        round.current,
        ((pointer.clientX - box.left) / box.width) * board.width,
      );
    };
    const pauseWhenHidden = () => {
      if (document.hidden && !idle) {
        keys.current.clear();
        setMode("paused");
      }
    };
    host?.addEventListener("pointermove", steer);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      cancelAnimationFrame(frame);
      host?.removeEventListener("pointermove", steer);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [mode]);

  function start() {
    if (mode !== "paused") {
      round.current = createRound();
      setScore(0);
    }
    keys.current.clear();
    setMode("playing");
    canvas.current?.focus({ preventScroll: true });
  }
  function keyDown(event: KeyboardEvent<HTMLCanvasElement>) {
    if (!["ArrowLeft", "ArrowRight", " ", "Escape"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Escape") {
      keys.current.clear();
      setMode("paused");
    } else if (event.key === " ") {
      if (!event.repeat) mode === "playing" ? setMode("paused") : start();
    } else keys.current.add(event.key);
  }
  function pause() {
    keys.current.clear();
    setMode("paused");
  }
  function blur() {
    if (mode === "playing") pause();
    else keys.current.clear();
  }
  function toggle() {
    if (mode === "playing") pause();
    else start();
  }
  function keyUp(event: KeyboardEvent<HTMLCanvasElement>) {
    keys.current.delete(event.key);
  }

  return { canvas, layer, mode, score, keyDown, keyUp, blur, toggle };
}
