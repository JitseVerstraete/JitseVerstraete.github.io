import React from 'react';
import './ProjectCard.css';

import thumbnail from '../../assets/profilePicture.jpg';

export default function ProjectCard() {
    return (
        
        <button className="project-card">
            <img src={thumbnail} className='project-thumbnail'></img>
            <div class="project-content">
                <h3 class="project-card-title">Project Name</h3>

                <p class="project-description">
                    A short description explaining what the project does and the main goal behind it.
                </p>

                <div class="project-tags">
                    <span class="tag">Tag1</span>
                    <span class="tag">Tag2</span>
                    <span class="tag">Tag3</span>
                </div>
            </div>
        </button>
    );
}