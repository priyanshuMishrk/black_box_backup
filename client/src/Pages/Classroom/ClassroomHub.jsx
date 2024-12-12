import * as React from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";
import { ReactTyped } from "react-typed";
import whatsapp from '../../Images/whatsapp.svg'
import email from '../../Images/mail.svg'
import copyLink from '../../Images/copy.svg'
import Select from 'react-select';
import countryData from './country.json';
import baskLogo from '../../Images/BaskLogo.png'
import axios from "axios";
import { useState } from "react";
import star from '../../Images/star.svg'
import downIcon from '../../Images/Vector2.svg'

function ClassroomHub(props) {
    const [showDropDown, setShowDropDown] = useState(false)
    const clrToken = localStorage.getItem('tokenClr')
    const clrId = localStorage.getItem('clrId')

    React.useEffect(()=> {
        if (!clrToken){
            return nava('/signupClr')
        }
        if(!clrId){
            nava('/classroomv2/join')
        }
        // else if ()
    },[])


    const [currentTagSelected, setCurrentTagSelected] = useState('Most Relevant to you')
    const [selectedTag , setSekgn] = useState()
    const { goToTop, getCoursesList, courseList, user } =
        useContext(AuthContext);

    async function postPublic(value) {
        const result = await axios.get(`${BaseUrl}/searchQuery?tag=${value}`
        )
        const data = result.data
        // setCls(data.classes.concat(data.course))
        // setClassLength(data.classes)
        // setCourseLength(data.course)
    }

    async function getter() {
        const res = await axios.get(BaseUrl + `/classInfo/all`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            });

        const res2 = await axios.get(BaseUrl + `/courseInfo/all`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            });

        const d1 = res.data
        // setClassLength(filterObjects(d1))
        const d2 = res2.data
        // setCourseLength(filterObjects(d2))

        let d3 = d1.concat(...d2)
        d3 = d3

        // setCurrentClasses(res.data)
        if (user) {
            const check = user.email.split('@')
            if (check[1] === 'blackis.in') {
                // const d = filterObjects(d3)
                // setCls(d)
            }
            else {
                const dataArray = d3
                console.log(dataArray)
                const filteredArray = dataArray.filter(item => item.verified);
                // const d = filterObjects(filteredArray)
                // setCls(d)
            }
        }
        else {
            const dataArray = d3
            console.log(dataArray)
            const filteredArray = dataArray.filter(item => item.verified);
            // const d = filterObjects(filteredArray)
            // setCls(d)
        }
    }

    function show(bool) {
        setShowDropDown(bool)
    }

    function changeTag(tag) {
        setCurrentTagSelected(tag)
    }

    const [pdon, setPdon] = useState(false)
    const [format, setFormat] = useState(false)
    const [langOn, setLangon] = useState(false)

    const [checkboxes, setCheckboxes] = useState({
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes({
            ...checkboxes,
            [name]: checked,
        });
    };
    const nava = useNavigate()

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("tokenClr")
            ? localStorage.getItem("tokenClr")
            : null,
    );

    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [admin, setAdmin] = useState()
    const [imagg, setImage] = useState('')
    const [clid, setCLID] = useState()
    // const [dailyView , setDailyView] = useState()


    // function categorizeSessionsDaily(sessions) {
    //     const categorizedSessions = {
    //       morning: [],
    //       afternoon: [],
    //       evening: [],
    //     };
      
    //     sessions.forEach((session) => {
    //       session.date.forEach(({ time }) => {
    //         const [hour, minute] = time.split(":").map(Number);
      
    //         if (hour >= 5 && hour < 12) {
    //           // Morning (5:00 - 11:59)
    //           categorizedSessions.morning.push(session);
    //         } else if (hour >= 12 && hour < 17) {
    //           // Afternoon (12:00 - 16:59)
    //           categorizedSessions.afternoon.push(session);
    //         } else if (hour >= 17 && hour <= 23) {
    //           // Evening (17:00 - 23:59)
    //           categorizedSessions.evening.push(session);
    //         }
    //       });
    //     });
      
    //     // Remove any empty arrays
    //     Object.keys(categorizedSessions).forEach((key) => {
    //       if (categorizedSessions[key].length === 0) {
    //         delete categorizedSessions[key];
    //       }
    //     });
      
    //     return categorizedSessions;
    //   }

    function sendSessionInGrid(sess){
        console.log(sess)
        return <div className="sessionGridClr">
            {
                sess.length > 0 && sess.map((ele, index)=>{
                    return <div className="session cp" index={index} onClick={() => {
                        nava(`/classroomv2/session/${ele.id}`)
                    }}>
                    <div className="immmggg">
                        <img src={  ele.img[0].url} alt="" />
                    </div>
                    <div className="captionnn">
                        <div className="titttle fsbfont">
                            {ele.title}
                        </div>
                        <div className="authooorrr fmfont">
                        { ele.trainerBio}
                        </div>
                        <div className="classAndTime fmfont">
                            <div className="datyy">
                                { formatDate(ele.date[0].date)}
                            </div>
                            <div className="timeyy">
                            { convertTimeRange(ele.date[0].time,ele.date[0].duration)}
                            </div>
                        </div>
                    </div>
                </div>
                })
            }
        </div>
    }

    const [isAdmin , setIsAdmin] = useState(false)
    React.useEffect(() => {
        async function checkClassroom() {
            const mail = localStorage.getItem('emailClr')
            const url2 = `${BaseUrl}/register/classroom?mail=${mail}`
            const result2 = await axios.get(url2,
                {
                    headers: { Authorization: `Bearer ${clrToken}` },
                }
            )
            if (result2.data[0].admin){
                setIsAdmin(true)
            }
            // console.log(result2.data)
            setTitle(result2.data[0].title)
            setDescr(result2.data[0].bio)
            console.log(result2.data)
            // const uid = localStorage.getItem('User')
            // if (result2.data[0].adminId === parseInt(uid)) {
            //     setAdmin(true)
            // } else {
            //     setAdmin(false)
            // }
            setImage(result2.data[0].logo)
            setCLID(result2.data[0].id)
            // console.log(title)
        }
        checkClassroom()
    }, [])

    const [sessions, setSessions] = useState([])
    function createTrainerObject(response) {
        const trainerObject = {};
    
        response.forEach(session => {
            let name = session.trainerBio;
            let email = session.trainerMailId;
    
            // If the name already exists, add the class to the existing list (check for same email)
            if (trainerObject.hasOwnProperty(name)) {
                // If email matches, add the session to the array
                if (trainerObject[name].email === email) {
                    trainerObject[name].classes.push(session);
                } else {
                    // If email is different, create a unique key for this trainer with part of the emails
                    const uniqueKey = `${name}-${email.split('@')[0]}`;
                    if (!trainerObject[uniqueKey]) {
                        trainerObject[uniqueKey] = {
                            email: email,
                            classes: [session]
                        };
                    } else {
                        trainerObject[uniqueKey].classes.push(session);
                    }
                }
            } else {
                // If the name doesn't exist, create the entry with the session in the classes array
                trainerObject[name] = {
                    email: email,
                    classes: [session]
                };
            }
        });
    
        return trainerObject;
    }

    const [filteredAi, setFAI] = useState({})

    React.useEffect(() => {
        async function checkClassroom() {
            const url2 = `${BaseUrl}/classroom/sessionInfo/all?id=${clid}`
            const result2 = await axios.get(url2,
                {
                    headers: { Authorization: `Bearer ${clrToken}` },
                }
            )
            console.log(result2.data)
            setSessions(result2.data)
            setFAI(createTrainerObject(result2.data))
        }
        if (clid)
            checkClassroom()
    }, [clid])

    function formatDate(dateStr) {
        const date = new Date(dateStr);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const year = date.getFullYear();
        const month = months[date.getMonth()];

        // Function to add the ordinal suffix to the day
        function getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return 'th'; // covers 11-13
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        }

        return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
    }

    function convertTimeRange(startTime, duration) {
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const durationMinutes = parseInt(duration, 10);

        // Create a Date object for the start time
        let startDate = new Date();
        startDate.setHours(startHour, startMinute);

        // Create a Date object for the end time by adding the duration
        let endDate = new Date(startDate.getTime() + durationMinutes * 60000);

        // Function to convert 24-hour time to 12-hour format with AM/PM
        function formatTime(date) {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert to 12-hour format
            minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero if needed
            return `${hours}:${minutes} ${period}`;
        }

        const formattedStartTime = formatTime(startDate);
        const formattedEndTime = formatTime(endDate);

        return `${formattedStartTime} - ${formattedEndTime}`;
    }

    const [currentTri, setCurrentTri] = useState('')



    return (
        <>
            <Header />
            <div className="headOffer">
                {imagg && <img src={imagg} alt="logo" />}
                <div className="textoto fsbfont">
                    <div className="welcText fsbfont">
                        Welcome to {title && `${title} Space`} {!title && 'Classroom'},{isAdmin && `${title} Admin`}
                    </div>
                    <div className="Descrrrr fmfont">
                        {descr}
                    </div>
                </div>
                { isAdmin &&  <div className="buttonToHost fsbfont" onClick={() => {
                    nava('/classroomv2/hub/host')
                }}>
                    Host a session
                </div>}
            </div>

            {/* <div className="classesii">
            </div> */}

            {sessions.length === 0 && <div className="startScheduleCF  fmfont">
                <span>
                    No Sessions in your classroom!
                </span>
            </div>}

            {sessions.length > 0 && <div className="w-100">
            <div className="d-flex px-3 gap-5 mt-4 mb-4">
                                <div className="filters">

                                    <div className="FirstFilter">
                                        <span className="fsbfont">All Session</span>
                                    </div>

                                    {/* <div className="secondFiltet" onClick={() => show(!showDropDown)}>
                                        <div className="sf1">
                                            <span className="SFF1 frfont">
                                                Sort By
                                            </span>
                                            <span className="SFF2 fmfont">
                                                {currentTagSelected}
                                            </span>
                                        </div>

                                        <div className="sf2">
                                            <img src={downIcon} alt="" />
                                        </div>
                                    </div> */}

                                    <div className={`${showDropDown ? 'secondFilterDropper fmfont' : 'h000'}`}>
                                        <span onClick={() => {
                                            changeTag('Most Relevant to you')
                                            show(false)
                                        }
                                        } >
                                            Most Relevant to you
                                        </span>

                                        <span onClick={() => { changeTag('Newest'); show(false); }}>
                                            Newest
                                        </span>
                                    </div>


                                   

                                    <div className="thirdFilterGroup">
                                        <div className="headTFGG fmfont">
                                             Trainers
                                        </div>

                                        <div className="bodyTFGG frfont">

                                            {   
                                                Object.keys(filteredAi).map((ele,index) => {
                                                    return <span className={`bodyTFGGContent ${selectedTag === index && 'isfh'}`} 
                                                    onClick={
                                                        () => {
                                                            if (selectedTag === index){
                                                                setCurrentTri(null)
                                                                return setSekgn(null)
                                                            }
                                                            setCurrentTri(ele)
                                                            setSekgn(index)
                                                        }
                                                    }
                                                >
                                                    {ele.split('-')[0]}
                                                </span>
                                                })
                                            }

                                            {/* <span className={`bodyTFGGContent ${selectedTag === 1 && 'isfh'}`} 
                                                onClick={
                                                    () => {
                                                        postPublic('camera')
                                                        if (selectedTag === 1){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(1)
                                                    }
                                                }
                                            >
                                                Photography
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 2 && 'isfh'}`}
                                                onClick={
                                                    () => {
                                                        postPublic('art')
                                                        if (selectedTag === 2){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(2)
                                                    }
                                                }
                                            >
                                                Arts and crafts
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 3 && 'isfh'}`}
                                                onClick={
                                                    () => {
                                                        postPublic('chess')
                                                        if (selectedTag === 3){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(3)
                                                    }
                                                }
                                            >
                                                Chess
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 4 && 'isfh'}`} 
                                                onClick={
                                                    () => {
                                                        postPublic('dance')
                                                        if (selectedTag === 4){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(4)
                                                    }
                                                }
                                            >
                                                Music
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 5 && 'isfh'}`} 
                                                onClick={
                                                    () => {
                                                        postPublic('dance')
                                                        if (selectedTag === 5){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(5)
                                                    }
                                                }
                                            >
                                                Folk Dance
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 6 && 'isfh'}`} 
                                                    onClick={
                                                        () => {
                                                            postPublic('story')
                                                            if (selectedTag === 6){
                                                                getter()
                                                                return setSekgn(0)
                                                            }
                                                            setSekgn(6)
                                                        }
                                                    } 
                                            >
                                                Story
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 7 && 'isfh'}`}
                                                onClick={
                                                    () => {
                                                        postPublic('Embroidery')
                                                        if (selectedTag === 7){
                                                            postPublic('')
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(7)
                                                    }
                                                }
                                            >
                                                Embroidery
                                            </span> */}
                                        </div>
                                    </div>

                                    


                                    



                                </div>
                                {sessions.length !== 0 && !currentTri && 
                                    sendSessionInGrid(sessions)}
                                    {sessions.length !== 0 && currentTri && 
                                    sendSessionInGrid(filteredAi[currentTri].classes)}
                            </div>
            </div>}

            {/* <div className="session">
                <div className="immmggg">
                    <img src={ sessions.length > 0 && sessions[0].img[0].url || ''} alt="" />
                </div>
                <div className="captionnn">
                    <div className="titttle fsbfont">
                        { sessions.length > 0 && sessions[0].title}
                    </div>
                    <div className="authooorrr fmfont">
                    { sessions.length > 0 && sessions[0].trainerBio}
                    </div>
                    <div className="classAndTime fmfont">
                        <div className="datyy">
                            { sessions.length > 0 && formatDate(sessions[0].date[0].date)}
                        </div>
                        <dov className="timeyy">
                        { sessions.length > 0 && convertTimeRange(sessions[0].date[0].time,sessions[0].date[0].duration)}
                        </dov>
                    </div>
                </div>
            </div> */}
            <Footer />
        </>
    );
}


export default ClassroomHub;
