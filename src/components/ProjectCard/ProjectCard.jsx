import React from 'react';
import './ProjectCard.css';
import { projectImages } from "../../data/images";
import { Link } from 'react-router-dom';


export default function ProjectCard({data}) {
    return (
        <Link className="project-card" to={`/projects/${data.id}`}>
            <img src={projectImages[data.image]} alt={data.title} className='project-thumbnail'></img>
            <div className="project-content">
                <h3 className="project-card-title">{data['title']}</h3>

                <p className={`project-description${data.projectTimestamp ? " has-project-timestamp" : ""}`}>
                    {data['description']}
                </p>
                {data.projectTimestamp && (
                    <p className="project-timestamp">{data.projectTimestamp}</p>
                )}

                <div className="project-tags">
                    {data.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
