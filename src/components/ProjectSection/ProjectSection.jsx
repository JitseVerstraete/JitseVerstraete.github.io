import React from 'react';
import './ProjectSection.css';

import ProjectCard from '../ProjectCard/ProjectCard';

export default function ProjectSection() {
    return (
        <>
            <h1>Project Section</h1>
            <div className='project-section'>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </>
    );
}