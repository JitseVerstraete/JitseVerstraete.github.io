import React from 'react';
import './ProjectBanner.css';
import { projectImages } from '../../data/images';
import ProjectDetailsPanel from '../ProjectDetailsPanel/ProjectDetailsPanel';

export default function ProjectBanner({projectData}) {
    const bannerImage = projectImages[projectData.banner] || projectImages[projectData.image];

    return (
        <section
            className="banner"
            style={{ "--banner-image": bannerImage ? `url(${bannerImage})` : "none" }}
        >
            <div className="banner-content">
                <div className="banner-title">
                    <h1>{projectData.title}</h1>
                </div>
                <ProjectDetailsPanel
                    description={projectData.description}
                    technologies={projectData.technologies}
                />
            </div>
        </section>
    );
}
