import React, { useContext, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Classes from "../../Components/Home/Classes";
import ImageSlider from "../../Components/Home/ImageSlider";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import playCirc from '../../Images/play-circle-fill.svg'
import BannerForHP from '../../Images/Banner top.png'
import axios from "axios";
import star from '../../Images/star.svg'
import wishlist from "../../Images/wishlist.svg"
import wishlist2 from "../../Images/almostLikec.svg"
import wishlist3 from "../../Images/liked.svg"
import wishlist4 from "../../Images/almostDisliked.svg"
import leftbl from '../../Images/leftbl.svg'
import rightbl from '../../Images/rightbl.svg'
import Carousel from 'react-multi-carousel';
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
import hc2 from "../../Images/hc2.jpg";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 3
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

const MainV2 = () => {
    const customLeftArrow = (
        <button className="arrowleftbl1">
            <img src={leftbl} alt="Left Arrow" />
        </button>
    );

    const customRightArrow = (
        <button className="arrowrightbl2">
            <img src={rightbl} alt="Right Arrow" />
        </button>
    );
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    function takeToTeach(){
        navigate('/teaching')
    }

    function isCloudinaryUrl(url) {
        if (!url) return false
        const cloudinaryPattern = /^https:\/\/res\.cloudinary\.com\/black-box\/.*/;
        return !cloudinaryPattern.test(url);
      }

      
    const [courses, setCls] = useState([])

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

    let initialState = [];


    



    const [states, setStates] = useState(initialState);

    const clickController = (id) => {
        setStates((prevStates) => ({
            ...prevStates,
            [id]: {
                liked: prevStates[id]?.liked === 0 ? 1 : 0,
                currentWish: prevStates[id]?.liked === 0 ? 3 : 1,
            },
        }));
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


    // useEffect(() => {
    //     if (user) {
    //         navigate("/profile");
    //     }
    //     // eslint-disable-next-line
    // }, []);
    useEffect(() => {
        async function getter() {
            const res = await axios.get(BaseUrl + `/classInfo/all`);

            const res2 = await axios.get(BaseUrl + `/courseInfo/all`);

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
        getter()
    }, [])

    useEffect(() => {
        const j = courses.reduce((acc, item) => {
            acc[item.id] = { liked: 0, currentWish: 1 };
            return acc;
        }, {});
        setStates(j)
    }, [courses])
    return (
        <div className="p-0 m-0 mainpage">
            <Header />

            <ImageSlider />





            <div className="allTheBannerLogOut">
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
                            return (<div className="latesCOurseL" key={index}>
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

                <div className="bannersForHomePage2">
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
                                                    <div className="streamAwesomeBox">
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
                                                    <div className="streamAwesomeBox">
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
                                                    <div className="streamAwesomeBox">
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
                                                    <div className="boxStreamS">
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

                                                    <div className="streamAwesomeBox">
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
                                                    <div className="streamAwesomeBox">
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
                                                    <div className="streamAwesomeBox">
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
                                                    <div className="streamAwesomeBox">
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
                                                    <div className="streamAwesomeBox">
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
                                                    <div className="streamAwesomeBox">
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

                                        <div className="bannersForHomePage3334">
                                            <div className="theBanner">
                                                <div className="TBtext">
                                                    <div className="tllle fbfont">
                                                        Make the world <br/>your classroom
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

                <div className="bannersForHomePage2">
                    {courses.map((ele,ind) => {
                        return <div></div>
                    })}
                </div>
            </div>


            {/* <Container fluid className="white p-0 m-0"></Container> */}
            {/* <Container fluid className="white p-0 m-0"></Container> */}
            <Container fluid className="white p-0 m-0"></Container>

            <Footer />
        </div>
    );
};

export default MainV2;
