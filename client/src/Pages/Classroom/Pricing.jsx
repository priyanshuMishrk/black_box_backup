import React, { useState, useEffect } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../Context/AuthContext";
import Select from 'react-select';
import currencies from '../../Utils/Currency.json'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  ['bold', 'italic', 'underline'], // Bold, italic, underline
  [{ 'list': 'bullet' }] // Bullet points
];

const modules = {
  toolbar: toolbarOptions
};

const ClassPricing = ({ infoTaker, infoGetter }) => {
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
    localStorage.getItem("tokenClr")
      ? localStorage.getItem("tokenClr")
      : null,
  );

  const [isTeacher, setIsTeacher] = useState(false)
  const id = localStorage.getItem("User");
  // useEffect(() => {
  //   async function teachedVerify() {
  //     const res = await axios.get(BaseUrl + `/isTeacher?id=${id}`);
  //     setIsTeacher(res.data)
  //   }

  //   teachedVerify()

  // }, [])


  // useEffect(() => {
  //   async function getAccountDetails() {
  //     const res = await axios.get(BaseUrl + `/accountInfo/my`,
  //       {
  //         headers: { Authorization: `Bearer ${authTokens}` },
  //       });
  //       console.log(res.data)
  //     if (isTeacher) {
  //       infoTaker(2,"accN",res.data.accN)
  //       infoTaker(2,"bankN",res.data.bankN)
  //       infoTaker(2,"holderN",res.data.holderN)
  //       infoTaker(2,"accTpe",res.data.accTpe)
  //       infoTaker(2,"ifsc",res.data.ifsc)
  //     }

  //   }

  //   getAccountDetails()
  // }, [])

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (<>

    <div className="Claser">

      <div className="CIKPricing1">
        <span className="CIFDTitle fsbfont">
          Trainer Name
        </span>
        <span className='CIFDInput fmfont'>
          {/* <ReactQuill id="message" name="message" rows="10"
            style={{
              height: '14vw',
              border: "none",
              marginBottom: "3vw"
            }}
            modules={modules}
            placeholder={`Ex: Brief trainer description covering your interests and what you do. This will be featured on your class page`}
            onChange={infoTaker(2, "trainerBio")}
            value={infoGetter(2, "trainerBio")}

          /> */}
                                                  <input type="text" placeholder='Trainer Email ID' 
                                         onChange={infoTaker(2, "trainerBio")}
                                         value={infoGetter(2, "trainerBio")}
                                        />
        </span>
      </div>
      {/* <div className='CIFDInput d-flex dino fmfont'>
        <input type="text" placeholder="Price per student * " onChange={infoTaker(2, "price")} value={infoGetter(2, "price")} />
        <Select
          className="selcterForCurrency"
          options={currencyOptions}
          onChange={() => infoTaker(2, "currency")}
          value={infoGetter(2, "currency")}
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
      </div> */}

      <div className="dotted9065">

      </div>

      <div>
        <span className="priceHead CIFDTitle fsbfont">
          Trainer Email ID
        </span>

        <div>
        <span className='CIFDInput fmfont'>
                                        <input type="text" placeholder='Trainer Email ID' 
                                         onChange={infoTaker(2,"trainerMailId")}
                                         value={infoGetter(2,"trainerMailId")}
                                        />
                                        </span>
          {/* <span className="CIFDTitle fsbfont orInInputBank">
                OR
            </span>
            <span className='CIFDInput fmfont'>
                <input type="text" placeholder="Your UPI ID" onChange={infoTaker(2,"upi")} value={infoGetter(2,"upi")}/>
            </span> */}
        </div>
        <div>
          {/* <ul className="info3CIFDHost fbfont mt-5">
            <li>All fields are compulsory</li>
            <li>Please note Black Box charges 20% of the total price as platform fees</li>
            <li>Price per student cannot be changed once submitted</li>
          </ul> */}
        </div>
      </div>
    </div>

  </>)
}

export default ClassPricing;