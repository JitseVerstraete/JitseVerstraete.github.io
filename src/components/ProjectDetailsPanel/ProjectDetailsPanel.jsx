import React from "react";
import "./ProjectDetailsPanel.css";

export default function ProjectDetailsPanel({ description, technologies }) {
    return (
        <div className="project-details-panel">
            <p>{description}</p>
            <div className="project-details-tech-list">
                {technologies?.map((technology) => (
                    <span key={technology}>{technology}</span>
                ))}
            </div>
        </div>
    );
}
