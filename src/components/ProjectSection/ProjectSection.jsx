import React from 'react';
import projectData from '../../data/projectData.json';
import './ProjectSection.css';
import ProjectCard from '../ProjectCard/ProjectCard';
import ContentSection from '../ContentSection/ContentSection';

export default function ProjectSection() {
    return (
        <ContentSection id="projects" className="project-section-wrapper">
            <h1>Project Section</h1>
            <div className='project-section'>
                {projectData.map((project) =>(
                    <ProjectCard
                        key={project.id}
                        data={project}
                    ></ProjectCard>
                ))}
            </div>
        </ContentSection>
    );
}
