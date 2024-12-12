import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { BsSearch } from "react-icons/bs";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
// import Class1 from "../../Images/Classes/class2.jpg";
// import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "@mui/material/Button";
// import { BsCalendarDate } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import YtVid from "../../Pages/Classes/YtVid";
import AuthContext from "../../Context/AuthContext";
// import Splide from "./Splider";
// import axios from "axios";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Img from "../../Pages/Classes/Img";
import DefaultPic from "../../Images/classroomDefault.jpeg";
import View from "../../Pages/Classes/View";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import StyleContext from "../../Context/StyleContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Common/Loader";

const ClassroomJoinForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [clData, setClassroom] = useState();
    function addTime(timeString, minutesToAdd) {
        // 1. Split the time string into hours and minutes
        const [hours, minutes] = timeString.split(':').map(Number);
      
        // 2. Create a Date object 
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
      
        // 3. Add minutes
        date.setMinutes(date.getMinutes() + parseInt(minutesToAdd));
        console.log(date)
      
        // 4. Format as a time string
        const newHours = date.getHours().toString().padStart(2, '0');
        const newMinutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${newHours}:${newMinutes}`;
      }

    const {
        getClassroomById,
        user
    } = useContext(AuthContext);
    const { successToast, infoToast } = useContext(StyleContext);


    useEffect(() => {
        const fetchData = async (secure_urlid) => {
            const data = await getClassroomById(id)
            setClassroom(data)
        }
        fetchData(id)
    }, []);

    return (
        <>
            {clData ? <Container fluid className="m-0 p-0 ">
                <Header />
                <Container fluid className="white"></Container>

                <Container fluid className="p-0 m-0 bggrey" style={{
                    // paddingBottom : "3vw"
                }}>
                    <Container className="px-5 pt-2  d-flex justify-content-center">
                        <div className="text-center">
                            <h1 className="gx classtitle mt-3">
                                {/* {clData.title} */}
                                {clData ? clData.title : "Loading"}
                            </h1>
                            {/* <h5>Course Type: {course.duration_type}</h5> */}
                            <h5>
                                Format: Classroom
                            </h5>
                        </div>
                    </Container>
                    <Container className="position-relative">
                        <Row>
                            <Col md={4} xs={12}>
                                <Link to={`/trainer/${clData.creator_d.id}`}>
                                    <div className="  d-flex justify-content-center w-100 ">
                                        <img
                                            src={
                                                (typeof clData.creator_d.img_thumbnail === "object" &&
                                                    clData.creator_d
                                                        .img_thumbnail.secure_url) ||
                                                (typeof clData.creator_d
                                                    .img_thumbnail === "string" &&
                                                    clData.creator_d
                                                        .img_thumbnail) ||
                                                DefaultPic
                                            }
                                            alt="class1"
                                            className="img-fluid iconpic my-5 icon1"
                                        />
                                    </div>
                                </Link>

                                <Link to={`/trainer/${clData.creator_d
                                    .id}`}>
                                    <div className="d-flex justify-content-end w-100 ">
                                        <img
                                            src={
                                                clData.creator_d
                                                    .img_thumbnail
                                                    ? typeof clData.creator_d
                                                        .img_thumbnail ===
                                                        "string" &&
                                                        clData.creator_d
                                                            .img_thumbnail.includes("{")
                                                        ? JSON.parse(clData.creator_d
                                                            .img_thumbnail)
                                                            .secure_url
                                                        : clData.creator_d
                                                            .img_thumbnail
                                                    : DefaultPic
                                            }
                                            alt="class1"
                                            className="img-fluid iconpic icon2 "
                                        />
                                    </div>
                                </Link>
                            </Col>
                            <Col md={8} xs={12}>
                                <div className="hostdiv">
                                    <Link to={`/trainer/${clData.creator_d
                                        .id}`}>
                                        <h2 className=" text-dark gb">
                                            {clData.creator_d
                                                .first_name
                                                ? clData.creator_d
                                                    .first_name
                                                : "loading"}{" "}
                                            {clData.creator_d
                                                .last_name
                                                ? clData.creator_d
                                                    .last_name !== ""
                                                    ? clData.creator_d
                                                        .last_name
                                                    : "loading"
                                                : ""}
                                        </h2>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>

                <Container
                    fluid
                    className="p-0 m-0 bgw "

                >
                    <Container className="p-5 pt-0 position-relative mt-1">
                        <Row className="top-0">
                            <Col md={4}></Col>
                            <Col
                                md={8}
                                style={{
                                    height: "fitContent",
                                }}
                            >
                                <div className=" top-0 gsb">
                                    {clData.description
                                        ? clData.description
                                        : "Loading"}
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <Container className="  d-flex justify-content-center flex-column position-relative fc joincontainer">
                        <Row className="w-100">
                            <Col md={6} sm={12} className="mb-5 pb-5">
                                <div className=" py-4 px-5">
                                    <div className="d-flex">

                                        {(user &&
                                            user.id !== clData.creator &&
                                            !clData.completion) && <div>
                                                <Button className="bgdark rounded-3 border border-1 mt-3 llii"
                                                    onClick={() => {
                                                        navigate(`/class/join/${id}`);
                                                    }}
                                                    style={{
                                                        color: "yellow",
                                                        marginLeft : "30vw"
                                                    }}
                                                >
                                                    Join
                                                </Button>
                                            </div>}
                                        {(user &&
                                            user.id == clData.creator &&
                                            !clData.completion) && <div>
                                                <Button className="bgdark  rounded-3 border border-1 mt-3 llii"
                                                    onClick={() => {
                                                        navigate(`/class/host/${id}`);
                                                    }}
                                                    style={{
                                                        color: "yellow",
                                                        marginLeft : "30vw"
                                                    }}
                                                >
                                                    Host
                                                </Button>
                                            </div>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Footer />
            </Container> : <Loader />}

        </>
    );
};

export default ClassroomJoinForm;
