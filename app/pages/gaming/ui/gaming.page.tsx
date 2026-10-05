import { PortfolioFeed } from "~/widgets/portfolio-feed";
import { gamingProjects } from "~/entities/project";
import { seo } from "~/shared/lib/seo";

export function meta() {
  return seo(
    "Gaming — Kamil Klasa",
    "Strony serwerów Minecraft i projekty gamingowe Kamila Klasy: Anarchia.gg, CraftCube, FineRPG, UniMC, GoodPlay, PykMC, ClearMC i BananSMP.",
    "/gaming",
  );
}

export default function Gaming() {
  return <PortfolioFeed gaming items={gamingProjects} />;
}
