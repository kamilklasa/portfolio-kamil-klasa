import { Arrow } from "~/shared/ui/icons";
import { board } from "../model/breakout";
import { usePixelArcade } from "../model/pixel-arcade.hooks";

export function PixelArcade() {
  const { canvas, layer, mode, score, keyDown, keyUp, blur, toggle } =
    usePixelArcade();
  const label =
    mode === "playing"
      ? `${score} pkt · Pauza`
      : mode === "paused"
        ? "Wznów grę"
        : mode === "ready"
          ? "Zagraj"
          : "Jeszcze raz?";
  return (
    <>
      <div ref={layer} className="ambient-arcade" data-mode={mode}>
        <canvas
          ref={canvas}
          width={board.width}
          height={board.height}
          tabIndex={mode === "playing" ? 0 : -1}
          role={mode === "playing" ? "application" : undefined}
          aria-hidden={mode === "ready" || undefined}
          aria-label="Breakout w tle: steruj myszką lub strzałkami lewo i prawo. Spacja i Escape wstrzymują grę."
          onKeyDown={keyDown}
          onKeyUp={keyUp}
          onBlur={blur}
        />
      </div>
      <button
        className="ambient-arcade-toggle"
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        aria-label={
          mode === "playing"
            ? "Wstrzymaj grę"
            : mode === "paused"
              ? "Wznów grę"
              : "Zagraj w Breakout"
        }
        onClick={toggle}
      >
        {label}
        <span className="ambient-arcade-toggle-icon" aria-hidden="true">
          {mode === "playing" ? "Ⅱ" : <Arrow diagonal />}
        </span>
      </button>
      <span className="arcade-status" role="status">
        {mode === "won"
          ? "Wszystkie klocki zbite!"
          : mode === "lost"
            ? "Koniec rundy. Spróbuj ponownie."
            : ""}
      </span>
    </>
  );
}
