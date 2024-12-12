import React from 'react';

const Star = ({ filled, onClick }) => {
  return (
    <span
      style={{ color: filled ? 'yellow' : 'grey', cursor: 'pointer' }}
      onClick={onClick}
    >
      &#9733; {/* Unicode for star */}
    </span>
  );
};

export default Star;