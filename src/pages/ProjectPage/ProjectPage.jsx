import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../data/projectData.js";
import { projectImages } from "../../data/images";
import ProjectBanner from "../../components/ProjectBanner/ProjectBanner";
import ProjectDetailsPanel from "../../components/ProjectDetailsPanel/ProjectDetailsPanel";
import ProjectMediaLightbox from "../../components/ProjectMediaLightbox/ProjectMediaLightbox";
import ProjectMediaGrid from "../../components/ProjectMediaGrid/ProjectMediaGrid";
import ContentSection from "../../components/ContentSection/ContentSection";
import "./ProjectPage.css";

function getYoutubeVideoId(video) {
    if (typeof video !== "string") {
        return null;
    }

    const value = video.trim();

    if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
        return value;
    }

    try {
        const url = new URL(value);
        const hostname = url.hostname.toLowerCase().replace(/^www\./, "").replace(/^m\./, "");
        const pathParts = url.pathname.split("/").filter(Boolean);

        if (hostname === "youtu.be") {
            return pathParts[0] || null;
        }

        if (hostname === "youtube.com" || hostname === "youtube-nocookie.com") {
            if (url.pathname === "/watch") {
                return url.searchParams.get("v");
            }

            if (["embed", "shorts", "live"].includes(pathParts[0])) {
                return pathParts[1] || null;
            }
        }
    } catch {
        return null;
    }

    return null;
}

function getProjectYoutubeVideo(project) {
    const explicitVideo = project.youtubeVideo || project.youtubeVideoUrl;
    const linkedVideo = project.links?.find((link) => getYoutubeVideoId(link.url))?.url;
    const videoId = getYoutubeVideoId(explicitVideo || linkedVideo);

    if (!videoId) {
        return null;
    }

    return {
        type: "video",
        key: `youtube-${videoId}`,
        id: videoId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
}

export default function ProjectPage() {
    const { id } = useParams();
    const project = getProjectById(id);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
    const detailsListRef = useRef(null);
    const [detailsListHeight, setDetailsListHeight] = useState(null);
    const youtubeVideo = project ? getProjectYoutubeVideo(project) : null;
    const galleryImages = (project?.galleryImages || [])
        .map((filename) => ({
            type: "image",
            filename,
            src: projectImages[filename],
        }))
        .filter((image) => image.filename && image.src);
    const mediaItems = [
        ...(youtubeVideo ? [youtubeVideo] : []),
        ...galleryImages.map((image, index) => ({
            ...image,
            key: `${image.filename}-${index}`,
            imageIndex: index,
        })),
    ];
    const hasProjectMedia = mediaItems.length > 0;
    const projectMediaLayout = youtubeVideo && galleryImages.length > 0
        ? "trailer-gallery"
        : youtubeVideo
            ? "trailer-only"
            : galleryImages.length > 0
                ? "gallery-only"
                : "none";
    const updateDetailsListHeight = useCallback(() => {
        const detailsListElement = detailsListRef.current;

        if (!detailsListElement) {
            return;
        }

        const nextHeight = detailsListElement.getBoundingClientRect().height;

        setDetailsListHeight((currentHeight) => (
            Math.abs((currentHeight || 0) - nextHeight) < 1 ? currentHeight : nextHeight
        ));
    }, [setDetailsListHeight]);

    useLayoutEffect(() => {
        if (!hasProjectMedia) {
            return undefined;
        }

        updateDetailsListHeight();

        const detailsListElement = detailsListRef.current;

        if (!detailsListElement) {
            return undefined;
        }

        let resizeObserver;

        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(updateDetailsListHeight);
            resizeObserver.observe(detailsListElement);
        }

        window.addEventListener("resize", updateDetailsListHeight);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener("resize", updateDetailsListHeight);
        };
    }, [hasProjectMedia, project?.id, updateDetailsListHeight]);

    if (!project) {
        return (
            <main className="project-page">
                <ContentSection className="project-article-section">
                    <article className="project-article">
                        <h1>Project not found</h1>
                    </article>
                </ContentSection>
            </main>
        );
    }

    return(
        <main className="project-page">
            <ProjectBanner projectData={project} />
            <ContentSection className="project-info-section">
                <ProjectDetailsPanel
                    projectInfo={project.projectInfo}
                    technologies={project.technologies}
                    detailsListRef={detailsListRef}
                    mediaLayout={projectMediaLayout}
                >
                    {hasProjectMedia && (
                        <ProjectMediaGrid
                            projectTitle={project.title}
                            mediaItems={mediaItems}
                            height={detailsListHeight}
                            onMediaSelect={setSelectedMediaIndex}
                        />
                    )}
                </ProjectDetailsPanel>
            </ContentSection>
            <ContentSection className="project-article-section">
                <article className="project-article">
                    <h2>About This Project</h2>
                    {project.expandedDescription?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </article>
            </ContentSection>
            {selectedMediaIndex !== null && (
                <ProjectMediaLightbox
                    projectTitle={project.title}
                    mediaItems={mediaItems}
                    initialIndex={selectedMediaIndex}
                    onClose={() => setSelectedMediaIndex(null)}
                />
            )}
        </main>
    );
}
