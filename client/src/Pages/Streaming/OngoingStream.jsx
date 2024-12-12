import React, { useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { useNavigate } from "react-router-dom";

const Streaming = () => {
    const [roomId , setRoomID] = useState()
    const Navigate = useNavigate()
    const handleJoin = () => {
        Navigate(`/room/${roomId}`) 
    }
    return (<>
        <div>
            <input type="text" placeholder="enter room id"  value={roomId} onChange={ e => setRoomID(e.target.value)} />
            <button onClick={handleJoin}> Join </button>
        </div>
    {/* <Footer/> */}
    </>)
}

export default Streaming;