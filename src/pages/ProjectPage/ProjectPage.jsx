import React from "react";
import { Link, useParams } from "react-router-dom";
import projectData from "../../data/projectData.json";
import { projectImages } from "../../data/images";
import ProjectBanner from "../../components/ProjectBanner/ProjectBanner";
import "./ProjectPage.css";

export default function ProjectPage() {
    return(
        <ProjectBanner></ProjectBanner>
    );
}
