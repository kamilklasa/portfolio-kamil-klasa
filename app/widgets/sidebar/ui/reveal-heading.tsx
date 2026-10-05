import type { CSSProperties } from "react";
import { useRevealHeading } from "../model/reveal-heading.hooks";

const lines = ["Dobry design.", "Jeszcze lepsze", "doświadczenie."];
const totalLetters = lines.join("").length;

export function RevealHeading({ as: Heading }: { as: "h1" | "h2" }) {
  const { revealed, finish } = useRevealHeading(Heading);
  let letterIndex = 0;
  return (
    <Heading
      className={`reveal-heading${revealed ? " is-revealed" : ""}`}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, lineIndex) => (
        <span
          key={line}
          className={`headline-line${lineIndex === 1 ? " headline-line-muted" : ""}`}
          aria-hidden="true"
        >
          {Array.from(line).map((letter, index) => {
            const order = letterIndex++;
            return (
              <span
                key={index}
                className={`headline-letter${lineIndex === 2 && letter === "." ? " headline-period" : ""}`}
                style={
                  {
                    "--letter-delay": `${0.12 + order * 0.022}s`,
                  } as CSSProperties
                }
                onAnimationEnd={order === totalLetters - 1 ? finish : undefined}
              >
                {letter === " " ? "\u00a0" : letter}
              </span>
            );
          })}
        </span>
      ))}
    </Heading>
  );
}
