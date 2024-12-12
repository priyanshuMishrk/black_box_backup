import React, { useState, useEffect } from 'react';

const MultiOptionHighlight = ({ question, options, answer, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState(answer);
  const [inp, setInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [enteredOptions, setEnteredOptions] = useState([]);

  useEffect(() => {
    onAnswer(selectedOptions);
  }, [selectedOptions, onAnswer]);

  const handleSelect = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleInputView = () => {
    setInput(!inp);
  };

  const handleInputView2 = () => {
    setInput(!inp);
    let newSelectedOptions = [...selectedOptions];
    enteredOptions.forEach((ele, index) => {
      options.unshift(ele); // Add new options to the beginning of the list
      if (!newSelectedOptions.includes(ele)) {
        newSelectedOptions.push(ele); // Add new options to selectedOptions
      }
    });
    setSelectedOptions(newSelectedOptions);
    setEnteredOptions([]); // Clear entered options
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newOption = e.target.value.trim();
      if (newOption && !enteredOptions.includes(newOption)) {
        setEnteredOptions((prev) => [newOption, ...prev]);
      }
      setInputValue('');
    }
  };


  return (
    <div className='mllllllllll'>
      <h2 className='questionOfQma gsb'>{question}</h2>

      <div className="gridderQMA">
      {options.map(option => (
        <div
          key={option}
          onClick={() => handleSelect(option)}
          style={{ cursor: 'pointer', backgroundColor: selectedOptions.includes(option) ? '#ffcc004d' : 'white' }}
          className='gridderSelecetQMA gl'
        >
          {option}
        </div>
      ))}
      {/* <div className='gridderSelecetQMA gl  cp' 
        onClick={() => handleInputView()}
      >
          Others
      </div> */}
      </div>

      {
      inp &&
      <div className='inputForQNAH'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type and press Enter or ',' to add"
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

export default MultiOptionHighlight;
