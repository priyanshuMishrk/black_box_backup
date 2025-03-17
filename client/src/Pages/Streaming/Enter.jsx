import React, { useContext, useEffect, useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Logo from "../../blackbox-logo-01.png";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
// import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel';
import leftIcon from "../../Images/leftbl.svg";
import sb1 from "../../Images/strb1.jpeg";
import sb2 from "../../Images/strb2.jpeg";
import sb3 from "../../Images/strb3.jpeg";
import sb4 from "../../Images/strb4.jpeg";
import view from "../../Images/view.svg";
import Wview from "../../Images/whiteview.svg";
import rightIcon from "../../Images/rightbl.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from "axios";
import vid1 from "../../Videos/art.mp4";
import vid2 from "../../Videos/chess.mp4";
import vid3 from "../../Videos/1586214-uhd_4096_2160_24fps.mp4"; // singpore
import vid4 from "../../Videos/4291570-hd_1920_1080_30fps.mp4" // pubg
import vid5 from "../../Videos/4498246-hd_1920_1080_30fps.mp4" // china
import vid6 from "../../Videos/Music.mp4" // guitar
import man1 from "../../Videos/man1.webp"
import man2 from "../../Videos/man2.webp"
import man3 from "../../Videos/man3.webp"
import man4 from "../../Videos/man4.webp"
import man5 from "../../Videos/man5.webp"
import man6 from "../../Videos/man6.webp"
import art from "../../Videos/art.avif"
import chess from "../../Videos/chess.avif"
import china from "../../Videos/china.avif"
import singpore from "../../Videos/singapor.avif"
import pubg from "../../Videos/pubg.avif"
import guitar from "../../Videos/guitar.avif"
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import leftbl from '../../Images/leftbl.svg'
import rightbl from '../../Images/rightbl.svg'
import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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

const data = [
  {
    cover: sb1,
    title: "Interstaller",
  },
  {
    cover: sb2,
    title: "Inception",
  },
  {
    cover: sb3,
    title: "Blade Runner 2049",
  },
  {
    cover: sb4,
    title: "Icon man 3",
  },
  {
    cover: sb1,
    title: "Interstaller",
  },
  {
    cover: sb2,
    title: "Inception",
  },
  {
    cover: sb3,
    title: "Blade Runner 2049",
  },
  {
    cover: sb4,
    title: "Icon man 3",
  },
];


const StreamEnterHome = () => {
  const appID = 1145153958;
  const serverSecret = "b4a5abb018a8a680858acdd6b1200119";

  // async function getVidUrl( roomid ){
  //   const zg = new ZegoExpressEngine(appID,serverSecret);
  //   const j = zg.
  //   const result = await zg.loginRoom(`${roomid}`, '04AAAAAGbJhasAEHRlZ3oycTF2YXhkemxhczMAoEC7dJh6DxPOBXo+Kt2sLgMLPFhqm4rtSuIT0QyblivwPsfUADOBaIOgPwAJU49zi7zKnQq0Wyq/qy1gSxG2pQOpB6kbz9cXufB3XrSTLEVn9RajHmuTfJL8rsRZijgOa68BLOaqaCIBZgPZE9HSQ5uMNYRviUr19yX/k3BrcZmAVS4FfT1sKPhHNXdbVrc2UjFy0AVvdribW2e4lwUqUwc=', {userID : '23', userName : 'Anshu', role: 'audience'}, {userUpdate: true});

  //   console.log(result, 'everything is fine')
  // }

  const {
    user
  } = useContext(AuthContext);

  const name = localStorage.getItem("name");

  const [currentCarousel, setCurrentCarousel] = useState(1)

  function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const allStreams = [
    {
      "id": 4,
      "user_id": 29,
      "title": "chess for beginer",
      "thumbnail": "https://res.cloudinary.com/black-box/image/upload/v1724317659/yeaiidn8nbyd5nsbzxug.png",
      "finished": false,
      "live": true,
      "streamStartedAt": "2024-08-22T09:07:59.642Z",
      "streamEndedAt": null,
      "highestViewCount": null,
      "liveViewCount": null,
      "tags": [
        "chess,beginer,anything else"
      ],
      "user": {
        "id": 29,
        "provider": "email/phone",
        "img_thumbnail": "https://bask-s.s3.ap-south-1.amazonaws.com/neethi.png",
        "first_name": "Neethi",
        "last_name": "Rao",
        "email": "neethi23@gmail.com",
        "phone_num": "912345432222",
        "password": "$2b$12$87orLhu75hLgQeyjc1JdXez35.iJEnGxGkzDkiAAYn6LOcAskxdpK",
        "about": "",
        "otp": 0,
        "verified": false,
        "admin": false,
        "created_at": "2024-08-05T12:31:18.397Z",
        "classroom_id": null,
        "updated_at": "2024-08-05T12:31:18.397Z"
      }
    },
    {
      "id": 6,
      "user_id": 29,
      "title": "streamung chess",
      "thumbnail": "https://res.cloudinary.com/black-box/image/upload/v1724320347/flmb2payliqpjknvqoiu.png",
      "finished": false,
      "live": true,
      "streamStartedAt": "2024-08-22T09:53:13.706Z",
      "streamEndedAt": null,
      "highestViewCount": null,
      "liveViewCount": null,
      "tags": [
        "streamung",
        "chess"
      ],
      "user": {
        "id": 29,
        "provider": "email/phone",
        "img_thumbnail": "https://bask-s.s3.ap-south-1.amazonaws.com/neethi.png",
        "first_name": "Neethi",
        "last_name": "Rao",
        "email": "neethi23@gmail.com",
        "phone_num": "912345432222",
        "password": "$2b$12$87orLhu75hLgQeyjc1JdXez35.iJEnGxGkzDkiAAYn6LOcAskxdpK",
        "about": "",
        "otp": 0,
        "verified": false,
        "admin": false,
        "created_at": "2024-08-05T12:31:18.397Z",
        "classroom_id": null,
        "updated_at": "2024-08-05T12:31:18.397Z"
      }
    },
    {
      "id": 12,
      "user_id": 29,
      "title": "chess begining  sagaa",
      "thumbnail": "https://res.cloudinary.com/black-box/image/upload/v1724397642/o5ta9um2fn709m84ivpc.png",
      "finished": false,
      "live": true,
      "streamStartedAt": "2024-08-23T10:07:58.527Z",
      "streamEndedAt": null,
      "highestViewCount": null,
      "liveViewCount": null,
      "tags": [
        "chess",
        "begining",
        "sagaa"
      ],
      "user": {
        "id": 29,
        "provider": "email/phone",
        "img_thumbnail": "https://bask-s.s3.ap-south-1.amazonaws.com/neethi.png",
        "first_name": "Neethi",
        "last_name": "Rao",
        "email": "neethi23@gmail.com",
        "phone_num": "912345432222",
        "password": "$2b$12$87orLhu75hLgQeyjc1JdXez35.iJEnGxGkzDkiAAYn6LOcAskxdpK",
        "about": "",
        "otp": 0,
        "verified": false,
        "admin": false,
        "created_at": "2024-08-05T12:31:18.397Z",
        "classroom_id": null,
        "updated_at": "2024-08-05T12:31:18.397Z"
      }
    },
    {
      "id": 8,
      "user_id": 29,
      "title": "chess for beginners",
      "thumbnail": "https://res.cloudinary.com/black-box/image/upload/v1724322281/mg9uagegldcgdrvm7tmg.png",
      "finished": false,
      "live": true,
      "streamStartedAt": "2024-08-22T11:06:36.064Z",
      "streamEndedAt": null,
      "highestViewCount": null,
      "liveViewCount": null,
      "tags": [
        "chess",
        "beginners"
      ],
      "user": {
        "id": 29,
        "provider": "email/phone",
        "img_thumbnail": "https://bask-s.s3.ap-south-1.amazonaws.com/neethi.png",
        "first_name": "Neethi",
        "last_name": "Rao",
        "email": "neethi23@gmail.com",
        "phone_num": "912345432222",
        "password": "$2b$12$87orLhu75hLgQeyjc1JdXez35.iJEnGxGkzDkiAAYn6LOcAskxdpK",
        "about": "",
        "otp": 0,
        "verified": false,
        "admin": false,
        "created_at": "2024-08-05T12:31:18.397Z",
        "classroom_id": null,
        "updated_at": "2024-08-05T12:31:18.397Z"
      }
    },
    {
      "id": 9,
      "user_id": 29,
      "title": "Streaming now on netlfix",
      "thumbnail": "https://res.cloudinary.com/black-box/image/upload/v1724328343/zgoupngrntumtud6bko7.png",
      "finished": false,
      "live": true,
      "streamStartedAt": "2024-08-22T12:12:02.931Z",
      "streamEndedAt": null,
      "highestViewCount": null,
      "liveViewCount": null,
      "tags": [
        "streaming",
        "netlfix"
      ],
      "user": {
        "id": 29,
        "provider": "email/phone",
        "img_thumbnail": "https://bask-s.s3.ap-south-1.amazonaws.com/neethi.png",
        "first_name": "Neethi",
        "last_name": "Rao",
        "email": "neethi23@gmail.com",
        "phone_num": "912345432222",
        "password": "$2b$12$87orLhu75hLgQeyjc1JdXez35.iJEnGxGkzDkiAAYn6LOcAskxdpK",
        "about": "",
        "otp": 0,
        "verified": false,
        "admin": false,
        "created_at": "2024-08-05T12:31:18.397Z",
        "classroom_id": null,
        "updated_at": "2024-08-05T12:31:18.397Z"
      }
    },
    {
      "id": 11,
      "user_id": 29,
      "title": "nothing ok son",
      "thumbnail": "https://res.cloudinary.com/black-box/image/upload/v1724330791/g8t3jbw25pombk9ex8sv.png",
      "finished": false,
      "live": true,
      "streamStartedAt": "2024-08-22T12:47:20.482Z",
      "streamEndedAt": null,
      "highestViewCount": null,
      "liveViewCount": null,
      "tags": [
        "son"
      ],
      "user": {
        "id": 29,
        "provider": "email/phone",
        "img_thumbnail": "https://bask-s.s3.ap-south-1.amazonaws.com/neethi.png",
        "first_name": "Neethi",
        "last_name": "Rao",
        "email": "neethi23@gmail.com",
        "phone_num": "912345432222",
        "password": "$2b$12$87orLhu75hLgQeyjc1JdXez35.iJEnGxGkzDkiAAYn6LOcAskxdpK",
        "about": "",
        "otp": 0,
        "verified": false,
        "admin": false,
        "created_at": "2024-08-05T12:31:18.397Z",
        "classroom_id": null,
        "updated_at": "2024-08-05T12:31:18.397Z"
      }
    }
  ]

  const [streams, setStreams] = useState([])

  function takeToRoom(id) {
    nava(`/join/${id}`)
  }

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(BaseUrl + `/all-stream`,);
      const data = res.data
      setStreams(data)
    }
    fetch()
  }, [])

  let myMeeting = async (element) => {

    let roomid = '23'
    // const check = ZegoUIKitPrebuilt._instance.localStream.getVideoTracks()
    const role = ZegoUIKitPrebuilt.Host;
    const appID = 1145153958;
    const serverSecret = "b4a5abb018a8a680858acdd6b1200119";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid, randomID(5), name);

    const zp = await ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        config: {
          role,
        },
      },
      showRemoveUserButton: true,
      branding: {
        logoURL: Logo
      },
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      whiteboardConfig: {
        showAddImageButton: false,
        showCreateAndCloseButton: true
      },
      sharedLinks: [
        {
          name: 'CopyLink',
          url:
            window.location.protocol + '//' +
            window.location.host + "/join/" +
            roomid,
        },
      ]
    });

  }

  const nava = useNavigate()

  function isTimestampAnHourOld(obj, key) {
    const oneHour = 60 * 60 * 1000; // milliseconds in one hour
    const currentTime = new Date().getTime(); // current time in milliseconds
    const timestampTime = new Date(obj[key]).getTime(); // timestamp in milliseconds
    console.log((currentTime - timestampTime) > oneHour)
    return (currentTime - timestampTime) > oneHour;
  }

  const currentData = [
    {
      title: 'Art therapy',
      vid: vid1,
      person: man1,
      name: 'Jess Anderson',
      views: 3,
      streamed: "3 hours ago",
      banner: art
    },

    {
      title: 'Asian Markets',
      vid: vid3,
      person: man3,
      name: 'Anand Raja',
      views: 20,
      streamed: "2 hours ago",
      banner: singpore
    },

    {
      title: 'Intense PUBG gameplay',
      vid: vid4,
      person: man4,
      name: 'Anurak A',
      views: 30,
      streamed: "5 hours ago",
      banner: pubg
    },

    {
      title: 'Hong Kong food street',
      vid: vid5,
      person: man5,
      name: 'Alka Verma',
      views: 10,
      streamed: "2 hours ago",
      banner: china
    },

    {
      title: 'Flamenco Classical',
      vid: vid6,
      person: man6,
      name: 'Martin M.',
      views: 10,
      streamed: "9 hours ago",
      banner: guitar
    }


  ]

  const [current, setCurrent] = useState(0)
  const [current2, setCurrent2] = useState(0)

  const [showBan, setBan] = useState(true)
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

  useEffect(() => {
    clickedOnNewStream(0)
  }, [/* Add dependencies here if needed */]);


  const [timeouts, setTimeouts] = useState({});
  const [isRealStream, setRealStream] = useState(false)

  async function clickedOnNewStream(ind) {
    console.log(ind)
    if (ind > 5) {
      // await getVidUrl(streams[ind-6].id)
      setRealStream(true)
      setCurrent2(ind)
      return
    }
    // Clear any existing timeouts for this element
    if (timeouts[current]) {
      clearTimeout(timeouts[current].firstTimeout);
      clearTimeout(timeouts[current].secondTimeout);
    }

    // const navigate = useNavigate();

    setCurrent(ind);
    setBan(true);

    // First timeout for 2 seconds
    const firstTimeout = setTimeout(() => {
      setBan(false);

      // Second timeout for an additional 10 seconds (total 12 seconds)
      const secondTimeout = setTimeout(() => {
        setBan(true);
      }, 10000); // 10000 ms = 10 seconds

      // Update the timeouts in the state to manage cleanup
      setTimeouts(prev => ({
        ...prev,
        [ind]: { firstTimeout, secondTimeout },
      }));
    }, 2000); // 2000 ms = 2 seconds

    // Update the first timeout in the state
    setTimeouts(prev => ({
      ...prev,
      [ind]: { firstTimeout },
    }));
  }


  function streamEnded(){
    nava('/streamEnded')
}
  return (
    <div className="streamEnterCenter">
      <Header />

      {!name && <div className="bannersForHomePage3334 mt-10">
        <div className="theBanner">
          <div className="TBtext">
            <div className="tllle fbfont">
               Streaming
            </div>
            <div className="buttonosns asifhdsbfdsfv fsbfont" onClick={() => {
              nava('/login')
            }} >
              Start Now
            </div>
          </div>
          <div className="imgInClassBanner">
            <img src='https://bask-s.s3.ap-south-1.amazonaws.com/pexels-rpnickson-7238759.jpg' alt="" />
          </div>
        </div>
      </div>}

      {/* <div className={`sideStrollerStream ${user && 'aoajdoeneccd'}`}>
        <span className="headInfo fmfont">
          Recommended Channels
        </span>
      </div> */}

      {name && <div className="aojojfidasdasrgsrre">
        <span className="orocoomaojs fsbfont">
          Hi {name}, want to start a stream?
        </span>

        <span className="butooonssfisdhf fmfont cp"
          onClick={() => { nava('/Stream_Host') }}
        >
          Stream Now
        </span>
      </div>}


      <div className="carouselOfStream">
        <div className="streamPreview">

          <div className="smallBanner fmfont">
            {`Streamed ${currentData[current].streamed}`}
          </div>

          {!isRealStream && (
            showBan ? <img src={currentData[current].banner} alt="" /> :
              <video
                src={currentData[current].vid}
                autoPlay
                muted
                playsInline
                onLoadedMetadata={(e) => {
                  e.target.currentTime = 0;
                  e.target.play();
                  setTimeout(() => {
                    e.target.pause();
                  }, 10000);  // 10000ms = 10 seconds
                  setTimeout(() => {
                    e.target.muted = false;  // Unmute after video starts playing
                  }, 100);
                }}
                onEnded={(e) => e.target.currentTime = 0}
              ></video>)

          }
        </div>

        <div className="streamListPrev">
          {
            currentData.map((ele, ind) => {

              if (!ele.id) {
                return <div key={ind} className={`cards cp ${current === ind && 'current'}`}
                  onClick={() => {
                    clickedOnNewStream(ind)
                  }}
                >
                  <div className="imgofp">

                    <img src={ele.person} alt="" />
                  </div>
                  <div className="stDet">
                    <div className="titleOfSt fsbfont">
                      {ele.title}
                    </div>
                    <div className="fmfont detStrV">
                      <div>
                        {ele.name}
                      </div>
                      <div className="viewwws">
                        <img src={Wview} alt="" />
                        {ele.views}
                      </div>
                      <div>
                        {ele.streamed}
                      </div>
                    </div>
                  </div>
                </div>
              } else {

                return <div className={`cards cp ${current2 === ind && 'current'}`}
                  key={ind}
                  onClick={() => {
                    clickedOnNewStream(ind)
                  }}
                >
                  <div className="imgofp">

                    <img src={ele.user.img_thumbnail} alt="" />
                  </div>
                  <div className="stDet">
                    <div className="titleOfSt fsbfont">
                      {ele.title}
                    </div>
                    <div className="fmfont detStrV">
                      <div>
                        {ele.user.first_name + ' ' + ele.user.last_name}
                      </div>
                      <div className="viewwws">
                        <img src={Wview} alt="" />
                        {ele.liveViewCount || 0}
                      </div>
                      <div>
                        {ele.live ? 'Live' : timeAgo(ele.streamStartedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              }

            })
          }
        </div>
      </div>

      {streams.length > 0 && <div className="forYouStreaming mb-5">

        <span className="headd6kahsd fsbfont">
          {name && 'For you'}
          {!name && 'Live Streamers'}
        </span>

        {streams ? '' : <span className="boddy6kahsd fsbfont">
          No Streaming Taking Place Be The First One
        </span>}

        <div className="StreamsShowing">
          {streams && streams.map((ele) => {
            return (
              <div className="streamCard" onClick={() => takeToRoom(ele.id)}>
                <div className="img">

                  <div className="liveTag fsbfont">
                    {ele.live ? 'LIVE' : timeAgo(ele.streamStartedAt)}
                  </div>
                  <img src={ele.thumbnail} alt="" />
                </div>
                <div className="descrCard">
                  <div className="nameTitle fsbfont">
                    {ele.title}
                  </div>
                  <div className="nameAndView fmfont">
                    <div className="name">
                      {ele.user.first_name + ' ' + ele.user.last_name}
                    </div>
                    <div className="view">
                      <img src={view} alt="" />
                      {ele.liveViewCount || 0}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>}

      <div className={`bannersForHomePage oasjosjdosjdosdjosj ${streams.length === 0 && 'mt-5'}`}>
        <div className="titleOfHLIPeverySection oopsOneIssue">
          <div className="box1 box21">

          </div>
          <div className="title gb">
            Earlier
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

      <Footer />
    </div>
  )
}

export default StreamEnterHome;