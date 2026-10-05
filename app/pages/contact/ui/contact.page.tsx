import { ButtonLink } from "~/shared/ui/button-link";
import { Arrow } from "~/shared/ui/icons";
import { profile } from "~/shared/config/profile";
import { seo } from "~/shared/lib/seo";

export function meta() {
  return seo(
    "Kontakt — Kamil Klasa",
    "Porozmawiajmy o Twoim projekcie. Product design i frontend development — Kamil Klasa.",
    "/kontakt",
  );
}

const socials = [
  { label: "LinkedIn", href: profile.linkedIn },
  { label: "GitHub", href: profile.github },
  { label: "Dribbble", href: profile.dribbble },
];

export default function Contact() {
  return (
    <section className="page-panel contact-page contact-editorial">
      <div className="contact-heading">
        <span className="eyebrow">KONTAKT</span>
        <span className="availability">
          <i />
          Otwarty na współpracę
        </span>
      </div>
      <div className="contact-introduction">
        <h1>
          Masz pomysł?
          <br />
          <span>Porozmawiajmy.</span>
        </h1>
        <p>
          Opowiedz mi, co chcesz stworzyć. Pomogę połączyć dobry design z
          dopracowanym frontendem.
        </p>
      </div>
      <div className="contact-direct">
        <span className="contact-label">NAPISZ DO MNIE</span>
        <a className="contact-email-link" href={`mailto:${profile.email}`}>
          <span>{profile.email}</span>
          <span className="contact-email-arrow">
            <Arrow diagonal />
          </span>
        </a>
        <p>Możesz zacząć od kilku słów o swoim pomyśle.</p>
      </div>
      <div className="contact-networks">
        <span className="contact-label">ZNAJDZIESZ MNIE TEŻ TUTAJ</span>
        <nav aria-label="Profile społecznościowe">
          {socials.map((social) => (
            <a
              href={social.href}
              key={social.label}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (otwiera się w nowej karcie)`}
            >
              {social.label}
              <Arrow diagonal />
            </a>
          ))}
        </nav>
      </div>
      <div className="contact-bottom">
        <span>Najpierw poznaj moje prace.</span>
        <ButtonLink to="/#projekty" variant="light" arrow>
          Zobacz projekty
        </ButtonLink>
      </div>
    </section>
  );
}
