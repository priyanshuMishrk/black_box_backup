import React, { useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Logo from "../../blackbox-logo-01.png";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';
import {BaseUrl} from "../../Context/AuthContext";

const Joins = () => {
  const {roomid} = useParams()
  const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    async function viewStream(){
      const res = await axios.patch(BaseUrl + `/stream-view?id=${roomid}`,
    {
      headers: { Authorization: `Bearer ${authTokens}` },
    });
    console.log(res.data)
    }

    async function leaveStream(){
      const res = await axios.patch(BaseUrl + `/stream-exit?id=${roomid}`,
    {
      headers: { Authorization: `Bearer ${authTokens}` },
    });
    console.log(res.data)
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
  
    const role = ZegoUIKitPrebuilt.Audience;

    let myMeeting = async (element) => {
      console.log(345)
      const appID = 1145153958;
      const serverSecret = "b4a5abb018a8a680858acdd6b1200119";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid,  randomID(5),  randomID(5));
      
      var zp = ZegoUIKitPrebuilt.create(kitToken);
    
      
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          config: {
            role,
          },
        },
        branding : {
          logoURL: Logo
        },
        onJoinRoom : viewStream,
        onLeaveRoom : leaveStream,
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
          ]
      });

    //   const intervalId = setInterval(async () => {
    //     const number = await fetchUserCount(roomid);
    //     console.log(number)
    //     // setAudienceCount(number)
    // }, 2000); // Update every 2 seconds

  //   zp.on('customCommandReceived', (roomID, user, command, content) => {
  //     if (command === 'audience_count') {
  //         setAudienceCount(content); // Update audience count for everyone
  //     }
  // });
    

    }
    return (<>
    <div className="myCallContainer gl"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}>
      </div>
    <Footer/>
    </>)
}

export default Joins;