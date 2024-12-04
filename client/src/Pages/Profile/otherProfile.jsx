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


    let [name, setName] = useState('');
    const [editingIsOn, setEditingIsOn] = useState(false)

    const [currentSelected, setCS] = useState(1)

    const data = [
        {
            id: 1,
            images: [
                "https://bask-s.s3.ap-south-1.amazonaws.com/Imageee/image+1.png "
            ],
            description: "<p> Hey everyone! I’m excited to share my latest piece with you all. This painting, titled “Whispers of Twilight,” explores the transition between day and night, capturing that fleeting moment when the sky is painted in the most delicate shades of blue and gold. Let me know what you think in the comments! <br/> #Art #PainterLife #WhispersOfTwilight #NewArt #ArtInProgress #SupportLocalArtists</p>",
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
            description: "<p>Nestled in the heart of a quaint village, Manjappa brings to life the timeless art of pottery with a unique touch. As the village potter, he has spent years perfecting the craft, creating stunning, hand-thrown ceramics that reflect the serene beauty of rural life. With a deep connection to nature and tradition, his work is characterized by its earthy glazes and intricate designs inspired by the local landscape. </p>",
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
        },
        {
            id: 1,
            images: ['https://bask-s.s3.ap-south-1.amazonaws.com/Imageee/image+2.png'],
            description: "<p>I’m thrilled to share my today’s special creation: Triple Berry Cheesecake!  <br/> These bars are a creamy, decadent treat with a graham cracker crust, velvety cheesecake filling, and a vibrant mix of fresh berries on top. Each bite is a burst of fruity goodness combined with a rich, smooth texture that’s simply irresistible.</p>",
            created_at: "2024-04-27T06:58:45.464Z",
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
            images: [],
            description: "<p>Unveiling My Latest Scrapbook Creation! <br/> I’m excited to finally share my latest update on the scrapbook project with you all! Creating this scrapbook has been such a wonderful journey, filled with memories, creativity, and a touch of nostalgia.</p>",
            created_at: "2024-04-09T06:58:45.464Z",
            updated_at: "2024-04-30T06:58:45.464Z",
            user: {
                "id": 8,
                "provider": "email/phone",
                "img_thumbnail": "https://bask-s.s3.ap-south-1.amazonaws.com/vinatha-sreeramkumar-A2lvvapscdg-unsplash.jpg",
                "first_name": "Muskan",
                "last_name": "Ali",
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
            images: [],
            description: "<p>Thank you Sharmin, for sharing your extraordinary gift with us. Your writing continues to inspire and uplift, and I’m grateful for every moment spent lost in your words. If you haven’t yet explored their work, I highly recommend diving in you’re in for a remarkable experience!</p>",
            created_at: "2024-01-31T06:58:45.464Z",
            updated_at: "2024-04-30T06:58:45.464Z",
            user: {
                "id": 8,
                "provider": "email/phone",
                // "img_thumbnail": "https://res.cloudinary.com/black-box/image/upload/v1714460344/pojvl3mjjwdqcfhgivrr.jpg",
                "first_name": "Virat",
                "last_name": "Singh",
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
            images: [],
            description: "<p>I’m absolutely enchanted by the stunning handcrafted embroidery coming out of Lucknow. Each piece is a testament to the skill and artistry of the local artisans who pour their hearts into every stitch. <br/> The attention to detail and the passion behind these creations are truly remarkable.  </p>",
            created_at: "2024-04-30T03:58:45.464Z",
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

        },
        {
            id: 1,
            images: [],
            description: "<p>I just had to take a moment to express my deep appreciation for Miss Nikita and the incredible class she leads. <br/>  From the calming ambiance to the thoughtful guidance, every session with her is a journey of self-discovery and rejuvenation. Her expertise and passion for yoga shine through in every pose and practice, making each class a transformative experience.  </p>",
            created_at: "2024-04-30T03:58:45.464Z",
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

        },
        {
            id: 1,
            images: ['https://bask-s.s3.ap-south-1.amazonaws.com/Imageee/im5.jpg'],
            description: "<p>What an incredible evening we had at the ESHA Foundation last night! The live classical music performance was nothing short of mesmerizing, and I just had to share how deeply moved I was by the experience.  </p>",
            created_at: "2024-04-30T03:58:45.464Z",
            updated_at: "2024-04-30T06:58:45.464Z",
            user: {
                "id": 8,
                "provider": "email/phone",
                "img_thumbnail": "https://bask-s.s3.ap-south-1.amazonaws.com/sanjoy-sadhukhan-vCaLqx2UufY-unsplash.jpg",
                "first_name": "Yashwini",
                "last_name": "Yadav",
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
    ]

    const currentLink = window.location.href;
    const [shareOpen, setShareOper] = useState(false)

    function clickedOnShare() {
        setShareOper(!shareOpen)
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
                        <img className="theImg" src={propic} alt="" />

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
                        </div>


                        <div className="followHollowJollow">
                            <div className="infooo">
                                <span className="frfont">
                                    0
                                </span>
                                <span className="fmfont">
                                    Followers
                                </span>
                            </div>


                            <div className="infooo">
                                <span className="frfont">
                                    0
                                </span>
                                <span className="fmfont">
                                    Friends
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

                <span
                    onClick={
                        () => setCS(4)
                    }
                    className={`cp ${currentSelected === 4 && "joonie"}`}
                >
                    Friends
                </span>
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



            {
                currentSelected === 4 &&

                <div className="classesinProfileOfOther">

                    {dataGiveBack(data2, 2)}

                </div>
            }

            <Footer />
        </div>
    );
}


export default OtherProfileV8;