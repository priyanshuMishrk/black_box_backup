import React, { useState, useEffect } from 'react';

const SingleSelectDropdown = ({ question, options, answer, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(answer);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [placeholding, setPH] = useState("Learning new Skills");

  useEffect(() => {
    onAnswer(selectedOption);
  }, [selectedOption, onAnswer]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setFilteredOptions(options.filter(option => option.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const handleSelect = (option) => {
    if (option === 'Other') {
      setIsOtherSelected(true);
      setSelectedOption('');
      setPH("Please specify here")
      setShowDropdown(false);
    } else {
      setSelectedOption(option);
      setShowDropdown(false);
    }
  };

  // const handleOtherChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };

  const showIt = () => {
    if (placeholding === "Learning new Skills"){
      setShowDropdown(!showDropdown)
    }
  }

  return (
    <div>
      <h2 className='questionOfQma gsb'>{question}</h2>
      <input
        type="text"
        value={selectedOption}
        onChange={ handleChange}
        onClick={showIt}
        placeholder={placeholding}
        className='inputBoxOfQma gl'
      />
      {showDropdown && (
        <ul className='slecttheOption gsb'>
          {filteredOptions.map(option => (
            <li key={option}  onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
          <li onClick={() => handleSelect('Other')}>Others (please specify)</li>
        </ul>
      )}
    </div>
  );
};

export default SingleSelectDropdown;
