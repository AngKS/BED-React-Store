import React from 'react'
import './heroSection.css'


function HeroSection(props) {
    return (
        <div className="hero-container">
            <div className="rounded">{props.content}</div>

        </div>
    )
}

export default HeroSection
