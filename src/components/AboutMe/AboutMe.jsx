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
                    I'm a game development graduate from Digital Arts and Entertainment in Kortrijk. During my studies,
                    I developed both my technical skills and my passion for making creative gaming experiences.
                </p>
                <p>
                    Before starting at DAE, I studied Applied Informatics for one semester, where I discovered my
                    interest in programming. Combined with my enthusiasm for video games, that led me to Howest's game
                    development curriculum.
                </p>
                <p>
                    In my free time, I enjoy playing music to relax and unwind. I learned to play drums in music school
                    and taught myself guitar. Besides music, I love playing video games, including Satisfactory, Sea of
                    Thieves, Outer Wilds, Risk of Rain 2, and Dead Cells.
                </p>
                <p>
                    I would love to be part of a team that makes memorable games like these. If you have any questions,
                    feel free to contact me through my socials or email.
                </p>
            </div>
        </ContentSection>
    );
}
