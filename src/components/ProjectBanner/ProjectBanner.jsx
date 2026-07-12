import React from 'react';
import './ProjectBanner.css';
import { projectImages } from '../../data/images';
import IconLink from '../IconLink/IconLink';
import { hasIconLinkContent } from '../IconLink/IconLink.helpers';

export default function ProjectBanner({projectData}) {
    const bannerImage = projectImages[projectData.banner] || projectImages[projectData.image];
    const links = (projectData.links || []).filter(hasIconLinkContent);

    return (
        <section
            className="banner"
            style={{ "--banner-image": bannerImage ? `url(${bannerImage})` : "none" }}
        >
            <div className="banner-content">
                <div className="banner-title">
                    <h1>{projectData.title}</h1>
                    <p>{projectData.description}</p>
                    {projectData.projectTimestamp && (
                        <div className="banner-timestamp">{projectData.projectTimestamp}</div>
                    )}
                    {links.length > 0 && (
                        <div className="banner-links">
                            {links.map((link) => (
                                <IconLink
                                    key={link.url}
                                    url={link.url}
                                    label={link.label}
                                    iconId={link.iconId}
                                    target="_blank"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
