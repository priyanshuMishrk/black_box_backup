import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import  ReactCardFlip  from 'react-card-flip';
import Card from "./Card";
import axios from "axios";
import defaultPic from '../../Images/defualtProPic.jpg'
// import ReadMoreReact from "read-more-react";
// import $ from "jquery";

// import HoverVideoPlayer from 'react-hover-video-player';
// import Class2 from "../../Images/Classes/class2.jpg";
// import Class3 from "../../Images/Classes/class3.jpg";
// import Class4 from "../../Images/Classes/class4.jpeg";

// import Icon1 from "../../Images/Classes/icon1.jpg";
// import Icon2 from "../../Images/Classes/icon2.png";
// import Icon3 from "../../Images/Classes/icon3.jpeg";
// import Icon4 from "../../Images/Classes/icon4.png";

const Classes = () => {
  function sortClassesByEarliestDate(classes) {
    return classes.sort((a, b) => {
      let aEarliestDate = new Date(Math.min(...a.date.map(d => new Date(`${d.date}T${d.time}`))));
      let bEarliestDate = new Date(Math.min(...b.date.map(d => new Date(`${d.date}T${d.time}`))));
      return aEarliestDate - bEarliestDate;
    });
  }
  const { getCoursesList, courseList, value, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [small , setSmall] = useState(true)
  const [currentInd , setCurrentInd] = useState()
  const [hoverTimeout, setHoverTimeout] = useState(null);
  function handleMouseEnter(ind) {
    console.log(currentInd)
    clearTimeout(hoverTimeout); // Clear any existing timeout
  const timeout = setTimeout(() => setCurrentInd(ind), 0); 
  setHoverTimeout(timeout);
    console.log(currentInd)
  }


  function handleMouseLeave() {
    console.log(currentInd)
    clearTimeout(hoverTimeout); // Clear the timeout if mouse leaves
    setHoverTimeout(null);
    setCurrentInd(null)
    console.log(currentInd)
  }

  function setH(){
    setSmall(false)
  }

  function setS(){
    setSmall(true)
  }
  
  useEffect(() => {
    getCoursesList();
    // eslint-disable-next-line
  }, []);

  let [clss , setCls] = useState([])
  const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    function isCloudinaryUrl(url) {
      if (!url) return false
      const cloudinaryPattern = /^https:\/\/res\.cloudinary\.com\/black-box\/.*/;
      return !cloudinaryPattern.test(url);
    }

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
      className="p-0 m-0 d-flex justify-content-center classescontainer w-100"
    >
      <Container className="p-0 m-0 mb-5">
        <div className="d-flex justify-content-center flex-column w-100 pt-2">
          <div>
            <h2 className="text-center gl my-3">CLASSES</h2>
          </div>

          {/* <div className=" px-2 d-flex justify-content-center m-0 p-0 abcd ps-5 py-5"
          style={{
            overflowX: "scroll",
          }}
          >
            <div 
            style={{
              minWidth: "680px",
              maxWidth: "680px",
              minHeight: "400px",
            }}
            >
            </div>
            {courseList &&
              courseList.length > 4 &&
              courseList.map((course) => {
                const a = JSON.parse(course.images);
                if (course.title.toLowerCase().includes(value.toLowerCase()) || course.description.toLowerCase().includes(value.toLowerCase()) || value === "") {
            
                
                return (
                  <div
                    key={course.id}
                    className="my-4 mt-0 cp position-relative me-2 pt-2"
                    style={{
                      minWidth: "220px",
                      maxWidth: "220px",
                      minHeight: "400px",
                    }}
                  >
                    <Link to={`/classes/join/${course.id}`}>
                      <div onClick={goToTop} className="zoom">
                        <div className="imgdiv">
                          <img
                            src={a[0]}
                            alt="No images uploaded"
                            className="classesimg p-0 m-0"
                          />
                        </div>
                        <Row className="profile m-0  pt-2">
                        <h6 className="gx classtitlee"
                        >{
                          course.title && course.title.length > 30 ? course.title.substring(0, 30) + "..." : course.title
                          }</h6>
                          <p className="clsdesc">
                            
                            {course.description && course.description.length > 60 ? course.description.substring(0, 60) + "..." : course.description}
                          </p>
                          <Col xs={8} className="p-2 pt-2 pb-0">
                            <h6 className="gx tutorname">
                              {course.host_details.first_name}
                              {course.host_details.last_name}
                            </h6>
                            <p className="gl text-dark">Instructor</p>
                          </Col>
                          <div className="  clsfee p-2 pt-0">
                            <div className="d-flex">
                              <h6 className="gx">
                                <span className="textgrey">FEE:</span> ₹
                                {course.price}
                                <span className="gl">/ person</span>
                              </h6>
                            </div>
                            <div className="d-flex">
                              <h6 className="gx">
                                <span className="textgrey"> Type:</span>
                                {course.duration_type}
                              </h6>
                            </div>
                          </div>
                        </Row>
                      </div>
                    </Link>
                  </div>
                );              
                          }
    
              })}
          </div>
          <Row className="mb-5 px-2 d-flex justify-content-center m-0 p-0">
            {courseList &&
              courseList.length <= 4 &&
              courseList.map((course) => {
                const a = JSON.parse(course.images);
                return (
                  <Col
                    key={course.id}
                    className="my-4 cp position-relative"
                    style={{
                      minWidth: "220px",
                      maxWidth: "220px",
                      minHeight: "300px",
                    }}
                  >
                    <Link to={`/classes/join/${course.id}`}>
                      <div onClick={goToTop} className="zoom">
                        <div className="imgdiv">
                          <img
                            src={a[0]}
                            alt="No images uploaded"
                            className="classesimg p-0 m-0"
                          />
                        </div>
                        <Row className="profile m-0  pt-2">
                          <h6 className="gx classtitlee">{
                          course.title && course.title.length > 30 ? course.title.substring(0, 30) + "..." : course.title
                          
                          }</h6>
                          <p className="clsdesc">
                            <ReadMoreReact
                              text={course.description}
                              min={150}
                              ideal={200}
                              max={500}
                              readMoreText=".. read more"
                            />
                          </p>

                          <Col xs={8} className="p-2 pt-2 pb-0">
                            <h6 className="gx tutorname">
                              {course.host_details.first_name}
                              {course.host_details.last_name}
                            </h6>
                            <p className="gl text-dark">Instructor</p>
                          </Col>
                          <div className="  clsfee p-2 pt-0">
                            <div className="d-flex">
                              <h6 className="gx">
                                <span className="textgrey">FEE:</span> ₹
                                {course.price}
                                <span className="gl">/ person</span>
                              </h6>
                            </div>
                            <div className="d-flex">
                              <h6 className="gx">
                                <span className="textgrey"> Type:</span>
                                {course.duration_type}
                              </h6>
                            </div>
                          </div>
                        </Row>
                      </div>
                    </Link>
                  </Col>
                );
              })}
          </Row> */}
          <Row className="pb-4 ">
            <div
              className={`d-flex w-100 abc ${small ? "h123":"h134"}`}

              style={{
                overflowX : "clip",
                overflowY: "hidden",
                flexWrap: "wrap",  
                alignItems : "center",
                justifyContent : "flex-start",
                marginLeft : '6vw',
                marginRight : "3vw"
              }}
            >
              {clss &&
                clss.length > 0 &&
                // eslint-disable-next-line
                clss.map((cls, index) => {
                  const a = cls.img && cls.img.length > 0 ? cls.img[0].url : "";
                  //check if the course name or course description is in the search bar
                  if (
                    cls.title.toLowerCase().includes(value.toLowerCase()) ||
                    cls.description
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    value === "" 
                  ) {
                      return (
                        <div
                          className="mt-1 me-4 class "
                          onClick={() => navigate(`${cls.date.length > 1 ? `/courseV2/${cls.id}` : `/classV2/${cls.id}`}`)}
                          key={cls.id}
                        >
                          <div
                            className=" mb-2 mb-4 cp"
                            style={{
                              width: "20vw",
                            }}
                          >
                            <div onMouseOver={()=>handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}>
                            <ReactCardFlip key={index}
                            flipDirection='vertical'
                            isFlipped={ index === currentInd
                            }
                            flipSpeedBackToFront ={2}
                                // index={index}
                                // flipped={isFlipped}
                                // handleClick={handleClick}
                                >
                              <div className="profileclassesimg22">
                              <img
                                src={a}
                                className="classesimg22"
                                alt="classImg"
                                
                              />

                              </div>
                            <div style={
                              {
                                width:"19.98vw",
                                height:"30vw",
                                color : "black",
                                backgroundColor:"#ffcc00",
                                overflow : "clip"
                              }
                            }
                            className="elipiseee"
                            >
                              <span className="eliHead gb">
                                Description
                              </span>
                              <span className="eliDesc gsb">
                              {cls.description}

                              </span>
                            </div>
                            </ReactCardFlip>
                              </div>
                              {/* <Card jolo={a} /> */}
                            <Row className="profilest bw m-0 ">
                              <div
                                className="d-flex"
                                style={{
                                  overflowX: "hidden",
                                }}
                              >  
                                <div>
                                  <img src={isCloudinaryUrl(cls.user.img_thumbnail)? cls.user.img_thumbnail : defaultPic} alt="host" //esfmsomfosmfosmdfomsdfmsdmfdsodfmsdfomsofmmsfcoms
                                  style={{
                                    width : "4vw",
                                    height : "4vw",
                                    objectFit : "cover",
                                    objectPosition : "center",
                                    borderRadius : "50%",
                                    marginTop : "1vw"
  
                                  }}
                                  />
                                </div>
                                <div className=" w-100 pe-1  pt-1 pb-1" style={{
                                  marginTop : "1vw", 
                                  marginLeft : "1vw"
                                }}>
                                  <b>
                                    <h5
                                      className="gx py-1 text-dark"
                                      style={{
                                        margin: "auto",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {cls.title && cls.title.length > 30
                                        ? cls.title
                                            .substring(0, 35)
                                            .split(" ")
                                            .slice(0, -1)
                                            .join(" ") + "..."
                                        : cls.title}
                                    </h5>
                                  </b>
                                  <p
                                    style={{
                                      fontSize: "13px",
                                      lineHeight: "1.2",
                                    }}
                                  >
                                    {cls.user.first_name + " " +
                                    cls.user.last_name}
                                  </p>
                                </div>
                              </div>
                            </Row>
                          </div>
                        </div>
                      );
                    
                  }
                })}
            </div>
            {small && <div onClick={setH} className="seemorebutton gx">SEE MORE</div>}
            
          </Row>
        </div>
      </Container>
    </Container>
  );
};

export default Classes;
