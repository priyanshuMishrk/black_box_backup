import React, { useState , useEffect} from "react";
import Footer from "../../Components/Common/Footer";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Logo from "../../blackbox-logo-01.png";
import PH from "../../Images/PHF.png"
const StartClass = () => {
  const [opc, setOpc] = useState(true)
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



  const baseURL = window.location.origin; 


    const {roomid} = useParams()
//     const container = document.querySelector('.myCallContainer');
// console.log('Container Width:', container.clientWidth); 
// console.log('Container Height:', container.clientHeight); 

    let myMeeting = async (element) => {

      // const check = ZegoUIKitPrebuilt._instance.localStream.getVideoTracks()
      const role = ZegoUIKitPrebuilt.Host;
        const appID = 1145153958;
      const serverSecret = "b4a5abb018a8a680858acdd6b1200119";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid,  randomID(5),name);

      const zp = await ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          config: {
            role,
          },
        },
        showRemoveUserButton : true,
        branding : {
          logoURL: Logo
        },
        showTurnOffRemoteCameraButton : true,
        showTurnOffRemoteMicrophoneButton : true,
        whiteboardConfig: {
          showAddImageButton: false, 
          showCreateAndCloseButton: true 
        },
        sharedLinks: [
            {
              name: 'CopyLink',
              url:
               window.location.protocol + '//' + 
               window.location.host + "/join/" +
                roomid,
            },
          ],
          onJoinRoom : troll
      });

    }

    return (<>
    <div className={`ojoomax ${opc ? "" : "dnone"}`}>

    <div className="firstDivAtJoinClass">
      <img src={Logo} alt="" />
    </div>
    <div className="secondDivAtJoinClass">
      <img src={PH} alt="" />
    </div>
    </div>



    <div className={opc ? "opc0":""}>
      <img src={PH} className="classMeet"/>
    </div>
    <div className={`myCallContainer gl ${opc ? "myCallContainer2" : ""}`}
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}></div>
    <Footer/>
    </>)
}

export default StartClass;