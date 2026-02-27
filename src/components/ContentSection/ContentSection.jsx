import React from "react";
import "./ContentSection.css";

export default function ContentSection({ as: Tag = "section", className = "", children }) {
    const classes = ["content-section", className].filter(Boolean).join(" ");
    return <Tag className={classes}>{children}</Tag>;
}
