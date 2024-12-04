import React, { useContext, useState, useEffect } from "react";
import { BaseUrl } from "../../Context/AuthContext";
import axios from "axios";
import EmojiPicker from './EmojitPicker';
import defaultImage from "../../Images/defualtProPic.jpg"
import StyleContext from "../../Context/StyleContext";
import socket from "../../socket";


const ChatScreen = ({chatId , reques , noChat, doneRes, viewingReq , viewingReqI}) => {
    const [chatExists, setChatExists] = useState(false);
    const [inputText, setInputText] = useState('');
    const { errorToast, successToast, infoToast } = useContext(StyleContext);

  const handleEmojiSelect = (emoji) => {
    setInputText(inputText + emoji); // Append the selected emoji to input
  };

    useEffect(()=>{
        if (chatId){
            setChatExists(true);
        }
    },[chatId])

    useEffect(()=>{
        if (chatId){
            setChatExists(true);
        }
    },[])

    const [name, setName] = useState('')
    const [propic, setPropic] = useState('')

    useEffect(()=>{
        if (reques){
            setChatExists(false)
            async function getPr() {
                let reqOptions = {
                    url: `${BaseUrl}/profileDetails/other?id=${reques}`,
                    method: "GET",
                }
    
                let response = await axios.request(reqOptions);
                console.log(response.data);
                let name = response.data.full_name
                setName(name)
                setPropic(response.data.img)
            }
            getPr()
        }
    })

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
          ? JSON.parse(localStorage.getItem("authTokens"))
          : null,
      );
    const handleSendMessage = async () => {
        if (inputText.trim() === '') {
          errorToast('Message cannot be empty.');
          return;
        }
    
        try {
          const response = await axios.post(
            `${BaseUrl}/message-request?receiverId=${reques}`, // API endpoint with query parameter
            { message: inputText }, // Message in the request body
            {
              headers: {
                Authorization: `Bearer ${authTokens}`, // Adding the token in the headers
              },
            }
          );
          console.log('Message request sent:', response.data);
          successToast('Message request sent successfully!');
          setInputText(''); // Clear the input field
          doneRes()
          
        } catch (error) {
          console.error('Error sending message request:', error.response?.data || error.message);
          errorToast(error.response?.data?.message || 'Failed to send message request.');
        }
      };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log(inputText)
          handleSendMessage();

        }
      };

      const axiosInstance = axios.create({
        baseURL: `${BaseUrl}`, // Replace with your actual backend URL
        headers: {
          'Content-Type': 'application/json'
          // Add any other default headers if needed
        },
      });

      const acceptMessageRequests = async (id) => {
        try {
          const response  = await axiosInstance.post('/create-chatroom', {
            messageRequestId : id
          })
          console.log(response)
          window.location.reload()
        } catch (er){
          console.log(er)
        }
      }

      const [currUser, setLSD] = useState(localStorage.getItem("User"));
    
      const getMessageRequests = async () => {
        try {
          const response = await axiosInstance.get('/message-requests', {
            headers: {
              Authorization: `Bearer ${authTokens}`, // Attach the token to the request header
            },
          });
      
          // Handle the successful response
          return response.data; // This will contain the list of message requests with sender details
        } catch (error) {
          // Handle any errors that occurred during the request
          console.error('Error fetching message requests:', error);
          return null; // Or you can return an empty array or some other fallback value
        }
      };

      const [viewingRequest , setRequestData] = useState()

      useEffect(()=> {
        console.log(viewingReq)
        if (viewingReq){
          getMessageRequests().then(res => {
            const jokkk = res.filter(ele => ele.id === viewingReqI)
            setRequestData(jokkk[0])
          })
          // const theObj = nukka.filter((val) => val.id === viewingReqI)
          // console.log(nukka)
        }
      })
      const [messageListOrg, setMLO] = useState([])
      useEffect(()=>{
        socket.emit('joinChat', {
          chatRoomId : chatId
        })

        socket.on('chatHistory',(data)=>{
          // console.log(data)
          setMLO(data)
        })
      })

      function sendAuserMessage( e) {
        if (e.key === 'Enter') {
          // console.log(inputText)
        // Emit the message to the server
        socket.emit('message', {
          chatRoomId: chatId,
          content: inputText,
          sender: currUser
        });}
      }


    
    return <>
        {
            noChat && 
            <div className="noMessageToD fsbfont">
                No Message to display
            </div>
        }


        {
            reques !== 0 && viewingReq === false &&
            <div className="RequestChatScreen">
                <div className="head">
                    <div className="imageOfRCS">

                        <img  src={((!propic || propic === '') && defaultImage) || propic}
                                            onError={(e) => {
                                                console.log(e.target); // Log the image element to confirm
                                                e.target.src = defaultImage; // Set the fallback image directly
                                            }}
                                            alt="" />
                    </div>
                    <div className="nameOfRCS fbfont">
                        {name}
                    </div>
                </div>

                <div className="messagesss">
                    <input type="text" placeholder="You can only send one message request to a user" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown}/>
                    {/* <EmojiPicker onEmojiSelect={handleEmojiSelect} /> */}
                </div>

            </div>
        }

        {
          viewingReq === true && 
          <div className="RequestChatScreen">
                <div className="head">
                    <div className="imageOfRCS">

                        <img  src={((!viewingRequest?.sender?.img_thumbnail || viewingRequest?.sender?.img_thumbnail === '') && defaultImage) || viewingRequest?.sender?.img_thumbnail}
                                            onError={(e) => {
                                                console.log(e.target); // Log the image element to confirm
                                                e.target.src = defaultImage; // Set the fallback image directly
                                            }}
                                            alt="" />
                    </div>
                    <div className="nameOfRCS fbfont">
                        {viewingRequest?.sender?.first_name} {' '} {viewingRequest?.sender?.last_name}
                    </div>
                </div>

                <div className="messageList">
                  <div className="receivedBubble">
                    {
                      viewingRequest?.message
                    }
                  </div>
                </div>
                 
                 <div className="acceptButton fmfont" onClick={ () => acceptMessageRequests(viewingRequest?.id)}>
                  Accept
                 </div>

                {/* <div className="messagesss">
                    <input type="text" placeholder="You can only send one message request to a user" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown}/>
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                </div> */}

            </div>
        }

