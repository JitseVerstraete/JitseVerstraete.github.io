import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import "./ProjectMediaGrid.css";

const TARGET_IMAGE_ASPECT_RATIO = 16 / 9;
const MIN_THUMBNAIL_SIZE = 44;

function getFallbackImageGrid(imageCount, hasTrailer) {
    if (imageCount <= 1) {
        return { columns: 1, rows: 1 };
    }

    if (hasTrailer) {
        const columns = 2;

        return { columns, rows: Math.ceil(imageCount / columns) };
    }

    if (imageCount <= 4) {
        const columns = 2;

        return { columns, rows: Math.ceil(imageCount / columns) };
    }

    const columns = imageCount <= 9 ? 3 : 4;

    return { columns, rows: Math.ceil(imageCount / columns) };
}

function getBalancedImageGrid(imageCount, hasTrailer, gridSize, gap) {
    if (imageCount <= 0) {
        return { columns: 1, rows: 1 };
    }

    if (!gridSize.width || !gridSize.height) {
        return getFallbackImageGrid(imageCount, hasTrailer);
    }

    let bestGrid = null;

    for (let columns = 1; columns <= imageCount; columns += 1) {
        const rows = Math.ceil(imageCount / columns);
        const usableWidth = gridSize.width - gap * (columns - 1);
        const usableHeight = gridSize.height - gap * (rows - 1);

        if (usableWidth <= 0 || usableHeight <= 0) {
            continue;
        }

        const thumbnailWidth = usableWidth / columns;
        const thumbnailHeight = usableHeight / rows;
        const thumbnailAspectRatio = thumbnailWidth / thumbnailHeight;
        const ratioScore = Math.abs(Math.log(thumbnailAspectRatio / TARGET_IMAGE_ASPECT_RATIO));
        const emptySlots = columns * rows - imageCount;
        const emptySlotScore = emptySlots / (columns * rows);
        const tinyThumbnailScore = (
            Math.max(0, MIN_THUMBNAIL_SIZE - thumbnailWidth) +
            Math.max(0, MIN_THUMBNAIL_SIZE - thumbnailHeight)
        ) / MIN_THUMBNAIL_SIZE;
        const score = ratioScore + emptySlotScore * 0.35 + tinyThumbnailScore * 0.5;

        if (!bestGrid || score < bestGrid.score) {
            bestGrid = { columns, rows, score };
        }
    }

    return bestGrid || getFallbackImageGrid(imageCount, hasTrailer);
}

function getMediaButtonLabel(projectTitle, media) {
    if (media.type === "video") {
        return `Open ${projectTitle} video fullscreen`;
    }

    return `Open ${projectTitle} gallery image ${media.imageIndex + 1} fullscreen`;
}

function ProjectMediaButton({
    media,
    mediaIndex,
    projectTitle,
    className,
    onMediaSelect,
}) {
    return (
        <button
            type="button"
            className={`project-media-grid-item ${className}`}
            onClick={() => onMediaSelect(mediaIndex)}
            aria-label={getMediaButtonLabel(projectTitle, media)}
        >
            {media.type === "video" ? (
                <>
                    <img src={media.thumbnailUrl} alt={`${projectTitle} video thumbnail`} />
                    <span className="project-video-play-indicator" aria-hidden="true" />
                </>
            ) : (
                <img src={media.src} alt={`${projectTitle} gallery ${media.imageIndex + 1}`} />
            )}
        </button>
    );
}

export default function ProjectMediaGrid({
    projectTitle,
    mediaItems = [],
    height,
    onMediaSelect,
}) {
    const imageGridRef = useRef(null);
    const [imageGridSize, setImageGridSize] = useState({ width: 0, height: 0 });
    const [imageGridGap, setImageGridGap] = useState(0);
    const updateImageGridMetrics = useCallback(() => {
        const imageGridElement = imageGridRef.current;

        if (!imageGridElement) {
            return;
        }

        const { width, height: gridHeight } = imageGridElement.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(imageGridElement);
        const gap = parseFloat(computedStyle.columnGap) || 0;

        setImageGridSize((currentSize) => (
            Math.abs(currentSize.width - width) < 1 &&
            Math.abs(currentSize.height - gridHeight) < 1
                ? currentSize
                : { width, height: gridHeight }
        ));
        setImageGridGap((currentGap) => (
            Math.abs(currentGap - gap) < 1 ? currentGap : gap
        ));
    }, []);

    const mediaEntries = mediaItems.map((media, index) => ({ media, index }));
    const trailerEntry = mediaEntries.find(({ media }) => media.type === "video");
    const imageEntries = mediaEntries.filter(({ media }) => media.type === "image");
    const hasTrailer = Boolean(trailerEntry);
    const hasImages = imageEntries.length > 0;
    const { columns: imageColumns, rows: imageRows } = getBalancedImageGrid(
        imageEntries.length,
        hasTrailer,
        imageGridSize,
        imageGridGap,
    );
    const mediaGridStyle = {
        ...(height ? { "--project-media-grid-height": `${height}px` } : {}),
        "--project-media-image-columns": imageColumns,
        "--project-media-image-rows": imageRows,
    };
    const mediaGridClassName = [
        "project-media-grid",
        hasTrailer ? "project-media-grid-with-trailer" : "project-media-grid-images-only",
        hasImages ? "project-media-grid-with-images" : "project-media-grid-trailer-only",
    ].join(" ");

    useLayoutEffect(() => {
        if (!hasImages) {
            return undefined;
        }

        updateImageGridMetrics();

        const imageGridElement = imageGridRef.current;

        if (!imageGridElement) {
            return undefined;
        }

        let resizeObserver;

        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(updateImageGridMetrics);
            resizeObserver.observe(imageGridElement);
        }

        window.addEventListener("resize", updateImageGridMetrics);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener("resize", updateImageGridMetrics);
        };
    }, [hasImages, height, imageEntries.length, updateImageGridMetrics]);

    if (mediaItems.length === 0) {
        return null;
    }

    return (
        <aside
            className={mediaGridClassName}
            style={mediaGridStyle}
            aria-label={`${projectTitle} media`}
        >
            {trailerEntry && (
                <ProjectMediaButton
                    media={trailerEntry.media}
                    mediaIndex={trailerEntry.index}
                    projectTitle={projectTitle}
                    className="project-media-grid-trailer"
                    onMediaSelect={onMediaSelect}
                />
            )}
            {hasImages && (
                <div className="project-media-image-grid" ref={imageGridRef}>
                    {imageEntries.map(({ media, index }) => (
                        <ProjectMediaButton
                            key={media.key}
                            media={media}
                            mediaIndex={index}
                            projectTitle={projectTitle}
                            className="project-media-grid-image"
                            onMediaSelect={onMediaSelect}
                        />
                    ))}
                </div>
            )}
        </aside>
    );
}
