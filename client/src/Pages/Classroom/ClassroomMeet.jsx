import React, { useRef , useEffect, useState} from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Logo from "../../blackbox-logo-01.png";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import PH from "../../Images/PHF.png"
import axios from "axios";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";

const JoinSession = () => {
  const [opc, setOpc] = useState(true)
  const jj = useNavigate()
  const {clid} = useParams()
  const {roomid} = useParams()

  const [currentClass, setCurrentClass] = useState()

  function checkIfEventIsAboutToEnd(eventDate) {
    const eventStart = new Date(`${eventDate.date}T${eventDate.time}:00`); // Combine date and time
    const eventEnd = new Date(eventStart.getTime() + eventDate.duration * 60000); // Add duration in minutes

    const currentTime = new Date(); // Get the current time

    const timeDiff = eventEnd - currentTime; // Difference in milliseconds
    const minutesLeft = timeDiff / (1000 * 60); // Convert to minutes

    return minutesLeft <= 5; // Check if 5 or fewer minutes are left
    }

    

  useEffect(() => {
    async function getter() {
        const data = {
            roomid
        }
        console.log(data)
        const res = await axios.get(BaseUrl + `/classroomv2/sessionInfo?id=${roomid}`,
            {
                params: data,
                headers: { Authorization: `Bearer ${authTokens}` }
            });
        setCurrentClass(res.data[0])
        const bool = checkIfEventIsAboutToEnd(res.data[0].date[0])
        console.log(bool)
        if (!bool){
            jj('/profile')
        }
    }
    getter()
}, [])

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("tokenClr")
        ? JSON.parse(localStorage.getItem("tokenClr"))
        : null,
    );
    const [imguu, setImm]  = useState('')
    
    React.useEffect(() => {
        async function checkClassroom() {
            const url2 = `${BaseUrl}/register/classroom`
            const result2 = await axios.get(url2,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                }
            )
            setImm(result2.data[0].logo)
            
        }
        checkClassroom()
    }, [])

  function troll() {
    setOpc(false)
  }



  function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const [name , setName ] = useState(randomID(5))


  useEffect(() => {
    // Define the interval function
    const interval = setInterval(() => {
      // Get the input element by class name
      const inputElement = document.querySelector('.TYiiRFB3EhYJGVPE4k4q');
      
      // If the input element is found and its value is 'name', clear its value
      if (inputElement && inputElement.value === name) {
        inputElement.value = '';
        console.log(inputElement.value, "the valueeeee");
      }
    }, 500); // Repeat every half second

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [name]);




  const [shouldReload, setShouldReload] = useState(true);
    const role = ZegoUIKitPrebuilt.Audience;

    let myMeeting = async (element) => {
      console.log(345)
      const appID = 1145153958;
      const serverSecret = "b4a5abb018a8a680858acdd6b1200119";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid,  randomID(5), name);
      
      var zp = ZegoUIKitPrebuilt.create(kitToken);
    
      
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          config: {
            role,
          },
        },
        branding : {
          logoURL: Logo,
        },
        showUserList: true,
        sharedLinks: [
            {
              name: 'CopyLink',
              url:
               window.location.protocol + '//' + 
               window.location.host + window.location.pathname +
                '?roomID=' +
                roomid,
            },
          ],
          onJoinRoom : troll
      });
      
    }
    const myCallContainerRef = useRef(null);

    useEffect(() => {
        // Access the div element using the ref
        const element = myCallContainerRef.current;

        if (element) {
            myMeeting(element);
          }
    }, []);
    return (<>
        <div className={`ojoomax ${opc ? "" : "dnone"}`}>

<div className="firstDivAtJoinClass">
  <img src={Logo} alt="" />
</div>
<div className="secondDivAtJoinClass">
  <img src={imguu} alt="" />
</div>
</div>


    <div className={opc ? "opc0":""}>
      <img src={PH} className="classMeet"/>
    </div>
    <div className={`myCallContainer gl ${opc ? "myCallContainer2" : ""}`}
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}>
      </div>
    <Footer/>
    </>)
}

export default JoinSession;