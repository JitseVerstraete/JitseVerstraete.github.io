import React from "react";
import Hero from "../components/Hero/Hero";
import AboutMe from "../components/AboutMe/AboutMe";
import ProjectSection from "../components/ProjectSection/ProjectSection";
import ContentSection from "../components/ContentSection/ContentSection";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Contact from "../components/Contact/Contact";
import { projectSections } from "../data/projectData.js";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutMe />
      <ContentSection id="projects" className="projects-section">
        <SectionHeader>Projects</SectionHeader>
        {projectSections.map((section) => (
          <ProjectSection
            key={section.id}
            title={section.title}
            section={section.id}
          />
        ))}
      </ContentSection>
      <Contact />
    </div>
  )
}
