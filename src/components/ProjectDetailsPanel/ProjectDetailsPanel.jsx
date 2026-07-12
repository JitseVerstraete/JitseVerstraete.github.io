import React from "react";
import "./ProjectDetailsPanel.css";

export default function ProjectDetailsPanel({
    projectInfo = [],
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
                {projectInfo.map((item, index) => (
                    <div className="project-info-row" key={`${item.label}-${index}`}>
                        <dt>{item.label}</dt>
                        <dd className={Array.isArray(item.value) ? "project-info-tags" : undefined}>
                            {Array.isArray(item.value)
                                ? item.value.map((value, valueIndex) => (
                                    <span key={`${value}-${valueIndex}`}>{value}</span>
                                ))
                                : item.value}
                        </dd>
                    </div>
                ))}
            </dl>
            {children}
        </div>
    );
}
