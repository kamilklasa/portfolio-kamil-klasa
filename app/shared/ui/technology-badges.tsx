import type { Technology } from "../config/technology.types";
import SiJavascript from "@icons-pack/react-simple-icons/icons/SiJavascript";
import SiNextdotjs from "@icons-pack/react-simple-icons/icons/SiNextdotjs";
import SiTailwindcss from "@icons-pack/react-simple-icons/icons/SiTailwindcss";
import SiPostgresql from "@icons-pack/react-simple-icons/icons/SiPostgresql";
import SiGit from "@icons-pack/react-simple-icons/icons/SiGit";
import SiVercel from "@icons-pack/react-simple-icons/icons/SiVercel";
import SiDocker from "@icons-pack/react-simple-icons/icons/SiDocker";
import SiZod from "@icons-pack/react-simple-icons/icons/SiZod";
import SiClaude from "@icons-pack/react-simple-icons/icons/SiClaude";
import SiSupabase from "@icons-pack/react-simple-icons/icons/SiSupabase";
import SiGithub from "@icons-pack/react-simple-icons/icons/SiGithub";
import SiInertia from "@icons-pack/react-simple-icons/icons/SiInertia";
import SiReact from "@icons-pack/react-simple-icons/icons/SiReact";
import SiHtml5 from "@icons-pack/react-simple-icons/icons/SiHtml5";
import SiCss from "@icons-pack/react-simple-icons/icons/SiCss";
import SiTypescript from "@icons-pack/react-simple-icons/icons/SiTypescript";
import SiTanstack from "@icons-pack/react-simple-icons/icons/SiTanstack";
import SiFigma from "@icons-pack/react-simple-icons/icons/SiFigma";

function ApiIcon() {
  return (
    <svg
      className="technology-symbol"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 20" />
    </svg>
  );
}
function AccessIcon() {
  return (
    <svg
      className="technology-symbol"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 10h14v11H5V10Zm3 0V6a4 4 0 0 1 8 0v4m-4 4v3" />
    </svg>
  );
}
function TerminalIcon() {
  return (
    <svg
      className="technology-symbol"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="m4 6 6 6-6 6m10 0h6" />
    </svg>
  );
}

const technologyIcons = {
  javascript: { label: "JavaScript", Icon: SiJavascript },
  nextjs: { label: "Next.js", Icon: SiNextdotjs },
  tailwind: { label: "Tailwind CSS", Icon: SiTailwindcss },
  supabase: { label: "Supabase", Icon: SiSupabase },
  postgresql: { label: "PostgreSQL", Icon: SiPostgresql },
  api: { label: "REST API", Icon: ApiIcon },
  rls: { label: "RLS", Icon: AccessIcon },
  git: { label: "Git", Icon: SiGit },
  github: { label: "GitHub", Icon: SiGithub },
  vercel: { label: "Vercel", Icon: SiVercel },
  docker: { label: "Docker", Icon: SiDocker },
  zod: { label: "Zod", Icon: SiZod },
  claude: { label: "Claude Code", Icon: SiClaude },
  codex: { label: "Codex", Icon: TerminalIcon },
  react: { label: "React", Icon: SiReact },
  inertia: { label: "Inertia.js", Icon: SiInertia },
  html: { label: "HTML", Icon: SiHtml5 },
  css: { label: "CSS", Icon: SiCss },
  typescript: { label: "TypeScript", Icon: SiTypescript },
  tanstackRouter: { label: "TanStack Router", Icon: SiTanstack },
  tanstack: { label: "TanStack Query", Icon: SiTanstack },
  figma: { label: "Figma", Icon: SiFigma },
};

export function TechnologyBadges({
  technologies,
  label = "Technologie i narzędzia",
}: {
  technologies: Technology[];
  label?: string;
}) {
  return (
    <ul className="technology-badges" aria-label={label}>
      {technologies.map((technology) => {
        if (technology === "valibot")
          return (
            <li className="technology-badge" key={technology}>
              <img src="/icons/valibot.svg" width="18" height="18" alt="" />
              Valibot
            </li>
          );
        const { label, Icon } = technologyIcons[technology];
        return (
          <li className="technology-badge" key={technology}>
            <Icon size={17} color="currentColor" aria-hidden="true" />
            {label}
          </li>
        );
      })}
    </ul>
  );
}
