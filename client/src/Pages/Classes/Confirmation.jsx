import React, { useState, useEffect } from 'react';
import './Style.css';
import Header from '../../Components/Common/Header';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const [bgColor, setBgColor] = useState(false);
  const name = localStorage.getItem("name");
  const fname = name.split(" ")[0]

  useEffect(() => {
    const timer = setTimeout(() => {
      setBgColor(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const nava = useNavigate()

  return (
    
    <div className={`page ${bgColor ? 'transition-bg' : ''}`}>
        <Header/>
        <div className='Confirmations'>
            <span className='Confirmation1 gb'>
            Congratulations {fname}
            </span>
            <span className='Confirmation2 gl'>
            We have received your application and will revert back to you in 24 to 48 hours.
            </span>
            <span className='Confirmation3 gm'>
                <button onClick={() => 
                  {nava('/profile')}
                }>
                  Homepage
                </button>
            </span>

            <span className='Confirmation5 gm'>
            If you have further questions, visit our FAQs page
            </span>
        </div>
    </div>
  );
};

export default Confirmation;
