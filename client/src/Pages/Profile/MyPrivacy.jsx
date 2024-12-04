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
import Switch from "react-switch";

function MyProfileV8ClassesPrivacy(props) {

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );
    const id = localStorage.getItem("User");
    const [openD , setOpenD] = useState(false)
    const [isTeacher, setIsTeacher] = useState(false)

    useEffect(() => {
        async function teachedVerify() {
            const res = await axios.get(BaseUrl + `/isTeacher?id=${id}`);
            setIsTeacher(res.data)
        }

        teachedVerify()

    }, [])

    const [tabCls , setTabcls] = useState(1)
    const nava = useNavigate()

    const [changePass , setCp] = useState(false)
    const [changeEmail , setE] = useState(false)
    const [changeAcc , setA] = useState(false)
    const [currentPass , setCurrentPass ] = useState('')
    const [changedPass , setChangedPass ] = useState('')
    const [currentEm , setCurrentEm ] = useState('')

    async function updateUserInfo( ) {

        if (changedPass === currentPass && changedPass !== ''){
            const d = {
                pass : currentPass
            }
            const res = await axios.post(BaseUrl + `/changePass`,
                 d ,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                });
            console.log(res)
            setCp(false)
            localStorage.setItem("authTokens", JSON.stringify(res.data.token));    
        } else {
            alert('Password not matching')
        }

    }

    const [account, setAcc] = useState({
        accN : '',
        bankN : '',
        holderN : '',
        accTpe : '',
        ifsc : ''
    })


    async function updateUserEmail( ) {

        if (currentEm !== ''){
            const d = {
                mailID : currentEm
            }
            const res = await axios.post(BaseUrl + `/changeMail`,
                 d ,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                });
            console.log(res)
            setE(false)   
        } else {
            alert('Email Field Empty')
        }

    }


    useEffect(() => {
        async function getAccountDetails( ) {
                const res = await axios.get(BaseUrl + `/accountInfo/my`,
                    {
                        headers: { Authorization: `Bearer ${authTokens}` },
                    });
                setAcc(res.data)
    
        }

        getAccountDetails()
    },[])

    async function upateAccountDetails( ) {
        const data = account
        const res = await axios.post(BaseUrl + `/accountInfo/update`,
            data,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            });
        console.log(res)
        setA(false)

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

            <div className="privacy">
                            <div className="privacyDiv">
                                <span className="headbecauseProfile fsbfont">
                                    Privacy     
                                </span>

                                <span className="secondheadbecauseProfile fmfont">
                                    <span>
                                    Private Account
                                    </span>

                                    <span>
                                    <Switch  checked={true} onColor="#FC0" />
                                    </span>
                                </span>

                                <span className="frfont asdasdasdassdassd">
                                When your account is public, your profile and posts can be seen by anyone, on or off Black box, even if they don’t have an Black Box account.
                                </span>

                                <span className="frfont qweqweqweqwwe">
                                When your account is private, only the followers you approve can see what you share, including your photos or videos and your followers and following lists.
                                </span>
                            </div>

                            <div className="passChanger fsbfont" 
                                onClick={() => setCp(true)}
                            >
                                Change Password
                            </div>

                            <div className="passChanger fsbfont"
                                onClick={() => setE(true)}
                            >
                                Change Email
                            </div>

                           {isTeacher && <div className="passChanger fsbfont"
                                onClick={() => setA(true)}
                            >
                                Change Bank Account Details
                            </div>}
            </div>

            { changePass &&
                <div className="passChangerPop">
                <div className="formmm">
                        <div className="flexxyyInput">
                            <div className="fmfont">
                                New Passwword :
                            </div>
                            <input type="text" 
                            value={changedPass}
                            onChange={(e) => {
                                const value = e.target.value;
                                setChangedPass(value)
                            }}
                            className="fmfont"/>
                        </div>

                        <div className="flexxyyInput">
                            <div className="fmfont">
                                Confirm Passwword :
                            </div>
                            <input className="fmfont"
                            value={currentPass}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCurrentPass(value)
                            }}
                            type="text" />
                        </div>

                        <div className="buttokenns">
                        <div className="cancellller fmfont" onClick={() => {
                            setCp(false)
                        }}>
                            Cancel
                        </div>

                        <div className="saverrrrr fmfont" onClick={updateUserInfo}>
                            Save
                        </div>

                        </div>


                </div>
            </div>}


            { changeEmail &&
                <div className="passChangerPop">
                <div className="formmm">
                        <div className="flexxyyInput">
                            <div className="fmfont">
                                New Email Id :
                            </div>
                            <input type="text" 
                            value={currentEm}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCurrentEm(value)
                            }}
                            className="fmfont"/>
                        </div>

                        <div className="buttokenns">
                        <div className="cancellller fmfont" onClick={() => {
                            setE(false)
                        }}>
                            Cancel
                        </div>

                        <div className="saverrrrr fmfont" onClick={updateUserEmail}>
                            Save
                        </div>

                        </div>


                </div>
            </div>}

            { changeAcc &&
                <div className="passChangerPop">
                <div className="formmm">
                        <div className="flexxyyInput">
                            <div className="fmfont">
                                Bank Name :
                            </div>
                            <input type="text" 
                            value={account.bankN}
                            onChange={(e) => {
                                const value = e.target.value;
                                setAcc(
                                    (prev) => {
                                        prev.bankN = value
                                        return {...prev}
                                    }
                                )
                            }}
                            className="fmfont"/>
                        </div>

                        <div className="flexxyyInput">
                            <div className="fmfont">
                                Account Number :
                            </div>
                            <input className="fmfont"
                            value={account.accN}
                            onChange={(e) => {
                                const value = e.target.value;
                                setAcc(
                                    (prev) => {
                                        prev.accN = value
                                        return {...prev}
                                    }
                                )
                            }}
                            type="text" />
                        </div>

                        <div className="flexxyyInput">
                            <div className="fmfont">
                                Holder Name :
                            </div>
                            <input className="fmfont"
                            value={account.holderN}
                            onChange={(e) => {
                                const value = e.target.value;
                                setAcc(
                                    (prev) => {
                                        prev.holderN = value
                                        return {...prev}
                                    }
                                )
                            }}
                            type="text" />
                        </div>

                        <div className="flexxyyInput">
                            <div className="fmfont">
                                IFSC Code :
                            </div>
                            <input className="fmfont"
                            value={account.ifsc}
                            onChange={(e) => {
                                const value = e.target.value;
                                setAcc(
                                    (prev) => {
                                        prev.ifsc = value
                                        return {...prev}
                                    }
                                )
                            }}
                            type="text" />
                        </div>

                        <div className="flexxyyInput">
                            <div className="fmfont">
                               Account Type :
                            </div>
                            <input className="fmfont"
                            value={account.accTpe}
                            onChange={(e) => {
                                const value = e.target.value;
                                setAcc(
                                    (prev) => {
                                        prev.accTpe = value
                                        return {...prev}
                                    }
                                )
                            }}
                            type="text" />
                        </div>

                        <div className="buttokenns">
                        <div className="cancellller fmfont" onClick={() => {
                            setA(false)
                        }}>
                            Cancel
                        </div>

                        <div className="saverrrrr fmfont" onClick={upateAccountDetails}>
                            Save
                        </div>

                        </div>


                </div>
            </div>}



            <Footer />
        </div>
    );
}


export default MyProfileV8ClassesPrivacy;