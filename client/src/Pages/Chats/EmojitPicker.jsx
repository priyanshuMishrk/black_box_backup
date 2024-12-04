// EmojiPicker.js
import React, { useState, useRef, useEffect } from 'react';
import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';

const EmojiPicker = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);  // Create a reference for the emoji picker button and picker

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji) => {
    onEmojiSelect(emoji.native); // Pass the selected emoji back to parent
    setShowPicker(false); // Close the picker after selection
  };

  // Close the emoji picker if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false); // Close the picker if click is outside the emoji picker
      }
    };

    // Add event listener for clicks outside the component
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={pickerRef}>
      <button onClick={togglePicker}>😊</button>
      {showPicker && (
        <div>
          <Picker onSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
