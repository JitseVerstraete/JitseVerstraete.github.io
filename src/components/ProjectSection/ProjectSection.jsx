import React from 'react';
import projectData from '../../data/projectData.json';
import { projectImages } from "../../data/images";
import './ProjectSection.css';

import ProjectCard from '../ProjectCard/ProjectCard';

export default function ProjectSection() {
    return (
        <>
            <h1>Project Section</h1>
            <div className='project-section'>
                <ProjectCard 
                title="project" 
                description="a short description"
                image={projectImages['CCCThumbnail.png']}
                tags={['tag1', 'tag2', 'tag3']}
                />
            </div>
        </>
    );
}