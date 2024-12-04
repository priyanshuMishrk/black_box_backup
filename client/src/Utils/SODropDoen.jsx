import React, { useState, useEffect } from 'react';

const SingleOptionSelect = ({ question, options, answer, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(answer);

  useEffect(() => {
    onAnswer(selectedOption);
  }, [selectedOption, onAnswer]);

  const [inp, setInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const otherClicked = () => {
    setSelectedOption("Other")
    setInput(true)
  }

  const handleInputView2 = () => {
    setInput(false)
  }

  return (
    <div>
      <h2 className='questionOfQma gsb'>{question}</h2>
      <div className='optionsToTickQMA'>
      {options.map(option => (
        <div key={option} onClick={() => setSelectedOption(option)} style={{ cursor: 'pointer' }}
            className='optionToTickQMA fmfont'
        >
          {option} {<span className='tickInQMA'></span>} {selectedOption === option && <span className='tickInQMAA'>✔</span>} 
        </div>
      ))}
      <div className="optionToTickQMA cp"
      onClick={otherClicked}
      >
        {inputValue ? inputValue : "Others"}
        <span className='tickInQMA'></span> 
        {selectedOption === "Others" && <span className='tickInQMAA'>✔</span>}
      </div>
      </div>
      {
      inp &&
      <div className='inputForQNAH'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Instagram"
        className='gl'
      />
      <div className='gsb'>
      Tell us where did you heard about us.
      </div> 
      <button className='gsb'
      onClick={() => handleInputView2()}
      >Done</button>
      </div>
      }

    </div>
  );
};

export default SingleOptionSelect;
