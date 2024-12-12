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
import editProfile from "../../Images/Editprofile.svg"
import myclass from "../../Images/myclass.svg"
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import DefaultPic from "../../Images/defualtProPic.jpg";
import axios from "axios";
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';

function MyNewProfile() {
    const [userProfile, setUserProfile] = useState()
    const [classes, setClasses] = useState([])
    const nava = useNavigate()
    const [photos, setPhotos] = useState([])
    const [videos, setVideo] = useState([])
    const pro = localStorage.getItem("propic");
    let prop;
    let propic;
    if (pro.includes("{")) {
        prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
        propic = prop.secure_url;
    } else {
        prop = pro;
        propic = pro;
    }


    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    useEffect(() => {
        console.log(currentTab)
        const getMyProfile = async () => {
            await axios
                .get(BaseUrl + "/profileDetails",
                    {
                        headers: { Authorization: `Bearer ${authTokens}` },
                    })
                .then((res) => {
                    setUserProfile(res.data)
                })
                .catch((err) => {
                    console.log(err, "eerr");
                });

            await axios
                .get(BaseUrl + `/teacherClasses?id=${id}`)
                .then((res) => {
                    console.log(res.data)
                    setClasses(res.data)

                    const picArr = []
                    const videArr = []

                    res.data.map((element, index) => {
                        const imageData = element.img
                        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];
                        const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm', '.m4v'];

                        imageData.map((element1, index) => {
                            const lowerCaseName = element1.name.toLowerCase();
                            const isImage = imageExtensions.some(ext => lowerCaseName.endsWith(ext));
                            const isVideo = videoExtensions.some(ext => lowerCaseName.endsWith(ext));

                            if (isImage) {
                                picArr.push(element1.url);
                            } else if (isVideo) {
                                videArr.push(element1.url);
                            }
                        })
                    })
                    console.log(
                        picArr, "\n  pic Array",
                        videArr, "\n vide Array"
                    )
                    setPhotos(picArr)
                    setVideo(videArr)
                })
                .catch((err) => {
                    console.log(err)
                });
        };
        getMyProfile();
    }, [])




    const [currentTab, setCurrentTab] = useState({
        classes: true,
        about: false,
        posts: false,
        photos: false,
        videos: false
    })

    const id = localStorage.getItem("User");
    const updateTab = (tabName) => {
        setCurrentTab({
            classes: false,
            about: false,
            posts: false,
            photos: false,
            videos: false,
            [tabName]: true, // Set the selected tab to true
        });
    };

    const data = [
        {
            id: 1,
            images: [
                "https://bask-s.s3.ap-south-1.amazonaws.com/Imageee/image+1.png "
            ],
            description: "<p> Hey everyone! I’m excited to share my latest piece with you all. This painting, titled “Whispers of Twilight”</p>",
            created_at: "2024-04-30T03:58:45.464Z",
            updated_at: "2024-04-30T06:58:45.464Z",
            user: {
                "id": 8,
                "provider": "email/phone",
                "img_thumbnail": "https://bask-s.s3.ap-south-1.amazonaws.com/matthieu.jpg",
                "first_name": "Diya",
                "last_name": "Joshi",
                "email": "asdg@blackis.in",
                "phone_num": "919999899998",
                "password": "$2b$12$iAfvZ1wJcFTemsMwbLChz.x0ZrPSB6AASZb07Sc1LstE/jMGghD4i",
                "about": "I am a software developer",
                "otp": 0,
                "verified": false,
                "admin": false,
                "created_at": "2024-04-30T06:58:45.464Z",
                "classroom_id": 1,
                "updated_at": "2024-04-30T06:58:45.464Z"
            }

        },
        {
            id: 1,
            images: [
                "https://bask-s.s3.ap-south-1.amazonaws.com/Imageee/im3.jpg"
            ],
            description: "<p>Nestled in the heart of a quaint village, Manjappa brings to life the timeless art of pottery with a unique touch. </p>",
            created_at: "2024-04-30T06:53:45.464Z",
            updated_at: "2024-04-30T06:58:45.464Z",
            user: {
                "id": 8,
                "provider": "email/phone",
                "img_thumbnail": "https://res.cloudinary.com/black-box/image/upload/v1714460344/pojvl3mjjwdqcfhgivrr.jpg",
                "first_name": "Anshu",
                "last_name": "Rathod",
                "email": "asdg@blackis.in",
                "phone_num": "919999899998",
                "password": "$2b$12$iAfvZ1wJcFTemsMwbLChz.x0ZrPSB6AASZb07Sc1LstE/jMGghD4i",
                "about": "I am a software developer",
                "otp": 0,
                "verified": false,
                "admin": false,
                "created_at": "2024-04-30T06:58:45.464Z",
                "classroom_id": 1,
                "updated_at": "2024-04-30T06:58:45.464Z"
            }
        }
    ]

    const [demo, setDemo] = useState(false)
    return (
        <>
            <Header />

            <div className="profilePageForMe">

                <div className="dpAtPPM">
                    {prop ? (
                        propic ? (
                            <img
                                src={propic}
                                alt=""
                                className="mb-1 mt-3 ic2"
                            />

                            // <link rel="preload" href={propic} as="image"  className=" mb-1 mt-3 ic2 "></link>
                        ) : (
                            <img
                                src={DefaultPic}
                                alt=""
                                style={{
                                    borderRadius: "50%",
                                }}
                                className="profilepic mb-1 mt-3 "
                            />
                        )
                    ) : (
                        <img
                            src={DefaultPic}
                            alt=""
                            className=" mb-1 mt-3 ic2"
                        />
                    )}
                </div>


                <div className="userDetail">
                    <div className="name fmfont">
                        {userProfile && userProfile.full_name}
                    </div>


                    <div className="followingFollowers fmfont">
                        <div> 0 Followers </div>
                        <div> 0 Following </div>
                    </div>


                    <div className="userDescription flfont">
                        {/* {
                                userProfile && userProfile.about !== '' ? userProfile.about : 'No Bio'
                            } */}

Meet Neethi, a dedicated baker with a passion for creating delicious and delightful desserts. From pastries to rich, decadent cakes, baking is her art, and the kitchen is her studio. The magic that happens when simple ingredients come together to create something extraordinary Inspires her to do more.
                    </div>


                    <div className="profileOptionsInMp flfont">
                        <span className="optionsPOIMP">
                            <LockIcon fontSize="inherit"/>
                             Private</span>
                        <span className="optionsPOIMP">
                            <LockOpenIcon fontSize="inherit"/> 
                            Public</span>
                        <span className="optionsPOIMP">
                            <GroupIcon fontSize="inherit"/>
                            Friends</span>
                        <span className="optionsPOIMP">
                            <EditIcon fontSize="inherit"/>
                            My Profile</span>
                    </div>
                </div>

            </div>

            <div className="tabsInPPFM flfont">
                <div className={`classInPPFM cp ${currentTab.classes ? 'selectedTabInPPFM' : ''}`}
                    onClick={() => {
                        updateTab('classes')
                    }}
                >
                    Classes
                </div>

                <div className={`aboutInPPFM cp ${currentTab.about ? 'selectedTabInPPFM' : ''}`}
                    onClick={() => {
                        updateTab('about')
                    }}
                >
                    About
                </div>

                <div className={`postsInPPFM cp ${currentTab.posts ? 'selectedTabInPPFM' : ''}`}
                    onClick={() => {
                        updateTab('posts')
                    }}
                >
                    Posts
                </div>

                <div className={`photosInPPFM cp ${currentTab.photos ? 'selectedTabInPPFM' : ''}`}
                    onClick={() => {
                        updateTab('photos')
                    }}
                >
                    Photos
                </div>

                <div className={`videosInPPFM cp ${currentTab.videos ? 'selectedTabInPPFM' : ''}`}
                    onClick={() => {
                        updateTab('videos')
                    }}
                >
                    Videos
                </div>


            </div>

            {
                currentTab.classes && (
                    <div className="classesTakenInPPFM">
                        {
                            !classes || classes.length === 0 ? (<span className="fsbfont jokinglyAwesomeNoClasses">
                                No Classes Hosted Yet
                            </span>) : (
                                <div className="girdInCTIPPFM">
                                    {
                                        classes.map((element, index) => {
                                            return (<div className="classItemInGICTIPPFM cp" key={index}
                                                onClick={() => {
                                                    const id = element.id
                                                    const course = element.date.length === 1 ? false : true
                                                    if (course) {
                                                        nava(`/courseV2/${id}`)
                                                    } else {
                                                        nava(`/classV2/${id}`)
                                                    }
                                                }}>
                                                <div className="imgParentDiv">
                                                    <img src={element.img[0].url} alt="" />
                                                </div>

                                                <div className="descrCIIGICTIPPFM">
                                                    <span className="DCIIGICTIPPFM1">
                                                        <img src={element.user.img_thumbnail} alt="" />
                                                    </span>
                                                    <div className="DCIIGICTIPPFM2 fsbfont">
                                                        <span className="DCIIGIclassName1">
                                                            {element.title}
                                                        </span>
                                                        <span className="DCIIGIProfileName1">
                                                            {`${element.user.first_name} ${element.user.last_name}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>)
                                        })
                                    }
                                </div>
                            )
                        }

                    </div>
                )
            }

            {
                currentTab.photos && (
                    <div className="photosHave">
                        {
                            photos.length === 0 ? (
                                <span className="fsbfont jokinglyAwesomeNoClasses">
                                    No Photos Posted Yet
                                </span>
                            ) : (
                                <div className="girdInCTIPPFM">
                                    {
                                        photos.map((element, index) => {
                                            return (<div className="imgParentDiv">
                                                <img src={element} alt="" />
                                            </div>)
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }


            {
                currentTab.videos && (
                    <div className="photosHave">
                        {
                            videos.length === 0 ? (
                                <span className="fsbfont jokinglyAwesomeNoClasses">
                                    No Videos Posted Yet
                                </span>
                            ) : (
                                <div className="girdInCTIPPFM">
                                    {
                                        videos.map((element, index) => {
                                            return (<div className="imgParentDiv">
                                                <img src={element} alt="" />
                                            </div>)
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }


            {
                currentTab.about && (
                    <div className="postsHave">
                        <div className="postInohhhhhhTheProfile">
                            <div className="identityInPosts flfont">
                                <div className="heaad fmfont">
                                    Intro
                                </div>
                                <div className="profo">
                                    Profile : {userProfile && userProfile.full_name}
                                </div>

                                <div className="Worked">
                                    Worked : N/A
                                </div>

                                <div className="Studied">
                                    Studied : N/A
                                </div>

                                <div className="live">
                                    Live : N/A
                                </div>
                            </div>
                        </div>

                        <div className="infoOfAbout">
                            <div className="grouppingInIOA fmfont">
                                <div>
                                    First Name : {userProfile.first_name}
                                </div>

                                <div>
                                    Last Name : {userProfile.last_name}
                                </div>
                            </div>

                            <div className="grouppingInIOA fmfont">
                                <div>
                                    Email : {userProfile.email}
                                </div>

                                <div>
                                    DOB : {userProfile.dob ? userProfile.dob : 'N/A'}
                                </div>
                            </div>

                            <div className="grouppingInIOA fmfont">
                                <div>
                                    Gender : {userProfile.gender ? userProfile.gender : 'N/A'}
                                </div>

                                <div>
                                    State : {userProfile.state ? userProfile.state : 'N/A'}
                                </div>
                            </div>

                            <div className="noGrouppingInIOA fmfont">
                                Bio : Meet Neethi, a dedicated baker with a passion for creating delicious and delightful desserts. From pastries to rich, decadent cakes, baking is her art, and the kitchen is her studio. The magic that happens when simple ingredients come together to create something extraordinary Inspires her to do more.
                            </div>


                            <div className="interestsInProfile fmfont">
                                <div className="heeeeeeeeeeaaaaaaaaadddddd fsbfont">
                                    Interests
                                </div>

                                <div className="boddddddddyyyyyyyyyy">
                                        <div>Painting</div>
                                        <div>Cooking</div>
                                        <div>Dancing</div>
                                        <div>Painting</div>
                                        <div>Cooking</div>
                                        <div>Dancing</div>
                                        <div>Painting</div>
                                        <div>Cooking</div>
                                        <div>Dancing</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


            {
                currentTab.posts && (
                    <div className="postsHave">
                        <div className="postInohhhhhhTheProfile">
                            <div className="identityInPosts flfont">
                                <div className="heaad fmfont">
                                    Intro
                                </div>
                                <div className="profo">
                                    Profile : {userProfile && userProfile.full_name}
                                </div>

                                <div className="Worked">
                                    Worked : N/A
                                </div>

                                <div className="Studied">
                                    Studied : N/A
                                </div>

                                <div className="live">
                                    Live : N/A
                                </div>
                            </div>

                            <div className="classesJoineInPosts mt-5">
                                <span className="heeaad fmfont">Classes</span>

                                <span className="body fmfont">No Classes Joined Yet</span>
                            </div>

                            <div className="friendsInPosts mt-5">
                                <span className="heeaad fmfont">Friends</span>
                                <span className="flfont mmiiimm">0 friends</span>

                                <span className="body fmfont">No Friends Added</span>
                            </div>
                        </div>


                        <div className="publicPostsFromProfilep">
                            {
                                demo ?
                                    <span className="fmfont noPublicPostInPPFP"> No posts to show </span> :
                                    (
                                        data.map((ele, ind) => {
                                            const descr = ele.description
                                            const imgOfUser = ele.user.img_thumbnail
                                            const imgforPP = ele.images[0]

                                            return (
                                                <div className="postPublicInProfile">
                                                    <div className="PPIPPrdescr">
                                                        <span className="descr flfont" dangerouslySetInnerHTML={{ __html: descr }}>

                                                        </span>
                                                    </div>

                                                    <div className="immmmmmmmmmmmmmmmg">
                                                        <img src={imgforPP} alt="" />
                                                    </div>

                                                    <div className="shareDare">

                                                        <div className="s2 fmfont">
                                                            SHARE
                                                        </div>

                                                        <AiFillHeart
                                                            className="cp"
                                                            size={20}
                                                            style={{
                                                                color: 'yellow'
                                                            }}
                                                        />

                                                    </div>
                                                </div>
                                            )
                                        })
                                    )

                            }
                        </div>
                    </div>
                )
            }

            <div className="gapBwFootAndPost6351">

            </div>

            <Footer/>

        </>
    );
}


export default MyNewProfile;