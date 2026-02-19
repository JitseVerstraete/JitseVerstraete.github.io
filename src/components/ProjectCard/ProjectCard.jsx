import React from 'react';
import './ProjectCard.css';

import thumbnail from '../../assets/profilePicture.jpg';

export default function ProjectCard({title, description, image, tags}) {
    return (
        
        <button className="project-card">
            <img src={image} alt={title} className='project-thumbnail'></img>
            <div className="project-content">
                <h3 className="project-card-title">{title}</h3>

                <p className="project-description">
                    {description}
                </p>

                <div className="project-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </button>
    );
}