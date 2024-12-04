import React from 'react';
import { BsChevronCompactLeft } from 'react-icons/bs';

const Popup = ({ isOpen, togglePopup }) => {
    console.log(true)
  return (
    <div className={`popup-container ${isOpen ? 'open' : ''}`}>
      <div className="popup">
        <div className="popup-header">
          <button className="close-btn" onClick={togglePopup}>Close</button>
        </div>
        <div className="popup-content">
          {/* Your content goes here */}
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel nulla eu elit vehicula lacinia.</p>
          {/* Add more content if needed */}
        </div>
      </div>
    </div>
  );
};

export default Popup;