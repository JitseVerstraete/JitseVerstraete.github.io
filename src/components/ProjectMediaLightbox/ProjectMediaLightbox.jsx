import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ProjectMediaLightbox.css";

export default function ProjectMediaLightbox({
    projectTitle,
    mediaItems = [],
    initialIndex = 0,
    onClose,
}) {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const carouselRef = useRef(null);
    const activeMediaRef = useRef(null);
    const [carouselWidth, setCarouselWidth] = useState(null);
    const selectedMedia = mediaItems[selectedIndex] || mediaItems[0];
    const updateCarouselWidth = useCallback(() => {
        const activeMediaElement = activeMediaRef.current;

        if (!activeMediaElement) {
            return;
        }

        const nextWidth = activeMediaElement.getBoundingClientRect().width;

        setCarouselWidth((currentWidth) => (
            Math.abs((currentWidth || 0) - nextWidth) < 1 ? currentWidth : nextWidth
        ));
    }, [setCarouselWidth]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        if (!selectedMedia || !carouselRef.current) {
            return;
        }

        const carousel = carouselRef.current;
        const activeCarouselItem = carousel.querySelector(
            `[data-media-index="${selectedIndex}"]`
        );

        if (!activeCarouselItem) {
            return;
        }

        const carouselRect = carousel.getBoundingClientRect();
        const activeItemRect = activeCarouselItem.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;
        const activeItemCenter = activeItemRect.left + activeItemRect.width / 2;
        const scrollLeft = carousel.scrollLeft + activeItemCenter - carouselCenter;

        carousel.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
        });
    }, [carouselWidth, selectedIndex, selectedMedia]);

    useEffect(() => {
        if (!selectedMedia) {
            return undefined;
        }

        updateCarouselWidth();

        const activeMediaElement = activeMediaRef.current;

        if (!activeMediaElement) {
            return undefined;
        }

        let resizeObserver;

        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(updateCarouselWidth);
            resizeObserver.observe(activeMediaElement);
        }

        window.addEventListener("resize", updateCarouselWidth);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener("resize", updateCarouselWidth);
        };
    }, [selectedMedia, updateCarouselWidth]);

    const showMediaAtIndex = (index) => {
        const mediaCount = mediaItems.length;

        if (mediaCount === 0) {
            return;
        }

        setSelectedIndex((index + mediaCount) % mediaCount);
    };

    if (!selectedMedia) {
        return null;
    }

    return (
        <div
            className="project-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${projectTitle} fullscreen ${selectedMedia.type}`}
            onClick={onClose}
        >
            <button
                type="button"
                className="project-lightbox-close"
                onClick={onClose}
                aria-label="Close fullscreen media"
            >
                &times;
            </button>
            {mediaItems.length > 1 && (
                <>
                    <button
                        type="button"
                        className="project-lightbox-nav project-lightbox-nav-previous"
                        onClick={(event) => {
                            event.stopPropagation();
                            showMediaAtIndex(selectedIndex - 1);
                        }}
                        aria-label="Show previous media item"
                    >
                        <FaChevronLeft aria-hidden="true" focusable="false" />
                    </button>
                    <button
                        type="button"
                        className="project-lightbox-nav project-lightbox-nav-next"
                        onClick={(event) => {
                            event.stopPropagation();
                            showMediaAtIndex(selectedIndex + 1);
                        }}
                        aria-label="Show next media item"
                    >
                        <FaChevronRight aria-hidden="true" focusable="false" />
                    </button>
                </>
            )}
            <figure
                className={`project-lightbox-figure project-lightbox-figure-${selectedMedia.type}`}
                onClick={(event) => event.stopPropagation()}
            >
                {selectedMedia.type === "video" ? (
                    <iframe
                        ref={activeMediaRef}
                        className="project-lightbox-video-frame"
                        src={selectedMedia.embedUrl}
                        title={`${projectTitle} video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                ) : (
                    <img
                        ref={activeMediaRef}
                        src={selectedMedia.src}
                        alt={`${projectTitle} gallery ${selectedMedia.imageIndex + 1}`}
                        onLoad={updateCarouselWidth}
                    />
                )}
                <figcaption>
                    {selectedIndex + 1} of {mediaItems.length}
                </figcaption>
                {mediaItems.length > 1 && (
                    <div
                        className="project-lightbox-carousel"
                        ref={carouselRef}
                        style={carouselWidth ? { width: `${carouselWidth}px` } : undefined}
                        aria-label={`${projectTitle} media carousel`}
                    >
                        {mediaItems.map((media, index) => (
                            <button
                                type="button"
                                className={`project-lightbox-carousel-item${selectedIndex === index ? " project-lightbox-carousel-item-active" : ""}`}
                                key={media.key}
                                data-media-index={index}
                                onClick={() => showMediaAtIndex(index)}
                                aria-label={`Show ${projectTitle} ${media.type === "video" ? "video" : `gallery image ${media.imageIndex + 1}`}`}
                                aria-current={selectedIndex === index ? "true" : undefined}
                            >
                                {media.type === "video" ? (
                                    <>
                                        <img src={media.thumbnailUrl} alt={`${projectTitle} video thumbnail`} />
                                        <span className="project-lightbox-video-play-indicator" aria-hidden="true" />
                                    </>
                                ) : (
                                    <img src={media.src} alt={`${projectTitle} gallery ${media.imageIndex + 1} thumbnail`} />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </figure>
        </div>
    );
}
