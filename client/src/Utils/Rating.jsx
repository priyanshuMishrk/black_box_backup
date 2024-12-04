import React, { useState } from 'react';
import Star from './Star';

const Rating = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (newValue) => {
    onChange(newValue);
  };

  const handleMouseEnter = (newValue) => {
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        filled={hoverValue >= i || value >= i}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
      />
    );
  }

  return <div>{stars}</div>;
};

export default Rating;