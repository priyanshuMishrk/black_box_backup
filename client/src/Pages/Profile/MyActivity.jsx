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

function MyProfileV8ClassesActivity(props) {

    const {
        user
    } = useContext(AuthContext);
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );



    const [openD , setOpenD] = useState(false)

    const [tabCls , setTabcls] = useState(1)
    const nava = useNavigate()

    const [bookmarkPosts, setBookmarkPo] = useState([])
    const [likePosts, setLikePosts] = useState([])

    useEffect(() => {
        async function subsOfCart() {
          const res = await axios.get(BaseUrl + `/bookmark`,
            {
              headers: { Authorization: `Bearer ${authTokens}` },
            }
          );
          const clss = res.data.postId
          console.log(clss,'bookmarp')
            setBookmarkPo(clss)


        }
        if (user) {
          subsOfCart()
        }
      }, [])

      async function subsOfCart1() {
        const res = await axios.get(BaseUrl + `/bookmark`,
          {
            headers: { Authorization: `Bearer ${authTokens}` },
          }
        );
        const clss = res.data.postId
        console.log(clss,'bookmarp')
          setBookmarkPo(clss)


      }

      async function subsOfCart2() {
        const res2 = await axios.get(BaseUrl + `/likedPost`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
        console.log(res2)
        const clss2 = res2.data.postId
        setLikePosts(clss2)


    }

    async function clickedThePost(){
        await subsOfCart1()
        await subsOfCart2()
    }

    useEffect(() => {
        async function subsOfCart() {
            const res2 = await axios.get(BaseUrl + `/likedPost`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            console.log(res2)
            const clss2 = res2.data.postId
            setLikePosts(clss2)


        }
        if (user) {
            subsOfCart()
        }
    }, [])


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

            <div className="head10224 fsbfont">
                My Activity
            </div>


            <div className="tabs10223 fmfont">
                    <span className={tabCls === 1 && 'selectedDelected'}
                        onClick={
                            () => {
                                setTabcls(1)
                            }
                        }
                    >
                        Like
                    </span>

                    {/* <span className={tabCls === 2 && 'selectedDelected'}
                        onClick={
                            () => {
                                setTabcls(2)
                            }
                        }>
                        Comments
                    </span> */}

                    <span className={tabCls === 2 && 'selectedDelected'}
                        onClick={
                            () => {
                                setTabcls(2)
                            }
                        }>
                        Bookmarks
                    </span>
            </div>


            <div className="asdjoarrbgfiasfsf fsbfont"
            >
                {
                    tabCls === 1 ? likePosts && likePosts.length > 0 && likePosts.map((ele,ind) => {
                        return <PublicPostModule index={ind} data={ele} />
                    }) || 'No Activity'  : tabCls === 2 ? bookmarkPosts && bookmarkPosts.length > 0 && bookmarkPosts.map((ele,ind) => {
                        return <PublicPostModule  index={ind} data={ele} /> 
                    }) || 'No Activity' : 'No Activity'
            }
            </div>

            <Footer />
        </div>
    );
}


export default MyProfileV8ClassesActivity;