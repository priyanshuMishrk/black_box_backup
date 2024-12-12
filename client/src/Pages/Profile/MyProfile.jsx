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
import editProfile from "../../Images/Editprofile.svg"
import myclass from "../../Images/myclass.svg"

function MyProfile(props) {

    return (
        <>
            <Header />

            <div>
                <div className="sideStrollerMp">
                        <div className="SSMP SSMP1">
                                <img src={editProfile} alt="" />
                                <span>
                                    My Profile
                                </span>
                        </div>

                        <div className="SSMP SSMP2">
                                <img src={myclass} />
                                <span>
                                    My Classes
                                </span>
                        </div>

                        <div className="SSMP SSMP3">
                                <img src="" alt="" />
                                <span>
                                    My Activity
                                </span>
                        </div>

                        <div className="SSMP SSMP4">

                        </div>

                        <div className="SSMP SSMP5">

                        </div>

                </div>
            </div>
        </>
    );
}


export default MyProfile;