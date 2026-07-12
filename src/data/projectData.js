import projectData from "./projectData.json";

const projectModules = import.meta.glob("./projects/*.json", {
  eager: true,
  import: "default",
});

const projectFilesById = Object.fromEntries(
  Object.entries(projectModules).map(([path, project]) => {
    const id = path.split("/").pop().replace(/\.json$/, "");
    return [id, project];
  }),
);

function resolveProjectReference(projectReference, sectionId) {
  const project = projectFilesById[projectReference.id];

  if (!project) {
    console.warn(`Missing project file for "${projectReference.id}".`);
    return null;
  }

  return {
    ...project,
    id: projectReference.id,
    enabled: projectReference.enabled !== false,
    section: sectionId,
  };
}

export const projectSections = projectData.sections.map((section) => ({
  ...section,
  projects: section.projects
    .map((projectReference) => resolveProjectReference(projectReference, section.id))
    .filter(Boolean),
}));

export const projects = projectSections.flatMap((section) => section.projects);

export function getProjectsForSection(sectionId) {
  const sectionProjects = sectionId
    ? projectSections.find((section) => section.id === sectionId)?.projects || []
    : projects;

  return sectionProjects.filter((project) => project.enabled);
}

export function getProjectById(projectId) {
  return projects.find((project) => project.id === projectId);
}

export default projects;
