import React, { useEffect, useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { useNavigate } from "react-router-dom";
import clock from "../../Images/clock.svg"
import caledare from "../../Images/calendar-line.svg"
import flfontobe from "../../Images/globe.svg"
import sharena  from "../../Images/sharenare.png"
import lien1  from "../../Images/group-line.svg"
import lien2  from "../../Images/pencil-ruler-2-line.svg"

const PreviewClass = ({infoGetter, sect1 , sect2, sect3}) => {


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

    const name = localStorage.getItem("name");

    function formatDate(obj) {
        // Parse the date string into a Date object
        const dateObj = new Date(obj.date);
        // Get the day, month, and year
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const year = dateObj.getFullYear();
        // Format the date as desired
        const daySuffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
        return `${day}${daySuffix} ${month}, ${year}`;
    }
    
    function formatTime(obj) {
        // Parse the time string into a Date object
        const [hours, minutes] = obj.time.split(':').map(Number);
        const startTimeObj = new Date();
        startTimeObj.setHours(hours, minutes);
    
        // Calculate the end time by adding the duration
        const durationMinutes = Number(obj.duration);
        const endTimeObj = new Date(startTimeObj.getTime() + durationMinutes * 60000);
    
        // Format the start and end times as desired
        const formatTime = (dateObj) => {
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return `${formattedHours}:${formattedMinutes}${ampm}`;
        };
    
        return `${formatTime(startTimeObj)} - ${formatTime(endTimeObj)}`;
    }

    const [data,setData] = useState({})

    // useEffect(()=>{
    //     const title  = sect1.title
    //     const desc = infoGetter(1,"description")
    //     const desc = sect1
    //     const img = infoGetter(3,"img")
    //     setData({title , desc, img})
    //     console.log(data)
    // },[data])

    return (
        <>
    
            <div >
                <div className="CPr1 fsbfont">
                    This is how your class page will appear once it is launched
                </div>

                <div className="CPr2Banner ">
                    <div className="CPR2BInfo">
                        <div className="d-flex gap-2">
                        <div className="CPR2Tag fsbfont">Class</div>
                        <div className="CPR2Tag fsbfont">Writing</div>
                        </div>
                        <div className="CPR2Head fbfont">
                        {sect1.title}
                        </div>
                        <div className="CPR2Stars">
                            <span className="CPR2Starss">
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                                <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span>
                            </span>
                            <span>
                                4.2
                            </span>
                        </div>
                        <div className="CPR2Auth" >
                                <span className="geryCirc">

                                </span>
                                <span className="flfont">
                                    By
                                </span>
                                <span className="CPR2AuthName fmfont"> {name} </span>
                        </div>

                        <div className="CPR2AuthDesc fmfont" >
                            <span dangerouslySetInnerHTML={{ __html: sect1.description }}></span>
                                        
                        </div>

                        <div className="CPR2Timing">
                            <span className="CPR2TimingD">
                                <span className="ic">
                                    <img src={caledare} alt="" />
                                </span>
                                <span className="d fmfont">
                                { sect1.date.length > 0 && formatDate(sect1.date[0])}
                                </span>
                                <span className="a flfont">
                                View all dates
                                </span>
                            </span>
                            <span className="CPR2TimingT">
                                <span className="ic">
                                    <img src={clock} alt="" />
                                </span>
                                <span className="d fmfont">
                                { sect1.date.length > 0 && formatTime(sect1.date[0])}
                                </span>
                            </span>
                            <span className="CPR2Timinflfont">
                                <span className="ic">
                                    <img src={flfontobe} alt="" />
                                </span>
                                <span className="d fmfont">{sect1.languageOfClass}</span>
                            </span>

                        </div>

                        {/* <div className="CPR2Studs fmfont">
                        15  students, 4 seats left
                        </div> */}

                    </div>
                    <div className="CPR2BImage">
                        <div className="imgInCPR2B">
                            { sect3.img.length > 0 && <img src={sect3.img[0].url} alt="" />}
                        </div>
                        <div className="imgInformation">
                            <div className="informationInfo">
                            <div className="priceyyy fbfont">
                            ₹{sect2.price}
                            </div>
                            {/* <div className="slotsssss fmfont">
                            Slots filling in soon
                            </div> */}

                            </div>
                            <div>
                                <img src={sharena} alt="" />
                            </div>
                        </div>

                        <div>
                            <button className="buyNowInTabs fmfont">Buy Now</button>
                        </div>
                        <div className="addCartInTabs fmfont">
                            <button>Add to Cart</button>
                            <button>Gift a friend</button>
                        </div>
                    </div>
                </div>

                <div className="Claser mt-5">
                    <div>
                        <span className="headingForClassInfo fsbfont mx-4" >
                        Class Structure
                        </span>
                        <span className="VFDTitle fmfont" dangerouslySetInnerHTML={{ __html: sect1.classStructure }}>
                            
                        </span>
                    </div>


                    <div>
                    <div className="headingForClassInfo fsbfont mx-4" >
                            <img src={lien1} className="jjkolmn" alt="" />
                            Who is this class for?
                        </div>

                        <span className="VFDTitle  ljdojasy fmfont">
                        {/* Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer  */}
                       {sect1.studentsWho}
                        </span>
                    </div>

                    <div>
                    <div className="headingForClassInfo fsbfont mx-4 mt-5" >
                            <img src={lien2} className="jjkolmn" alt="" />
                            Participant Requirements
                        </div>

                        <span className="VFDTitle  ljdojasy fmfont">
                        {/* Lorem Ipsum is simly dummy text of the printing and typesetting industry. Lor Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer  */}
                        {sect1.requirements}
                        </span>
                    </div>

                    {/* <div>
                    
                    <div className="headingForClassInfo fsbfont mx-4 mb-4 mt-5" >
                            <img src={lien2} className="jjkolmn" alt="" />
                            After the class you will be able to
                        </div>
                        <span>
                            <ul  className="VFDTitle fmfont">
                                <li className="mb-3">
                                Navigate the Fifmfonta interface with confidence."
                                </li>
                                <li className="mb-3">
                                Create and manage design projects in Fifmfonta."
                                </li>
                                <li className="mb-3">
                                Use basic tools and features to create designs."
                                </li>

                                <li className="mb-3">
                                Collaborate with team members on Fifmfonta projects."
                                </li>

                                <li className="mb-3">
                                Apply learned skills to real-world design tasks
                                </li>
                            </ul>
                        </span>
                    </div> */}

                    <div>
                    <span className="headingForClassInfo fsbfont mx-4" >
                    About the Trainer
                        </span>

                    <div className="d-flex ljdojasy">
                        {propic &&<span>
                             <img src={propic} className="imgInPr55" alt="" />
                        </span>}
                        <div className="introInPr">
                        <span className="prName fsbfont">
                           {name}
                        </span>
                        <span className="VFDTitle fmfont">
                            
                            <span dangerouslySetInnerHTML={{ __html: sect1.trainerBio }}></span>
                        </span>

                        </div>
                        
                    </div>
                    </div>

                </div>

            </div>

        </>)
}

export default PreviewClass;