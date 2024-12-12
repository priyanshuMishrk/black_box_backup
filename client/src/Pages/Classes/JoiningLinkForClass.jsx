import React, { useEffect, useRef, useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { useNavigate } from "react-router-dom";
import clock from "../../Images/clock.svg"
import caledare from "../../Images/calendar-line.svg"
import globe from "../../Images/globe.svg"
import sharena  from "../../Images/sharenare.png"
import lien1  from "../../Images/group-line.svg"
import lien2  from "../../Images/pencil-ruler-2-line.svg"
import share from "../../Images/share.svg"
import gift from "../../Images/gift.svg"

const JoinTheClass = () => {
    const [isOutOfView, setIsOutOfView] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    // Calculate the height of the fixed header in pixels
    const vwToPixels = (vw) => {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * (vw / 100);
    };

    const headerHeightInPixels = vwToPixels(6.5);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set isOutOfView to true if the div is completely out of the viewport
        // Set isOutOfView to false if any part of the div is visible
        setIsOutOfView(!entry.isIntersecting);
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: `-${headerHeightInPixels}px 0px 0px 0px`, // Adjust for the fixed header height in pixels
        threshold: 0 // Trigger when any part of the div is visible or not
      }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);


  const [addCart  , setAddCart] = useState(false)
  const [gifted , setGifted] = useState(false)
  const [inCart , setInCart] = useState(false)

  function addedToCart(bool) {
        setAddCart(bool)
        setInCart(true)
  }

  function giftedFunc(bool) {
    setGifted(bool)
}

    return (
        <>
            <Header/>

            <div className={`blackBannerInClassE ${isOutOfView ? "topperBlackBannerInClassE enter" : "exit"}`}>
                <div className="gsb blackBannerInClassEHeading">
                Fundamentals of Creative Writing
                
                </div>
                <div className="blackBannerInClassEButtonSection">
                        <div className="gsb blackBannerInClassErupee">
                        ₹500
                        </div>
                        <div className="gsb blackBannerInClassEnroll">
                            <button>Enroll Now</button>
                        </div>
                        <div className="gsb blackBannerInAddToCart">
                            <button>Add to Cart</button>
                        </div>
                        <div className="blackBannerInShareIcon">
                            <img src={share} alt="" />
                        </div>
                        <div className="blackBannerInGiftIcon" >
                            <img src={gift} alt="" />

                            <span className="gsb blackBannerGTAF">

                                Gift to a friend
                            </span>
                        </div>
                </div>
            </div>
            <div className="ClassV2VJ" >

                <div className="CPr2Banner" ref={divRef}>
                    <div className="CPR2BInfo">
                    <div className="d-flex gap-2">
                        <div className="CPR2Tag fsbfont">Class</div>
                        <div className="CPR2Tag fsbfont">Writing</div>
                        </div>
                        <div className="CPR2Head gb">
                        Fundamentals of Creative Writing
                        </div>
                        <div className="CPR2Stars">
                            <span className="CPR2Starss">
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                            </span>
                            <span>
                                4.2
                            </span>
                        </div>
                        <div className="CPR2Auth" >
                                <span className="geryCirc">

                                </span>
                                <span className="gl">
                                    By
                                </span>
                                <span className="CPR2AuthName gm"> Muralidharan Vasudevan </span>
                        </div>

                        <div className="CPR2AuthDesc gm" >
                        Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                        </div>

                        <div className="CPR2Timing">
                            <span className="CPR2TimingD">
                                <span className="ic">
                                    <img src={caledare} alt="" />
                                </span>
                                <span className="d gm">
                                24th June, 2024
                                </span>
                                <span className="a gl">
                                View all dates
                                </span>
                            </span>
                            <span className="CPR2TimingT">
                                <span className="ic">
                                    <img src={clock} alt="" />
                                </span>
                                <span className="d gm">5:00 pm - 6:30 pm EST</span>
                            </span>
                            <span className="CPR2TimingL">
                                <span className="ic">
                                    <img src={globe} alt="" />
                                </span>
                                <span className="d gm">English</span>
                            </span>

                        </div>

                        <div className="CPR2Studs gm">
                        15  students, 4 seats left
                        </div>

                    </div>
                    <div className="CPR2BImage">
                        <div className="imgInCPR2B">
                            <img src="https://s3-alpha-sig.figma.com/img/2c2a/520a/6daa61e6461adb830d81edcdf7622d4f?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hYKIU5qbAzcetZAwiCcMBic3~oS1zjHRDqZFpr8NbCZCfkIU-jYmmKVF75QOtVEuO~ablm93RFNoOa~0sPVXJQWd9WDyHyHOmDwIJKxXEdAao65GHuWtzm4OmfOFcKq5HdLRD4K~j4KUPs3ZwTD9eBk3gLosSTrG0TwyZFEMnL7PEtdaS9roeJEb-sOTRvDUqqPqXcaGcVEWT4dZyZ8zWyqhJ8xWei0qOMEAejVls2femWyAkNbR-4ZfBJnopfnOLGFZf2v5VVwrzUuifzh01Baf~XLZ1wDnjYrvpUFFHNfaeEevSDMmFUtHJzzGE3Z-3MNDMRecXkj9RbRO5jIZRw__" alt="" />
                        </div>
                        <div className="imgInformation">
                            <div className="informationInfo">
                            <div className="priceyyy gb">
                            ₹500
                            </div>
                            <div className="slotsssss gm">
                            Slots filling in soon
                            </div>

                            </div>
                            <div>
                                <img src={sharena} alt="" />
                            </div>
                        </div>

                        <div>
                            <button className="buyNowInTabs gm">Buy Now</button>
                        </div>
                        <div className="addCartInTabs gm">
                            <button onClick={() => addedToCart(true)}>{`${inCart ? "✔ Added" : "Add"} to Cart`}</button>
                            <button onClick={() => giftedFunc(true)} >Gift a friend</button>
                        </div>
                    </div>
                </div>

                <div className="Claser mt-5">
                    <div>
                        <span className="headingForClassInfo gsb mx-4" >
                        Class Structure
                        </span>
                        <span>
                            <ul  className="VFDTitle gm">
                                <li className="mb-3">
                                Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                                </li>
                                <li className="mb-3">
                                Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                                </li>
                                <li className="mb-3">
                                Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                                </li>
                            </ul>
                        </span>
                    </div>


                    <div>
                    <div className="headingForClassInfo gsb mx-4" >
                            <img src={lien1} className="jjkolmn" alt="" />
                            Who is this class for?
                        </div>

                        <span className="VFDTitle  ljdojasy gm">
                        Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                        </span>
                    </div>

                    <div>
                    <div className="headingForClassInfo gsb mx-4 mb-4 mt-5" >
                            <img src={lien2} className="jjkolmn" alt="" />
                            Participant Requirements
                        </div>

                        <span className="VFDTitle  ljdojasy gm">
                        Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                        </span>
                    </div>

                    <div>
                    <div className="headingForClassInfo gsb mx-4 mb-4 mt-5" >
                            <img src={lien2} className="jjkolmn" alt="" />
                            After the class you will be able to
                        </div>
                        <span>
                            <ul  className="VFDTitle gm">
                                <li className="mb-3">
                                Navigate the Figma interface with confidence."
                                </li>
                                <li className="mb-3">
                                Create and manage design projects in Figma."
                                </li>
                                <li className="mb-3">
                                Use basic tools and features to create designs."
                                </li>

                                <li className="mb-3">
                                Collaborate with team members on Figma projects."
                                </li>

                                <li className="mb-3">
                                Apply learned skills to real-world design tasks
                                </li>
                            </ul>
                        </span>
                    </div>

                    <div>
                    <span className="headingForClassInfo gsb mx-4" >
                    About the Trainer
                        </span>

                    <div className="d-flex ljdojasy">
                        <span>
                            <img src="https://s3-alpha-sig.figma.com/img/9af8/2f35/d9f18ae315161e6e8dbbbb472bcdd1d0?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ae1a1Ba-l58Plruh6iW2vcSZUkdjeHO0M3AIQxO2Cj1XI-YaeRwd5LfLgwsBvP8ZNK9~I9I29FLYj8~BWG8lCW8Ey2hczUoWC56dTAvRiDuVPk5EN1GaxBlayDQIPqnmLHXOXIXQHXI4an3HZFqnK6Ae0ZXoldQzwuiiBExUdw6mwTJVmbb2dFi90Ja2DNnDlw0-OkmGGrBvfOMGtsAYX-jMNApHUFi3BcpMOYOwr0a5eqjsJ0o-es3mTRamY8GUVb2uFFnuEU21r12SzI5iVzSU8ZTr0p7Wc9IBo1eGSufoLWrgVEhcigbU3LEMDN0ZwEP9CKuhcArWdu~HWy4VKw__" className="imgInPr55" alt="" />
                        </span>
                        <div className="introInPr">
                        <span className="prName gsb">
                            Name Of the Trainer
                        </span>
                        <span className="VFDTitle gm">
                            Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                        </span>

                        </div>
                        
                    </div>
                    </div>

                </div>

                <div className="classFinReview">

                    <div className="CPRFDiv">

                        <div className="CPR2Tag gsb">CLASS REVIEW</div>
                        
                        <div className="CFRInfo">
                            <div className="students">
                                <span className="head gsb">
                                50
                                </span>
                                <span className="bottom gm">
                                students enrolled
                                </span>
                            </div>
                            <div className="students">
                                <span className="head gsb">
                                4.2
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                </span>
                                <span className="bottom gm">
                                CLASS RATING
                                </span>
                            </div>

                            <div className="students">
                                <span className="head gsb">
                                4.2
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                </span>
                                <span className="bottom gm">
                                TRAINER RATING
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="CPRTDiv">
                        <div className="greyBox">

                        </div>


                        <div className="nextToGreyBox">

                        <div className="infoooo gm">
                        “This is a class testimonial What is  Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's What is  Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's.”
                        </div>
                        <div className="infooooName gl">
                            BY NAME
                        </div>
                        </div>
                    </div>
                </div>

            </div>

            {addCart &&
                <div className="popupForAddedToCart">
                <div className="HeadInPFATC">
                        <div className="gb one">
                        Added to cart
                        </div>
                        <div className="blw cp two" onClick={() => setAddCart(false)}>
                                X
                        </div>
                </div>
                <div className="InfoInPFATC">
                    <div className="PFATCIM">
                        <img src="https://s3-alpha-sig.figma.com/img/2c2a/520a/6daa61e6461adb830d81edcdf7622d4f?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hYKIU5qbAzcetZAwiCcMBic3~oS1zjHRDqZFpr8NbCZCfkIU-jYmmKVF75QOtVEuO~ablm93RFNoOa~0sPVXJQWd9WDyHyHOmDwIJKxXEdAao65GHuWtzm4OmfOFcKq5HdLRD4K~j4KUPs3ZwTD9eBk3gLosSTrG0TwyZFEMnL7PEtdaS9roeJEb-sOTRvDUqqPqXcaGcVEWT4dZyZ8zWyqhJ8xWei0qOMEAejVls2femWyAkNbR-4ZfBJnopfnOLGFZf2v5VVwrzUuifzh01Baf~XLZ1wDnjYrvpUFFHNfaeEevSDMmFUtHJzzGE3Z-3MNDMRecXkj9RbRO5jIZRw__" alt="" />
                    </div>
                    <div className="PFATCIT">
                        <span className="o gsb">
                        Fundamentals of Creative Writing
                        </span>
                        <span className="t gl">
                        Muralidharan Vasudevan
                        </span>
                        <div className="PFATCITT gl">   
                            <span className="oo">
                            24th June, 2024
                            </span>
                            <span>
                            <span className="tttt" style={{ color: "#F8F3E3", textShadow: "-1px 0 #000000A3, 0 1px #000000A3, 1px 0 #000000A3, 0 -1px #000000A3"}}>&#9733;</span>
                            <span>4.2</span>
                            </span>
                        </div>
                        <div className="price gsb">
                        ₹500
                        </div>
                    </div>

                </div>
                          <button  className="GTCInJCI gsb">
                                        Go to cart
                        </button>
            </div>}


            {gifted &&
                <div className="popupForAddedToCart  jaojdoaajs">
                <div className="HeadInPFATC">
                        <div className="gsb one drrrrrrr">
                        Gift this Class
                        </div>
                </div>
                <div className="InfoInPFATC">
                    <div className="PFATCIM">
                        <img src="https://s3-alpha-sig.figma.com/img/2c2a/520a/6daa61e6461adb830d81edcdf7622d4f?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hYKIU5qbAzcetZAwiCcMBic3~oS1zjHRDqZFpr8NbCZCfkIU-jYmmKVF75QOtVEuO~ablm93RFNoOa~0sPVXJQWd9WDyHyHOmDwIJKxXEdAao65GHuWtzm4OmfOFcKq5HdLRD4K~j4KUPs3ZwTD9eBk3gLosSTrG0TwyZFEMnL7PEtdaS9roeJEb-sOTRvDUqqPqXcaGcVEWT4dZyZ8zWyqhJ8xWei0qOMEAejVls2femWyAkNbR-4ZfBJnopfnOLGFZf2v5VVwrzUuifzh01Baf~XLZ1wDnjYrvpUFFHNfaeEevSDMmFUtHJzzGE3Z-3MNDMRecXkj9RbRO5jIZRw__" alt="" />
                    </div>
                    <div className="PFATCIT">
                        <span className="o gsb">
                        Fundamentals of Creative Writing
                        </span>
                        <span className="t gl">
                        Muralidharan Vasudevan
                        </span>
                        <div className="PFATCITT gl">   
                            <span className="oo">
                            24th June, 2024
                            </span>
                            <span>
                            <span className="tttt" style={{ color: "#F8F3E3", textShadow: "-1px 0 #000000A3, 0 1px #000000A3, 1px 0 #000000A3, 0 -1px #000000A3"}}>&#9733;</span>
                            <span>4.2</span>
                            </span>
                        </div>
                    </div>

                </div>

                    <input className="iGTC gsb" type="text" placeholder="Recipient Email address" />

                    <textarea className="taGTC gsb" name="message" rows="2"  placeholder={`About yourself`}></textarea>
                          <button onClick={() => giftedFunc(false)} className="GTCInJCI sgggggggggg gsb">
                                        Send Gift
                        </button>
            </div>
}
        </>)
}
[]
export default JoinTheClass;