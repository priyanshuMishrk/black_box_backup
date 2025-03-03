import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../blackbox-logo-01.png";
import Bs from '../../Images/search.svg';
import cartIcon from "../../Images/shopping-cart-2-line.svg";
// import { BsGlobe } from "react-icons/bs";
// import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiWireframeGlobe } from "react-icons/gi";
import notify from "../../Images/notificationBell.svg"
import Avatarr from "./Avatarr";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import { SocketContext } from "../../Context/SocketContext";
import { useContext } from "react";
import axios from "axios";

const Header = () => {
  const [cartLength, setCartLength] = useState(0)

  const [navb, setNavb] = useState(false);

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );

  const id = localStorage.getItem("User");

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(`notification:${id}`, (data) => {
      console.log("New Notification:", data);
      playNotificationSound();
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  const playNotificationSound = () => {
    const audio = new Audio("https://bask-s.s3.ap-south-1.amazonaws.com/notification-2-269292.mp3");
    audio.play().catch((err) => console.error("Audio play failed:", err));
  };

  useEffect(() => {
    async function subsOfCart() {
      const res = await axios.get(BaseUrl + `/cart`,
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        }
      );
      const clss = res.data.classes
      const course = res.data.courses
      let s = [];
      if (clss && course) {
        s = clss.concat(...course)
      } else if (clss) {
        s = clss
      } else if (course) {
        s = course
      }
      setCartLength(s.length)
    }
    if (user) {
      subsOfCart()
    }
  },[])

useEffect(() => {
    const interval = setInterval(() => {
      async function subsOfCart() {
        const res = await axios.get(BaseUrl + `/cart`,
          {
            headers: { Authorization: `Bearer ${authTokens}` },
          }
        );
        const clss = res.data.classes
        const course = res.data.courses
        let s = [];
        if (clss && course) {
          s = clss.concat(...course)
        } else if (clss) {
          s = clss
        } else if (course) {
          s = course
        }
        setCartLength(s.length)
      }
      if (user) {
        subsOfCart()
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if (localStorage.getItem("soundPermissionAsked")) return;

    // Attempt to play a silent audio to trigger autoplay permission
    const audio = new Audio();
    audio.play().catch(() => {
      console.log("Sound permission is not granted yet.");
    });

    localStorage.setItem("soundPermissionAsked", "true");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      async function subsOfCart() {
        socket.emit('useAlive', id)
      }
      if (user) {
        subsOfCart()
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  const handleNavbar = () => {
    window.scrollY >= 20 ? setNavb(true) : setNavb(false);
  };

  const [isInputVisible, setIsInputVisible] = useState(false);
  // const [value, setValue] = useState("");
  const [adminAllow, setAdminAllow] = useState()

  const handleSearchIconClick = () => {
    setIsInputVisible(true);
    setSug(true)
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  function setInputValue(value) {
    setIsInputVisible(true)
    const inputElement = document.getElementById('jjkkkoookkkoookkkook');
    if (inputElement) {
      inputElement.value = value;
      setValue(value);
    }
  }

  const ref2 = useRef(null);

  useEffect(() => {
    // Function to handle click events
    function handleClickOutside(event) {
      if (ref2.current && !ref2.current.contains(event.target)) {
        setIsInputVisible(false);
        setSug(false)
      }
    }

    // Bind the event listener
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  window.addEventListener("scroll", handleNavbar);
  const { setToChoose, value, setValue, seenavs, user } = useContext(AuthContext);
  const location = useLocation();

  const [onSearchPage, setOnSP] = useState(location.pathname !== '/search')

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    }
  })

  const [onHamp, setOnHamp] = useState(false)


  useEffect(() => {
    if (user && adminAllow != "initial") {
      const brokenMail = user.email.split('@')
      console.log(brokenMail)
      if (brokenMail[1] === 'blackis.in') {
        setAdminAllow(true)
      } else {
        setAdminAllow("initial")
      }
      console.log(adminAllow)
    }
  }, [])

  const [showSug, setSug] = useState(false)
  const nav = useNavigate()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default action (e.g., form submission)
      nav('/search')
    }
  };




  return (
    < >
      <div className={`hamburgerrr ${!onHamp && 'inactHamb'} fsbfont`}>

        <div onClick={() => setOnHamp(false)}>
          X
        </div>

        {
          !loggedIn && <Link to="/login?l=1" className={navb ? "link clr" : "link2 clr"}>
            LOGIN
          </Link>
        }

        {
          !loggedIn &&
          <Link to="/signup" className={navb ? "link clr" : "link2 clr"}>
            SIGN UP
          </Link>
        }

        {
          loggedIn &&
          <Link to="/viewProfileV2/classes/wishlist" className={navb ? "link clr" : "link2 clr"}>
            Wishlist
          </Link>
        }

{
          loggedIn &&
          <Link to="/viewProfileV2/classes/activity" className={navb ? "link clr" : "link2 clr"}>
            Liked Posts
          </Link>
        }
      </div>

      <nav className={navb ? "active w-100 gsb" : "w-100 gsb"} >
        <Container
          fluid
          className="d-flex justify-content-between w-100 p-3 navbar"
        >
          <div className="d-flex">
            <Link to="/main">
              <img src={Logo} width={200} className="p-0 m-0 cp" alt="" />
            </Link>
          </div>
          <div className="">
            <div className="navs align-items-center">
              <b>
                <ul className="navul">
                  {/* <li>
                    <Link to="/" className="link px-3 ">
                      STREAM
                    </Link>
                  </li> */}
                  {/* <li>
                    {user ? (
                      (user.classroom_id || workspaceAllow) && ( */}
                  {!isInputVisible && <Link to="/teaching" className={navb ? "link" : "link2 "}>
                    TEACH
                  </Link>}
                  {/* )
                    ) : (
                      <Link to="/classroom" className="link  ">
                        CLASSROOM{" "}
                      </Link>
                    )}
                  </li> */}
                  {seenavs ? (
                    // <li>
                    <Link to="/classroom/host" className={navb ? "link px-5" : "link2 px-5"}>
                      HOST A SESSION{" "}
                    </Link>
                  ) : (
                    // </li>
                    <>
                      <li>{
                        !isInputVisible &&
                        <Link to="/classes" className={navb ? "link px-5" : "link2 px-5"}>
                          LEARN
                        </Link>
                      }
                      </li>

                      {/* <li>{
                        !isInputVisible &&
                        <Link to="/classroomV2" className={navb ? "link clr" : "link2 clr"}>
                          CLASSROOM
                        </Link>
                      }
                      </li> */}

                      {/* <li>{
                        !isInputVisible && adminAllow === true &&
                        <Link to="/admin" className={navb ? "link adminlink " : "link2 adminlink "}>
                          ADMIN
                        </Link>
                      }
                      </li> */}

                      {/* <Link to="/classroom" className={navb ? "link clr" : "link2 clr"}>
                        CLASSROOM
                      </Link> */}

                      <Link to="/streamCom" className={navb ? "link clr" : "link2 clr"}>
                        STREAM
                      </Link>


                      {/* <li>
                      <div className="circle-text-container">
                        <div className="circle"></div>
                        <span>STREAM</span>
                      </div>
                      </li> */}

                      {/* {
                        !loggedIn &&
                        <li>
                          <Link to="/signup" className={navb ? "link clr" : "link2 clr"}>
                            SIGN UP
                          </Link>
                        </li>
                      }

                      {
                        !loggedIn &&
                        <li>
                          <Link to="/login?l=1" className={navb ? "link clr" : "link2 clr"}>
                            LOGIN
                          </Link>
                        </li>
                      } */}

                      {/* <li>
                        {!isInputVisible && <Link
                          to="/stream"
                          className={navb?"link pe-3":"link2 pe-3"}
                        >
                          STREAM
                        </Link>}
                      </li> */}



                      {onSearchPage && <li>
                        <div ref={ref2} className={`ms-2 pt-1 d-flex ${isInputVisible ? 'searchdiv bggrey' : ''}`}>
                          {isInputVisible && (
                            <input
                              type="text"
                              className="borderless"
                              id="jjkkkoookkkoookkkook"
                              value={value}
                              title="Search Course or Class"
                              onChange={handleInputChange}
                              // onBlur={() => {setIsInputVisible(false) 
                              //   setSug(false)}}
                              autoFocus
                              onKeyDown={handleKeyDown}
                            />
                          )}
                          <img src={Bs} alt="" className={` ${isInputVisible ? '' : 'mb-2 larger-icon'}`} onClick={handleSearchIconClick} />

                          {
                            showSug &&
                            <div className="searchsuggestion">

                              <div className="head">
                                SUGGESTED SEARCHES
                              </div>

                              <div className="sg cp" onClick={() => {
                                setInputValue('Chess')
                              }}>
                                Chess
                              </div>

                              <div className="sg cp" onClick={() => {
                                setInputValue('Guitar')
                              }}>
                                Guitar
                              </div>

                              <div className="sg cp" onClick={() => {
                                setInputValue('Dance')
                              }}>
                                Dance
                              </div>
                            </div>

                          }
                          {/* <BsSearch  /> */}
                        </div>
                      </li>}
                    </>
                  )}

                  {loggedIn && <li>
                    <Link className="linkOfCart" to="/cart">
                      <img src={cartIcon} className={`mt-1 cart-icon-head mb-2 larger-icon`} alt="" />
                      <span className="linkOfCartLength frfont">{cartLength}</span>
                    </Link>
                  </li>
                  }
                  {loggedIn && <li>
                    <div>
                      <img src={notify} className={`mt-1 bell-icon-head mb-2 larger-icon`} alt="" />
                    </div>
                  </li>}


                  {/* <li>
                    <Link to='/enter' className='link px-2 '>
                    <BsSearch className="" size={25} />
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link to="/login" className="link px-2 ">
                      <BsGlobe className="" size={25} />
                    </Link>
                  </li> */}
                  { <li>
                    {/* <Link to="/profile" className="link px-2 ">
                      <FaRegUser className="" size={25} />
                    </Link> */}

                    <Avatarr />
                  </li>}

                  {/* {!loggedIn && <li>
                    <div className={navb ? "link px-3  " : "link2 px-3  "}>
                      <GiHamburgerMenu className="cp" onClick={() => setOnHamp(true)} size={30} />
                    </div>
                  </li>} */}
                  {/* <li>
                    <Link to="/nav" className="link px-3 pt-1 ">
                      <GiHamburgerMenu className="" size={30} />
                    </Link>
                  </li> */}
                </ul>
              </b>
            </div>
          </div>
        </Container>
      </nav>
      <nav className={navb ? "active w-100 navs2" : "w-100 navs2"}>
        <Container fluid className="d-flex justify-content-between w-100 p-3 ">
          <div>
            <Link to="/main">
              <img src={Logo} width={150} className="p-0 m-0 cp" alt="" />
            </Link>
          </div>
          <div className="">
            <div className="navs align-items-center">
              <b>
                <ul className="navul">
                  {/* <li>
                    <BsSearch className="" size={25} />
                  </li> */}
                  {/* <li>
                    <Link to="/login" className="link px-2 ">
                      <BsGlobe className="" size={25} />
                    </Link>
                  </li> */}
                  <li>
                    {/* <Link to="/profile" className="link px-2 "> */}
                    {/* <FaRegUser className="" size={25} /> */}

                    <Avatarr />
                    {/* </Link> */}
                  </li>
                  <li>
                    <div className="link px-3 pt-1 ">
                      <GiHamburgerMenu className="" size={30} />
                    </div>
                  </li>
                </ul>
              </b>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Header;
