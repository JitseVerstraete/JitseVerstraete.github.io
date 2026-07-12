import React from "react";
import {
    getIconLinkLabel,
    getLinkIconElement,
    hasIconLinkContent,
} from "./IconLink.helpers";
import "./IconLink.css";

export default function IconLink({
    href,
    url,
    label,
    iconId,
    className = "",
    target,
    rel,
    ariaLabel,
    title,
}) {
    const linkHref = href || url;

    if (!hasIconLinkContent({ href: linkHref, label, iconId })) {
        return null;
    }

    const iconElement = getLinkIconElement(iconId);
    const linkLabel = ariaLabel || getIconLinkLabel({ label, iconId });
    const hasLabel = Boolean(label);
    const relValue = rel ?? (target === "_blank" ? "noreferrer" : undefined);
    const classNames = [
        "icon-link",
        hasLabel ? "icon-link-with-label" : "icon-link-icon-only",
        className,
    ].filter(Boolean).join(" ");

    return (
        <a
            className={classNames}
            href={linkHref}
            target={target}
            rel={relValue}
            aria-label={linkLabel}
            title={title || linkLabel}
        >
            {iconElement}
            {hasLabel && <span className="icon-link-label">{label}</span>}
        </a>
    );
}
