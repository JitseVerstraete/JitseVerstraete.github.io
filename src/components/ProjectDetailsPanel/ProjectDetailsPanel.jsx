import React from "react";
import "./ProjectDetailsPanel.css";

export default function ProjectDetailsPanel({
    projectInfo = [],
    technologies = [],
    children,
    detailsListRef,
    mediaLayout = "none",
}) {
    const hasMedia = Boolean(children);
    const mediaLayoutClassName = hasMedia ? ` project-details-panel-media-${mediaLayout}` : "";

    return (
        <div
            className={`project-details-panel${hasMedia ? " project-details-panel-with-media" : ""}${mediaLayoutClassName}`}
        >
            <dl className="project-info-list" ref={detailsListRef}>
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
            {children}
        </div>
    );
}
