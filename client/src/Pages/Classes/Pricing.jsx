import React, { useState, useEffect } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../Context/AuthContext";
import Select from 'react-select';
import currencies from '../../Utils/Currency.json'

const ClassPricing = ({infoTaker,infoGetter}) => {
  const [currencyOptions, setCurrencyOptions] = useState([]);

    
   
    useEffect(() => {
        // Convert the JSON object to an array of objects with value and label fields
        const options = Object.entries(currencies).map(([code, name]) => ({
          value: code,
          label: `${code} - ${name}`,
        }));
        setCurrencyOptions(options);
      }, []);
    const [isChecked, setIsChecked] = useState(false);
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    const [isTeacher, setIsTeacher] = useState(false)
  const id = localStorage.getItem("User");
  useEffect(() => {
    async function teachedVerify() {
      const res = await axios.get(BaseUrl + `/isTeacher?id=${id}`);
      setIsTeacher(res.data)
    }

    teachedVerify()

  }, [])
  

  useEffect(() => {
    async function getAccountDetails() {
      const res = await axios.get(BaseUrl + `/accountInfo/my`,
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        console.log(res.data)
      if (isTeacher) {
        infoTaker(2,"accN",res.data.accN)
        infoTaker(2,"bankN",res.data.bankN)
        infoTaker(2,"holderN",res.data.holderN)
        infoTaker(2,"accTpe",res.data.accTpe)
        infoTaker(2,"ifsc",res.data.ifsc)
      }

    }

    // getAccountDetails()
  }, [])

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    infoTaker(2,"free",isChecked)
  };
  useEffect(() => {
    if(isChecked){
      console.log('doingggggg')
      try{
        infoTaker(2,"free",true)
      }catch(errr){
        console.log(errr)
      }
    }
}, [isChecked, infoTaker])

    return (<>

        <div className="Claser">

        <div className="CIKPricing1">
            <span className="CIFDTitle fsbfont">
            Class pricing structure
            </span>
            <span className='CIFDInput fmfont'>
                <input type="text" placeholder="Total no of students*" onChange={infoTaker(2,"studentLim")} value={infoGetter(2,"studentLim")}/>
            </span>
        </div>
        <div className='CIFDInput d-flex dino fmfont'>
            <input type="text" placeholder="Price per student * " onChange={infoTaker(2,"price")} value={infoGetter(2,"price")}/>
            <Select
          className="selcterForCurrency"
          options={currencyOptions}
          onChange={()=>infoTaker(2,"currency") }
          value={infoGetter(2,"currency")}
          placeholder="Select a currency..."
        />
        </div>
        <div className="checkbox-container">
      <input
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="checkbox">
        <div className={`tick ${isChecked ? 'checked' : ''}`}>✔</div>
      </label>
        <span className="CIFDTitle fsbfont spanForFreeClass" >This is a free class</span>
    </div>

    <div className="dotted9065">

    </div>

    <div>
        <span className="priceHead CIFDTitle fsbfont">
        Your Account details
        </span>

        <div>
            <span className='CIFDInput priceInputsBank fmfont'>
                <input type="text" placeholder="Bank Account No. *" max={10} min={10} className="priceInputsBank1" onChange={infoTaker(2,"accN")} value={infoGetter(2,"accN")}/>
                <input type="text" placeholder="Bank Name" className="priceInputsBank2" onChange={infoTaker(2,"bankN")} value={infoGetter(2,"bankN")}/>
                <input type="text" placeholder="Name" className="priceInputsBank3" onChange={infoTaker(2,"holderN")} value={infoGetter(2,"holderN")}/>
                <input type="text" placeholder="Account Type" className="priceInputsBank4" onChange={infoTaker(2,"accTpe")} value={infoGetter(2,"accTpe")}/>
                <input type="text" placeholder="Bank IFSC" className="priceInputsBank5" onChange={infoTaker(2,"ifsc")} value={infoGetter(2,"ifsc")}/>
            </span>
            {/* <span className="CIFDTitle fsbfont orInInputBank">
                OR
            </span>
            <span className='CIFDInput fmfont'>
                <input type="text" placeholder="Your UPI ID" onChange={infoTaker(2,"upi")} value={infoGetter(2,"upi")}/>
            </span> */}
        </div>
        <div>
            <ul className="info3CIFDHost fbfont mt-5">
                <li>All fields are compulsory</li>
                <li>Please note Black Box charges 20% of the total price as platform fees</li>
                <li>Price per student cannot be changed once submitted</li>
            </ul>
        </div>
    </div>
        </div>

    </>)
}

export default ClassPricing;