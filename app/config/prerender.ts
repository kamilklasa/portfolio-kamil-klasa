import { allProjects } from "../entities/project/model/projects";

export const prerenderPaths = [
  "/",
  "/o-mnie",
  "/kontakt",
  "/gaming",
  ...allProjects.map((project) => `/projekty/${project.slug}`),
];
