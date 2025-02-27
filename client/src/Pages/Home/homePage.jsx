import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import axios from "axios";
import TabsComponent from "../../Components/Learn/TabPannel";
import star from '../../Images/star.svg'
import wishlist from "../../Images/wishlist.svg"
import wishlist2 from "../../Images/almostLikec.svg"
import wishlist3 from "../../Images/liked.svg"
import wishlist4 from "../../Images/almostDisliked.svg"
import ChatIcon from "../../Images/chat.svg"
import friendsIcon from "../../Images/friends.svg"
import stickerIcon from "../../Images/Sticker.svg"
import AddImages from "../../Images/AddImages.svg"
import friendAddIcon from "../../Images/FriendAdd.svg"
import videosIcon from "../../Images/Video.svg"
import DefaultPic from "../../Images/defualtProPic.jpg";
import hc1 from "../../Images/hc1.jpg";
import hc2 from "../../Images/hc2.jpg";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import leftbl from '../../Images/leftbl.svg'
import rightbl from '../../Images/rightbl.svg'
import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PublicPostModule from "./PublicPostModule";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import playCirc from '../../Images/play-circle-fill.svg'
import BannerForHP from '../../Images/Banner top.png'
import EmojiPicker from 'emoji-picker-react';
import str1 from '../../Images/1LiveStr.avif'
import str2 from '../../Images/2LiveStr.avif'
import str3 from '../../Images/3LiveStr.avif'
import str4 from '../../Images/4LiveStr.avif'
import str5 from '../../Images/5LiveStr.avif'
import str6 from '../../Images/6LiveStr.avif'
import str7 from '../../Images/7LiveStr.avif'
import str8 from '../../Images/8LiveStr.avif'
import str9 from '../../Images/9LiveStr.avif'
import vijayImg from '../../Images/vijay.svg'
import StyleContext from "../../Context/StyleContext";


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 768, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const toolbarOptions = [
    ['bold', 'italic', 'underline'], // Bold, italic, underline
    [{ 'list': 'bullet' }] // Bullet points
];

const modules = {
    toolbar: toolbarOptions
};

