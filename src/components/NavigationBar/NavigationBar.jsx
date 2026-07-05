import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import "./NavigationBar.css";

const contactActions = [
    {
        label: "Email contact",
        href: "mailto:jitse.verstraete@gmail.com",
        icon: FaEnvelope,
    },
    {
        label: "GitHub profile",
        href: "https://github.com/JitseVerstraete",
        icon: FaGithub,
    },
    {
        label: "LinkedIn profile",
        href: "https://www.linkedin.com/in/jitseverstraete/",
        icon: FaLinkedinIn,
    },
];

export default function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((previousState) => !previousState);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="navigation-bar">
            <span className="nav-name">Jitse Verstraete</span>
            <button
                type="button"
                className="nav-menu-toggle"
                aria-expanded={isMenuOpen}
                aria-controls="primary-nav-links"
                aria-label="Toggle navigation menu"
                onClick={toggleMenu}
            >
                <span />
                <span />
                <span />
            </button>
            <nav className="navigation-bar-inner" aria-label="Main navigation">
                <div id="primary-nav-links" className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                    <NavLink to="/" className="nav-link" onClick={closeMenu}>
                        Home
                    </NavLink>
                    <NavLink to="/#about" className="nav-link" onClick={closeMenu}>
                        About Me
                    </NavLink>
                    <NavLink to="/#projects" className="nav-link" onClick={closeMenu}>
                        Projects
                    </NavLink>
                    <NavLink to="/#contact" className="nav-link" onClick={closeMenu}>
                        Contact
                    </NavLink>
                    <div className="nav-sidebar-contact" aria-label="Sidebar contact links">
                        {contactActions.map(({ label, href, icon }) => (
                            <a
                                key={label}
                                href={href}
                                className="nav-contact-button"
                                aria-label={label}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noreferrer" : undefined}
                                onClick={closeMenu}
                            >
                                {React.createElement(icon, { "aria-hidden": true, focusable: "false" })}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
            <div className="nav-contact-actions" aria-label="Contact links">
                {contactActions.map(({ label, href, icon }) => (
                    <a
                        key={label}
                        href={href}
                        className="nav-contact-button"
                        aria-label={label}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                    >
                        {React.createElement(icon, { "aria-hidden": true, focusable: "false" })}
                    </a>
                ))}
            </div>
            {isMenuOpen && (
                <button
                    type="button"
                    className="nav-backdrop"
                    aria-label="Close navigation menu"
                    onClick={closeMenu}
                />
            )}
        </header>
    );
}
