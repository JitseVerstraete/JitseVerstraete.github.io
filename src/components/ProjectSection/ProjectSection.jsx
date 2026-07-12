import React from 'react';
import { getProjectsForSection } from '../../data/projectData.js';
import './ProjectSection.css';
import ProjectCard from '../ProjectCard/ProjectCard';

export default function ProjectSection({ title = "Projects", section }) {
    const projects = getProjectsForSection(section);

    if (projects.length === 0) {
        return null;
    }

    return (
        <section id={section ? `projects-${section}` : undefined} className="project-section-wrapper">
            <h2>{title}</h2>
            <div className='project-section'>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        data={project}
                    ></ProjectCard>
                ))}
            </div>
        </section>
    );
}
