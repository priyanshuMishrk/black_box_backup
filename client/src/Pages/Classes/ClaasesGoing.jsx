import React, { useState } from 'react';
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ClassImg from "../../Images/liveclass.png"
import Rating from "../../Utils/Rating";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded"

const client = ZoomMtgEmbedded.createClient()

let meetingSDKElement = document.getElementById('meetingSDKElement')

const ClassesOnGoing = () => {

    return (<>
    <Header/>
    <Footer/>
    </>)
}

export default ClassesOnGoing;