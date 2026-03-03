import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar() {
    return (
        <header className="navigation-bar">
            <nav className="navigation-bar-inner" aria-label="Main navigation">
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
                <NavLink to="/#projects" className="nav-link">
                    Projects
                </NavLink>
                <NavLink className="nav-link">
                    About Me
                </NavLink>
                <NavLink className="nav-link">
                    Contact
                </NavLink>
            </nav>
        </header>
    );
}
