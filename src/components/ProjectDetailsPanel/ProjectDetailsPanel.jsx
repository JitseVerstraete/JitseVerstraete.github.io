import React from "react";
import "./ProjectDetailsPanel.css";

export default function ProjectDetailsPanel({ projectInfo = [], technologies = [] }) {
    return (
        <div className="project-details-panel">
            <dl className="project-info-list">
                {projectInfo.map((item) => (
                    <div className="project-info-row" key={`${item.label}-${item.value}`}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                    </div>
                ))}
                {technologies.length > 0 && (
                    <div className="project-info-row">
                        <dt>Technologies</dt>
                        <dd className="project-details-tech-list">
                            {technologies.map((technology) => (
                                <span key={technology}>{technology}</span>
                            ))}
                        </dd>
                    </div>
                )}
            </dl>
        </div>
    );
}
