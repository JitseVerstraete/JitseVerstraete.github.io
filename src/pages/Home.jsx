import React from "react";
import Hero from "../components/Hero/Hero";
import ProjectSection from "../components/ProjectSection/ProjectSection";

const projectSections = [
  { id: "professional", title: "Professional Work" },
  { id: "student", title: "Student Projects" },
  { id: "game-jam", title: "Game Jams" },
];

export default function Home() {
  return (
    <div>
      <Hero />
      {projectSections.map((section) => (
        <ProjectSection
          key={section.id}
          title={section.title}
          section={section.id}
        />
      ))}
    </div>
  )
}
