import React from 'react';
import './Hero.css';
import profilePicture from '../../assets/profilePicture.jpg';
import resume from '../../assets/JitseVerstraeteResume.pdf';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-image-section">
                    <img src={profilePicture} alt="Profile" className="profile-picture" />
                </div>
                <div className="hero-text-section">
                    <h1>Jitse Verstraete</h1>
                    <h2>Game Developer</h2>
                    <a className="hero-resume-link" href={resume} target="_blank" rel="noopener noreferrer">
                        Resume
                    </a>
                </div>
                <div>

                </div>
            </div>
        </section>
    );
}