const LoggedInHP = () => {
    const [wishlistLista, setWishlistLis] = useState([])
    const quillRef = useRef(null);
    const customLeftArrow = (
        <button className="arrowleftbl1">
            <img src={leftbl} alt="Left Arrow" />
        </button>
    );

    useEffect(() => {
        subsOfWish()
    }, [])

    const customRightArrow = (
        <button className="arrowrightbl2">
            <img src={rightbl} alt="Right Arrow" />
        </button>
    );

    const [showBanner, setShowBanner] = useState(0)

    const data = [
        {
            id: 1,
            images: [
                "https://bask-s.s3.ap-south-1.amazonaws.com/Imageee/image+1.png "
            ],
            caption: "<p> Hey everyone! I’m excited to share my latest piece with you all. This painting, titled “Whispers of Twilight,” explores the transition between day and night, capturing that fleeting moment when the sky is painted in the most delicate shades of blue and gold. Let me know what you think in the comments! <br/> #Art #PainterLife #WhispersOfTwilight #NewArt #ArtInProgress #SupportLocalArtists</p>",
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
            caption: "<p>Nestled in the heart of a quaint village, Manjappa brings to life the timeless art of pottery with a unique touch. As the village potter, he has spent years perfecting the craft, creating stunning, hand-thrown ceramics that reflect the serene beauty of rural life. With a deep connection to nature and tradition, his work is characterized by its earthy glazes and intricate designs inspired by the local landscape. </p>",
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
            caption: "<p>I’m thrilled to share my today’s special creation: Triple Berry Cheesecake!  <br/> These bars are a creamy, decadent treat with a graham cracker crust, velvety cheesecake filling, and a vibrant mix of fresh berries on top. Each bite is a burst of fruity goodness combined with a rich, smooth texture that’s simply irresistible.</p>",
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
            caption: "<p>Unveiling My Latest Scrapbook Creation! <br/> I’m excited to finally share my latest update on the scrapbook project with you all! Creating this scrapbook has been such a wonderful journey, filled with memories, creativity, and a touch of nostalgia.</p>",
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
            caption: "<p>Thank you Sharmin, for sharing your extraordinary gift with us. Your writing continues to inspire and uplift, and I’m grateful for every moment spent lost in your words. If you haven’t yet explored their work, I highly recommend diving in you’re in for a remarkable experience!</p>",
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
            caption: "<p>I’m absolutely enchanted by the stunning handcrafted embroidery coming out of Lucknow. Each piece is a testament to the skill and artistry of the local artisans who pour their hearts into every stitch. <br/> The attention to detail and the passion behind these creations are truly remarkable.  </p>",
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
            caption: "<p>I just had to take a moment to express my deep appreciation for Miss Nikita and the incredible class she leads. <br/>  From the calming ambiance to the thoughtful guidance, every session with her is a journey of self-discovery and rejuvenation. Her expertise and passion for yoga shine through in every pose and practice, making each class a transformative experience.  </p>",
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
            caption: "<p>What an incredible evening we had at the ESHA Foundation last night! The live classical music performance was nothing short of mesmerizing, and I just had to share how deeply moved I was by the experience.  </p>",
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

    const navigator = useNavigate()

    function streamEnded(){
        navigator('/streamEnded')
    }

    function takeToTeach() {
        navigator('/teaching')
    }

    const { errorToast, successToast, infoToast } = useContext(StyleContext);


    const {
        user
    } = useContext(AuthContext);
    function filterObjects(objects) {
        const excludedKeys = ["accN", "bankN", "holderN", "accTpe", "ifsc", "upi", 'currency', 'users'];

        return objects.filter(obj => {
            return Object.keys(obj).every(key => {
                if (excludedKeys.includes(key)) {
                    return true;
                }
                const value = obj[key];
                if (Array.isArray(value)) {
                    return value.length > 0 && value.every(subObj => filterObjects([subObj]).length > 0);
                }
                return value !== undefined && value !== null && value !== "";
            });
        });
    }

    function sortClassesByEarliestDate(classes) {
        return classes.sort((a, b) => {
            let aEarliestDate = new Date(Math.min(...a.date.map(d => new Date(`${d.date}T${d.time}`))));
            let bEarliestDate = new Date(Math.min(...b.date.map(d => new Date(`${d.date}T${d.time}`))));
            return bEarliestDate - aEarliestDate;
        });
    }

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    const [courses, setCls] = useState([])
    const name = localStorage.getItem("name");
    const about = localStorage.getItem("userDetails");
    const pro = localStorage.getItem("propic");
    const [showInput, setShowInput] = useState(false)
    const [showDelayedInput, setShowDelayedInput] = useState(false);

    const changer = (bool) => {
        setShowInput(bool)
        if (!bool) {
            setShowDelayedInput(false);
        }
    }

    let prop;
    let propic;
    if (pro.includes("{")) {
        prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
        propic = prop.secure_url;
    } else {
        prop = pro;
        propic = pro;
    }

    useEffect(() => {
        if (showInput) {
            const timer = setTimeout(() => {
                setShowDelayedInput(true);
            }, 300); // 1 second delay

            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [showInput]);

    useEffect(() => {
        async function getter() {
            const res = await axios.get(BaseUrl + `/classInfo/all`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                });

            const res2 = await axios.get(BaseUrl + `/courseInfo/all`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                });

            const d1 = res.data
            const d2 = res2.data

            let d3 = d1.concat(...d2)

            // setCurrentClasses(res.data)
            if (user) {
                const check = user.email.split('@')
                if (check[1] === 'blackis.in') {
                    const d = filterObjects(d3)
                    const k = sortClassesByEarliestDate(d)
                    setCls(k)
                    k.map((ele, ind) => {
                        if (wishlistLista.includes(ele.id)) {
                            console.log(true)
                            setStates((prevStates) => ({
                                ...prevStates,
                                [ele.id]: {
                                    liked: 4,
                                    currentWish: 3
                                },
                            }));
                        }
                    })
                }
                else {
                    const dataArray = d3
                    console.log(dataArray)
                    const filteredArray = dataArray.filter(item => item.verified);
                    const d = filterObjects(filteredArray)
                    const k = sortClassesByEarliestDate(d)
                    setCls(k)
                    k.map((ele, ind) => {
                        if (wishlistLista.includes(ele.id)) {
                            console.log(true)

                            setStates((prevStates) => ({
                                ...prevStates,
                                [ele.id]: {
                                    liked: 4,
                                    currentWish: 3
                                },
                            }));
                        }
                    })
                }
            }
            else {
                const dataArray = d3
                console.log(dataArray)
                const filteredArray = dataArray.filter(item => item.verified);
                const d = filterObjects(filteredArray)
                const k = sortClassesByEarliestDate(d)
                setCls(k)
                k.map((ele, ind) => {
                    if (wishlistLista.includes(ele.id)) {
                        console.log(true)

                        setStates((prevStates) => ({
                            ...prevStates,
                            [ele.id]: {
                                liked: 4,
                                currentWish: 3
                            },
                        }));
                    }
                })
            }
        }
        getter()
    }, [])

    async function getter() {
        const res = await axios.get(BaseUrl + `/classInfo/all`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            });

        const res2 = await axios.get(BaseUrl + `/courseInfo/all`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            });

        const d1 = res.data
        const d2 = res2.data

        let d3 = d1.concat(...d2)

        // setCurrentClasses(res.data)
        if (user) {
            const check = user.email.split('@')
            if (check[1] === 'blackis.in') {
                const d = filterObjects(d3)
                const k = sortClassesByEarliestDate(d)
                setCls(k)
            }
            else {
                const dataArray = d3
                console.log(dataArray)
                const filteredArray = dataArray.filter(item => item.verified);
                const d = filterObjects(filteredArray)
                const k = sortClassesByEarliestDate(d)
                setCls(k)
            }
        }
        else {
            const dataArray = d3
            console.log(dataArray)
            const filteredArray = dataArray.filter(item => item.verified);
            const d = filterObjects(filteredArray)
            const k = sortClassesByEarliestDate(d)
            setCls(k)
        }
    }


    async function subsOfWish() {
        const res = await axios.get(BaseUrl + `/wishlist`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
        const clss = res.data.classes
        if (!clss || clss.length === 0) {
            setWishlistLis([])
        }
        else {
        const ids = clss.map(item => item.id);
        setWishlistLis(ids)}

    }

    async function addedToCart(id, type) {
        const data = {
            id,
            type
        }
        console.log(data)
        const res = await axios.post(BaseUrl + `/wishlist`,
            data,
            {
                params: data,
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
    }

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

    const [showEmoji, setShowEmoji] = useState(false)

    function addEmoji() {
        if (showInput)
            setShowEmoji(true)
    }

    let initialState = [];

    const navigate = useNavigate()


    async function postPublic() {
        const data = publicPost
        if (publicPost.caption === '' && publicPost.images.length === 0 && publicPost.videos.length === 0){
            return alert('Please add any image or caption for the post')
        }
        const result = await axios.post(`${BaseUrl}/publicPost`, data,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            }

        )

        console.log(result)
        setPublicPost({
            id: '',
            images: [],
            caption: "",
            videos: []
        })
        setImgForPP([])
        setVidForPP([])
        successToast("Posted Successfully");
        // await getPost()
        // setPd(prevPd => [ result.data , ...prevPd]);
        // await getPost()

        changer(false)

    }

    const [pd, setPd] = useState([])

    async function getPost() {
        const data = publicPost
        const result = await axios.get(`${BaseUrl}/publicPost`
        )
        setPd(result.data)

    }

    useEffect(() => {
            async function postPublic() {
                const data = publicPost
                const result = await axios.get(`${BaseUrl}/publicPost`
                )
                setPd([])
                setPd(result.data)
    
            }
            const interval = setInterval(() => {
                postPublic(); // Function to fetch the latest posts from the server
            }, 2000); // Poll every 5 seconds
            return () => clearInterval(interval);
    }, [])

    useEffect(()=> {
        async function postPublic() {
            const data = publicPost
            const result = await axios.get(`${BaseUrl}/publicPost`
            )
            setPd(result.data)

        }
        postPublic()
    },[])

    useEffect(() => {
        const j = courses.reduce((acc, item) => {
            acc[item.id] = { liked: 0, currentWish: 1 };
            return acc;
        }, {});
        setStates(j)
    }, [courses])

    const [states, setStates] = useState(initialState);

    const clickController = (id) => {
        setStates((prevStates) => ({
            ...prevStates,
            [id]: {
                liked: prevStates[id]?.liked === 0 ? 1 : 0,
                currentWish: prevStates[id]?.liked === 0 ? 3 : 1,
            },
        }));
        subsOfWish(id)

    };

    const controllingHover = (id) => {
        setStates((prevStates) => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                currentWish: prevStates[id]?.liked === 0 ? 2 : 4,
            },
        }));
    };

    const controllingHoverOff = (id) => {
        setStates((prevStates) => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                currentWish: prevStates[id]?.liked === 0 ? 1 : 3,
            },
        }));
    };

    const [value, setValue] = useState(0);
    const truncateString = (str, num = 30) => {
        if (str.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollerRef = useRef(null);
    const handleScroll = (scrollOffset) => {
        if (scrollerRef.current) {
            const currentPosition = scrollerRef.current.scrollLeft; // Adjust according to your scroll direction
            const newPosition = currentPosition + scrollOffset;
            scrollerRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth',
            });
            setScrollPosition(newPosition);
        }
    };

    const [hoveringStream, setHoveringStream] = useState(0)

    const [publicPost, setPublicPost] = useState({
        id: '',
        images: [],
        caption: "",
        videos: []
    })

    const [imgForPP, setImgForPP] = useState([])
    const [vidForPP, setVidForPP] = useState([])
    const handleRemoveImage = (indexToRemove) => {
        setImgForPP((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };
    const handleRemoveVid = (indexToRemove) => {
        setVidForPP((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
        setPublicPost(prevStates => {
            prevStates.images = imgForPP
            return prevStates
        })
    }, [imgForPP])

    useEffect(() => {
        setPublicPost(prevStates => {
            prevStates.videos = vidForPP
            return prevStates
        })
    }, [vidForPP])

    const [ohhP, setOp] = useState(false)

    const [uploading, setUploading] = useState(false);
    const [uPer, setUper] = useState(0);

    async function changeInImgOrVideo(e) {
        console.log(e.target.accept);

        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'i1m10bd7');

        let url = '';
        if (e.target.accept === 'image/*') {
            url = `https://api.cloudinary.com/v1_1/black-box/image/upload`;
        } else if (e.target.accept === 'video/*') {
            console.log('video uploading');
            url = `https://api.cloudinary.com/v1_1/black-box/video/upload`;
        }

        setUploading(true); // Set uploading to true before starting the upload

        try {
            const res = await axios.post(url, formData, {
                onUploadProgress: (progressEvent) => {
                    const total = progressEvent.total;
                    const current = progressEvent.loaded;
                    const percentage = Math.round((current / total) * 100);
                    setUper(percentage); // Update the upload percentage
                }
            });

            if (e.target.accept === 'image/*') {
                setImgForPP(prevState => [...prevState, res.data.secure_url]);
            } else if (e.target.accept === 'video/*') {
                setVidForPP(prevState => [...prevState, res.data.secure_url]);
            }
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setUploading(false); // Set uploading to false after the upload is done
            setUper(0)
        }
    }

    useEffect(() => {
        setOp(true)
        console.log('renderrrr')
    }, [vidForPP, imgForPP])

    function changeInPublicPost(e) {
        if (typeof e === 'string') {
            setPublicPost(prevStates => {
                prevStates.caption = e
                return prevStates
            })
        }
        else {

            const addEm = `<img src='${e.imageUrl}' alt="" className="cp" />`
            setPublicPost(prevStates => {
                prevStates.caption = prevStates.caption + addEm
                console.log(prevStates)
                return prevStates
            })
        }
    }
    const handleEmojiSelect = (event, emojiObject) => {
        console.log(event)
        const cursorPosition = quillRef.current.getEditor().getSelection().index;
        quillRef.current.getEditor().insertText(cursorPosition, event.emoji);
        setShowEmoji(false)
        // quillRef.current.getEditor().in
    };

    const nava = useNavigate()

    const elementRef22 = useRef(null);

    function isCloudinaryUrl(url) {
        if (!url) return false
        const cloudinaryPattern = /^https:\/\/res\.cloudinary\.com\/black-box\/.*/;
        return !cloudinaryPattern.test(url);
      }

    useEffect(() => {
        // Function to handle click event
        const handleClickOutside = (event) => {
            // Check if the click occurred outside the element
            if (elementRef22.current && !elementRef22.current.contains(event.target)) {
                setShowEmoji(false)
            } else {
                console.log('Clicked inside the element');
            }
        };

        // Add event listener for document clicks
        document.addEventListener('click', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [scrollPosition2, setScrollPosition2] = useState(0);
    const scrollerRef2 = useRef(null);
    const handleScroll2 = (scrollOffset) => {
        if (scrollerRef.current) {
            const currentPosition = scrollerRef2.current.scrollLeft; // Adjust according to your scroll direction
            const newPosition = currentPosition + scrollOffset;
            scrollerRef2.current.scrollTo({
                left: newPosition,
                behavior: 'smooth',
            });
            setScrollPosition2(newPosition);
        }
    };


    return (
        <>
            <Header />

            {
                uploading &&
                <div className="uploaderForHomePagePP">
                        <div className="showingUplodingFile">
                                <span className="fsbfont">
                                    UPLOADING
                                </span>
                                <span className="theUploadedVer2">
                                    <span style={{
                                        position : "absolute",
                                        width : `${uPer}%`,
                                        height : "100%",
                                        backgroundColor : "#FFCC00",
                                        borderRadius : "50px"
                                    }}>

                                    </span>
                                </span>
                        </div>
                </div>
            }

            <div className="homepageLoggedin">
                {/* <div className="sideStrollerHLIP">
                    <div className="chatIcon">
                        <img src={ChatIcon} alt="" />
                    </div>
                    <div className="friendIcon">
                        <img src={friendsIcon} alt=""
                            onClick={() => {
                                navigator('/friends')
                            }}
                        />
                    </div>
                </div> */}
                <div className="contentHLIP">

                    <div className="firstHLIP">
                        <div className="f1HLIP">
                            <div className="imgForHostF1HLIP">
                                {isCloudinaryUrl(prop) ? (
                                    isCloudinaryUrl(propic) ? (
                                        <img
                                            width={100}
                                            height={100}
                                            src={propic}
                                            alt=""
                                        />

                                        // <link rel="preload" href={propic} as="image"  className=" mb-1 mt-3 ic2 "></link>
                                    ) : (
                                        <img
                                            width={100}
                                            height={100}
                                            src={DefaultPic}
                                            alt=""
                                        />
                                    )
                                ) : (
                                    <img
                                        src={DefaultPic}
                                        width={100}
                                        height={100}
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="hostNameAndWHLIP">
                                <div className="f11HLIP gsb">
                                    {`Welcome, ${name.split(' ')[0]}`}
                                </div>
                            </div>
                        </div>
                        
                        <div className="f2HLIP">
                            <div
                                className={`dynamicInputBoxHLIP frfont ${showInput ? 'expanded' : ''}`}
                            >
                                {showInput && showDelayedInput ? (
                                    <div className="f1jjkLq">
                                        <div className="custom-quill">
                                            <ReactQuill
                                                id="mmmm"
                                                name="message"
                                                modules={{ toolbar: [['bold', 'italic', 'underline'], ['link']] }} // Example toolbar configuration
                                                onChange={changeInPublicPost}
                                                value={publicPost.caption}
                                                ref={quillRef}
                                            // placeholder={`Ex: Join me as we embark on a delightful journey into the world of floral painting. In this comprehensive tutorial, we'll unravel the secrets behind creating captivating nasturtium flower paintings, from their graceful shapes to their intricate details.`}
                                            />
                                        </div>

                                        <div className=" buttonGroupHLIP">
                                            <Button className="button2ForHLIP" onClick={() => changer(false)}>
                                                Cancel
                                            </Button>
                                            <Button className="button1ForHLIP" onClick={() => postPublic()}>
                                                Post
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    (<div onClick={() => changer(true)} className="jtreeKKK34">
                                        Post to the Black Box community
                                    </div>
                                    )
                                )}
                            </div>
                            <div className="f21HLIP">
                                <div className="imgAdddhahahahhaa">
                                    <label htmlFor="imageInput">
                                        <img src={AddImages} alt="" className="cp" />
                                    </label>
                                    <input type="file" onChange={changeInImgOrVideo} id="imageInput" accept="image/*" />
                                </div>

                                <div className="imgAdddhahahahhaa">
                                    <input
                                        type="file"
                                        id="videoInput"
                                        accept="video/*"
                                        style={{ display: 'none' }}
                                        onChange={changeInImgOrVideo}
                                    />
                                    <label htmlFor="videoInput">
                                        <img src={videosIcon} alt="" className="cp" />
                                    </label>

                                </div>
                                {/* <div><img src={friendAddIcon} alt="" className="cp" /></div> */}
                                {/* <div className='emojiPublicPost'>
                                    <img src={stickerIcon} onClick={addEmoji} alt="" className="cp" />

                                    <EmojiPicker open={showEmoji} onEmojiClick={handleEmojiSelect} ref={elementRef22} name='emoji' />
                                </div> */}
                            </div>
                        </div>
                    </div>





                    <div className="imgAndVidPreview">
                        {ohhP && imgForPP.map((element, index) => {
                            return (
                                <div key={index}>
                                    <img src={element} />
                                    <span className="gsb" onClick={() => handleRemoveImage(index)}>X</span>
                                </div>
                            )
                        })}

                        {ohhP && vidForPP.map((element, index) => {
                            return (
                                <div key={index}>
                                    <video src={element} className="previewwwwwwwwww23"></video>
                                    <span className="gsb" onClick={() => handleRemoveVid(index)}>X</span>
                                </div>
                            )
                        })}

                    </div>




                    <div className="secondHLIP">
                        <div className="S1HLIP titleOfHLIPeverySection laslsaldlasllasdasasDSSA">
                            <div className="box1">

                            </div>
                            <div className="title gb">
                                New Classes
                            </div>
                            <div className="box2">

                            </div>
                        </div>

                        <div className="arrowleftbl" onClick={() => handleScroll(-400)}>
                            <img src={leftbl} alt="" />
                        </div>
                        <div className="arrowrightbl" onClick={() => handleScroll(400)}>
                            <img src={rightbl} alt="" />
                        </div>

                        <div className="S2HLIP" ref={scrollerRef}>

                            {courses.map((value, index) => {
                                return (<div className="latesCOurseL" key={value.id}>
                                    <div className="img">
                                        {/* <img
                                            key={value.id}
                                            className={`wishIconLCL ${states[value.id]?.currentWish === 1 ? 'oldIconsmall' : ''}`}
                                            src={states[value.id]?.currentWish === 1 ? wishlist : states[value.id]?.currentWish === 2 ? wishlist2 : states[value.id]?.currentWish === 3 ? wishlist3 : states[value.id]?.currentWish === 4 ? wishlist4 : ""}
                                            onMouseEnter={() => controllingHover(value.id)}
                                            onMouseLeave={() => controllingHoverOff(value.id)}
                                            onClick={() => clickController(value.id)}
                                            alt=""
                                        /> */}
                                        <img onClick={() => navigate(`${value.date.length > 1 ? `/courseV2/${value.id}` : `/classV2/${value.id}`}`)} src={value.img[0].url} alt="" />
                                    </div>
                                    <div className='LCLDecr' onClick={() => navigate(`${value.date.length > 1 ? `/courseV2/${value.id}` : `/classV2/${value.id}`}`)}>
                                        <div className='TitlePri gb'>
                                            <span className='LCLTitle'>
                                                {truncateString(value.title)}
                                            </span>
                                            <span className='LCLPrice'>
                                                ₹{value.price}
                                            </span>
                                        </div>
                                        <div className='LCLNameRate gm'>
                                            <span className='LCLName'>
                                                {value.user.first_name} {' '}
                                                {value.user.last_name.split('')[0]}.
                                            </span>
                                            <span className='LCLRateTime'>
                                                <span className='LCLRate'>
                                                    <img src={star} className='mb-1' alt="" />
                                                    0
                                                </span>
                                                <span className='LCLTime'>
                                                    {processClassData(value)}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>)
                            })}
                        </div>

                    </div>


                    <div className="thirdHLIP">
                        {pd.map((value, index) => {
                            // setShowBanner(prevIndex => {
                            //     if (prevIndex === 5) {
                            //         return 0;
                            //     } else {
                            //         return prevIndex + 1;
                            //     }
                            // });

                            if (index % 5 === 0 && index != 0) {

                                if (index === 5) {
                                    return (
                                        <>
                                            <div className="bannersForHomePage">
                            <div className="titleOfHLIPeverySection oopsOneIssue">
                                <div className="box1 box21">

                                </div>
                                <div className="title gb">
                                    For You
                                </div>
                                <div className="box2 box22">

                                </div>
                            </div>
                            <div className="tagsForHLIP">

                            </div>
                            <div className="first-divingkksk">
                                <img src={hc1} alt="Cover" className="cover-imgingkksk" />
                            </div>
                            <div className="carousel1">
                                <div className="arrowDivHP2">
                                    <div className="arrowleftbl" onClick={() => handleScroll2(-400)}>
                                        <img src={leftbl} alt="" />
                                    </div>
                                    <div className="arrowrightbl" onClick={() => handleScroll2(400)}>
                                        <img src={rightbl} alt="" />
                                    </div>
                                </div>
                                <div className="CarouselllForHP" ref={scrollerRef2}>
                                    {courses.map((ele, index) => {
                                        return (
                                            <div onClick={() => navigate(`${ele.date.length > 1 ? `/courseV2/${ele.id}` : `/classV2/${ele.id}`}`)} className="carouseldIn3HLIP">
                                                <div className="title gsb">
                                                    {ele.title}
                                                </div>
                                                <div className="price gsb">
                                                    ₹{ele.price}
                                                </div>
                                                <div className="nameRatingTime fmfont">
                                                    <span>
                                                        {ele.user.first_name} {' '}
                                                        {ele.user.last_name.split('')[0]}.
                                                    </span>
                                                    <span className="ratingTime">
                                                        {/* <span className="rating">

                                                                        </span> */}
                                                        <span className='LCLRate'>
                                                            <img src={star} className='mb-1' alt="" />
                                                            4.2
                                                        </span>
                                                        <span className='LCLTime'>
                                                            {processClassData(ele)}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="imgForLCLHLIP">
                                                    {/* <img
                                                                        key={value.id}
                                                                        className={`wishIconLCL ${states[value.id]?.currentWish === 1 ? 'oldIconsmall' : ''}`}
                                                                        src={states[value.id]?.currentWish === 1 ? wishlist : states[value.id]?.currentWish === 2 ? wishlist2 : states[value.id]?.currentWish === 3 ? wishlist3 : states[value.id]?.currentWish === 4 ? wishlist4 : ""}
                                                                        onMouseEnter={() => controllingHover(value.id)}
                                                                        onMouseLeave={() => controllingHoverOff(value.id)}
                                                                        onClick={() => clickController(value.id)}
                                                                        alt=""
                                                                    /> */}
                                                    <img src={ele.img[0].url} className="jsjsj" alt="" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                                            <PublicPostModule key={value.id} index={index} data={value} />
                                        </>

                                    )
                                } else if (index === 10) {
                                    return (

                                        <>

                                            <div className="bannersForHomePage">
                                                <div className="titleOfHLIPeverySection oopsOneIssue">
                                                    <div className="box1 box21">

                                                    </div>
                                                    <div className="title gb">
                                                        Streaming
                                                    </div>
                                                    <div className="box2 box22">

                                                    </div>
                                                </div>
                                                <div className="streamingSectionFromHomePage">
                                                    <div className="SSFHP1">
                                                        <div className="streamAwesomeBox" onClick={streamEnded}>
                                                            <div className="sab1">
                                                                <img className="img1" src={str9} alt="" />
                                                                <img className="img2" src={playCirc} alt="" />
                                                            </div>
                                                            <div className="sab2Text">
                                                                <div className="nameOfTielsab2 fsbfont">
                                                                    Fundamentals of Knitting
                                                                </div>
                                                                <div className="ratingNamehahaah">
                                                                    <div className="namehahaah">
                                                                        Riya M.
                                                                    </div>
                                                                    <div className="ratingHahaah">
                                                                        Streamed 12 hours ago
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                        <div className="streamAwesomeBox" onClick={streamEnded}>
                                                            <div className="sab1">
                                                                <img className="img1" src={str2} alt="" />
                                                                <img className="img2" src={playCirc} alt="" />
                                                            </div>
                                                            <div className="sab2Text">
                                                                <div className="nameOfTielsab2 fsbfont">
                                                                    Math Magix
                                                                </div>
                                                                <div className="ratingNamehahaah">
                                                                    <div className="namehahaah">
                                                                        Subramaniam I.
                                                                    </div>
                                                                    <div className="ratingHahaah">
                                                                        Streamed Yesterday
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                        <div className="streamAwesomeBox" onClick={streamEnded}>
                                                            <div className="sab1">
                                                                <img className="img1" src={str3} alt="" />
                                                                <img className="img2" src={playCirc} alt="" />
                                                            </div>
                                                            <div className="sab2Text">
                                                                <div className="nameOfTielsab2 fsbfont">
                                                                    Using Brain to full capacity
                                                                </div>
                                                                <div className="ratingNamehahaah">
                                                                    <div className="namehahaah">
                                                                        Dr. Vijesh
                                                                    </div>
                                                                    <div className="ratingHahaah">
                                                                        Streamed 5 min ago
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                    </div>
                                                    <div className="SSFHP1">
                                                        <div className="boxStreamS" onClick={streamEnded}>
                                                            <div className="infoo fmfont">
                                                                Murlidharan was watching <strong>
                                                                    Playing Tennis : beginner level {' '}
                                                                </strong>
                                                                by <img src={vijayImg} alt="" /> Jordan Nithyaveil.
                                                            </div>
                                                            <div className="fmfont butt">
                                                                Streamed 2 hours ago
                                                            </div>
                                                        </div>
                                                        <div className="streamAwesomeBox" onClick={streamEnded}>
                                                            <div className="sab1">
                                                                <img className="img1" src={str1} alt="" />
                                                                <img className="img2" src={playCirc} alt="" />
                                                            </div>
                                                            <div className="sab2Text">
                                                                <div className="nameOfTielsab2 fsbfont">
                                                                    Fun with Photography
                                                                </div>
                                                                <div className="ratingNamehahaah">
                                                                    <div className="namehahaah">
                                                                        Venkataraman M.
                                                                    </div>
                                                                    <div className="ratingHahaah">
                                                                        Streamed an hour ago
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                        <div className="streamAwesomeBox" onClick={streamEnded}>
                                                            <div className="sab1">
                                                                <img className="img1" src={str4} alt="" />
                                                                <img className="img2" src={playCirc} alt="" />
                                                            </div>
                                                            <div className="sab2Text">
                                                                <div className="nameOfTielsab2 fsbfont">
                                                                    Chess Gameplay
                                                                </div>
                                                                <div className="ratingNamehahaah">
                                                                    <div className="namehahaah">
                                                                        Arush K.
                                                                    </div>
                                                                    <div className="ratingHahaah">
                                                                        Streamed an hour ago
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                        <div className="streamAwesomeBox" onClick={streamEnded}>
                                                            <div className="sab1">
                                                                <img className="img1" src={str5} alt="" />
                                                                <img className="img2" src={playCirc} alt="" />
                                                            </div>
                                                            <div className="sab2Text">
                                                                <div className="nameOfTielsab2 fsbfont">
                                                                    Checkers cheat code
                                                                </div>
                                                                <div className="ratingNamehahaah">
                                                                    <div className="namehahaah">
                                                                        Vinesh Y.
                                                                    </div>
                                                                    <div className="ratingHahaah">
                                                                        English
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                    </div>
                                                    <div className="SSFHP1">
                                                        <div className="streamAwesomeBox" onClick={streamEnded}>
                                                            <div className="sab1">
                                                                <img className="img1" src={str6} alt="" />
                                                                <img className="img2" src={playCirc} alt="" />
                                                            </div>
                                                            <div className="sab2Text">
                                                                <div className="nameOfTielsab2 fsbfont">
                                                                    Work more efficiently
                                                                </div>
                                                                <div className="ratingNamehahaah">
                                                                    <div className="namehahaah">
                                                                        Pritam M.
                                                                    </div>
                                                                    <div className="ratingHahaah">
                                                                        Streamed 1 min ago
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                        <div className="streamAwesomeBox" onClick={streamEnded}>
                                                            <div className="sab1">
                                                                <img className="img1" src={str7} alt="" />
                                                                <img className="img2" src={playCirc} alt="" />
                                                            </div>
                                                            <div className="sab2Text">
                                                                <div className="nameOfTielsab2 fsbfont">
                                                                    Basic rules of painting
                                                                </div>
                                                                <div className="ratingNamehahaah">
                                                                    <div className="namehahaah">
                                                                        Craft_IT
                                                                    </div>
                                                                    <div className="ratingHahaah">
                                                                        Streamed 2 hours ago
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                        <div className="streamAwesomeBox" onClick={streamEnded}>
                                                            <div className="sab1">
                                                                <img className="img1" src={str8} alt="" />
                                                                <img className="img2" src={playCirc} alt="" />
                                                            </div>
                                                            <div className="sab2Text">
                                                                <div className="nameOfTielsab2 fsbfont">
                                                                    Cooking with best culinary set
                                                                </div>
                                                                <div className="ratingNamehahaah">
                                                                    <div className="namehahaah">
                                                                        Seema M.
                                                                    </div>
                                                                    <div className="ratingHahaah">
                                                                        Streamed 4 hours ago
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <PublicPostModule index={index} data={value} />
                                        </>
                                    )
                                } else if (index === 15) {
                                    return (
                                        <>
                                            <div className="bannersForHomePage3334">
                                                <div className="theBanner">
                                                    <div className="TBtext">
                                                        <div className="tllle fbfont">
                                                            Make the world <br />your classroom
                                                        </div>
                                                        <div className="buttonosns fsbfont" onClick={takeToTeach}>
                                                            Host a class
                                                        </div>
                                                    </div>
                                                    <div className="imgInClassBanner">
                                                        <img src={hc2} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <PublicPostModule index={index} data={value} />
                                        </>
                                    )
                                }
                            }

                            return (<PublicPostModule index={index} data={value} />)
                        })}
                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default LoggedInHP;