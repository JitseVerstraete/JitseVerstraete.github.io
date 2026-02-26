import React from 'react';
import projectData from '../../data/projectData.json';
import './ProjectSection.css';

import ProjectCard from '../ProjectCard/ProjectCard';

export default function ProjectSection() {
    return (
        <>
            <h1>Project Section</h1>
            <div className='project-section'>
                {projectData.map((project) =>(
                    <ProjectCard
                        key={project.id}
                        data={project}
                    ></ProjectCard>
                ))}
            </div>
        </>
    );
}
