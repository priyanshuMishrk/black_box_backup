import React from 'react';
import StreamingForm from './StarterStream';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';

const StreamSt = () => {
  return (
    <>
    
    <Header/>
    <div>
      <h1 className='stlst fsbfont'>Start Streaming</h1>
      <StreamingForm />
    </div>
    <Footer/>
    </>
  );
};

export default StreamSt;
