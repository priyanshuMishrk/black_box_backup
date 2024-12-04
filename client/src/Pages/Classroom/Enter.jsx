/* eslint-disable no-undef */
import * as React from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import {  useNavigate } from "react-router-dom";
import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";
import { ReactTyped } from "react-typed";
import whatsapp from '../../Images/whatsapp.svg'
import email from '../../Images/mail.svg'
import copyLink from '../../Images/copy.svg'
import Ctrial from '../../Images/C trial.png'
import axios from "axios";

function ClassroomFlowFirst(props) {

    const clrToken = localStorage.getItem('tokenClr')

    const currentLink = window.location.href;

    const [shareOpen, setShareOper] = React.useState(false)
    // /register/classroom/mailTyype
    // const {user} = useContext(AuthContext)

    const [authTokens, setAuthTokens] = React.useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    React.useEffect( () => {

        async function jk(){
            if (clrToken){
                nava('/classroomv2/hub')
            }         

        }
        jk()
    },[])
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

    
    const nava = useNavigate()
    const {
        user
    } = useContext(AuthContext);

    function isCorporateEmail(email) {
        const personalDomains = [
          'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
          'icloud.com', 'aol.com', 'protonmail.com'
        ];
      
        const emailDomain = email.split('@')[1];
        return !personalDomains.includes(emailDomain.toLowerCase());
    }


    function netter() {

        // if (user) {
            //     const currK = isCorporateEmail(userMail)
            //     if (currK)
            //     nava('/classroomv2/join')
            // } else {
            const userMail = localStorage.getItem('tokenClr')
            
            if (userMail){
                return nava('/classroomv2/hub')
            }
            nava('/loginClr')
        // }
    }

    function goroo() {

        if (user) {
            nava('/course-submission')
        } else {
            nava('/login?l=3')
        }

    }

    return (
        <>
            <Header />
            <div className="ClassroomFirst">
                <div className="textCF">
                    <div className="headText fsbfont">
                    Transform Your Oragnisation with Black Box Classroom
                    </div>
                    <ReactTyped className="fmfont bodyTextCf" strings={["Empower your team with live learning experiences tailored to your company's needs"]} typeSpeed={20} />
                    <div className="buttonToSubCf fmfont" onClick={netter}>
                    Subscribe Now
                    </div>
                </div>
                <div className="imgCF">
                    <img src="https://d1bxlu89wy43u2.cloudfront.net/classRoom.png" alt="" />
                </div>

            </div>

            <div className="TFFsecond gsb">
                <div className="TFFShead gb">
                    Why Choose Black Box Classroom for Your Team?
                </div>
                <div className="TFFSwhat">

                    <div className="TFFSwhat1 whatContainer">
                        <div className="whatHead gsb">
                            Easy Scheduling
                        </div>
                        <div className="whatSpan gl">
                            Connect with students from around the world. Black Box's extensive reach ensures that your teaching can make an impact on a global scale, expanding your influence and audience.
                        </div>

                    </div>


                    <div className="TFFSwhat2 whatContainer">
                        <div className="whatHead gsb">
                            Reminders & Notifications
                        </div>
                        <div className="whatSpan gl">
                            Our support team is here to assist you every step of the way. From setting up your profile to troubleshooting issues, Black Box offers full support to ensure your teaching experience is seamless.
                        </div>

                    </div>


                    <div className="TFFSwhat3 whatContainer">
                        <div className="whatHead gsb">
                        Scalability and Flexibility
                        </div>
                        <div className="whatSpan gl">
                        Whether you have a small team or a large organisation, Black Box Classroom scales effortlessly. As your team grows or your training needs evolve, the platform can easily accommodate new users, courses, and content without compromising performance.
                        </div>

                    </div>

                </div>
            </div>

            <div className="bannersForHomePage3334">
                                            <div className="theBanner">
                                                <div className="TBtext">
                                                    <div className="tllle fbfont">
                                                    First Week Free <br/>Host Seamlessly!
                                                    </div>
                                                </div>
                                                <div className="imgInClassBanner">
                                                    <img src={Ctrial} alt="" />
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
                        Subscribe and create your company profile
                        </div>
                        <div className="stepDescr">
                        Get started by signing up or registering with Black Box. It's a fast and simple process—create your account and build your company profile in just a few clicks!
                        </div>
                    </div>
                    <div className="TFFTstep1 TFFTstep ">
                        <div className="stepS gm">
                            STEP 2
                        </div>
                        <div className="stepName">
                        Schedule sessions
                        </div>
                        <div className="stepDescr">
                        Easily set up and schedule sessions or workshops at your convenience. Plan ahead, send invites, and manage all your team sessions seamlessly!
                        </div>
                    </div>
                    <div className="TFFTstep1 TFFTstep ">
                        <div className="stepS gm">
                            STEP 3
                        </div>
                        <div className="stepName">
                        Start your journey
                        </div>
                        <div className="stepDescr">
                        You're all set! Start collaborating, hosting, and making the most of Black Box to boost productivity and streamline communication within your team.
                        </div>
                    </div>
                    {/* <div className="TFFTstep1 TFFTstep ">
                        <div className="stepS gm">
                            STEP 4
                        </div>
                        <div className="stepName">
                        Begin Training
                        </div>
                        <div className="stepDescr">
                            Begin your teaching adventure. Engage with your students, deliver your lessons, and make a difference through education.
                        </div>

                    </div> */}

                </div>

            </div>

            <div className="TFFfourth gsb">

                <div className="TFFfourHead gb">
                    In case you have any questions...
                </div>
                <div className="TFFfourQuestion">
                    <div className="Q Q1">
                        <div className="QQ gsb">
                        What is Black Box Classroom?
                        </div>
                        <div className="QA gl">
                        Black Box Classroom is a powerful, cutting-edge live interaction platform designed to revolutionise team collaboration, learning, and productivity which makes it the ideal choice for your firm.
                        </div>
                    </div>

                    <div className="Q Q2">
                        <div className="QQ gsb">
                        How does Black Box Classroom support your firm?
                        </div>
                        <div className="QA gl">
                        Black Box delivers high-quality services such as combining meetings, collaboration, workshops, and project management in one platform. You cut down on the need for multiple subscriptions, making Black Box a cost-effective solution for teams of any size for your firm.
                        </div>
                    </div>

                    <div className="Q Q3">
                        <div className="QQ gsb">
                        What about your data safety on Black Box Classroom?
                        </div>
                        <div className="QA gl">
                        Black Box Classroom takes data security seriously, ensuring that all your team meetings and shared content are encrypted and safe from unauthorised access. You can trust that confidential discussions remain secure.
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
                <div className="Cffbannertitle gb">
                Transform Your Workplace with Black Box Classroom
                </div>

                <div className="d-flex w-100 align-items-center justify-content-center m-0 jannetisGold">
                    <Button variant="contained"
                        className="bgdark BTbanner"
                        onClick={netter}
                    >Subscribe Now</Button>

                    {/* <Button variant="contained"
                        className=" BTbanner jaosjdoasj "
                        onClick={goroo}
                        style={{
                            color: "black"
                        }}
                    >Teach a Course</Button> */}
                </div>
            </div>

            <div className="noticeClassroomToShare">
                <div className="nutokraate fmfont">
                Want to recommend Classroom to your company admin?
                </div>

                <div className="linkerLiked fmfont"
                    onClick={clickedOnShare}
                >
                    Share Link
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

            <Footer />
        </>
    );
}


export default ClassroomFlowFirst;