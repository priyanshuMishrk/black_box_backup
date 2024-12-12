import React, { useContext, useEffect } from 'react';
import './Loader.css'; // Import your custom styles
import axios from 'axios';
import AuthContext, { BaseUrl } from '../Context/AuthContext';

const Loader = () => {
    const { loginProcess } = useContext(AuthContext);

    useEffect(()=>{
        
        axios
      .get(BaseUrl + "/socialuser")
      .then((res) => {
        // req.data.password = "$2b$12$MHbP0b075uWiH20gQOkMRe4bz4h46Rp0X7D/zXA.6qB4fzRSiLlIi"
        console.log(res, "the social res");
        loginProcess(res);
      })
      .catch((err) => {
        console.log(err, "the error of social msg");
      });
    },[])
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;