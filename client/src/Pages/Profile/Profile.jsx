import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Whatsnew from "../../Components/Feeds/Whatsnew";
import Classes from "../../Images/Classes/classes.jpg";
// import Class2 from "../../Images/Classes/class2.jpg";
import DefaultPic from "../../Images/defualtProPic.jpg";
import { AiFillHeart, AiOutlineUserDelete } from "react-icons/ai";
import TabPanel from "./TabPanel";
// import ReadMoreReact from "read-more-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import StyleContext from "../../Context/StyleContext";
import { FaRegComment } from "react-icons/fa";
import {} from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { FaArrowRight } from "react-icons/fa";

import { CardActions, CardContent, CardMedia } from "@mui/material";
import { GiShakingHands, GiThreeFriends } from "react-icons/gi";
import Popup from "../../Components/Profile/Friends";
import { useCookies } from 'react-cookie';

const Profile = () => {

  function sortClassesByEarliestDate(classes) {
    return classes.sort((a, b) => {
      let aEarliestDate = new Date(Math.min(...a.date.map(d => new Date(`${d.date}T${d.time}`))));
      let bEarliestDate = new Date(Math.min(...b.date.map(d => new Date(`${d.date}T${d.time}`))));
      return aEarliestDate - bEarliestDate;
    });
  }

  const {
    user,
    getCoursesList,
    courseList,
    reaction,
    triggerReaction,
    DynamicTimer,
    showclasses,
    setShowclasses,
    // scollToRef,
    classtime,
    noClasses,
    // setNoClasses,
    value,
    getWorkSpaceAllow,
    setSeenavs,
    attendingCls,
    // willBeFrnd,
    allFriends,
    areFriends,
    allAcceptingFrnds,
    acceptngFrnd,
    acceptFrnd,
    dismissFrnd,
    postComments,
    getComments,
    loginProcess
  } = useContext(AuthContext);
  // const { successToast, errorToast } = useContext(StyleContext);

  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [provider, setProvider] = useState(false)
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const trueValue = queryParams.get('provider');
  // if (trueValue){
  //   setProvider(true)
  // }
  // let noFrnds = true;

  const handleExpandClick = () => {
    setExpanded2(false);
    setExpanded(!expanded);
  };
  const handleExpandClick2 = () => {
    setExpanded(false);
    setExpanded2(!expanded2);
  };

  const [showPopup, setShowPopup] = useState(false);

  const [timer, setTimer] = useState(true);

  const expiryTime = useRef();
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: "",
    countdownHours: "",
    countdownMinutes: "",
    countdownSeconds: "",
  });
  const navigate = useNavigate();

  const [comment, setComment] = useState('');

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };  

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = (arg) => (e) => {
    e.preventDefault();

    // Form the body with the comment and post ID
    const body = {
      post_id: arg,
      comment_body: comment,
    };
    postComments(body)
  };

  const getComment = () => {

  }
  const [cookies] = useCookies(['session']); // Assuming your session cookie is named 'session'

  useEffect(() => {
    // const userData = cookies.session; 
    // console.log(userData  , "llllllll")
    // if (userData){
    //   axios
    //   .get(BaseUrl + "/socialuser")
    //   .then((res) => {
    //     console.log(res, "the social res");
    //     loginProcess(res);
    //   })
    //   .catch((err) => {
    //     console.log(err, "the error of social msg");
    //   });
    //   console.log(userData)
    // }
    
    (async () => {
      if (showPopup){
        getComments()
      }
      setSeenavs(false);
      if (!user.classroom_id) {
        await getWorkSpaceAllow(user.email);
      }
      await getCoursesList();
      await DynamicTimer();
      await allFriends();
      await allAcceptingFrnds();
    })();
    // eslint-disable-next-line
  }, []);

  const CountdownTimer = () => {
    const timeInterval = setInterval(() => {
      // console.log(expiryTime, "the expiryTime", classtime);
      const countdownDateTime = new Date(expiryTime.current).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60),
      );
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        expiryTime.current = false;
        setTimer(false);
      }
    }, 1000);
  };

  useEffect(() => {
    expiryTime.current = classtime.time;
    // console.log(classtime);
    // expiryTime.current = 0
    CountdownTimer();
  });

  let [clss , setCls] = useState([])
  const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

  useEffect( ()=>{
    async function getter(){
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

        d3 = sortClassesByEarliestDate(d3)
        
            if (user){
              const check = user.email.split('@')
              if (check[1] === 'blackis.in'){
                  setCls(d3)
              }else {
                  const dataArray = d3
                  const filteredArray = dataArray.filter(item => item.verified);
                  setCls(filteredArray)
              }
          }else {
            const dataArray = d3
            const filteredArray = dataArray.filter(item => item.verified);
            setCls(filteredArray)
        }
    }
    getter()
},[])

  // const [showclasses, setShowclasses] = useState(false);

  return (
    <Container fluid className="m-0 p-0 ">
      <Header />
      <Container fluid className="white "></Container>
      {showclasses ? (
        <Container fluid className="p-0 m-0">
          <Container>
            <TabPanel />
          </Container>
        </Container>
      ) : (
        <>
          <Whatsnew />
          <Container fluid className="p-0 m-0  w-100 bgw ">
            <Container
              className="p-0 w-100 pt-4 cont-feed m-0"
              // style={{
              //   maxWidth: "1000px",
              // }}
            >
              <Row className="m-0 p-0 mt-2 w-100">
                <Col md={1}></Col>
                <Col md={5} className="p-0  friClColumn">
                  {noClasses ? (
                    <div className="bgw rounded-3 ps-1 py-1 boxshadow  mx-2 mb-2">
                      {showclasses === false && (
                        <>
                          {timer ? (
                            <Row className="mt-2 ">
                              <b>
                                <h2>Your next class starts in </h2>
                              </b>
                              <Col
                                xs={3}
                                className="p-2 ps-0 timer text-center"
                              >
                                <h1>
                                  {countdownTime.countdownDays.toString()
                                    .length === 1
                                    ? "0" + countdownTime.countdownDays
                                    : countdownTime.countdownDays}
                                </h1>
                                <b>
                                  <p className="">Days</p>
                                </b>
                              </Col>
                              <Col
                                xs={3}
                                className="p-2 ps-0 timer text-center"
                              >
                                <h1>
                                  {countdownTime.countdownHours.toString()
                                    .length === 1
                                    ? "0" + countdownTime.countdownHours
                                    : countdownTime.countdownHours}
                                </h1>
                                <b>
                                  <p className="">Hours</p>
                                </b>
                              </Col>
                              <Col
                                xs={3}
                                className="p-2 ps-0 timer text-center"
                              >
                                <h1>
                                  {countdownTime.countdownMinutes.toString()
                                    .length === 1
                                    ? "0" + countdownTime.countdownMinutes
                                    : countdownTime.countdownMinutes}
                                </h1>
                                <b>
                                  <p className="">Minutes</p>
                                </b>
                              </Col>
                              <Col
                                xs={3}
                                className="p-2 ps-0 timer text-center"
                              >
                                <h1>
                                  {countdownTime.countdownSeconds.toString()
                                    .length === 1
                                    ? "0" + countdownTime.countdownSeconds
                                    : countdownTime.countdownSeconds}
                                </h1>
                                <b>
                                  <p className="">Seconds</p>
                                </b>
                              </Col>
                            </Row>
                          ) : (
                            <Row className="mt-2 m-0 ">
                              <h5 className="p-0">It’s on.</h5>
                              <h5 className="p-0">Join your class here.</h5>
                              {/* <a
                                href={classtime ? classtime.link : ""}
                                target="_blank"
                                className="w-50 p-0"
                                rel="noreferrer"
                              > */}
                              <Button
                                variant="primary"
                                className="mt-2  w-100 bgy border-0"
                                onClick={() => {
                                  attendingCls(classtime);
                                  navigate(
                                    `/joinmeeting/cls/${classtime.course_id}/${classtime.dolphin.meeting_id}/`,
                                  );
                                }}
                              >
                                Enter room
                              </Button>
                              {/* </a> */}
                            </Row>
                          )}

                          {timer
                            ? ""
                            : // <Row className="my-3">
                              //   <Col xs={4}>
                              //     <img
                              //       src={Class2}
                              //       alt="classes"
                              //       className="w-100"
                              //     />
                              //   </Col>
                              //   <Col xs={8} className=" align-content-center ">
                              //     <h6>
                              //       Instructor :<b> Name</b>
                              //     </h6>
                              //     <h6>
                              //       Class : <b>Class</b>
                              //     </h6>
                              //     <h6>
                              //       Duration : <b>45 mins</b>
                              //     </h6>
                              //     <h6>
                              //       Day : <b>#22</b>
                              //     </h6>
                              //   </Col>
                              // </Row>
                              ""}
                          <div></div>
                        </>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="mt-2 rounded-3 bgw pe-0 mx-2 classDiv">
                    <h2 className="gl">My Classes</h2>
                    <img
                      src={Classes}
                      className=" p-0 m-0 cp classPic"
                      alt=""
                      onClick={() => {
                        setShowclasses(true);
                        // scollToRef.current.scrollIntoView();
                      }}
                      style={{
                        borderRadius: "15px",
                      }}
                      // reactCourse
                    />
                  </div>
                  <div className="mt-5 rounded-3 bgw  pe-0 classDiv mx-2">
                    <h2 className="gl">My Friends</h2>
                    <CardMedia
                      component="img"
                      // height="194"
                      image={Classes}
                      alt="My Friends"
                      className=" p-0 m-0 classPic"
                      style={{
                        borderRadius: "15px",
                      }}
                    />
                    <CardActions
                      disableSpacing
                      className="d-flex justify-content-between p-4 pb-2"
                    >
                      <GiShakingHands
                        title="Accept Friends"
                        className="cp"
                        size={30}
                        expand={expanded2.toString()}
                        onClick={handleExpandClick2}
                        aria-expanded={expanded2}
                        aria-label="show more"
                      ></GiShakingHands>
                      <GiThreeFriends
                        title="Friends List"
                        size={30}
                        className="cp"
                        expand={expanded.toString()}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      ></GiThreeFriends>
                    </CardActions>
                    {expanded && <Popup isOpen={expanded} togglePopup={handleExpandClick} />}
                    {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        {areFriends.length > 0 &&
                          areFriends.map((option2) => {
                            let option = option2.friend;
                            if (option2.accepted) {
                              noFrnds = false;
                            }
                            return (
                              option2.accepted && (
                                <div
                                  className="d-flex p-1 align-items-center"
                                  key={option2.id}
                                >
                                  {option.img_thumbnail.length > 0 ? (
                                    <img
                                      src={option.img_thumbnail}
                                      width={40}
                                      height={40}
                                      style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                      }}
                                      alt="logo"
                                    />
                                  ) : (
                                    <img
                                      src={DefaultPic}
                                      width={40}
                                      height={40}
                                      style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                      }}
                                      alt="logo"
                                    />
                                  )}
                                  <Typography style={{ marginLeft: "3%" }}>
                                    {option.first_name} {option.last_name}
                                  </Typography>
                                  <div
                                    style={{
                                      border: 0,
                                      borderRadius: 2,
                                      marginLeft: "auto",
                                    }}
                                    className="d-flex align-items-center gap-3"
                                  >
                                    <FaRegComment
                                      title="Start Chatting"
                                      size={27}
                                      className="cp ps-1"
                                    />
                                    <AiOutlineUserDelete
                                      title="Remove from List"
                                      size={27}
                                      className="cp"
                                      onClick={() => {
                                        console.log("remove friends");
                                        let ind = areFriends.indexOf(option2);
                                        console.log(ind);
                                        console.log(option2);
                                        dismissFrnd(option2.id, ind, "frnd");
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            );
                          })}
                        {noFrnds && (
                          <p className="text-center text-muted mb-0">
                            No Friends
                          </p>
                        )}
                      </CardContent>
                    </Collapse> */}
                    <Collapse in={expanded2} timeout="auto" unmountOnExit>
                      <CardContent>
                        {/* {acceptngFrnd.length > 0 ? (
                          acceptngFrnd.map((option2) => {
                            let option = option2.Friends_Peer[0].my_details;
                            // willBeFrnd.length > 0 &&
                            //   willBeFrnd.map((option) => {
                            return (
                              <div
                                className="d-flex p-1 align-items-center"
                                key={option2.id}
                              >
                                {option.img_thumbnail.length > 0 ? (
                                  <img
                                    src={option.img_thumbnail}
                                    width={40}
                                    height={40}
                                    style={{
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                    alt="logo"
                                  />
                                ) : (
                                  <img
                                    src={DefaultPic}
                                    width={40}
                                    height={40}
                                    style={{
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                    alt="logo"
                                  />
                                )}
                                <Typography style={{ marginLeft: "3%" }}>
                                  {option.first_name} {option.last_name}
                                </Typography>
                                <div
                                  style={{
                                    border: 0,
                                    borderRadius: 2,
                                    marginLeft: "auto",
                                  }}
                                  className="d-flex align-items-center gap-3"
                                >
                                  <GiShakingHands
                                    title="Accept Friends"
                                    size={28}
                                    className="cp ps-1 pt-1"
                                    onClick={() => {
                                      console.log("Accepted");
                                      let ind = acceptngFrnd.indexOf(option2);
                                      console.log(ind);
                                      console.log(option2);
                                      acceptFrnd(option2.id, ind);
                                    }}
                                  />
                                  <AiOutlineUserDelete
                                    title="Remove from List"
                                    size={27}
                                    className="cp"
                                    onClick={() => {
                                      console.log("Removed");
                                      let ind = acceptngFrnd.indexOf(option2);
                                      console.log(ind);
                                      console.log(option2);
                                      dismissFrnd(option2.id, ind, "reqs");
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })
                        ) : ( */}
                          <p className="text-center text-muted mb-0">
                            No Requests
                          </p>
                        {/* )} */}
                      </CardContent>
                    </Collapse>
                  </div>
                  <div className="mt-5 profileInputAre gx">
                    <span>suggest your friend</span>
                    <div className="input-with-arrow gl">
                        <input
                          type="text"
                          // value={inputValue}
                          // onChange={handleChange}
                          placeholder="Enter text..."
                        />
                        <button onClick={()=>{
                            console.log("working on this");
                          }} className="buttonForInputPJX gl"><FaArrowRight size={35}/> 
                        </button>
                    </div>
                  </div>
                  <div className="mt-5 profileInputAre gx">
                    <span>gift to friend</span>
                    <div className="input-with-arrow gl">
                        <input
                          type="text"
                          // value={inputValue}
                          // onChange={handleChange}
                          placeholder="Enter text..."
                        />
                        <button onClick={()=>{
                          console.log("nothing function")
                        }} className="buttonForInputPJX gl"><FaArrowRight size={35}/> 
                        </button>
                    </div>
                  </div>

                  <button className="profileJoiner mt-5 gl"> JOIN A CLASS</button>
                </Col>
                <Col md={5} className="p-0 abcd mb-4 scrolly"
                  // style={{
                  //   height:"60vw",
                  // }}
                >
                  {/* <h1 className="profilename gx p-3 pb-1 ps-4">Feeds Section</h1> */}

                  <div
  className="pt-1"
  style={{
    width: "99%",
  }}
>
  {clss.length > 0 &&
    clss.map((cls, index) => {
      let host;
      if (cls.user.img_thumbnail.includes("{")) {
        host = cls.user.img_thumbnail
          ? cls.user.img_thumbnail.secure_url !== null
            ? JSON.parse(cls.user.img_thumbnail)
            : null
          : null;
      } else {
        host = cls.user.img_thumbnail;
      }

      const a = cls.img;

      if (a.length !== 0) {
        if (
          cls.title.toLowerCase().includes(value.toLowerCase()) ||
          cls.description.toLowerCase().includes(value.toLowerCase()) ||
          value === ""
        ) {
          return (
            <div
              className="mb-4 bggrey rounded-5 ms-1 me-2 pt-2 scrollyHeighty"
              style={{
                // width: "90vh",
                // height: "90vh"
              }}
              key={index}
            >
              <Row className="p-0 checker3" style={{ height: "4.77vw" }}>
                <Col md={8} className="w-100 d-flex alignt-items-center">
                  <div
                    className="d-flex w-100"
                    style={{
                      height: "4.77vw",
                      paddingTop: "0.5vw",
                      marginBottom: "1vw",
                    }}
                  >
                    {/* <img
                      src={
                        host
                          ? host.secure_url
                            ? host.secure_url
                            : DefaultPic
                          : DefaultPic
                      }
                      alt="classes"
                      className="ic"
                    /> */}
                    <div
                      className="d-flex justify-content-between w-100 align-items-center"
                      style={{
                        height: "3.77vw",
                      }}
                    >
                      <h5 className="ps-3 pt-2 hostDetailTextPar gl">
                        {cls.title}
                      </h5>
                      <Link
                        to={`/trainer/${cls.user.id}`}
                        className="d-flex align-items-center"
                      >
                        <div className="me-4 black hostDetailText gx">
                          {cls.user.first_name} {cls.user.last_name}
                        </div>
                        <p className="mb-0">
                          <img
                            src={cls.user.img_thumbnail}
                            style={{
                              width: "3.715vw",
                              height: "3.715vw",
                              borderRadius: "50%",
                              objectFit: "cover",
                              marginRight: "1vw",
                            }}
                            alt="Profile Pic"
                          />
                        </p>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
              <Link to={`${cls.date.length > 1 ? `/courseV2/${cls.id}` : `/classV2/${cls.id}`}`} className="w-100">
                <div className="d-flex w-100 bggrey m-0 p-0">
                  <img
                    src={a[0].url}
                    alt=""
                    className=""
                    style={{
                      width: "100%",
                      height: "30.683vw",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Link>
              <Row>
                {/* <Col md={1}></Col> */}
                {/* <Col
                  md={5}
                  className="d-flex justify-content-start"
                >
                  <Button
                    variant="contained"
                    className="bgy text-white outline-0"
                    onClick={() => {
                      console.log("clicked");
                      // Copy the link to clipboard
                      navigator.clipboard.writeText(
                        `http://localhost:3000/classes/join/${course.id}`
                      );
                      successToast("Link copied to clipboard");
                    }}
                  >
                    Copy
                  </Button>
                </Col> */}
                <Col
                  md={12}
                  className="d-flex justify-content-between ps-4"
                  style={{
                    marginTop: "1vw",
                    marginBottom: "1vw",
                  }}
                >
                  {/* <div>
                    {reaction.length > 0 &&
                    reaction[index].count > 0
                      ? reaction[index].count
                      : " "}
                  </div> */}
                  <div className="d-flex">
                    <span>
                      <AiFillHeart
                        className="cp"
                        onClick={() => {
                          triggerReaction(index, cls.id);
                        }}
                        size={40}
                        style={{
                          color:
                            reaction.length > 0 && reaction[index]
                              ? "red"
                              : "grey",
                        }}
                      />
                      <FaRegComment
                        size={40}
                        className="cp ps-2"
                        onClick={togglePopup}
                      />
                    </span>
                    <div className="comment-box-container">
                      {showPopup && (
                        <div className="popup">
                          <div className="popup-content">
                            <span className="close" onClick={togglePopup}>
                              &times;
                            </span>
                            <form onSubmit={handleSubmit(cls.id)}>
                              <textarea
                                placeholder="Enter your comment..."
                                value={comment}
                                onChange={handleInputChange}
                                rows={4}
                                cols={50}
                              />
                              <br />
                              <button type="submit" className="gx">
                                Comment
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ps-2 text-muted pt-1 me-4 likeCommText">
                    {3 > 0 && 4 > 0
                      ? 4 + " likes . 0 comments"
                      : " "}
                  </div>
                </Col>
                <Col md={1}></Col>
              </Row>
            </div>
          );
        }
      }
    })}
</div>

                </Col>
                <Col md={1}></Col>
              </Row>
            </Container>
          </Container>
        </>
      )}
      <Footer  />
    </Container>
  );
};

export default Profile;
