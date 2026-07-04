import React from 'react';
import { FaExternalLinkAlt, FaGamepad, FaGithub, FaItchIo, FaSteam, FaYoutube } from 'react-icons/fa';
import './ProjectBanner.css';
import { projectImages } from '../../data/images';

function getLinkIcon(link) {
    const linkText = `${link.label} ${link.url}`.toLowerCase();

    if (linkText.includes("github")) {
        return FaGithub;
    }

    if (linkText.includes("youtube") || linkText.includes("trailer")) {
        return FaYoutube;
    }

    if (linkText.includes("itch")) {
        return FaItchIo;
    }

    if (linkText.includes("steam")) {
        return FaSteam;
    }

    if (linkText.includes("game jam") || linkText.includes("globalgamejam")) {
        return FaGamepad;
    }

    return FaExternalLinkAlt;
}

export default function ProjectBanner({projectData}) {
    const bannerImage = projectImages[projectData.banner] || projectImages[projectData.image];
    const links = projectData.links || [];

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
                            {links.map((link) => {
                                const Icon = getLinkIcon(link);

                                return (
                                    <a
                                        key={link.url}
                                        className="banner-link"
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={link.label}
                                        title={link.label}
                                    >
                                        <Icon aria-hidden="true" focusable="false" />
                                        <span className="banner-link-label">{link.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
