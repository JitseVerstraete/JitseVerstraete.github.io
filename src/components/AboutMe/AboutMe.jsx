import React from "react";
import ContentSection from "../ContentSection/ContentSection";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./AboutMe.css";

export default function AboutMe() {
    return (
        <ContentSection id="about" className="about-me-section">
            <SectionHeader>About me</SectionHeader>
            <div className="about-me-content">
                <p>
                    My name is Jitse, I'm a game programmer from Belgium specialized in creating games and experiences in Unity. 
                    I've developed for various platforms like XR Devices, Web, Mobile and PC.
                </p>
                <p>
                    In 2024, I graduated from Digital Arts and Entertainment in Kortrijk with a bachelor in Game Development.
                    Shortly after, I started working at PreviewLabs, where I've already worked on a myriad of prototypes for commercial games, serious games, scientific research and more.
                </p>
                <p>
                    In my free time, I enjoy playing music to relax and unwind. I learned to play drums in music school
                    and taught myself guitar. Besides music, I love playing video games, including Satisfactory, Sea of
                    Thieves, Outer Wilds, Risk of Rain 2, and Dead Cells.
                </p>
                <p>
                    I value being a part of a team that builds interesting and meaningful experiences in an 
                    environment that encourages growth and creativity.
                </p>
            </div>
        </ContentSection>
    );
}
