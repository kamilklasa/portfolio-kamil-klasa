import { Arrow } from "~/shared/ui/icons";
import { profile } from "~/shared/config/profile";

export function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>Design z pomysłem. Kod z dbałością.</span>
      <a
        className="back-to-top"
        href="#top"
        onClick={(event) => {
          if (
            event.button === 0 &&
            !event.metaKey &&
            !event.ctrlKey &&
            !event.shiftKey &&
            !event.altKey &&
            document.documentElement.classList.contains("lenis")
          )
            event.preventDefault();
        }}
      >
        <span>Do góry</span>
        <span className="back-to-top-icon">
          <Arrow />
        </span>
      </a>
    </footer>
  );
}
