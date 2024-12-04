import React, { useEffect, useState } from "react";
import Footer from "../../Components/Common/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Logo from "../../blackbox-logo-01.png";
import axios from 'axios';
import {BaseUrl} from "../../Context/AuthContext";
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
import { ZegoCDNPlayer } from "zego-express-web-cdn-player";
const Room = () => {
  const {roomid} = useParams()
  const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );
    const nava = useNavigate()
    async function startStream(){
      const res = await axios.patch(BaseUrl + `/start-stream?id=${roomid}`,
    {
      headers: { Authorization: `Bearer ${authTokens}` },
    });
    console.log(res.data)
    }

    async function stopStream(){
      const res = await axios.patch(BaseUrl + `/stop-stream?id=${roomid}`,
    {
      headers: { Authorization: `Bearer ${authTokens}` },
    });
    console.log(res.data)
    nava('/profile')
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

      // function jjjkkk(){
      //   const zg = new ZegoExpressEngine(1145153958, 'wss://webliveroom1145153958-api.coolzcloud.com/ws');
  
      //   //////////////////////// ZegoRTMP LINK
      //   zg.loginRoom(roomid, '04AAAAAGbJhasAEHRlZ3oycTF2YXhkemxhczMAoEC7dJh6DxPOBXo+Kt2sLgMLPFhqm4rtSuIT0QyblivwPsfUADOBaIOgPwAJU49zi7zKnQq0Wyq/qy1gSxG2pQOpB6kbz9cXufB3XrSTLEVn9RajHmuTfJL8rsRZijgOa68BLOaqaCIBZgPZE9HSQ5uMNYRviUr19yX/k3BrcZmAVS4FfT1sKPhHNXdbVrc2UjFy0AVvdribW2e4lwUqUwc=', {userID : '23', userName : 'Anshu', role: 'host'}, {userUpdate: true}).then((res) => {
      //     console.log(res)
      //     zg.createZegoStream().get.then((res) => {
      //       console.log(res)
      //     })
      //   })
  

      // }

      // useEffect(() => {
      //   jjjkkk()
      // }, [])
      
      
      

    //   if (flvjs.isSupported()) {
    //     //If flv.js is supported
    //     flvPlayer = flvjs.createPlayer({
    //         type:'flv',
    //         isLive: true,
    //         url: flvUrl,
    //         hasAudio: true,//Do you need audio
    //         hasVideo: true,//Do you need a video
    //     });
    //     flvPlayer.on(flvjs.Events.LOADING_COMPLETE, function () {
    //         console.error('LOADING_COMPLETE');
    //         flvPlayer.play();
    //     });
    //     flvPlayer.attachMediaElement(videoElement);
    //     flvPlayer.load();
    //     videoElement.muted = false;
    //     videoElement.controls = true;
    // }

    let myMeeting = async (element) => {


      const role = ZegoUIKitPrebuilt.Host;
        const appID = 1145153958;
      const serverSecret = "b4a5abb018a8a680858acdd6b1200119";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid,  randomID(5),  randomID(5));

      const zp = ZegoUIKitPrebuilt.create(kitToken);

    //   const result = await zg.loginRoom(roomid, '04AAAAAGbJhasAEHRlZ3oycTF2YXhkemxhczMAoEC7dJh6DxPOBXo+Kt2sLgMLPFhqm4rtSuIT0QyblivwPsfUADOBaIOgPwAJU49zi7zKnQq0Wyq/qy1gSxG2pQOpB6kbz9cXufB3XrSTLEVn9RajHmuTfJL8rsRZijgOa68BLOaqaCIBZgPZE9HSQ5uMNYRviUr19yX/k3BrcZmAVS4FfT1sKPhHNXdbVrc2UjFy0AVvdribW2e4lwUqUwc=', {userID : '23', userName : 'Anshu', role: 'host'}, {userUpdate: true});
    //   console.log(result, '\n\n jonas')
    //   const localStream = (await zg.createZegoStream());
    //   console.log( localStream , '\n\n\n\n hello')
    //   // zg.startPlayingStream(roomid)
    //   zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
    //     if (updateType == 'ADD') {
    //         // New stream added.
    //         for (var i = 0; i < streamList.length; i++) {
    //             console.log('room',roomID,'New stream added:', streamList[i])
    //             // $(".remoteVideo").append(
    //             //   $(
    //             //     `<video id=${streamList[i].streamID} autoplay muted playsinline con        trols></video>`
    //             //   )
    //             // );
    //             // const video = $(".remoteVideo video:last")[0];
    //             // const playOption = {
    //             //     CDNVideo: video,
    //             //     CDNPlayer: new ZegoCDNPlayer(),
    //             //     resourceMode: 1, // CDN
    //             // };    
    //             // There is a streamID for the corresponding stream in the streamList.
    //             // zg.startPlayingStream(streamID, playOption);
    //         }
    //         // const message = "streamID of the video stream of other users.: " + streamID.toString();
    //     } else if (updateType == 'DELETE') {
    //         // Stream deleted.
    //         for (var i = 0; i < streamList.length; i++) {
    //             console.log('room',roomID,'Stream deleted:', streamList)
    //             // There is a streamID for the corresponding stream in the streamList.
    //             // zg.stopPlayingStream(streamID);
    //         }
    //     }
    // });
      //   const k = zg.startPublishingStream(roomid,localStream)
      //   const jjjk = await  zg.updatePublishingStream(localStream)
      //   // startPlayingStream
      //   zg.addPublishCdnUrl('12', 'arn:aws:cloudfront::533267353728:distribution/EJFCVHSY2H203')
      // const nio = (await zg.createStream(localStream)).getVideoTracks()

      
      // const localStream = await this.zg.createZegoStream();
      // console.log(localStream, '/n/n\n\n\n\n\n hello')

       zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          config: {
            role
          },
        },
        onJoinRoom: startStream,
        onLeaveRoom : stopStream,
        showRemoveUserButton : true,
        branding : {
          logoURL: Logo
        },
        sharedLinks: [
            {
              name: 'CopyLink',
              url:
               window.location.protocol + '//' + 
               window.location.host + "/join/" +
                roomid,
            },
          ]
      });

    }

    return (<>
    <div className="myCallContainer gl"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}></div>
    <Footer/>
    </>)
}

export default Room;