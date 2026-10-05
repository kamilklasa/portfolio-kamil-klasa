import { isGamingPath } from "~/entities/project";
import { ButtonLink } from "~/shared/ui/button-link";
import { useLocation } from "react-router";
import { RevealHeading } from "./reveal-heading";
import { Header } from "./header";
import { PixelArcade } from "~/features/pixel-arcade";
import { profile } from "~/shared/config/profile";
export function Sidebar() {
  const location = useLocation();
  const gaming = isGamingPath(location.pathname);
  const Heading = ["/", "/gaming"].includes(location.pathname) ? "h1" : "h2";
  return (
    <aside className="left-column">
      <Header />
      {gaming && <PixelArcade />}
      <div className="intro-content">
        <div className="intro-top">
          <span className="availability">
            <i />
            Otwarty na współpracę
          </span>
          <span className="edition">PORTFOLIO / 26</span>
        </div>
        <div className="identity">
          <img
            className="avatar"
            src="/images/kamil-klasa.webp"
            alt="Kamil Klasa"
            width="64"
            height="64"
          />
          <div>
            <p>{profile.name}</p>
            <a className="identity-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </div>
        <div className="hero-copy">
          <RevealHeading as={Heading} />
          <p>
            Łączę design z kodem, by tworzyć produkty cyfrowe, które dobrze
            wyglądają i jeszcze lepiej działają.
          </p>
          <div className="hero-actions">
            <ButtonLink to="/kontakt">Porozmawiajmy</ButtonLink>
            <ButtonLink to="/o-mnie" variant="light">
              Poznaj mnie
            </ButtonLink>
          </div>
        </div>
        <div className="intro-bottom">
          <div className="skills">
            <span>UI/UX design</span>
            <span>Development</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
