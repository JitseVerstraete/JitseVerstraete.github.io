import React from "react";
import {
    FaDownload,
    FaEnvelope,
    FaExternalLinkAlt,
    FaFileAlt,
    FaGamepad,
    FaGithub,
    FaItchIo,
    FaLinkedin,
    FaSteam,
    FaYoutube,
} from "react-icons/fa";

const iconProps = {
    "aria-hidden": "true",
    focusable: "false",
};

const linkIconElements = {
    download: React.createElement(FaDownload, iconProps),
    external: React.createElement(FaExternalLinkAlt, iconProps),
    file: React.createElement(FaFileAlt, iconProps),
    gamejam: React.createElement(FaGamepad, iconProps),
    gamepad: React.createElement(FaGamepad, iconProps),
    github: React.createElement(FaGithub, iconProps),
    itch: React.createElement(FaItchIo, iconProps),
    itchio: React.createElement(FaItchIo, iconProps),
    link: React.createElement(FaExternalLinkAlt, iconProps),
    linkedin: React.createElement(FaLinkedin, iconProps),
    mail: React.createElement(FaEnvelope, iconProps),
    email: React.createElement(FaEnvelope, iconProps),
    pdf: React.createElement(FaFileAlt, iconProps),
    resume: React.createElement(FaFileAlt, iconProps),
    steam: React.createElement(FaSteam, iconProps),
    trailer: React.createElement(FaYoutube, iconProps),
    website: React.createElement(FaExternalLinkAlt, iconProps),
    youtube: React.createElement(FaYoutube, iconProps),
};

const linkIconLabels = {
    download: "Download",
    external: "External link",
    file: "File",
    gamejam: "Game jam",
    gamepad: "Game",
    github: "GitHub",
    itch: "Itch.io",
    itchio: "Itch.io",
    link: "External link",
    linkedin: "LinkedIn",
    mail: "Email",
    email: "Email",
    pdf: "PDF",
    resume: "Resume",
    steam: "Steam",
    trailer: "Trailer",
    website: "Website",
    youtube: "YouTube",
};

function normalizeIconId(iconId) {
    return typeof iconId === "string" ? iconId.toLowerCase().replace(/[^a-z0-9]/g, "") : "";
}

export function getLinkIconElement(iconId) {
    const normalizedIconId = normalizeIconId(iconId);
    const iconElement = normalizedIconId
        ? linkIconElements[normalizedIconId] || linkIconElements.external
        : null;

    return iconElement ? React.cloneElement(iconElement) : null;
}

export function getIconLinkLabel({ label, iconId }) {
    const iconLabel = linkIconLabels[normalizeIconId(iconId)];
    return label || iconLabel || "Link";
}

export function hasIconLinkContent(link) {
    return Boolean((link?.href || link?.url) && (link?.label || link?.iconId));
}
