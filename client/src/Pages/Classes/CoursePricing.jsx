import React, { useEffect, useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import currencies from '../../Utils/Currency.json'

const   ClassPricing = ({infoTaker,infoGetter}) => {
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

    useEffect(() => {
      if(isChecked)
        infoTaker(2,"free",true)
  }, [isChecked])

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

    return (<>

        <div className="Claser">

        <div className="CIKPricing1">
            <span className="CIFDTitle fsbfont">
            Course pricing structure
            </span>
            <span className='CIFDInput fmfont'>
                <input type="text" placeholder="Total no of students*" onChange={infoTaker(2,"studentLim")} value={infoGetter(2,"studentLim")}/>
            </span>
        </div>
        <div className='CIFDInput d-flex dino fmfont'>
            <input type="text" placeholder="Price per student * " onChange={infoTaker(2,"price")} value={infoGetter(2,"price")}/>
            {/* <input type="text"  placeholder="Select Currency*" onChange={infoTaker(2,"currency")} value={infoGetter(2,"currency")}/> */}

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
        <span className="CIFDTitle fsbfont spanForFreeClass" >This is a free course</span>
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
                <input type="text" placeholder="Account Type" className="priceInputsBank4" onChange={infoTaker(2,"accTpe")} value={infoGetter(2,"accType")}/>
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