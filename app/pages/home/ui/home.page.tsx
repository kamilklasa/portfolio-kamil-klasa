import { projects } from "~/entities/project";
import { seo } from "~/shared/lib/seo";
import { PortfolioFeed } from "~/widgets/portfolio-feed";

export function meta() {
  return seo(
    "Kamil Klasa — Product designer & frontend developer",
    "Projektuję i tworzę przemyślane produkty cyfrowe. Portfolio Kamila Klasy: product design, UI/UX i frontend development.",
  );
}

export default function Home() {
  return <PortfolioFeed items={projects} />;
}
