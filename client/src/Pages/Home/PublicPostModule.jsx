import React, { useContext, useEffect, useState, useRef } from "react";
import DefaultPic from "../../Images/defualtProPic.jpg";
import ViewMore from "../../Images/viewMore.svg";
import likeIcon from '../../Images/LikeIcon.svg'
import bookmark1 from '../../Images/bookMark.svg'
import bookmark2 from '../../Images/almostBanner.svg'
import bookmark3 from '../../Images/bookmarked.svg'
import bookmark4 from '../../Images/almostRemoveBookmark.svg'
import clikeIcon from '../../Images/clickedLikeIcon.svg'
import commentIcon from '../../Images/chat.svg'
import shareIcon from '../../Images/share.svg'
import whatsapp from '../../Images/whatsapp.svg'
import email from '../../Images/mail.svg'
import copyLink from '../../Images/copy.svg'
import { useScrollTrigger } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import axios from "axios";
import leftbl from '../../Images/leftbl.svg'
import rightbl from '../../Images/rightbl.svg'

const PublicPostModule = ({ index, data }) => {
    console.log(data)
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

    const [bookmark, setBookmarkkk] = useState(0)

    const {
        user
    } = useContext(AuthContext);

    const id = localStorage.getItem("user")


    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    // const [, setBookMar] = useState(false)

    async function onHover() {
        console.log('jj')
        if (bookmark === 0) {
            setBookmarkkk(1)
        } else {
            setBookmarkkk(3)
        }
    }

    async function offHover() {
        if (bookmark === 1) {
            console.log('done')
            setBookmarkkk(0)
        } else if (bookmark === 2 || bookmark === 3) {
            setBookmarkkk(2)
        } else if (bookmark = 0) {
            setBookmarkkk(0)
        }
    }

    const location = useLocation();

    const [onActivity, setOnAct] = useState(location.pathname === '/viewProfileV2')



    useEffect(() => {
        async function subsOfCart() {
            const res = await axios.get(BaseUrl + `/bookmark`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            const clss = res.data.postId
            if (clss) {
                const ids = clss.map(item => item.id);
                console.log(data.id, 'bookmark')
                console.log(ids, 'bookmark')
                console.log(ids.includes(data.id))
                if (ids.includes(data.id)) {
                    setBookmarkkk(2)
                }

            }


        }
        if (user) {
            subsOfCart()
        }
    }, [])

    useEffect(() => {
        async function subsOfCart() {
            const res2 = await axios.get(BaseUrl + `/likedPost`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            );
            console.log(res2)
            const clss2 = res2.data.postId
            const ids2 = clss2.map(item => item.id);
            console.log(ids2)
            if (ids2.includes(data.id)) {
                sethe(clikeIcon)
            }


        }
        if (user) {
            subsOfCart()
        }
    }, [])



    async function likeAPost(id) {
        const data2 = {
            id
        }
        const res2 = await axios.post(BaseUrl + `/likedPost`,
            data,
            {
                params: data,
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
        sethe(clikeIcon)
    }

    async function unlikeAPost(id) {
        const data2 = {
            id
        }
        const res2 = await axios.patch(BaseUrl + `/likedPost`,
            data,
            {
                params: data,
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
        sethe(likeIcon)
    }


    async function bookMarkk(id) {
        const data = {
            id
        }
        const res2 = await axios.post(BaseUrl + `/bookmark`,
            data,
            {
                params: data,
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
        console.log(res2.data)
        setBookmarkkk(2)
    }

    async function unbookkmmaark(id) {
        const data = {
            id
        }
        const res2 = await axios.patch(BaseUrl + `/bookmark`,
            data,
            {
                params: data,
                headers: { Authorization: `Bearer ${authTokens}` },
            }
        );
        setBookmarkkk(0)


    }

    function timeAgo(dateString) {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInSeconds = Math.floor((now - postDate) / 1000);

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 }
        ];

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count > 0) {
                return count === 1 ? `${count} ${interval.label} ago` : `${count} ${interval.label}s ago`;
            }
        }
        return 'just now';
    }


    const [openViewmore, setOpenViewMore] = useState(false)

    function onViewMoreClick(bool) {
        if (openViewmore !== bool) {
            setOpenViewMore(bool)
        } else {
            setOpenViewMore(false)
        }
    }

    const [reported, setReported] = useState(false)

    function onReport() {
        setReported(true);
        setOpenViewMore(false)

        // After 10 seconds (10000 ms), set reported back to false
        setTimeout(() => {
            setReported(false);
        }, 10000);
    }

    async function onDelete() {
        // if (onActivity) {
            const result = await axios.delete(`${BaseUrl}/publicPost?id=${data.id}`)

            setOpenViewMore(false)
        // }            
    }

    const [isTeacher, setIsTeacher] = useState(false)

    useEffect(() => {
        async function teachedVerify() {
            const res = await axios.get(BaseUrl + `/isTeacher?id=${data.user.id}`);
            setIsTeacher(res.data)
        }

        teachedVerify()

    }, [])

    const currentLink = window.location.href;

    const [shareOpen, setShareOper] = useState(false)

    function clickedOnShare() {
        setShareOper(!shareOpen)
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

    const [iconhe, sethe] = useState(likeIcon)

    const nava = useNavigate()

    const [userProfile, setuserr] = useState({})

    const [iAvD, setIaVd] = useState(data.videos.concat(data.images))

    useEffect(() => {
        async function getPr() {
            let reqOptions = {
                url: `${BaseUrl}/profileDetails/other?id=${data.user.id}`,
                method: "GET",
            }

            let response = await axios.request(reqOptions);
            setuserr(response.data)
        }

        getPr()
    }, [])


    const videoRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;

                    if (entry.isIntersecting) {
                        video.play(); // Play when in view
                    } else {
                        video.pause(); // Pause when out of view
                    }
                });
            },
            {
                threshold: 0.5, // 50% of the video must be visible
            }
        );

        // Observe all videos
        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        // Clean up the observer when the component unmounts
        return () => {
            videoRefs.current.forEach((video) => {
                if (video) observer.unobserve(video);
            });
        };
    }, []);

    const uid = parseInt(localStorage.getItem('User'))

    const dropDownRef = useRef(null);
    useEffect(() => {
        // Function to handle the click event
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                // Click is outside the dropDownPPH
                onViewMoreClick(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const dropDownRef2 = useRef(null);


    useEffect(() => {
        // Function to handle the click event
        const handleClickOutsideCop = (event) => {
            if (dropDownRef2.current && !dropDownRef2.current.contains(event.target)) {
                // Click is outside the dropDownPPH
                setShareOper(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('click', handleClickOutsideCop);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutsideCop);
        };
    }, []);

    function isCloudinaryUrl(url) {
        if (!url) return false
        const cloudinaryPattern = /^https:\/\/res\.cloudinary\.com\/black-box\/.*/;
        return !cloudinaryPattern.test(url);
      }

    return (
        <div className="publicPostAtHomePage" key={index}>
            <div className="publicPostHeader">
                <div className="PPHimgThumbnail">
                    <img src={isCloudinaryUrl(data.user.img_thumbnail) ? data.user.img_thumbnail : DefaultPic} key={index} alt="" />
                </div>
                <div>
                    <div className="nameATime">
                        <span className="PPHname fmfont" onClick={() => {
                            nava(`/otherProfile/${data.user.id}`)
                        }}>
                            {`${data.user.first_name} ${data.user.last_name}`}
                        </span>
                        <span className="PPHTime fmfont">
                            {timeAgo(data.created_at)}
                        </span>
                    </div>
                    <div className="HeadlinePPH frfont">
                        {userProfile.headline ? userProfile.headline : `${isTeacher ? 'Learner-Teacher' : 'Learner'}`}
                    </div>
                </div>
                <div className="dropDownPPH" ref={dropDownRef}>

                    <img src={ViewMore}
                        onClick={() => {
                            if (openViewmore === data.id) {
                                onViewMoreClick(false)
                            } else {
                                onViewMoreClick(data.id)
                            }
                        }}
                        className="cp" alt="" />
                    {openViewmore === data.id && <div className="popupforviewmore  fmfont">
                        {(uid !== data.user.id) && <div onClick={onReport}>
                            Report
                        </div>}

                        {uid === data.user.id && <div onClick={onDelete}>
                            Delete
                        </div>}
                    </div>}
                </div>
            </div>


            <div className="mainBodyImg">

                {/* {(data.videos.length > 0 && data.images.length > 0) || (data.videos.length > 1) || (data.images.length > 1) && <>

                    <div className="arrowleftbl22" onClick={() => handleScroll(-550)}>
                        <img src={leftbl} alt="" />
                    </div>
                    <div className="arrowrightbl22" onClick={() => handleScroll(550)}>
                        <img src={rightbl} alt="" />
                    </div>
                </>
                } */}



{((data.images.length > 0 && data.videos.length > 0) || data.images.length > 1 || data.videos.length > 1) && (
    <>
        <div className="arrowleftbl22" onClick={() => handleScroll(-550)}>
            <img src={leftbl} alt="" />
        </div>
        <div className="arrowrightbl22" onClick={() => handleScroll(550)}>
            <img src={rightbl} alt="" />
        </div>
    </>
)}

                {/* {data.videos.length > 0 || data.images.length > 0 && <>

                    <div className="arrowleftbl22" onClick={() => handleScroll(-550)}>
                        <img src={leftbl} alt="" />
                    </div>
                    <div className="arrowrightbl22" onClick={() => handleScroll(550)}>
                        <img src={rightbl} alt="" />
                    </div>
                </>
                } */}

                {/* {data.images.length > 0 || data.videos.length > 0 && <>

                    <div className="arrowleftbl22" onClick={() => handleScroll(-550)}>
                        <img src={leftbl} alt="" />
                    </div>
                    <div className="arrowrightbl22" onClick={() => handleScroll(550)}>
                        <img src={rightbl} alt="" />
                    </div>
                </>
                } */}
                <div className="carouser" ref={scrollerRef}>
                    { data.images.concat(data.videos).map((element, index) => {
                        // console.log(element.split('/upload'))
                        // console.log(element)

                        if (element.split('/upload')[0] === 'https://res.cloudinary.com/black-box/image') {
                            return <img key={index} src={element} alt="" />
                        } else if (element.split('/upload')[0] === 'https://res.cloudinary.com/black-box/video') {
                            return <video key={index} src={element} ref={(el) => (videoRefs.current[index] = el)}
                                muted
                                playsInline
                                onLoadedMetadata={(e) => {
                                    // e.target.currentTime = 0;
                                    // e.target.play();
                                    setTimeout(() => {
                                        e.target.muted = false;  // Unmute after video starts playing
                                    }, 100);
                                }}
                                onEnded={(e) => e.target.currentTime = 0} className="previewwwwwwwwww23"></video>
                        }
                    })}
                </div>

            </div>


            <div
                style={{
                    fontFamily: '"Noto Color Emoji", sans-serif'
                }}
                className={`descriptionPPh ${data.images.length > 0 ? 'yesImg' : 'noimg'}`} dangerouslySetInnerHTML={{ __html: data.caption }}>

            </div>

            <div className="PPHCTA">
                <div className="PPHCTA1">
                    <img src={iconhe} onClick={() => {
                        if (iconhe === likeIcon) {
                            likeAPost(data.id)
                        } else {
                            unlikeAPost(data.id)
                        }
                    }} className="opp cp" alt="" />
                    <img className="cp boooookkkmmmaaarrrrkkkk" src={bookmark === 0 ? bookmark1 : bookmark === 1 ? bookmark2 : bookmark === 2 ? bookmark3 : bookmark === 3 ? bookmark4 : ''}
                        onMouseEnter={() => {
                            onHover()
                        }}

                        onMouseLeave={() => {
                            offHover()
                        }}

                        onClick={() => {
                            if (bookmark === 0 || bookmark === 1) {
                                console.log('here', bookmark)
                                bookMarkk(data.id)
                            } else {
                                console.log('not here', bookmark)
                                unbookkmmaark(data.id)
                            }
                        }}
                        alt="" />
                </div>
                <div>
                    <img src={shareIcon} className="opp cp" ref={dropDownRef2} onClick={clickedOnShare} style={{
                        width: '1.5vw'
                    }} alt="" />
                    {shareOpen && <div className="share-container">
                        <div className="share-options fmfont"
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

            {reported && <div className="reportedThePost fmfont">
                <div className="closer cp" onClick={() => { setReported(false) }}>
                    x
                </div>
                Thank you for taking the initiative We will look into the post by {`${data.user.first_name} ${data.user.last_name}`} and will get back to you.
                <div className="fsbfont">
                    Team Black box
                </div>
            </div>}

        </div>
    );
};

export default PublicPostModule;
