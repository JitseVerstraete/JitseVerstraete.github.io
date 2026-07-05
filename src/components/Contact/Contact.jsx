import React from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import ContentSection from "../ContentSection/ContentSection";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./Contact.css";

const contactLinks = [
    {
        label: "Email",
        value: "jitse.verstraete@gmail.com",
        href: "mailto:jitse.verstraete@gmail.com",
        icon: FaEnvelope,
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/jitseverstraete",
        href: "https://www.linkedin.com/in/jitseverstraete/",
        icon: FaLinkedinIn,
    },
    {
        label: "GitHub",
        value: "github.com/JitseVerstraete",
        href: "https://github.com/JitseVerstraete",
        icon: FaGithub,
    },
];

export default function Contact() {
    return (
        <ContentSection id="contact" className="contact-section">
            <SectionHeader>Contact</SectionHeader>
            <p className="contact-callout">
                Interested in working together or want to ask about one of my projects? Feel free to reach out.
            </p>
            <div className="contact-links">
                {contactLinks.map(({ label, value, href, icon }) => (
                    <a
                        key={label}
                        className="contact-link"
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                    >
                        <span className="contact-link-icon">
                            {React.createElement(icon, { "aria-hidden": true, focusable: "false" })}
                        </span>
                        <span>
                            <strong>{label}</strong>
                            <span>{value}</span>
                        </span>
                    </a>
                ))}
            </div>
        </ContentSection>
    );
}
