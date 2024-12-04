import React, { useState } from 'react';

function CommentBox() {
    const [showPopup, setShowPopup] = useState(false);
    const [comment, setComment] = useState('');
  
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  
    const handleInputChange = (e) => {
      setComment(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle your comment submission logic here, e.g., send comment to server
      console.log('Comment submitted:', comment);
      // Clear comment input
      setComment('');
      // Close popup
      setShowPopup(false);
    };
  
    return (
      <div className="comment-box-container">
        <button onClick={togglePopup}>Add Comment</button>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={togglePopup}>&times;</span>
              <form onSubmit={handleSubmit}>
                <textarea
                  placeholder="Enter your comment..."
                  value={comment}
                  onChange={handleInputChange}
                  rows={4}
                  cols={50}
                />
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default CommentBox;
