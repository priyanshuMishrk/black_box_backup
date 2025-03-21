import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import clock from "../../Images/clock.svg"
import caledare from "../../Images/calendar-line.svg"
import globe from "../../Images/globe.svg"
import sharena from "../../Images/sharenare.png"
import lien1 from "../../Images/group-line.svg"
import lien2 from "../../Images/pencil-ruler-2-line.svg"
import share from "../../Images/share.svg"
import wishlist from "../../Images/wishlist.svg"
import wishlist2 from "../../Images/almostLikec.svg"
import wishlist3 from "../../Images/liked.svg"
import wishlist4 from "../../Images/almostDisliked.svg"
import gift from "../../Images/gift.svg";
import axios from "axios";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import whatsapp from '../../Images/whatsapp.svg'
import email from '../../Images/mail.svg'
import copyLink from '../../Images/copy.svg'
import blackkkyy from '../../blackbox-logo-01.png'
import cal2 from '../../Images/clal.svg'
import Tooltip from "@mui/material/Tooltip";
import DefaultPic from "../../Images/defualtProPic.jpg";

const JoinTheClass = () => {
    const currentLink = window.location.href;
    const [loading, setLoading] = useState(true);
    const {
        user
    } = useContext(AuthContext);
    function isCloudinaryUrl(url) {
        if (!url) return false
        const cloudinaryPattern = /^https:\/\/res\.cloudinary\.com\/black-box\/.*/;
        return !cloudinaryPattern.test(url);
      }

    const [canVerify, setCanVerify] = useState(false)

    useEffect(() => {
        if (user) {
            const check = user.email.split('@')
            if (check[1] === 'blackis.in') {
                setCanVerify(true)
            }
        }
    })

    let img = wishlist;



    const [liked, setLiked] = useState(0);
    const [currentWish, setCurrentWish] = useState(1)


    async function clickController() {
        const data = {
            id,
            type: 'course'
        }
        if (!user) {
            dono('/login')
        }
        if (liked === 0) {
            const res = await axios.post(BaseUrl + `/wishlist`,
                data,
                {
                    params: data,
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            setLiked(1)
            setCurrentWish(3)
        } else if (liked === 1) {
            const res = await axios.patch(BaseUrl + `/wishlist`,
                data,
                {
                    params: data,
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            setLiked(0)
            setCurrentWish(1)
        }
    }

    useEffect(() => {
        async function subsOfCart() {
            const res = await axios.get(BaseUrl + `/cart`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            const clss = res.data.courses
            const ids = clss.map(item => item.id);
            console.log(id)
            console.log(ids)
            if (ids.includes(parseInt(id))) {
                setInCart(true)
            }

        }
        if (user) {
            subsOfCart()
        }
    }, [])

    useEffect(() => {
        async function subsOfCart() {
            const res2 = await axios.get(BaseUrl + `/wishlist`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            console.log(res2)
            const clss2 = res2.data.courses
            const ids2 = clss2.map(item => item.id);
            console.log(ids2)
            if (ids2.includes(parseInt(id))) {
                setLiked(1)
                setCurrentWish(3)
            }

        }
        if (user) {
            subsOfCart()
        }
    }, [])


    function controllingHover() {
        if (liked === 0) {
            setCurrentWish(2)
        } else if (liked === 1) {
            setCurrentWish(4)
        }
    }

    function controllingHoverOff() {
        console.log("yup")
        if (liked === 0) {
            setCurrentWish(1)
        } else if (liked === 1) {
            setCurrentWish(3)
        }
    }

    function formatDate2(obj) {
        // Parse the date string into a Date object
        const dateObj = new Date(obj.date);
        // Get the day, month, and year
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'long' });
        // Format the date as desired
        const daySuffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
        return `${day}${daySuffix} ${month}`;
    }


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

    function formatTime(obj) {
        // Parse the time string into a Date object
        const [hours, minutes] = obj.time.split(':').map(Number);
        const startTimeObj = new Date();
        startTimeObj.setHours(hours, minutes);

        // Calculate the end time by adding the duration
        const durationMinutes = Number(obj.duration);
        const endTimeObj = new Date(startTimeObj.getTime() + durationMinutes * 60000);

        // Format the start and end times as desired
        const formatTime = (dateObj) => {
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return `${formattedHours}:${formattedMinutes}${ampm}`;
        };

        return `${formatTime(startTimeObj)} - ${formatTime(endTimeObj)}`;
    }
    const { id } = useParams();
    const [isOutOfView, setIsOutOfView] = useState(false);
    const divRef = useRef(null);

    useEffect(() => {
        // Calculate the height of the fixed header in pixels
        const vwToPixels = (vw) => {
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * (vw / 100);
        };

        const headerHeightInPixels = vwToPixels(6.5);

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Set isOutOfView to true if the div is completely out of the viewport
                // Set isOutOfView to false if any part of the div is visible
                setIsOutOfView(!entry.isIntersecting);
            },
            {
                root: null, // Use the viewport as the root
                rootMargin: `-${headerHeightInPixels}px 0px 0px 0px`, // Adjust for the fixed header height in pixels
                threshold: 0 // Trigger when any part of the div is visible or not
            }
        );

        if (divRef.current) {
            observer.observe(divRef.current);
        }

        // Cleanup the observer on component unmount
        return () => {
            if (divRef.current) {
                observer.unobserve(divRef.current);
            }
        };
    }, []);
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    async function verificationOn(bool) {

        const data1 = {
            id,
            verify: bool
        }
        const res = await axios.patch(BaseUrl + `/admin/courseInfo`,
            data1,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            });

        const data = {
            id
        }
        const res2 = await axios.get(BaseUrl + `/courseInfo`,
            {
                params: data,
            });
        setCurrentClass(res2.data)

    }

    const [addCart, setAddCart] = useState(false)
    const [gifted, setGifted] = useState(false)
    const [inCart, setInCart] = useState(false)

    async function addedToCart(bool) {
        if (!user) {
            dono(`/login?l=c-${id}`)
            return
        }
        const data = {
            id,
            type : 'course'
        }
        console.log(data)
        const res = await axios.post(BaseUrl + `/cart`,
            data,
            {
                params: data,
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
        setAddCart(bool)
        setInCart(true)
    }

    function giftedFunc(bool) {
        if (!user) {
            dono(`/login?l=C-${id}`)
            return
        }
        setGifted(bool)
    }

    const [currentClass, setCurrentClass] = useState()
    const [noContent, setNoContent] = useState(false)

    useEffect(() => {
        async function getter() {

            setLoading(true)
            const data = {
                id
            }
            console.log(data)
            const res = await axios.get(BaseUrl + `/courseInfo`,
                {
                    params: data,
                });

            if (user) {
                const check = user.email.split('@')
                console.log(check)
                if (check[1] === 'blackis.in') {
                    setCanVerify(true)
                }
                if (check[1] !== 'blackis.in' && !res.data.verified) {
                    setNoContent(true)
                }
            }
            if (!res.data.verified && !user) {
                return setNoContent(true)
            }
            setCurrentClass(res.data)
        }
        getter()
        setLoading(false)
    }, [])


    const dono = useNavigate()
    function jabababa() {
        dono('/cart')
    }

    const [shareOpen, setShareOper] = useState(0)

    function clickedOnShare(id) {
        if (id === shareOpen){
            setShareOper(0)
        }else {
            setShareOper(id)
        }
    }

    const [srcc1, setSrcc1] = useState()
    const [open, setOpen] = useState(false)

    function onpeImg(srrc) {
        setSrcc1(srrc)
        setOpen(true)
    }

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

    const checkBeforeJoining = async (id2) => {
        if (!user) {
            dono(`/login?l=c-${id}`)
            return
        }
        await axios
            .get(BaseUrl + "/parallelclasses/" + id2, {
                headers: { Authorization: `Bearer ${authTokens}` },
            })
            .then((res) => {
                // console.log(res.data);
                if (res.data.length > 0) {
                } else {
                    displayRazorpay();
                    // addingparticipant();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const userMailId = localStorage.getItem('mail') || 'sampath@blackis.in'
    const numberr = localStorage.getItem('phone') || '9900038097'
    const nameU = localStorage.getItem('name') || 'Black Box User'

    const displayRazorpay = async (price) => {

        const response = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js",
        );
        if (!response) {
            alert("You are offline");
            return;
        }

        const options = {
            key: "rzp_live_kjPr8fgOj2pb7t",
            currency: "INR",
            amount: currentClass.price * 100,
            name: currentClass.title,
            description: "Paying your class fee ",
            // image: "https://blackbox.in/assets/images/logo.png",

            handler: function (response) {
                console.log(response);
                setTimeout(() => {
                    alert("Payment Successful");
                }, 2000);
            },

            prefill: {
                name: nameU,
                email: userMailId,
                contact: `${numberr.slice(-10)}`,
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const [showingDandT, setShowDandT] = useState(false)
    if (noContent) {
        return (
            <>
                <Header />
                <h1 className="mt-10">Please Login with your email id and then click on email link again</h1>
            </>
        )
    }


    function showAllDandT() {
        setShowDandT(true)
    }

    function dshowAllDandT() {
        setShowDandT(false)
    }

    return (
        <>

            {showingDandT && <div className="showingDateAndTime">
                <div className="whiteboxInn">
                    <div className="head fmfont">
                        All dates
                    </div>
                    <div className="dateandtime">
                        {currentClass.date.map((item, index) => {
                            return <div className="data">
                                <div className="dataCl frfont">{`Class ${index + 1} : `}</div>
                                <div className="dataDa frfont">{formatDate(currentClass.date[index])}</div>
                                <div className="dataTi frfont">{formatTime(currentClass.date[index])}</div>
                            </div>
                        })}
                    </div>
                </div>
                <div className="nooooooooooooo cp" onClick={dshowAllDandT}>

                </div>
            </div>}

            <Header />

            {
                currentClass && !currentClass.verified && canVerify &&

                <div className="verifyBannerInClass gsb">
                    <button onClick={() => verificationOn(true)}>
                        Verify
                    </button>
                    <button onClick={() => verificationOn(false)}>
                        Remove
                    </button>
                </div>
            }

            <div className={`blackBannerInClassE ${isOutOfView ? "topperBlackBannerInClassE enter" : "exit"}`}>
                <div className="gsb blackBannerInClassEHeading">
                    {currentClass && currentClass.title && currentClass.title}

                </div>
                <div className="blackBannerInClassEButtonSection">
                    <div className="gsb blackBannerInClassErupee">
                        ₹{currentClass && currentClass.price}
                    </div>
                    <div className="gsb blackBannerInClassEnroll">
                        <button onClick={() => checkBeforeJoining(1)}>Buy Now</button>
                    </div>
                    <div className="gsb blackBannerInAddToCart">
                        <button onClick={() => addedToCart(true)}>{`${inCart ? "✔ Added" : "Add"} to Cart`}</button>
                    </div>
                    <div className="blackBannerInShareIcon">
                        <img src={share} onClick={() => clickedOnShare(1)} alt="" />
                        {shareOpen === 1 &&
                                    <div className="share-options23 fmfont"
                                        onClick={() => clickedOnShare(0)}
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
                                    </div>}
                    </div>
                    <div className="blackBannerInGiftIcon" onClick={() => giftedFunc(true)}>
                        <img src={gift} alt=""  />

                        <span className="gsb blackBannerGTAF">

                            Gift to a friend
                        </span>
                    </div>
                </div>
            </div>
            <div className="ClassV2VJ" >

                <div className="CPr2Banner" ref={divRef}>
                    <div className="CPR2BInfo">
                        <div className="d-flex gap-2">
                            <div className="CPR2Tag fsbfont">Course</div>
                        </div>
                        <div className="CPR2Head gb">
                            {currentClass && currentClass.title}
                        </div>
                        <div className="CPR2Stars">
                            <span className="CPR2Starss">
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>&#9733;</span>
                            </span>
                            <span>
                                0.0
                            </span>
                        </div>
                        <div className="CPR2Auth" >
                            <span className="geryCirc">

                            </span>
                            <span className="gl">
                                By
                            </span>
                            <span className="CPR2AuthName gm"> {currentClass && currentClass.user && `${currentClass.user.first_name} ${currentClass.user.last_name}`} </span>
                        </div>

                        <div className="CPR2AuthDesc frfont" >
                            <span dangerouslySetInnerHTML={{ __html: currentClass ? currentClass.description : '' }}></span>
                        </div>

                        <div className="CPR2Timing">
                            <span className="CPR2TimingD">
                                <span className="ic">
                                    <img src={caledare} alt="" />
                                </span>
                                <span className="d fmfont">
                                    {currentClass && currentClass.date && currentClass.date.length > 0 && ` ${formatDate2(currentClass.date[0])} - ${formatDate(currentClass.date[currentClass.date.length - 1])}`}
                                </span>
                                <span className="a flfont" onClick={showAllDandT}>
                                    View all dates and timings
                                </span>
                            </span>
                            <span className="CPR2Timinflfont">
                                <span className="ic">
                                    <img src={globe} alt="" />
                                </span>
                                <span className="d fmfont">{currentClass && currentClass.languageOfClass}</span>
                            </span>

                        </div>

                        {/* <div className="CPR2Studs gm">
                            15  students, 4 seats left
                        </div> */}

                    </div>
                    <div className="CPR2BImage">
                        <div className="imgInCPR2B">
                        <img className="cp" src={currentClass && currentClass.img[0].url} onClick={() => onpeImg(currentClass.img[0].url)} alt="" />
                            <Lightbox
                                open={open}
                                close={() => setOpen(false)}
                                slides={[
                                    { src: srcc1 }
                                ]}
                            />
                        </div>
                        <div className="imgInformation">
                            <div className="informationInfo">
                                <div className="priceyyy gb">
                                    ₹{currentClass && currentClass.price}
                                </div>
                                <div className="slotsssss gm">
                                    Slots filling in soon
                                </div>

                            </div>
                            <div className="jjjssskkkkssskkk">
                            <Tooltip title={`${currentWish === 1 ? 'Add to wishlist' : 'Added to wishlist'}`}>
                                <img className="wishIconHahahaha" src={currentWish === 1 ? wishlist : currentWish === 2 ? wishlist2 : currentWish === 3 ? wishlist3 : currentWish === 4 ? wishlist4 : ""} onMouseEnter={controllingHover} onMouseLeave={controllingHoverOff} onClick={clickController} alt="" />

                                </Tooltip>

                                <img src={share} onClick={() => clickedOnShare(2)} alt="" />
                                {shareOpen === 2 &&
                                    <div className="share-options2 fmfont"
                                        onClick={() => clickedOnShare(0)}
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
                                    </div>}
                            </div>
                        </div>

                        <div>
                            <button onClick={() => checkBeforeJoining(1)} className="buyNowInTabs gm">{currentClass && currentClass.verified ? "Buy Now" : "Not Verified"}</button>
                        </div>
                        <div className="addCartInTabs gm">
                            <button onClick={() => addedToCart(true)}>{`${inCart ? "✔ Added" : "Add"} to Cart`}</button>
                            <button onClick={() => giftedFunc(true)} >Gift a friend</button>
                        </div>
                    </div>
                </div>

                <div className="Claser mt-5">
                    <div>
                        <span className="headingForClassInfo gsb mx-4" >
                            Class Structure
                        </span>
                        <div className="dataStructDiv">
                            {currentClass && currentClass.date && currentClass.date.map((item, index) => {
                                return <div className="dataStruct ljdojasy">
                                    <div className="dataStruct1">
                                        <div className="dataStructCl fbfont">{`Class ${index + 1} `}
                                            <div className="container33">
                                                <div className="dot33"></div>
                                            </div>
                                        </div>
                                        <div className="dataStructDa frfont">{formatDate(currentClass.date[index])}
                                            <div className="container33">
                                                <div className="dot33"></div>
                                            </div>
                                        </div>
                                        <div className="dataStructTi frfont">{formatTime(currentClass.date[index])}</div>
                                    </div>
                                    <div>
                                        {/* {sect1.classStructure[index]} */}
                                        <span className="VFDTitle frfont dsctructDile" dangerouslySetInnerHTML={{ __html: currentClass.classStructure[index] }}>

                                        </span>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>


                    <div>
                        <div className="headingForClassInfo  gsb mx-4" >
                            <img src={lien1} className="jjkolmn" alt="" />
                            Who is this class for?
                        </div>

                        <span className="VFDTitle  ljdojasy gm">
                            <span dangerouslySetInnerHTML={{ __html: currentClass ? currentClass.studentsWho : '' }}>

                            </span>
                        </span>
                    </div>

                    <div>
                        <div className="headingForClassInfo gsb mx-4 mt-5" >
                            <img src={lien2} className="jjkolmn" alt="" />
                            Participant Requirements
                        </div>

                        <span className="VFDTitle  ljdojasy gm">
                            <span dangerouslySetInnerHTML={{ __html: currentClass ? currentClass.requirements : '' }}>

                            </span>                        </span>
                    </div>

                    <div>
                        <div className="headingForClassInfo fsbfont mx-4 mt-5" >
                            <img src={lien2} className="jjkolmn" alt="" />
                            After the course you will be able to
                        </div>

                        {currentClass && <span className="VFDTitle  ljdojasy fmfont" dangerouslySetInnerHTML={{ __html: currentClass.afterclassyouwillbe }}>
                        </span>}
                    </div>


                    <div>
                        <div className="headingForClassInfo fsbfont mx-4 mt-5" >
                            <img src={cal2} className="jjkolmn" alt="" />
                            Course Dates
                        </div>

                        <span className="VFDTitle  ljdojasy fmfont jadyyRann">
                        {currentClass && currentClass.date && currentClass.date.map((item, index) => {
                            return <div className="dataCdates">
                                <div className="dataCldates frfont">{`Class ${index + 1} : `}</div>
                                <div className="dataDadates frfont">{formatDate(currentClass.date[index])}</div>
                            </div>
                        })}
                        </span>
                    </div>

                    {/* <div>
                        <div className="headingForClassInfo gsb mx-4 mb-4 mt-5" >
                            <img src={lien2} className="jjkolmn" alt="" />
                            After the class you will be able to
                        </div>
                        <span>
                            <ul className="VFDTitle gm">
                                <li className="mb-3">
                                    Navigate the Figma interface with confidence."
                                </li>
                                <li className="mb-3">
                                    Create and manage design projects in Figma."
                                </li>
                                <li className="mb-3">
                                    Use basic tools and features to create designs."
                                </li>

                                <li className="mb-3">
                                    Collaborate with team members on Figma projects."
                                </li>

                                <li className="mb-3">
                                    Apply learned skills to real-world design tasks
                                </li>
                            </ul>
                        </span>
                    </div> */}

                    <div>
                        <span className="headingForClassInfo gsb mx-4" >
                            About the Trainer
                        </span>

                        <div className="d-flex ljdojasy">
                            {currentClass && currentClass.user && currentClass.user.img_thumbnail && isCloudinaryUrl(currentClass.user.img_thumbnail) && <span>
                                <img src={currentClass && currentClass.user && currentClass.user.img_thumbnail} className="imgInPr55" alt="" />
                            </span>}
                            <div className="introInPr">
                                <span className="prName cp gsb" onClick={ () => {
                                    dono(`/otherProfile/${currentClass.user.id}`)
                                }}>
                                    {currentClass && currentClass.user && `${currentClass.user.first_name} ${currentClass.user.last_name}`}
                                </span>
                                <span className="VFDTitle gm">
                                    <span dangerouslySetInnerHTML={{ __html: currentClass ? currentClass.trainerBio : '' }}>

                                    </span>
                                </span>

                            </div>

                        </div>
                    </div>

                </div>

                {/* <div className="classFinReview">

                    <div className="CPRFDiv">

                        <div className="CPR2Tag gsb">CLASS REVIEW</div>

                        <div className="CFRInfo">
                            <div className="students">
                                <span className="head gsb">
                                    50
                                </span>
                                <span className="bottom gm">
                                    students enrolled
                                </span>
                            </div>
                            <div className="students">
                                <span className="head gsb">
                                    0.0
                                    <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>&#9733;</span>
                                </span>
                                <span className="bottom gm">
                                    CLASS RATING
                                </span>
                            </div>

                            <div className="students">
                                <span className="head gsb">
                                    0.0
                                    <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>&#9733;</span>
                                </span>
                                <span className="bottom gm">
                                    TRAINER RATING
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="CPRTDiv">
                        <div className="greyBox">

                        </div>


                        <div className="nextToGreyBox">

                            <div className="infoooo gm">
                                “This is a class testimonial What is  Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's What is  Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's.”
                            </div>
                            <div className="infooooName gl">
                                BY NAME
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>
            <Footer/>

            {addCart &&
                <div className="popupForAddedToCart">
                    <div className="HeadInPFATC">
                        <div className="gb one">
                            Added to cart
                        </div>
                        <div className="blw cp two" onClick={() => setAddCart(false)}>
                            X
                        </div>
                    </div>
                    <div className="InfoInPFATC">
                        <div className="PFATCIM">
                            <img src={currentClass && currentClass.img[0].url} alt="" />
                        </div>
                        <div className="PFATCIT">
                            <span className="o gsb">
                                {currentClass && currentClass.title && currentClass.title}
                            </span>
                            <span className="t gl">
                                {currentClass && currentClass.user && `${currentClass.user.first_name} ${currentClass.user.last_name}`}
                            </span>
                            <div className="PFATCITT gl">
                                <span className="oo">
                                    {currentClass && formatDate(currentClass.date[0])}
                                </span>
                                <span>
                                    <span className="tttt" style={{ color: "#F8F3E3", textShadow: "-1px 0 #000000A3, 0 1px #000000A3, 1px 0 #000000A3, 0 -1px #000000A3" }}>&#9733;</span>
                                    <span>0.0</span>
                                </span>
                            </div>
                            <div className="price gsb">
                                ₹{currentClass && currentClass.price}
                            </div>
                        </div>

                    </div>
                    <button className="GTCInJCI gsb" onClick={jabababa}>
                        Go to cart
                    </button>
                </div>}


            {gifted &&
                <div className="popupForAddedToCart  jaojdoaajs">
                    <div className="HeadInPFATC">
                        <div className="gsb one drrrrrrr">
                            Gift this Class
                        </div>
                    </div>
                    <div className="InfoInPFATC">
                        <div className="PFATCIM">
                            <img src={currentClass && currentClass.img[0].url} alt="" />
                        </div>
                        <div className="PFATCIT">
                            <span className="o gsb">
                                {currentClass && currentClass.title && currentClass.title}
                            </span>
                            <span className="t gl">
                                {currentClass && currentClass.user && `${currentClass.user.first_name} ${currentClass.user.last_name}`}
                            </span>
                            <div className="PFATCITT gl">
                                <span className="oo">
                                    {currentClass && formatDate(currentClass.date[0])}
                                </span>
                                <span>
                                    <span className="tttt" style={{ color: "#F8F3E3", textShadow: "-1px 0 #000000A3, 0 1px #000000A3, 1px 0 #000000A3, 0 -1px #000000A3" }}>&#9733;</span>
                                    <span>0.0</span>
                                </span>
                            </div>
                        </div>

                    </div>

                    <input className="iGTC gsb" type="text" placeholder="Recipient Email address" />

                    <textarea className="taGTC gsb" name="message" rows="2" placeholder={`Send a message`}></textarea>
                    <button onClick={() => checkBeforeJoining(1)} className="GTCInJCI sgggggggggg gsb">
                        Send Gift
                    </button>
                </div>
            }
        </>
    )
}

export default JoinTheClass;