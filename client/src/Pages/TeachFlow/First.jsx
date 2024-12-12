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
import AuthContext from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";

function TeachFlowFirst(props) {
    const nava = useNavigate()
    const {
        user
      } = useContext(AuthContext);
    
    
    function netter(){
        if (user){
            nava('/class-submission')
        }else {
            nava('/login?l=2')
        }
    }

    function goroo(){

        if (user){
            nava('/course-submission')
        }else {
            nava('/login?l=3')
        }

    }

    return (
        <>
            <Header />
            <div className="TFFfirst">
                <div className="Text gsb">

                    <span className="faded">
                        Teach with
                    </span>

                    <span className="dark">
                        <span className="faded">
                        
                        </span>
                        <span className="darkText">
                        Black Box.
                        </span>
                    </span>

                </div>

                <div className="d-flex w-50 joiningclassbuttons">

                <Button variant="contained"
                  className="bgdark BTteach "
                  onClick={netter}
                  >
                    Teach  a Class
                  </Button>
                <Button variant="contained"
                  className=" BTteach jaosjdoasj "
                  onClick={goroo}
                  style={{
                    color:"black"
                  }}
                  >Teach a Course</Button>
                </div>

            </div>

            <div className="TFFsecond gsb">
                <div className="TFFShead gb">
                What’s the Black Box advantage?
                </div>
                <div className="TFFSwhat">

                    <div className="TFFSwhat1 whatContainer">
                        <div className="whatHead gsb">
                        Empower Your Teaching
                        </div>
                        <div className="whatSpan gl">
                        Black Box provides a user-friendly platform designed to empower educators. With intuitive tools and resources, we make it easy for you to create and manage your courses effectively.
                        </div>

                    </div>


                    <div className="TFFSwhat2 whatContainer">
                        <div className="whatHead gsb">
                        Reach a Global Audience
                        </div>
                        <div className="whatSpan gl">
                        Connect with students from around the world. Black Box's extensive reach ensures that your teaching can make an impact on a global scale, expanding your influence and audience.
                        </div>

                    </div>


                    <div className="TFFSwhat3 whatContainer">
                        <div className="whatHead gsb">
                        Comprehensive Support
                        </div>
                        <div className="whatSpan gl">
                        Our support team is here to assist you every step of the way. From setting up your profile to troubleshooting issues, Black Box offers full support to ensure your teaching experience is seamless.
                        </div>

                    </div>

                </div>
            </div>

            <div className="TFFthird gsb">
                <div className="TFFTfirst gb">
                How to begin
                </div>
                
                <div className="TFFTsteps">

                    <div className="TFFTstep1 TFFTstep ">
                        <div className="stepS gm">
                        STEP 1
                        </div>
                        <div className="stepName">
                        Sign in/Register
                        </div>
                        <div className="stepDescr">
                        Create your account by signing in or registering with Black Box. It’s quick and easy, setting the foundation for your teaching journey.
                        </div>
                    </div>
                    <div className="TFFTstep1 TFFTstep ">
                        <div className="stepS gm">
                        STEP 2
                        </div>
                        <div className="stepName">
                        Create Profile
                        </div>
                        <div className="stepDescr">
                        Build your educator profile. Highlight your expertise, set your teaching preferences, and make a strong first impression on potential students.
                        </div>
                    </div>
                    <div className="TFFTstep1 TFFTstep ">
                        <div className="stepS gm">
                        STEP 3
                        </div>
                        <div className="stepName">
                        Submit class details
                        </div>
                        <div className="stepDescr">
                        Add the details of your classes. Include descriptions, schedules, and any necessary materials to attract and inform students.
                        </div>
                    </div>
                    <div className="TFFTstep1 TFFTstep ">
                        <div className="stepS gm">
                        STEP 4
                        </div>
                        <div className="stepName">
                        Start Teaching
                        </div>
                        <div className="stepDescr">
                        Begin your teaching adventure. Engage with your students, deliver your lessons, and make a difference through education.
                        </div>

                    </div>
                
                </div>
                
            </div>

            <div className="TFFfourth gsb">

                <div className="TFFfourHead gb">
                In case you have any questions...
                </div>
                <div className="TFFfourQuestion">
                    <div className="Q Q1">
                        <div className="QQ gsb">
                        What is Black Box?
                        </div>
                        <div className="QA gl">
                        Black Box is a dynamic teaching and learning platform for anyone, designed to connect educators with students worldwide. We provide the platform and resources necessary for a successful teaching experience.
                        </div>
                    </div>

                    <div className="Q Q2">
                        <div className="QQ gsb">
                        How does Black Box support educators?
                        </div>
                        <div className="QA gl">
                        We offer comprehensive support, including technical assistance, marketing tools, and a vast repository of resources to help you create and manage your courses effectively.
                        </div>
                    </div>

                    <div className="Q Q3">
                        <div className="QQ gsb">
                        Who can teach on Black Box? 
                        </div>
                        <div className="QA gl">
                        Anyone with a passion for teaching and expertise in a subject can join Black Box. Whether you're a seasoned educator or a new instructor, we welcome you to share your knowledge with a global audience.
                        </div>
                    </div>
                </div>

            </div>

            <div className="TFFfifth gsb">
                <div className="Testimonial">
                    <div className="tital">
                    Testimonials
                    </div>
                    <div className="titalImg">
                        <img src="https://res.cloudinary.com/black-box/image/upload/v1718961311/c02e3e5d0bf1a15285ff1280fa53c999_uu0eyy.png" alt="Testimonial" />
                    </div>
                    <div className="titalQuotes blw">
                    “
                    </div>
                    <div className="titalDes">
                    "Black Box has revolutionized my teaching experience. The platform's intuitive design and supportive community have enabled me to reach students from all over the world. It's been an incredibly rewarding journey."
                    </div>
                    <div className="titalName">
                    GAURI GIRISH
                    </div>
                </div>
            </div>

            <div className="TFFsixth gsb"
            >
                <div className="TFFbannertitle gb">
                    Teach with Black Box.
                </div>

                <div className="d-flex w-100 jannetisGold">
                <Button variant="contained"
                  className="bgdark BTbanner" 
                  onClick={netter}
                  >Teach  a Class</Button>

                <Button variant="contained"
                  className=" BTbanner jaosjdoasj "
                  onClick={goroo}
                  style={{
                    color:"black"
                  }}
                  >Teach a Course</Button>
                </div>
            </div>

            <Footer/>
        </>
    );
}


export default TeachFlowFirst;