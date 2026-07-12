import React from 'react';
import './Hero.css';
import profilePicture from '../../assets/profilePicture.jpg';
import resume from '../../assets/JitseVerstraeteResume.pdf';
import IconLink from '../IconLink/IconLink';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-image-section">
                    <img src={profilePicture} alt="Profile" className="profile-picture" />
                </div>
                <div className="hero-text-section">
                    <h1 className="hero-title">Jitse Verstraete</h1>
                    <h2 className="hero-subtitle">Game Developer</h2>
                    <div className="hero-links">
                        <IconLink
                            className="hero-resume-link"
                            href={resume}
                            label="Resume"
                            iconId="resume"
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                        <IconLink
                            className="hero-resume-link"
                            href="mailto:jitse.verstraete@gmail.com"
                            iconId="mail"
                        />
                        <IconLink
                            className="hero-resume-link"
                            href="https://github.com/JitseVerstraete"
                            iconId="github"
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                        <IconLink
                            className="hero-resume-link"
                            href="https://www.linkedin.com/in/jitseverstraete/"
                            iconId="linkedin"
                            target="_blank"
                            rel="noopener noreferrer"
                        />

                    </div>
                </div>
                <div>

                </div>
            </div>
        </section>
    );
}
