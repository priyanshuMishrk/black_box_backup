import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import { useNavigate } from 'react-router-dom';

const StreamEnded = () => {

    const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <>
    
    <Header/>
    <div className='StreamEndedImg'>
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGJwb2oyb21lMGJ6MDR3MHI3d25iamozZXVoeHpnMWdhd2Jlcm1iYiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9dHM/0uhivjcuh4u3z4dDQv/giphy.gif" alt="" />

        <h2>Redirecting to home page in {countdown}</h2>
    </div>
    <Footer/>
    </>
  );
};

export default StreamEnded;
