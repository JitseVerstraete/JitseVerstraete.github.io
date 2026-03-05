import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import "./NavigationBar.css";

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
                    <NavLink to="/#projects" className="nav-link" onClick={closeMenu}>
                        Projects
                    </NavLink>
                    <NavLink className="nav-link" onClick={closeMenu}>
                        About Me
                    </NavLink>
                    <div className="nav-sidebar-contact" aria-label="Sidebar contact links">
                        <button type="button" className="nav-contact-button" aria-label="Email contact">
                            <FaEnvelope aria-hidden="true" focusable="false" />
                        </button>
                        <button type="button" className="nav-contact-button" aria-label="GitHub profile">
                            <FaGithub aria-hidden="true" focusable="false" />
                        </button>
                        <button type="button" className="nav-contact-button" aria-label="LinkedIn profile">
                            <FaLinkedinIn aria-hidden="true" focusable="false" />
                        </button>
                    </div>
                </div>
            </nav>
            <div className="nav-contact-actions" aria-label="Contact links">
                <button type="button" className="nav-contact-button" aria-label="Email contact">
                    <FaEnvelope aria-hidden="true" focusable="false" />
                </button>
                <button type="button" className="nav-contact-button" aria-label="GitHub profile">
                    <FaGithub aria-hidden="true" focusable="false" />
                </button>
                <button type="button" className="nav-contact-button" aria-label="LinkedIn profile">
                    <FaLinkedinIn aria-hidden="true" focusable="false" />
                </button>
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
