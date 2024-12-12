import React from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";

const Streaming = () => {
    return (<>
    <Header/>
    <ImageSlider classname="mt-5"/>
        <div className="StreamData gl">
            No Stream Data to show yet
        </div>
    <Footer/>
    </>)
}

export default Streaming;