import React, { useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { useNavigate } from "react-router-dom";
import lien1 from "../../Images/group-line.svg"

const TACD = () => {
  const nava = useNavigate()
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function holo() {
    nava('/classSubmitted')
  }


  return (
    <>
      <Header />
      <div className="Claser jooooi">
        <div>
          <span className="headingForClassInfo gsb">
            You’re almost there. We just want to make sure we’re on the same page about a few things.
          </span>
          <span>
            <ul className="VFDTitle gm">
              <li className="mb-3">
                You will honor any enrollments through BlackBox.com at the price and time listed in the Service, and not refuse enrollments or participation by any student for any discriminatory or other illegal reason.
              </li>
              <li className="mb-3">
                You grant us the right to place advertisements on your content at our sole discretion.
              </li>
              <li className="mb-3">
                Any content you submit to the Service will not contain third party copyrighted material, or material that is subject to other third party proprietary rights, unless you have permission from the rightful owner of the material.
              </li>
            </ul>
          </span>
        </div>
        <div>
          <div className="headingForClassInfo gsb mb-4 mt-5">
            <img src={lien1} className="jjkolmn" alt="" />
            Dos and Donts
          </div>
          <span>
            <span className="VFDTitle jokkkkkkk gm">
              <span className="mb-3">
                You represent and warrant to BlackBox that you are qualified to teach the classes that you list with the Service and that you will at all times conduct yourself in a professional manner and in compliance with all applicable laws.
              </span>
              <span className="mb-3">
                You understand that, if you teach a class, your students will have the ability to post a review of this class. We cannot control the contents of any such review and will not be held responsible for any information or opinions that a user may include in any such review.
              </span>
              <span className="mb-3">
                You may choose to remove content from your class and will continue to own such content, but we will continue to have the right to use that content and to provide it to students who have paid for or enrolled in your class.
              </span>
            </span>
          </span>
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
          <span className="CIFDTitle gsb spanForFreeClass">I agree to the terms and conditions</span>
        </div>

        <div className="TAQB">
          <button className="f" onClick={() => {
            nava('/profile')
          }}>
            Cancel
          </button>
          <button className="t" disabled={!isChecked} onClick={holo}>
            Submit
          </button>
        </div>
      </div>

    </>)
}

export default TACD;