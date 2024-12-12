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

function MyProfileV8ClassesAtten(props) {
    const nava = useNavigate()

    const [openD , setOpenD] = useState(false)

    const [tabCls , setTabcls] = useState(1)



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
                        My classes {'>'} Learner
                    </div>


                    <div className="classTableInProfile123">
                        <div className="classInfo123">
                                <div className="title fsbfont">
                                    Classes
                                </div>


                                <div className="tabsssssss fmfont">
                                    <span className={tabCls === 1 && 'jimeronimerodinero'}
                                        onClick={() => setTabcls(1)}
                                    >
                                        Upcoming
                                    </span>

                                    <span className={tabCls === 2 && 'jimeronimerodinero'} 
                                        onClick={() => setTabcls(2)}
                                    >
                                        Finished
                                    </span>
                                </div>


                                {tabCls === 1 && <div className="classesssssssss123">
                                    <span className="title123 fsbfont">
                                    Fundamentals of Creative Writing
                                    </span>
                                    <span className="schedule fmfont">
                                    Scheduled for 15th June, 2024
                                    </span>

                                    <div className="details123">
                                        <div className="infroooo w-50">
                                            <span className="fmfont">
                                                20
                                            </span>
                                            <span className="fmfont">
                                            Total Participants
                                            </span>
                                        </div>

                                        <div className="infroooo w-50">
                                            <span className="fmfont">
                                                10
                                            </span>
                                            <span className="fmfont">
                                            Interested  
                                            </span>
                                        </div>
                                    </div>
                                </div>}

                                {
                                    tabCls === 2 && 
                                    <div className="jiggerniggertriggerfirgger fsbfont">
                                        No Classes To Show
                                    </div>
                                }
                        </div>
                        <div className="terainerData">
                                        <span className="fsbfont">
                                        Class Recommendations
                                        </span>
                                        <span className="newoahdhidsf frfont">
                                        From common Interests
                                        </span>

                                        
                                </div>  
                    </div>

            <Footer />
        </div>
    );
}


export default MyProfileV8ClassesAtten;