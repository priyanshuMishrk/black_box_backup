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
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Common/Header";
// import PublicPostModule from "../Home/PublicPostModule";
import defaultPic from '../../Images/defualtProPic.jpg';
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
import whatsapp from '../../Images/whatsapp.svg'
import email from '../../Images/mail.svg'
import copyLink from '../../Images/copy.svg'
import axios from "axios";
// closeIcon.svg
import { useState } from "react";
import close from '../../Images/closeIcon.svg'
import PublicPostModule from "../Home/PublicPostModule";
import friendsMore from "../../Images/friendMore.svg"

function OtherProfileV8(props) {

    const { id2 } = useParams();
    const [userProfile, setuserr] = useState({})

    useEffect(() => {
        async function getPr() {
            let reqOptions = {
                url: `${BaseUrl}/profileDetails/other?id=${id2}`,
                method: "GET",
            }

            let response = await axios.request(reqOptions);
            console.log(response.data);
            let name = response.data.full_name
            setName(name)
            setPropic(response.data.img)
            setBio(response.data.about)
            setuserr(response.data)
            backbanner = response.data.backbanner
        }

        getPr()
    },[])
    const [postData, setPostData] = useState([])

    useEffect(() => {
        async function teachedVerify2() {


            await axios
                .get(BaseUrl + `/publicPost/other?id=${id2}`)
                .then((res) => {
                    setPostData(res.data)
                })
                .catch((err) => {
                    console.log(err, "eerr");
                });
        }

        teachedVerify2()
    }, [])

    let backbanner = ''


    const nava = useNavigate()

    const [isTeacher, setIsTeacher] = useState(false)
    const id = localStorage.getItem("User");
    const [propic, setPropic] = useState('')
    const [bio, setBio] = useState('')

    useEffect(() => {
        async function teachedVerify() {
            const res = await axios.get(BaseUrl + `/isTeacher?id=${id2}`);
            setIsTeacher(res.data)
        }

        teachedVerify()

    }, [])
    const handleCopy = () => {
        const currentUrl = window.location.href;

        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                alert('Current URL copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [followingThisId, setFollowingId] = useState(false)
  
    useEffect(() => {
        const fetchConnections = async () => {
          try {
            const response = await axios.get(`${BaseUrl}/connections/${id2}`);
            console.log("fetching connections 122")
            if (response.data.followersList.includes(parseInt(id))) setFollowingId(true)
            setFollowers(response.data.followers);
            setFollowing(response.data.following);
          } catch (error) {
            console.error('Error fetching connections:', error);
          }
        };
      
        // Fetch initially
        fetchConnections();
      
        // Set interval to fetch data every 5 seconds
        const interval = setInterval(fetchConnections, 3000);
      
        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(interval);
      }, [id2])


    let [name, setName] = useState('');
    const [editingIsOn, setEditingIsOn] = useState(false)

    const [currentSelected, setCS] = useState(1)

    const currentLink = window.location.href;
    const [shareOpen, setShareOper] = useState(false)

    function clickedOnShare() {
        setShareOper(!shareOpen)
    }

    const handleFollow = async () => {
        try {
          await axios.patch(`${BaseUrl}/follow`, { ownerId: id, targetUserId : id2 });
          // Refresh follower/following count after follow action
          const response = await axios.get(`${BaseUrl}/connections/${id2}`);
          setFollowers(response.data.followers);
          setFollowing(response.data.following);
          setFollowingId(true)
        } catch (error) {
          console.error('Error following user:', error);
        }
      };
    

    function isCloudinaryUrl(url) {
        if (!url) return false
        const cloudinaryPattern = /^https:\/\/res\.cloudinary\.com\/black-box\/.*/;
        return !cloudinaryPattern.test(url);
      }


    const [openD, setOpenD] = useState(false)

    const [data2, setData] = useState([
        {
            id: 1,
            name: 'Arun Kumar',
            following: true,
            follower: true
        },
        {
            id: 2,
            name: 'Allison Stinson',
            following: true,
            follower: false
        },
        {
            id: 3,
            name: 'Henry Aldrin',
            following: false,
            follower: true
        },
        {
            id: 4,
            name: 'Peter Scherbatsky',
            following: true,
            follower: true
        },
        {
            id: 5,
            name: 'Marshal Eriksen',
            follower: false,
            following: true
        },
        {
            id: 6,
            name: 'Ted Mosby',
            following: true,
            follower: false
        },
        {
            id: 7,
            name: 'Arun Kumar',
            following: true,
            follower: true
        },
        {
            id: 8,
            name: 'Allison Stinson',
            following: true,
            follower: false
        },
        {
            id: 9,
            name: 'Henry Aldrin',
            following: false,
            follower: true
        },
        {
            id: 10,
            name: 'Peter Scherbatsky',
            following: true,
            follower: true
        },
        {
            id: 11,
            name: 'Marshal Eriksen',
            follower: false,
            following: true
        },
        {
            id: 12,
            name: 'Ted Mosby',
            following: true,
            follower: false
        }
    ])


    function dataGiveBack(data, categ) {
        if (categ === 1) {
            const newData = data.filter(item => item.follower)
            return (
                <div className="friendGrid">
                    {
                        newData.map((item, index) =>
                            <div className="friendGridI">
                                <div className="imgInFG">
                                </div>
                                <div className="nameAndOptionInFG">
                                    <span className="nameInFgi fmfont">
                                        {item.name}
                                    </span>
                                    <span>
                                        <img src={friendsMore} alt="" />
                                    </span>

                                </div>
                                {!item.following &&
                                    <div className="buttonForFollowBack cp fmfont" onClick={() => followback(item.id)}>
                                        Follow Back
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
            )

        } else if (categ === 2) {
            const newData = data.filter(item => item.following)
            return (
                <div className="friendGrid2">
                    {
                        newData.map(item =>
                            <div className="friendGridI">
                                <div className="imgInFG">
                                </div>
                                <div className="nameAndOptionInFG">
                                    <span className="nameInFgi fmfont">
                                        {item.name}
                                    </span>
                                    <span>
                                        <img src={friendsMore} alt="" />
                                    </span>

                                </div>
                            </div>
                        )
                    }
                </div>
            )

        }
    }

    return (
        <div className="columbusProfile">
            <Header />

            {/* <div>
                <div className="sideStrollerMp fsbfont"
                >
                    <div className="SSMP SSMP1"
                        onClick={
                            () => nava('/viewProfileV2')
                        }
                    >
                        <img src={editProfile} alt="" />
                        <span>
                            Edit Profile
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
                        <span
                            onClick={
                                () => nava('/viewProfileV2/classes/wishlist')
                            }
                        >
                            Wishlist
                        </span>
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

                    <div className="SSMP SSMP4">
                        <img src={setting} alt="" />
                        <span>
                            Account Settings
                        </span>
                    </div>

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
            </div> */}

            <div className="aboutProfile2">
                <div className="backBannerInProfile">
                    <img src={backbanner === '' ? 'https://d1bxlu89wy43u2.cloudfront.net/2.png' : backbanner} alt="" />
                </div>
                <div className="userDetails">
                    <div className={`theProfilePic ${isTeacher && 'teacherIsHere'}`}>
                        <img className="theImg" src={isCloudinaryUrl(propic)?propic:defaultPic} alt="" />

                        {isTeacher &&
                            <span className="tagOfUser fmfont">
                                bb Trainer
                            </span>
                        }
                    </div>
                    <div>
                        <div className="textNextToDp">
                            <div className="checktheUserName">
                                <span className="bbName fsbfont">
                                    {name}
                                </span>
                                <div className="userAddressDet fmfont">
                                    <span>
                                        {userProfile.headline ? userProfile.headline : `${isTeacher ? 'Learner-Teacher' : 'Learner'}`}

                                    </span>
                                    <span>
                                        <img src={pinLoc} alt="" />
                                        {userProfile.location ? userProfile.location : 'Not added'}
                                    </span>
                                </div>
                            </div>

                            <div
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer'
                                }}
                            >
                                <span className="shareProfilejjjkkk fmfont" onClick={clickedOnShare}>
                                    Share Profile
                                </span>
                                {shareOpen && <div className="share-container">
                                    <div className="share-options fmfont"
                                        style={{
                                            top: '200%',
                                            zIndex: '21345'
                                        }}
                                        onClick={clickedOnShare}
                                    >
                                        <div
                                            onClick={handleCopy}
                                        >
                                            <img src={copyLink} alt="" /> Copy Link
                                        </div>
                                        <a
                                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentLink)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img src={whatsapp} alt="" />  WhatsApp
                                        </a>
                                        <a
                                            href={`mailto:?subject=Check this out&body=${encodeURIComponent(currentLink)}`}
                                        >
                                            <img src={email} alt="" /> Email
                                        </a>
                                    </div>
                                </div>}
                            </div>
                            {!followingThisId && <span className="shareProfilejjjkkk22 cp fmfont" onClick={handleFollow}>
                                    Follow
                                </span>}
                                {followingThisId && <span className="shareProfilejjjkkk23 cp fmfont" onClick={handleFollow}>
                                    Following
                                </span>}
                        </div>


                        <div className="followHollowJollow">
                            <div className="infooo">
                                <span className="frfont">
                                    {followers}
                                </span>
                                <span className="fmfont">
                                    Followers
                                </span>
                            </div>


                            <div className="infooo">
                                <span className="frfont">
                                    {following}
                                </span>
                                <span className="fmfont">
                                Following
                                </span>
                            </div>

                            <div className="infooo">
                                <span className="frfont">
                                    0
                                </span>
                                <span className="fmfont">
                                    Classes Taught
                                </span>
                            </div>

                            <div className="infooo">
                                <span className="frfont">
                                    0
                                </span>
                                <span className="fmfont">
                                    Classes Attended
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="tabsforProfilePageJJsn fmfont">
                <span className={`cp ${currentSelected === 1 && "joonie"}`}
                    onClick={
                        () => setCS(1)
                    }
                >
                    About
                </span>

                <span
                    onClick={
                        () => setCS(2)
                    }
                    className={`cp ${currentSelected === 2 && "joonie"}`}
                >
                    Posts
                </span>

                <span
                    onClick={
                        () => setCS(3)
                    }
                    className={`cp ${currentSelected === 3 && "joonie"}`}
                >
                    Classes
                </span>

                {/* <span
                    onClick={
                        () => setCS(4)
                    }
                    className={`cp ${currentSelected === 4 && "joonie"}`}
                >
                    Friends
                </span> */}
            </div>


            {currentSelected === 1 && <div className="aboutProfileJKKKLI">
                <div>
                    <div className="aboutBox">
                        <div className="aboutFlex">
                            <span className="ogreeeeee fsbfont">About me</span>

                        </div>

                        <div className="aboutBox2">
                            <span className="ogre2 fsbfont">
                                Bio
                            </span>

                            <span className="ogre2Date frfont">
                                {bio && bio !== '' ? bio : `${isTeacher ? 'Learner-Teacher' : 'Learner'}`}
                            </span>
                        </div>


                        <div className="aboutBox2">
                            <span className="ogre2 fsbfont">
                                Headline
                            </span>

                            <span className="ogre2Date frfont">
                                {userProfile.headline ? userProfile.headline : `${isTeacher ? 'Learner-Teacher' : 'Learner'}`}
                            </span>
                        </div>


                        <div className="aboutBox2">
                            <span className="ogre2 fsbfont">
                                Location
                            </span>

                            <span className="ogre2Date frfont">
                                {userProfile.location ? userProfile.location : 'Not added'}
                            </span>
                        </div>


                        <div className="aboutBox2">
                            <span className="ogre2 fsbfont">
                                My Interests
                            </span>

                            <span className="ogre2Date girederWrapper  frfont">

                                {userProfile.interestedTags && userProfile.interestedTags.length > 0 &&
                                    userProfile?.interestedTags.slice(0, 4).map((ele, ind) => {
                                        return <span key={ind} className="gireder">
                                            {ele}
                                        </span>
                                    }) || 'none'
                                }
                            </span>
                        </div>

                        <div className="aboutBox2">
                            <span className="ogre2 fsbfont">
                                My Key Skills
                            </span>

                            <span className="ogre2Date girederWrapper  frfont">
                                {userProfile.skilss && userProfile.skilss.length > 0 &&
                                    userProfile?.skilss.slice(0, 4).map((ele, ind) => {
                                        return <span key={ind} className="gireder">
                                            {ele}
                                        </span>
                                    }) || 'none'
                                }
                            </span>
                        </div>

                    </div>
                </div>

                {/* <div className="PYMK">
                    <div className="zoronogaworokoworo">
                        <span className="head fsbfont">
                            People you might know
                        </span>

                        <span className="descr fmfont">
                            From common Interests
                        </span>
                    </div>


                    <div className="people">
                        <div className="box">

                        </div>
                        <div className="nameTagFollowFPYMK">
                            <div className="nametagPYMK">
                                <span className="namePYMK fmfont">
                                    Prashant Nandakumar
                                </span>

                                <span className="tagPYMK frfont">
                                    Artist, Painter
                                </span>
                            </div>

                            <span className="followPYMK fsbfont">
                                Follow
                            </span>
                        </div>
                    </div>

                    <div className="people">
                        <div className="box">

                        </div>
                        <div className="nameTagFollowFPYMK">
                            <div className="nametagPYMK">
                                <span className="namePYMK fmfont">
                                    Prashant Nandakumar
                                </span>

                                <span className="tagPYMK frfont">
                                    Artist, Painter
                                </span>
                            </div>

                            <span className="followPYMK fsbfont">
                                Follow
                            </span>
                        </div>
                    </div>

                    <div className="people">
                        <div className="box">

                        </div>
                        <div className="nameTagFollowFPYMK">
                            <div className="nametagPYMK">
                                <span className="namePYMK fmfont">
                                    Prashant Nandakumar
                                </span>

                                <span className="tagPYMK frfont">
                                    Artist, Painter
                                </span>
                            </div>

                            <span className="followPYMK fsbfont">
                                Follow
                            </span>
                        </div>
                    </div>

                    <div className="people">
                        <div className="box">

                        </div>
                        <div className="nameTagFollowFPYMK">
                            <div className="nametagPYMK">
                                <span className="namePYMK fmfont">
                                    Prashant Nandakumar
                                </span>

                                <span className="tagPYMK frfont">
                                    Artist, Painter
                                </span>
                            </div>

                            <span className="followPYMK fsbfont">
                                Follow
                            </span>
                        </div>
                    </div>
                </div> */}
            </div>}


            {currentSelected === 1 && <div className="gapperrappersnapper">
            </div>}

            <div className="no">
                <div className="thirdHLIP">

                    {
                        currentSelected == 2 &&
                        postData.map((value, index) => {
                            return (<PublicPostModule index={index} data={value} />)
                        })
                    }
                </div>

            </div>


            {
                currentSelected === 3 &&

                <div className="classesinProfileOfOther">

                    <div>

                        <div className="heaaaaaaaaaad fsbfont">Classes Trained</div>
                        <div className="wowAwesomeText fmfont">
                            No Classes to show
                        </div>
                    </div>


                    <div>
                        <div className="heaaaaaaaaaad fsbfont">
                            Classes Attended
                        </div>
                        <div className="wowAwesomeText fmfont">
                            No Classes to show
                        </div>
                    </div>
                </div>
            }



            {/* {
                currentSelected === 4 &&

                <div className="classesinProfileOfOther">

                    {dataGiveBack(data2, 2)}

                </div>
            } */}

            <Footer />
        </div>
    );
}


export default OtherProfileV8;