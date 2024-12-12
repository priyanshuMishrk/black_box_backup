import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { BaseUrl }  from "../../Context/AuthContext";
import DefaultPic from "../../Images/defualtProPic.jpg";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import ReadMoreReact from "read-more-react";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

const Whatsnew = () => {

  function sortClassesByEarliestDate(classes) {
    return classes.sort((a, b) => {
      let aEarliestDate = new Date(Math.min(...a.date.map(d => new Date(`${d.date}T${d.time}`))));
      let bEarliestDate = new Date(Math.min(...b.date.map(d => new Date(`${d.date}T${d.time}`))));
      return aEarliestDate - bEarliestDate;
    });
  }

  const name = localStorage.getItem("name");
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
  // const prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
  // const propic = prop.secure_url;
  const about = localStorage.getItem("userDetails");
  const navigate = useNavigate();

  const { getCoursesList, courseList, willFrnd, willBeFrnd, saveFrnd, user } =
    useContext(AuthContext);
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
    
    useEffect(() => {
    getCoursesList();
    willFrnd();
    // eslint-disable-next-line
  }, []);
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

  return (
    <Container
      fluid
      className="profilediv d-flex justify-content-center p-0 m-0 bggrey  my-1 bxsh"
    >
      <Container className="pc py-5 pb-0">
        <Row>
          <Col lg={1}></Col>
          <Col lg={3}>
            <Row className="mb-5">
              <Col
                md={12}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="ps-3">
                {prop ? (
                    propic ? (
                      <img
                        width={100}
                        height={100}
                        src={propic}
                        alt=""
                        className="mb-1 mt-3 ic2"
                      />
                      
                      // <link rel="preload" href={propic} as="image"  className=" mb-1 mt-3 ic2 "></link>
                    ) : (
                      <img
                        width={100}
                        height={100}
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
                      width={100}
                      height={100}
                      alt=""
                      className=" mb-1 mt-3 ic2"
                    />
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="text-center mt-2 ps-3 gl">
                  <h3 className="gsb">{name}</h3>
                  <ReadMoreReact
                    text={about}
                    min={150}
                    ideal={150}
                    max={200}
                    readMoreText=".. read more"
                  />
                  <div className="mt-4 pt-1 d-flex justify-content-center align-items-center">
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ width: 300 }}
                      options={
                        willBeFrnd && willBeFrnd.length > 0 ? willBeFrnd : []
                      }
                      autoHighlight
                      getOptionLabel={(option) =>
                        `${option.first_name} ${option.last_name}`
                      }
                      renderOption={(props, option) => (
                        <div className="d-flex p-1" key={option.id}>
                          <Box
                            component="li"
                            sx={{
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...props}
                            onClick={() => {
                              navigate(`/trainer/${option.id}`);
                            }}
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
                            <Typography>
                              {option.first_name} {option.last_name}
                            </Typography>
                          </Box>
                          <button
                            style={{
                              border: 0,
                              borderRadius: 2,
                              marginLeft: "auto",
                            }}
                            className="bgy mt-1 mb-1"
                            onClick={() => {
                              let ind = willBeFrnd.indexOf(option);
                              saveFrnd(option.id, ind);
                            }}
                          >
                            {" "}
                            Save
                          </button>
                        </div>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Friends"
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col></Col>

          {/* //// */}
          <Col lg={7} className="ps-4 ">
            <h1 className="profilename gx">What's new</h1>
            <div className="scroll-container"
            style={{
              position : "relative"
            }}
            > 
            {scrollPosition > 0 && <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleScroll(-200)}  className="alllll"/>}
            <div
              className="d-flex w-85 abc"
              style={{
                overflowX: "hidden",
              }}
              ref={scrollerRef}
            >
              {clss
                ? // eslint-disable-next-line
                clss.slice(0, 6).map((cls, index) => {
                  const a = cls.img && cls.img.length > 0 ? cls.img[0].url : "";
                    // let host;
                    // if (course.host_details.img_thumbnail.includes("{")) {
                    //   host = course.host_details.img_thumbnail
                    //     ? course.host_details.img_thumbnail.secure_url !== null
                    //       ? JSON.parse(course.host_details.img_thumbnail)
                    //       : null
                    //     : null;
                    // } else {
                    //   host = course.host_details.img_thumbnail;
                    // }
                    if (a) {
                      return (
                        <div
                          className="my-4 mt-1 me-4 class"
                          key={index}

                          // style={{ height: "320px" }}
                        >
                          <Link
                            to={`${cls.date.length > 1 ? `/courseV2/${cls.id}` : `/classV2/${cls.id}`}`}
                            className="cp"
                          >
                            <div
                              className="boxshadow rounded-2 mb-2"
                              style={{
                                width: "200px",
                                overflow: "hidden",
                                
                              }}
                            >
                              <div className="profileclassesimg">
                                <img src={a} className="classesimg" alt="" />
                              </div>
                              <Row
                                className="profilest bw m-0 p-0 "
                                style={{
                                  overflowY: "hidden",
                                }}
                              >
                                <div
                                  className="d-flex"
                                  style={{
                                    overflowX: "hidden",
                                  }}
                                >
                                  <div
                                    className="w-100 pt-1 d-flex  align-items-center newClass"
                                    style={{
                                      margin: "auto",
                                    }}
                                  >

                                    <div className="m-1">
                                      <img src={cls.user.img_thumbnail} alt="Profile Pic" 
                                      width={35}
                                      height={35}
                                      style={{
                                        borderRadius: "50%",
                                      }}/>
                                    </div>

                                    <b style={{ textTransform: 'uppercase', color: '#a1a0a0 !important'}} className="overflow-ellipsis">
                                      <p
                                        className="gx   info-text-title"
                                        style={{
                                          margin: "auto",
                                        }}
                                      >
                                        {cls.title
                                          ? cls.title.length > 20
                                            ? cls.title.slice(0, 20) + "..."
                                            : cls.title
                                          : ""}
                                      </p>
                                      <p
                                        className="gx pb-1 info-text-name"
                                        style={{
                                          margin: "auto",
                                        }}
                                      >
                                        {cls.user && cls.user.first_name && cls.user.last_name ? `${cls.user.first_name} ${cls.user.last_name}` : ""}
                                      </p>
                                    </b>
                                  </div>
                                </div>
                              </Row>
                            </div>
                          </Link>
                        </div>
                      );
                    }
                  })
                : ""}
            </div>
            {scrollPosition < (scrollerRef.current?.scrollWidth - scrollerRef.current?.clientWidth) && (
        <FontAwesomeIcon icon={faChevronRight} onClick={() => handleScroll(200)} className="arrrr" />
      )}
    </div>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Whatsnew;
