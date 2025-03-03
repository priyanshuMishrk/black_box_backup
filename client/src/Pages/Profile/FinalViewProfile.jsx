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
import shareIcon from '../../Images/share.svg'
import whatsapp from '../../Images/whatsapp.svg'
import email from '../../Images/mail.svg'
import copyLink from '../../Images/copy.svg'
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
import defaultPic from '../../Images/defualtProPic.jpg'
import { useRef } from "react";
import AWS from 'aws-sdk';



const s3 = new AWS.S3({
    accessKeyId: 'AKIAXYKJWCCAIBD425IC',
    secretAccessKey: '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',
    region: 'ap-south-1',
});

const bucketName = 'blackboxim';
const cloudfrontUrl = 'https://d2f7i2k65rgoj5.cloudfront.net'; // Your CloudFront URL

function MyProfileV8(props) {

    const nava = useNavigate()
    function isCloudinaryUrl(url) {
        if (!url) return false
        const cloudinaryPattern = /^https:\/\/res\.cloudinary\.com\/black-box\/.*/;
        return !cloudinaryPattern.test(url);
    }

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    const [isTeacher, setIsTeacher] = useState(false)
    const id = localStorage.getItem("User");
    const pro = localStorage.getItem("propic");
    if (pro && pro !== '') {
        if (pro.includes("{")) {
            var prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
            var propic = prop.secure_url;
        } else {
            // eslint-disable-next-line
            var propic = pro;
        }
    } else {
        // eslint-disable-next-line
        var propic = defaultPic;
    }

    async function updateUserInfo() {
        const uid = localStorage.getItem("User")

        data.userId = uid
        const res = await axios.post(BaseUrl + `/userInfo`,
            { ...data },
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            });
    }
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        async function teachedVerify() {
            await axios
                .get(BaseUrl + "/profileDetails",
                    {
                        headers: { Authorization: `Bearer ${authTokens}` },
                    })
                .then((res) => {
                    setUserProfile(res.data)
                    console.log(res.data, "asdhfuf")
                })
                .catch((err) => {
                    console.log(err, "eerr");
                });

            const res = await axios.get(BaseUrl + `/isTeacher?id=${id}`);
            setIsTeacher(res.data)
        }

        teachedVerify()

    }, [])


    async function teachedVerify() {
        await axios
            .get(BaseUrl + "/profileDetails",
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                })
            .then((res) => {
                setUserProfile(res.data)
                setbb(res.data.backbanner)
            })
            .catch((err) => {
                console.log(err, "eerr");
            });

        const res = await axios.get(BaseUrl + `/isTeacher?id=${id}`);
        setIsTeacher(res.data)
    }

    const uid = localStorage.getItem('User')

    async function teachedVerify2() {

        const data = userProfile

        console.log('kkkssskkksss')

        const resAns = await axios.patch(BaseUrl + `/profileDetails?id=${uid}`, data,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            })
        // setUserProfile(resAns.data)
        localStorage.setItem('name', `${userProfile.first_name}   ${userProfile.last_name}`)
        setbb(resAns.data.backbanner)

        await teachedVerify()
    }

    const [postData, setPostData] = useState([])

    async function teachedVerify3() {

        const data = userProfile

        await axios
            .get(BaseUrl + `/publicPost/my`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                })
            .then((res) => {
                setPostData(res.data)
            })
            .catch((err) => {
                console.log(err, "eerr");
            });

        await teachedVerify()
    }

    useEffect(() => {
        async function teachedVerify2() {

            const data = userProfile

            await axios
                .get(BaseUrl + `/publicPost/my`,
                    {
                        headers: { Authorization: `Bearer ${authTokens}` },
                    })
                .then((res) => {
                    setPostData(res.data)
                })
                .catch((err) => {
                    console.log(err, "eerr");
                });

            await teachedVerify()
        }

        teachedVerify2()
    }, [])
    let [backbanner, setbb] = useState('')

    const user = localStorage.getItem("User");
    const name = localStorage.getItem("name");

    const currentLink = window.location.href;
    const [shareOpen, setShareOper] = useState(false)

    function clickedOnShare() {
        setShareOper(!shareOpen)
    }

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

    const [userUp, setUserUp] = useState({})

    const [openD, setOpenD] = useState(false)


    const [imgChangeOn, setICO] = useState(false)

    const [bannerChange, setBCO] = useState(false)

    const dropDownRef = useRef(null);
    useEffect(() => {
        // Function to handle the click event
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target) && imgChangeOn === true) {
                console.log("clicked outside")
                // Click is outside the dropDownPPH
                setICO(false);
            }
            console.log("clicked inside")
        };

        // Add event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/connections/${uid}`);
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
    }, [uid])



    return (
        <div className="columbusProfile">
            {
                uploading &&
                <div className="uploaderForHomePagePP">
                    <div className="showingUplodingFile">
                        <span className="fsbfont">
                            UPLOADING
                        </span>
                        <span className="theUploadedVer2">
                            <span style={{
                                position: "absolute",
                                width: `${progress}%`,
                                height: "100%",
                                backgroundColor: "#FFCC00",
                                borderRadius: "50px"
                            }}>

                            </span>
                        </span>
                    </div>
                </div>
            }
            <Header />

            {/* {imgChangeOn && <div className="changeImageOrRemove">
                <div className="listter fsbfont">
                    <span>
                        Change Profile Photo
                        <input type="file" accept={'image/*'} className="asfnirgnerineri"
                            onChange={async (e) => {
                                const selectedFile = e.target.files[0];
                                const formData = new FormData();
                                formData.append('file', selectedFile);
                                formData.append('upload_preset', 'i1m10bd7'); // Your Cloudinary upload preset

                                const url = `https://api.cloudinary.com/v1_1/black-box/${'image'}/upload`;
                                const value = await axios.post(url, formData)

                                const nurl = value.data.secure_url
                                localStorage.setItem('propic', nurl)
                                const turl = `${BaseUrl}/profileDetails/image?id=${user}`
                                const newD = await axios.patch(turl, {
                                    img: nurl
                                })
                                setICO(false)
                                propic = nurl
                            }} />
                    </span>
                    <span onClick={async () => {
                        const nurl = ''
                        localStorage.setItem('propic', nurl)
                        const turl = `${BaseUrl}/profileDetails/image?id=${user}`
                        const newD = await axios.patch(turl, {
                            img: nurl
                        })
                        setICO(false)
                        propic = defaultPic
                    }}>
                        Remove Profile Photo
                    </span>
                    <span onClick={() => {
                        setICO(false)
                    }}>
                        Cancel
                    </span>
                </div>
                <div className="closer">

                </div>

            </div>} */}

            {bannerChange && <div className="changeImageOrRemove">
                <div className="listter fsbfont">
                    <span>
                        Change Banner
                        <input
                            type="file"
                            accept="image/*"
                            className="asfnirgnerineri"
                            onChange={async (e) => {
                                const selectedFile = e.target.files[0];

                                if (!selectedFile) return;

                                const fileName = `back-banners/${Date.now()}-${selectedFile.name}`;
                                const params = {
                                    Bucket: bucketName,
                                    Key: fileName,
                                    Body: selectedFile,
                                    ContentType: selectedFile.type,
                                };

                                try {
                                    const uploadResult = await s3.upload(params).promise();
                                    const s3FilePath = fileName; // S3 Key (path inside the bucket)

                                    // Construct CloudFront URL
                                    const nurl = `${cloudfrontUrl}/${s3FilePath}`;

                                    const turl = `${BaseUrl}/profileDetails/backbanner?id=${user}`;
                                    await axios.patch(turl, { img: nurl });

                                    setICO(false);
                                    setbb(nurl);
                                    console.log(nurl); // Log the new back banner URL
                                } catch (error) {
                                    console.error('Upload error:', error);
                                }
                            }}
                        />
                    </span>
                    <span onClick={() => {
                        setBCO(false)
                    }}>
                        Cancel
                    </span>
                </div>
                <div className="closer">

                </div>

            </div>}

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

            <div className="aboutProfile">
                <div className="backBannerInProfile">
                    <img src={backbanner === '' || !backbanner ? 'https://d1bxlu89wy43u2.cloudfront.net/2.png' : backbanner} alt="" />
                    <img src={editProfile}
                        onClick={() => {
                            setBCO(true)
                        }}
                        className="cp aosdnvfrinfcamdoemdffdsasf" />
                </div>
                <div className="userDetails">
                    <div className={`theProfilePic ${isTeacher && 'teacherIsHere'}`} >
                        <img className="theImg" src={isCloudinaryUrl(propic) ? propic : defaultPic
                        } alt="" />
                        <div ref={dropDownRef}>
                            <img src={editIcon}
                                onClick={() => {
                                    setICO(true)
                                }}
                                className="cp kkksdinsifnr" />
                            {imgChangeOn && <div className="changeImageOrRemove" >
                                <div className="listter fsbfont">
                                    <span>
                                        Change Profile Photo
                                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="asfnirgnerineri"
                                            onChange={async (e) => {
                                                setUploading(true);
                                                const selectedFile = e.target.files[0];

                                                if (!selectedFile) return;

                                                const fileName = `profile-images/${Date.now()}-${selectedFile.name}`;
                                                const params = {
                                                    Bucket: bucketName,
                                                    Key: fileName,
                                                    Body: selectedFile,
                                                    ContentType: selectedFile.type,
                                                };

                                                try {
                                                    const uploadResult = await s3.upload(params).promise();
                                                    const s3FilePath = fileName; // S3 Key (path inside the bucket)

                                                    // Construct CloudFront URL
                                                    const nurl = `${cloudfrontUrl}/${s3FilePath}`;

                                                    localStorage.setItem('propic', nurl);
                                                    const turl = `${BaseUrl}/profileDetails/image?id=${user}`;

                                                    await axios.patch(turl, { img: nurl });

                                                    setICO(false);
                                                } catch (error) {
                                                    console.error('Upload error:', error);
                                                } finally {
                                                    setUploading(false);
                                                    setProgress(0);
                                                    propic = nurl
                                                }
                                            }}
                                        />
                                    </span>
                                    <span onClick={async () => {
                                        const nurl = ''
                                        localStorage.setItem('propic', nurl)
                                        const turl = `${BaseUrl}/profileDetails/image?id=${user}`
                                        const newD = await axios.patch(turl, {
                                            img: nurl
                                        })
                                        setICO(false)
                                        propic = defaultPic
                                    }}>
                                        Remove Profile Photo
                                    </span>
                                    <span onClick={() => {
                                        setICO(false)
                                    }}>
                                        Cancel
                                    </span>
                                </div>
                                <div className="closer">

                                </div>

                            </div>}

                        </div>
                        {/* <input type="file" accept={'image/*'} className="asfnirgnerineri"
                            onChange={async (e) => {
                                // const selectedFile = e.target.files[0];
                                // const formData = new FormData();
                                // formData.append('file', selectedFile);
                                // formData.append('upload_preset', 'i1m10bd7'); // Your Cloudinary upload preset

                                // const url = `https://api.cloudinary.com/v1_1/black-box/${'image'}/upload`;
                                // const value = await axios.post(url,formData)

                                // const nurl = value.data.secure_url
                                // localStorage.setItem('propic',nurl)
                                // const turl = `${BaseUrl}/profileDetails/image?id=${user}`
                                // const newD = await axios.patch(turl , {
                                //     img : nurl
                                // })
                                // window.location.reload()
                                setICO(true)
                            }}

                        /> */}

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
                                    {following}
                                </span>
                                <span className="fmfont">
                                    Following
                                </span>
                            </div>

                            <div className="infooo">
                                <span className="frfont">
                                    {followers}
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
            </div>


            {currentSelected === 1 && <div className="aboutProfileJKKKLI">
                <div>
                    <div className="aboutBox">
                        <div className="aboutFlex">
                            <span className="ogreeeeee fsbfont">About me</span>
                            <img src={editIcon} className="cp"
                                onClick={() => {
                                    setEditingIsOn(true)
                                }}
                                alt="" />
                        </div>

                        <div className="aboutBox2">
                            <span className="ogre2 fsbfont">
                                Bio
                            </span>

                            <span className="ogre2Date frfont">
                                {userProfile.about ? userProfile.about : `${isTeacher ? 'Learner-Teacher' : 'Learner'}`}
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


            {editingIsOn && <div className="editBox">
                <div className="outsideThebox">

                </div>

                <div className="editForum">
                    <span className="edit1title">
                        <span className="fbfont">
                            Edit About me
                        </span>

                        <span>
                            <img src={close} onClick={
                                () => {
                                    setEditingIsOn(false)

                                }

                            } alt="" className="cp" />
                        </span>
                    </span>

                    <span className="fsbfont">
                        First Name
                    </span>

                    <input type="text" onChange={
                        (e) => {
                            setUserProfile((prevState) => {
                                // Return the new state based on prevState
                                return {
                                    ...prevState,
                                    first_name: e.target.value
                                };
                            })
                        }
                    } placeholder={userProfile.first_name ? userProfile.first_name : `Jason`}
                        value={userProfile.first_name ? userProfile.first_name : ``}
                    />

                    <span className="fsbfont">
                        Last Name
                    </span>

                    <input type="text" onChange={
                        (e) => {
                            setUserProfile((prevState) => {
                                // Return the new state based on prevState
                                return {
                                    ...prevState,
                                    last_name: e.target.value
                                };
                            })
                        }
                    } placeholder={userProfile.last_name ? userProfile.last_name : `Kudos`}
                        value={userProfile.last_name ? userProfile.last_name : ``}
                    />

                    <span className="fsbfont">
                        Bio
                    </span>

                    <textarea onChange={(e) => {
                        setUserProfile((prevState) => {
                            // Return the new state based on prevState
                            return {
                                ...prevState,
                                about: e.target.value
                            };
                        });
                    }} placeholder={userProfile.about && userProfile.about || `Your Bio`}
                        value={userProfile.about && userProfile.about || ``}
                        cols="20" rows="100"></textarea>

                    <span className="fsbfont">
                        Headline
                    </span>

                    <input type="text" onChange={
                        (e) => {
                            setUserProfile((prevState) => {
                                // Return the new state based on prevState
                                return {
                                    ...prevState,
                                    headline: e.target.value
                                };
                            })
                        }
                    } placeholder={userProfile.headline ? userProfile.headline : `Artist or painter`}
                        value={userProfile.headline ? userProfile.headline : ``}
                    />

                    <span className="fsbfont">
                        Location
                    </span>

                    <input type="text" value={userProfile.location ? userProfile.location : ''}
                        placeholder={userProfile.location ? userProfile.location : 'Delhi'}
                        onChange={
                            (e) => {
                                setUserProfile((prevState) => {
                                    // Return the new state based on prevState
                                    return {
                                        ...prevState,
                                        location: e.target.value
                                    };
                                })
                            }
                        }
                    />

                    <span className="fsbfont">
                        My Interests
                    </span>

                    <input type="text"
                        value={userProfile.interestedTags && userProfile.interestedTags.length > 0 &&
                            userProfile.interestedTags.slice(0, 4).join(',') || ''}
                        onChange={
                            (e) => {
                                setUserProfile((prevState) => {
                                    // Return the new state based on prevState
                                    return {
                                        ...prevState,
                                        interestedTags: e.target.value.split(',')
                                    };
                                })
                            }
                        }
                    />

                    <span className="fsbfont">My Key Skills</span>

                    <input type="text" value={userProfile.skilss && userProfile.skilss.length > 0 &&
                        userProfile.skilss.slice(0, 4).join(',') || ''}
                        onChange={
                            (e) => {
                                setUserProfile((prevState) => {
                                    // Return the new state based on prevState
                                    return {
                                        ...prevState,
                                        skilss: e.target.value.split(',')
                                    };
                                })
                            }
                        }
                    />

                    <span className="diahrbfvsaosorfgv fsbfont" onClick={
                        () => {
                            if (userProfile.about && userProfile.headline && userProfile.location && userProfile.about !== '' && userProfile.headline !== '' && userProfile.location !== '' && userProfile.interestedTags && userProfile.interestedTags.length > 0 && userProfile.skilss && userProfile.skilss.length > 0) {
                                teachedVerify2()
                                setEditingIsOn(false)
                            } else {
                                alert('Please fill in all the details')
                            }
                        }

                    } >
                        Save
                    </span>
                </div>
            </div>}

            <div className="no">
                <div className="thirdHLIP fsbfont">

                    {
                        currentSelected == 2 &&
                        postData.length > 0 && postData.map((value, index) => {
                            return (
                                <div>
                                    <PublicPostModule onClick={teachedVerify3} index={index} data={value} />
                                </div>)
                        }) || currentSelected == 2 && 'No Posts to show'
                    }

                    {currentSelected === 2 && <div className="gapperrappersnapper">
                    </div>}
                </div>

            </div>

            <Footer />
        </div>
    );
}


export default MyProfileV8;