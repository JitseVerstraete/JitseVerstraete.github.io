import React from "react";
import { useParams } from "react-router-dom";
import projectData from "../../data/projectData.json";
import ProjectBanner from "../../components/ProjectBanner/ProjectBanner";
import ProjectDetailsPanel from "../../components/ProjectDetailsPanel/ProjectDetailsPanel";
import ContentSection from "../../components/ContentSection/ContentSection";
import "./ProjectPage.css";

export default function ProjectPage() {
    const { id } = useParams();
    const project = projectData.find((project) => project.id === Number(id));

    if (!project) {
        return (
            <main className="project-page">
                <ContentSection className="project-article-section">
                    <article className="project-article">
                        <h1>Project not found</h1>
                    </article>
                </ContentSection>
            </main>
        );
    }

    return(
        <main className="project-page">
            <ProjectBanner projectData={project} />
            <ContentSection className="project-info-section">
                <ProjectDetailsPanel
                    projectInfo={project.projectInfo}
                    technologies={project.technologies}
                />
            </ContentSection>
            <ContentSection className="project-article-section">
                <article className="project-article">
                    <h2>About This Project</h2>
                    {project.expandedDescription?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </article>
            </ContentSection>
        </main>
    );
}