{
          viewingReq === false && chatId && 
          <div className="RequestChatScreen">
                <div className="head">
                    <div className="imageOfRCS">

                        <img  src={((!viewingRequest?.sender?.img_thumbnail || viewingRequest?.sender?.img_thumbnail === '') && defaultImage) || viewingRequest?.sender?.img_thumbnail}
                                            onError={(e) => {
                                                console.log(e.target); // Log the image element to confirm
                                                e.target.src = defaultImage; // Set the fallback image directly
                                            }}
                                            alt="" />
                    </div>
                    <div className="nameOfRCS fbfont">
                        {viewingRequest?.sender?.first_name} {' '} {viewingRequest?.sender?.last_name}
                    </div>
                </div>

                <div className="messageList">

                  {
                    messageListOrg.map((message, index) => (
                      <div key={index} className={`${message.senderId === currUser ? 'sentBubble' : 'receivedBubble'}`}>
                        {message.content}
                      </div>
                    ))
                  }
                </div>
                 
                 {/* <div className="acceptButton fmfont" onClick={ () => acceptMessageRequests(viewingRequest?.id)}>
                  Accept
                 </div> */}

                <div className="messagesss">
                    <input type="text" placeholder="You can only send one message request to a user" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={sendAuserMessage}/>
                    {/* <EmojiPicker onEmojiSelect={handleEmojiSelect} /> */}
                </div>

            </div>
        }
    </>
}

export default ChatScreen;