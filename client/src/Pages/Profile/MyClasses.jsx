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

function MyProfileV8Classes(props) {

    function formatDate(obj) {
        // Parse the date string into a Date object
        const dateObj = new Date(obj.date);
        // Get the day, month, and year
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const year = dateObj.getFullYear();
        // Format the date as desired
        const daySuffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
        return `${day}${daySuffix} ${month}, ${year}`;
    }

    const {
        user
    } = useContext(AuthContext);
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    const [classes, setClasses] = useState([])

    const [openD, setOpenD] = useState(false)

    const [tabCls, setTabcls] = useState(1)
    const nava = useNavigate()

    const [allDropper, setAllDropper] = useState()

    useEffect(() => {
        async function subsOfCart() {
            const res = await axios.get(BaseUrl + `/courseInfo/my`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            const clss2 = res.data
            console.log(clss, 'bookmarp')
            setClasses((per) => { return per.concat(clss) })


        }
        if (user) {
            subsOfCart()
        }
    }, [])

    useEffect(() => {
        async function subsOfCart() {
            const res = await axios.get(BaseUrl + `/classInfo/my`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            const clss = res.data
            console.log(clss, 'bookmarp')
            setClasses((per) => { return per.concat(clss) })


        }
        if (user) {
            subsOfCart()
        }
    }, [])

    async function subsOfCart() {
        const res = await axios.get(BaseUrl + `/classInfo/my`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
        const res2 = await axios.get(BaseUrl + `/courseInfo/my`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
        const clss = res.data.concat(res2.data)
        setClasses((per) => { return per.concat(clss) })
    }

    async function deleteClass(data) {
        if (
            Array.isArray(data.classStructure)
        ) {
            const res = await axios.delete(BaseUrl + `/courseInfo?id=${data.id}`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            console.log(res)

        } else {
            const res = await axios.delete(BaseUrl + `/classInfo?id=${data.id}`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            console.log(res)
        }
    }




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

                    {openD && <div className="classDropperInProfiler">
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
                My classes {'>'} Trainer
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


                    {tabCls === 1 &&
                        classes.length > 1 &&
                        classes.map((ele, index) => {
                            return <div className="classesssssssss123">
                                <span className="title123 fsbfont">
                                    {ele.title}
                                    <span className="cp" onClick={() => {
                                        console.log('clicked')
                                        setAllDropper(index)
                                        console.log(allDropper)
                                    }}>
                                        ...
                                    </span>
                                    {allDropper === index && <span className="aisdnirnvcidsa cp"
                                        onClick={() => {
                                            deleteClass(ele)
                                            setAllDropper(null)
                                        }
                                        }
                                    >
                                        Delete
                                    </span>}
                                </span>
                                <span className="schedule fmfont">
                                    Scheduled for {formatDate(ele.date[0])}
                                </span>

                                <div className="details123">
                                    <div className="infroooo">
                                        <span className="fmfont">
                                            0
                                        </span>
                                        <span className="fmfont">
                                            Total Praticipants
                                        </span>
                                    </div>

                                    <div className="infroooo">
                                        <span className="fmfont">
                                            0
                                        </span>
                                        <span className="fmfont">
                                            Total  Received
                                        </span>
                                    </div>


                                    <div className="infroooo">
                                        <span className="fmfont">
                                            0
                                        </span>
                                        <span className="fmfont" >
                                            Shares
                                        </span>
                                    </div>


                                    <div className="infroooo">
                                        <span className="fmfont">
                                            0
                                        </span>
                                        <span className="fmfont">
                                            Interests
                                        </span>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                    {tabCls === 1 &&
                        classes.length === 0 &&
                        <div className="ooaskaoskd fmfont" 
                            onClick={() => {
                                nava('/class-submission')
                            }}
                        >
                            Host A Class
                        </div>
                    }

                    {
                        tabCls === 2 &&
                        <div className="jiggerniggertriggerfirgger fsbfont">
                            No Classes To Show
                        </div>
                    }
                </div>
                <div className="terainerData">
                    <span className="fsbfont">
                        Your Trainer Stats
                    </span>

                    <div className="adhiahdieaadf fsbfont">
                        <div className="asiopoiuhgfds">
                            <span className="asffrpaerrngfd">
                                0
                            </span>
                            <span className="asorothifbass frfont">
                                Total Earnings from Black Box
                            </span>
                        </div>

                        <div className="asiopoiuhgfds">
                            <span className="asffrpaerrngfd">
                                0
                            </span>
                            <span className="asorothifbass frfont">
                                Total Classes taught
                            </span>
                        </div>

                        <div className="asiopoiuhgfds">
                            <span className="asffrpaerrngfd">
                                0
                            </span>
                            <span className="asorothifbass frfont">
                                Total Student  taught
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}


export default MyProfileV8Classes;