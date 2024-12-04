import React, { useState } from 'react';
import './Card.css'; // Import the CSS file

const Card = ({ className, href, jolo, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  className = "dddddddddddddddddvvvvvvvvvvv"
  href = ""
  title = "laslalsla"
  description = "Houseeeeeeeeeeeeeeeeeeeeeeeee"

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`card ${className}`}>
      <a href={href} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        { !isHovered && <div className="card--display profileclassesimg22">
          {/* <i className="material-icons">{iconname}</i> */}
          <img src={jolo} className="classesimg22"
                                alt="classImg"/>
          
        </div>}
        <div className={`card--hover ${isHovered ? 'active' : ''}`} style={{
            zIndex : "200"
        }}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="link">Click to see project</p>
        </div>
      </a>
      <div className="card--border"></div>
    </div>
  );
};

export default Card;