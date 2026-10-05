import type { Technology } from "~/shared/config/technology.types";
import { profile } from "~/shared/config/profile";
import { TechnologyBadges } from "~/shared/ui/technology-badges";
import { FaqItem } from "~/shared/ui/faq-item";
import { ButtonLink } from "~/shared/ui/button-link";
import SiGithub from "@icons-pack/react-simple-icons/icons/SiGithub";
import SiDribbble from "@icons-pack/react-simple-icons/icons/SiDribbble";
import { Arrow, Spark, LinkedInIcon } from "~/shared/ui/icons";
import { seo } from "~/shared/lib/seo";
import { AboutSectionHeading } from "./about-section-heading";
export function meta() {
  return seo(
    "O mnie — Kamil Klasa",
    "Kamil Klasa, product designer i frontend developer. Łączę projektowanie interfejsów z ich realizacją.",
    "/o-mnie",
  );
}
const skills: { title: string; items: Technology[] }[] = [
  {
    title: "Frontend",
    items: [
      "javascript",
      "typescript",
      "react",
      "nextjs",
      "tailwind",
      "html",
      "css",
    ],
  },
  {
    title: "Backend i bazy danych",
    items: ["supabase", "postgresql", "api", "rls"],
  },
  {
    title: "Narzędzia",
    items: [
      "git",
      "github",
      "vercel",
      "docker",
      "figma",
      "tanstack",
      "zod",
      "claude",
      "codex",
    ],
  },
];

const profiles = [
  {
    name: "GitHub",
    handle: "@kamilklasa",
    href: profile.github,
    label: "github.com/kamilklasa",
    Icon: SiGithub,
  },
  {
    name: "Dribbble",
    handle: "@uikamil",
    href: profile.dribbble,
    label: "dribbble.com/uikamil",
    Icon: SiDribbble,
  },
  {
    name: "LinkedIn",
    handle: "Kamil Klasa",
    href: profile.linkedIn,
    label: "linkedin.com/in/kamilklasa/",
    Icon: LinkedInIcon,
  },
];

export default function About() {
  return (
    <section className="page-panel about-page">
      <span className="eyebrow">DESIGN + DEVELOPMENT</span>
      <div className="about-hero">
        <h1>
          Cześć, jestem Kamil.
          <br />
          <span>Łączę dwie perspektywy.</span>
        </h1>
        <Spark />
      </div>
      <div className="about-content">
        <p className="large-copy">
          Projektuję z myślą o ludziach. Tworzę z dbałością o każdy detal.
        </p>
        <div>
          <p>
            Interesuje mnie cały proces: od zrozumienia problemu, przez pierwsze
            szkice, po działający produkt. Design i frontend traktuję jako dwa
            etapy tej samej rozmowy.
          </p>
          <p>
            Stawiam na jasne interfejsy, dobrą typografię i ruch, który ma sens.
            Chcę, żeby doświadczenie było równie dobre jak jego pierwsze
            wrażenie.
          </p>
          <ButtonLink to="/kontakt">Porozmawiajmy</ButtonLink>
        </div>
      </div>
      <div className="about-resume">
        <section
          className="about-resume-section"
          aria-labelledby="about-skills-title"
        >
          <AboutSectionHeading
            id="about-skills-title"
            number={1}
            label="Umiejętności"
          >
            Mój warsztat.
          </AboutSectionHeading>
          <div className="about-skill-list">
            {skills.map(({ title, items }) => (
              <div className="about-skill-group" key={title}>
                <div className="about-skill-heading">
                  <h3>{title}</h3>
                </div>
                <TechnologyBadges technologies={items} label={title} />
              </div>
            ))}
          </div>
        </section>
        <section
          className="about-resume-section"
          aria-labelledby="about-education-title"
        >
          <AboutSectionHeading
            id="about-education-title"
            number={2}
            label="Edukacja"
          >
            Solidne podstawy.
          </AboutSectionHeading>
          <div className="about-education">
            <div className="about-education-timeline" aria-hidden="true">
              <span />
            </div>
            <div>
              <p className="about-education-dates">
                <time dateTime="2022-10">październik 2022</time> —{" "}
                <time dateTime="2026-02">luty 2026</time>
              </p>
              <h3>Inżynier Informatyki</h3>
              <p className="about-education-specialty">
                Specjalizacja Frontend Developer
              </p>
              <p className="about-education-school">
                Uniwersytet Merito w Gdańsku
              </p>
            </div>
          </div>
        </section>
        <section
          className="about-resume-section"
          aria-labelledby="about-profiles-title"
        >
          <AboutSectionHeading id="about-profiles-title" number={3}>
            Połączmy się.
          </AboutSectionHeading>
          <nav
            className="about-profiles"
            aria-label="Profile Kamila w mediach społecznościowych"
          >
            {profiles.map(({ href, label, name, handle, Icon }) => (
              <a
                href={href}
                key={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (otwiera się w nowej karcie)`}
              >
                <span className="about-profile-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="about-profile-copy">
                  <strong>{name}</strong>
                  <span>{handle}</span>
                </span>
                <Arrow diagonal />
              </a>
            ))}
          </nav>
        </section>
      </div>
      <section
        id="uslugi"
        className="about-services"
        aria-labelledby="about-services-title"
      >
        <AboutSectionHeading id="about-services-title" number={4}>
          Usługi
        </AboutSectionHeading>
        <div className="service-row">
          <div className="service-copy">
            <h3>Product design</h3>
            <p>UI/UX · Prototypy · Design systems</p>
          </div>
        </div>
        <div className="service-row">
          <div className="service-copy">
            <h3>Frontend development</h3>
            <p>Responsywne strony · Interakcje · Dostępność</p>
          </div>
        </div>
      </section>
      <section id="faq" className="faq-section">
        <span className="eyebrow">FAQ</span>
        <h2>Najczęstsze pytania.</h2>
        <FaqItem question="Czym się zajmuję?">
          <p>
            Łączę product design z frontend development. Projektuję interfejsy
            UI/UX, prototypy i systemy komponentów, a następnie wdrażam strony
            oraz aplikacje w React i Next.js.
          </p>
        </FaqItem>
        <FaqItem question="Jak się ze mną skontaktować?">
          <p>
            Napisz na <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            Możesz też znaleźć mnie na{" "}
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            .
          </p>
        </FaqItem>
        <FaqItem question="Jak zaczynamy współpracę?">
          <p>
            Opowiedz mi o swoim pomyśle, jego odbiorcach i tym, co chcesz
            osiągnąć. Jeśli masz już projekt lub stronę, podeślij link. Wspólnie
            ustalimy zakres pracy i kolejne kroki.
          </p>
        </FaqItem>
      </section>
    </section>
  );
}
