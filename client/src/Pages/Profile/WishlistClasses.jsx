/* eslint-disable no-undef */
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";
// import Class2 from "../../Images/Classes/class2.jpg";
import { Col, Row } from "react-bootstrap";
import star from '../../Images/star.svg'
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";
import editProfile from "../../Images/Editprofile.svg";
import myclass from "../../Images/myclass.svg";
import myChat from '../../Images/chats.svg'
import setting from '../../Images/settings.svg'
import priv from '../../Images/privacy.svg'
import dorpp from '../../Images/dorpp.svg'
import durr from '../../Images/durronto.png'
import pinLoc from '../../Images/location.svg'
import editIcon from '../../Images/editProfile.svg'
import axios from "axios";
// closeIcon.svg
import { useState } from "react";
import close from '../../Images/closeIcon.svg'
import PublicPostModule from "../Home/PublicPostModule";

function MyProfileV8ClassesWish(props) {

    const [openD , setOpenD] = useState(false)

    const [tabCls , setTabcls] = useState(1)

    const nava = useNavigate()

    const [coursesInCart, setCoursesInCart] = useState([])
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
          ? JSON.parse(localStorage.getItem("authTokens"))
          : null,
      );
      

    useEffect(() => {
        async function subsOfCart() {
          const res = await axios.get(BaseUrl + `/wishlist`,
            {
              headers: { Authorization: `Bearer ${authTokens}` },
            }
          );
          const clss = res.data.classes
          const course = res.data.courses
          const s = clss.concat(...course)
          setCoursesInCart(s)
        }
        subsOfCart()
      }, [])



      const truncateString = (str, num = 30) => {
        if (str.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    function processClassData(classData) {
        // Check if classStructure is a string or array
        let classStructureCheck = Array.isArray(classData.classStructure);

        // Calculate total duration of classes in minutes
        let totalDuration = classData.date.reduce((acc, curr) => {
            return acc + parseInt(curr.duration);
        }, 0);

        // Convert total duration to hours with decimal points for minutes
        let totalHours = totalDuration / 60;
        let durationString = '';

        // Check if totalHours has a decimal part
        if (totalHours % 1 === 0) {
            durationString = `${totalHours} hr${totalHours > 1 ? 's' : ''}`;
        } else {
            totalHours = totalHours.toFixed(1);
            durationString = `${totalHours} hr${totalHours > 1 ? 's' : ''}`;
        }

        // If classStructure is a string
        if (!classStructureCheck) {
            return durationString;
        } else {
            // If classStructure is an array
            return `${classData.date.length} sessions`;
        }
    }

    const navigate = useNavigate();

    const [isHovered, setIsHovered] = useState(0);

    const renderClass = (cls, index) => {
        const a = cls.img && cls.img.length > 0 ? cls.img[0].url : "";
        if (a=== ''){
            return
        }

        return (
            <div
                onClick={() => navigate(`${cls.date.length > 1 ? `/courseV2/${cls.id}` : `/classV2/${cls.id}`}`)}
                className="ClassGridBox cp"
            >
                <div className="">
                    <img src="" alt="" />
                    <img src={cls.img[0].url} alt="" className="imgClassGrid" />
                </div>
                <div className='LCLDecr'>
                    <div className='TitlePri gb'>
                        <span className='LCLTitle'>
                            {truncateString(cls.title)}
                        </span>
                        <span className='LCLPrice'>
                            ₹{cls.price}
                        </span>
                    </div>
                    <div className='LCLNameRate gm'>
                        <span className='LCLName'>
                            {cls.user.first_name} {' '}
                            {cls.user.last_name.split('')[0]}.
                        </span>
                        <span className='LCLRateTime'>
                            <span className='LCLRate'>
                                <img src={star} alt="" />
                                4.2
                            </span>
                            <span className='LCLTime'>
                                {processClassData(cls)}
                            </span>
                        </span>
                    </div>
                </div>

                {isHovered === index + 1 && <div className={`awesomePopup ${(index + 1) % 3 === 0 && 'jodjddojdodjdojdojdojdodj'}`}>
                    <div className={`triangle ${(index + 1) % 3 === 0 && 'righhhhh'}`}></div>
                    <div className="apTitle gb">
                        {cls.title}
                    </div>
                    <div className="aptimeLan gm">
                        <div className="mkmk">
                            {processClassData(cls)}
                        </div>
                        <div>
                            {cls.languageOfClass}
                        </div>
                    </div>
                    <div className="apDescre frfont" dangerouslySetInnerHTML={{ __html: cls.description }}>

                    </div>
                    <div className="apcta frfont">
                        <span>
                            Add to Cart
                        </span>
                    </div>
                </div>}
            </div>
        );
    };

    return (
        <div className="columbusProfile">
            <Header />
            <span className="jsaojasojdasdas">

            </span>
            <div>
                <div className="sideStrollerMp fsbfont"
                >
                    <div className="SSMP SSMP1"
                        onClick={
                            () => nava('/viewProfileV2')
                        }
                    >
                        <img src={editProfile} alt="" />
                        <span>
                            My Profile
                        </span>
                    </div>

                    <div className="SSMP SSMP2" onClick={
                        () => setOpenD(!openD)
                    }>
                        <img src={myclass} />
                        <span>
                            My Classes
                        </span>

                        <img src={dorpp} className="juhugulu" alt="" />


                    </div>

                    { openD && <div className="classDropperInProfiler">
                        <span
                            onClick={
                                () => nava('/viewProfileV2/classes')
                            }
                        >
                            Trainer
                        </span>
                        <span 
                            onClick={
                                () => nava('/viewProfileV2/classes/attending')
                            }
                        >
                            Learner
                        </span>
                        {/* <span
                            onClick={
                                () => nava('/viewProfileV2/classes/wishlist')
                            }
                        >
                            Wishlist
                        </span> */}
                    </div>}

                    <div className="SSMP SSMP3"
                        onClick={
                            () => nava('/viewProfileV2/classes/activity')
                        }
                    >
                        <img src={myChat} alt="" />
                        <span>
                            My Activity
                        </span>
                    </div>

                    {/* <div className="SSMP SSMP4">
                        <img src={setting} alt="" />
                        <span>
                            Account Settings
                        </span>
                    </div> */}

                    <div className="SSMP SSMP5"
                            onClick={
                                () => nava('/viewProfileV2/classes/privacy')
                            }
                    >
                        <img src={priv} alt="" />
                        <span>
                            Privacy
                        </span>
                    </div>

                </div>
            </div>



                    <div className="headdddd123 fbfont">
                        My classes {'>'} Wishlist
                    </div>

                    <div className={`wishlistIconocs ${coursesInCart.length !== 0  && 'wishGrid'} fmfont`}>
                        {coursesInCart.length === 0? 'No Classes Added'
                         :coursesInCart.map((ele, ind) => {
                                return renderClass(ele,ind)
                         })}
                        
                    </div>

            <Footer />
        </div>
    );
}


export default MyProfileV8ClassesWish;