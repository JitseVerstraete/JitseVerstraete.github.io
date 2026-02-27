import React from "react";
import projectData from "../../data/projectData.json";
import ProjectBanner from "../../components/ProjectBanner/ProjectBanner";
import ContentSection from "../../components/ContentSection/ContentSection";
import "./ProjectPage.css";

export default function ProjectPage() {
    const project = projectData[0];

    return(
        <main className="project-page">
            <ProjectBanner projectData={project} />
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
