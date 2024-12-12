import React, { useState } from 'react';
import SingleSelectDropdown from '../../Utils/SingleDropDown';
import MultiSelectDropdown from '../../Utils/MultiSelectDropDown';
import SingleOptionSelect from '../../Utils/SODropDoen';
import MultiOptionHighlight from '../../Utils/MOH';
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../blackbox-logo-01.png"
import { BaseUrl } from '../../Context/AuthContext';
import axios from "axios";
import Header from '../../Components/Common/Header';

const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    singleSelect1: '',
    multiSelect1: [],
    singleOption: '',
    multiHighlight: [],
  });


  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );


  const navigate = useNavigate();

  const [isAnswered, setIsAnswered] = useState(false);

  const nextQuestion = async () => {

    if (currentQuestion > 1){
      let data = {}
      if (answers.singleSelect1 !== ''){
        data.whatBrings = answers.singleSelect1
      }

      if (answers.singleOption !== ''){
        data.heardBy = answers.singleOption
      }

      if (answers.multiHighlight !== ''){
        data.interestedTags = answers.multiHighlight
      }


      try {
        const uid = localStorage.getItem("User")

        data.userId = uid
        const res = await axios.post(BaseUrl + `/userInfo`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        console.log(res)
      } catch (err) {
        console.log(err.message);
      }

        navigate('/profile')
        return
    }

    setCurrentQuestion(currentQuestion + 1);
    setIsAnswered(false); // Reset for next question

  };

  const previousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setIsAnswered(true); // Assuming the previous question was already answered
  };

  const handleAnswer = (question, answer) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [question]: answer }));
    setIsAnswered(answer !== '' && answer.length !== 0);
  };

  const questions = [
    <SingleSelectDropdown 
      question="What brings you to BlackBox??" 
      options={
        [
    "Career advancement",
    "Pick up a new hobby",
    "Skill development",
    "Personal interest",
    "Transition in careers",
    "Academic improvement",
    "Networking",
    "Entrepreneurship"
]
    } 
      answer={answers.singleSelect1}
      onAnswer={(answer) => handleAnswer('singleSelect1', answer)}
    />,
    // <MultiSelectDropdown 
    //   question="What's your current industry?" 
    //   options={["Information Technology", "Healthcare", "Education", "Finance", "Marketing & Advertising", "Retail & E-commerce", "Manufacturing", "Government", "Real Estate", "Transportation & Logistics", "Hospitality & Tourism", "Media & Entertainment", "Energy & Utilities", "Nonprofit & Social Services", "Legal Services", "Consulting", "Agriculture", "Construction" , "Telecommunications"]}   // ADD the other options here
    //   answer={answers.multiSelect1}
    //   onAnswer={(answer) => handleAnswer('multiSelect1', answer)}
    // />,
    <MultiOptionHighlight 
      question="Choose your interests. This helps us improve our recommendations before you jump in!" 
      options={["Wellness", "Health", "Marketing", "Photography" , "Arts and Crafts", "Writing", "Music", "Design", "Culinary Arts", "Baking", "Pottery", "Technology", "Performing arts", "Science", "Cinema", "Coding"]} 
      answer={answers.multiHighlight}
      onAnswer={(answer) => handleAnswer('multiHighlight', answer)}
    />,
    <SingleOptionSelect 
      question="How did you hear about us?" 
      options={["E-Mail", "WhatsApp", "Instagram"]} 
      answer={answers.singleOption}
      onAnswer={(answer) => handleAnswer('singleOption', answer)}
    />,
    
  ];

  return (
<>
    <Header/>
    <div className='questiondiv'>
    
    <div className="questionBanner gb">
        <div className="qbLogo">
            <img src={Logo} alt="BlackBox Logo" />
        </div>
        <div className="qbSpans">
            
                <span className="faded">

                    {currentQuestion === 0 ? "Welcome to" :  currentQuestion === 1 ? "What all would you" : currentQuestion === 2 ? "Ready to Dive In?":""  }
                
            </span>
            <span className="bold">
                { currentQuestion === 2 && <span className="faded mkls">
                    {currentQuestion === 2 ? "Just":"" }   
                </span>}
            {currentQuestion === 0 ? "Black box" : currentQuestion === 1 ?  "like to learn?" : currentQuestion === 2 ? "One":""  }

                
            </span>
            <span className="faded">
            {currentQuestion === 2 &&  <span className="bold mkls">
                     More  
            </span>}
            {currentQuestion === 0 ? "Let’s get started !" : currentQuestion === 1 ? "" : currentQuestion === 2 ? "Step!":""  }
            </span>
            
        </div>
    </div>


    <div className="Question">
      {questions[currentQuestion]}
      <div className='buttonsToskip'>
        {
          <button className='buttonsToskip1 gsb' onClick={nextQuestion}>Skip</button>
        }

        <span className='indexForQuestion gb'> {`${currentQuestion +1}/3`} </span>

        
          <button onClick={nextQuestion} disabled={!isAnswered} className='buttonsToskip2 gsb'>{currentQuestion < questions.length - 1 ? "Next" :  "Done"}</button>
        
      </div>
    </div>
    <div>
    </div>
    
    </div>

</>
  );
};

export default Question;
