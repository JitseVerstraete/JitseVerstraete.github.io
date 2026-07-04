import React from 'react';
import projectData from '../../data/projectData.json';
import './ProjectSection.css';
import ProjectCard from '../ProjectCard/ProjectCard';
import ContentSection from '../ContentSection/ContentSection';

export default function ProjectSection({ title = "Projects", section }) {
    const projects = projectData.filter((project) => {
        const isEnabled = project.enabled !== false;
        const isInSection = !section || project.section === section;

        return isEnabled && isInSection;
    });

    if (projects.length === 0) {
        return null;
    }

    return (
        <ContentSection id={section ? `projects-${section}` : "projects"} className="project-section-wrapper">
            <h1>{title}</h1>
            <div className='project-section'>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        data={project}
                    ></ProjectCard>
                ))}
            </div>
        </ContentSection>
    );
}
