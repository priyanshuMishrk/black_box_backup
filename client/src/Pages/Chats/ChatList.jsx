import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";
import React, { useContext, useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { SocketContext } from "../../Context/SocketContext";
import defaultImage from "../../Images/defualtProPic.jpg"
import { set } from "react-hook-form";
import axios from "axios";
import { BaseUrl } from "../../Context/AuthContext";



const ChatsList = ({ newCon, clickedOnReq,clickedOnMessage }) => {
    const [currentChat, setCurrentChat] = useState(0);
    const [messages, setMessages] = useState([]);
    const [nameOfUser, setNameOfUser] = useState(localStorage.getItem("name"));
    
    const [search, setSearch] = useState("");
    const [newChat, setNewChat] = useState(false);
    const socket = useContext(SocketContext);
    const [listOfSenders, setListOS] = useState([])
    const [listOfChatroom, setListOC] = useState([])
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null,
);
const axiosInstance = axios.create({
    baseURL: `${BaseUrl}`, // Replace with your actual backend URL
    headers: {
      'Content-Type': 'application/json'
      // Add any other default headers if needed
    },
  });

  const getMessageRequests = async () => {
    try {
      const response = await axiosInstance.get('/message-requests', {
        headers: {
          Authorization: `Bearer ${authTokens}`, // Attach the token to the request header
        },
      });
      
      if (Array.isArray(response.data) && response.data.length > 0){
        return response.data;
      } else {
        return []
      }// This will contain the list of message requests with sender details
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error fetching message requests:', error);
      return null; // Or you can return an empty array or some other fallback value
    }
  };

  const [showRequest , setSR] = useState(false)
  const [messageRequests , setMR] = useState([])

  async function clickedOnReqss(bool){
        setSelectedMessageId(0)
        setSelectedRequestId(0)
    setSR(bool)
    const nokka = await getMessageRequests()
    setMR(nokka)
  }

  
  const getTimeDifference = (date) => {
      const now = new Date();
      const inputDate = new Date(date);
      const diffInMs = now - inputDate; // Difference in milliseconds
      const diffInSeconds = Math.floor(diffInMs / 1000); // Difference in seconds
      
      if (diffInSeconds < 10) {
          return "now";
        } else if (diffInSeconds < 60) {
            return "1 min";
        }
        
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} min`;
        }
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hr`;
        }
        
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
    };
    
    const truncateString = (str) => {
      if (!str) return ""; // Handle cases where the input is null or undefined
      return str.length > 6 ? `${str.substring(0, 6)}..` : str;
    };


    function handleCreateRoom(id) {
        newCon(id)
        setNewChat(false);
    }

    useEffect(() => {
        if (search !== '') {
            socket.emit('userSearch', search);

            socket.on('userResult', (data) => {
                console.log('Server response:', data);
                setListOS(data)
            });
        } else {
            setListOS([])
        }
    }, [search]);
    const userId = localStorage.getItem("User");

    useEffect(()=>{
        if (userId){
            socket.emit('userEnterChat', {seq : userId})
            socket.on('chatRooms', (data) => {
                console.log('Server response:', data);
                setListOC(data)
            });

        }
    },[])

    const [selectedRequestId, setSelectedRequestId] = useState(null); // State for selected request message
  const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected normal message

  // Function to handle click on a message request
  const handleRequestClick = (id) => {
    console.log(id)
    setSelectedRequestId(id); // Set the clicked request as selected
    setSelectedMessageId(null); // Deselect normal messages
    clickedOnReq(id)
  };

  // Function to handle click on a normal message
  const handleMessageClick = (id) => {
    setSelectedMessageId(id); // Set the clicked message as selected
    setSelectedRequestId(null); // Deselect request messages
    clickedOnMessage(id)
  };



    return (
        <>
            <div className="panel">
                <div className="nameDivOnTop">
                    <div className="nameOfMesseger fbfont">
                        {nameOfUser}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setNewChat(true)} className="newChatIcon cp" viewBox="0 0 24 24" fill="#495656f0">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.95 1.29 5.6 3.34 7.42V22l3.1-1.86c1.14.37 2.37.56 3.56.56 5.52 0 10-4.48 10-10S17.52 2 12 2zm1 13h-2v-2H9v-2h2V9h2v2h2v2h-2v2z" />
                    </svg>
                </div>
                
                {  !showRequest && <div className="titleDiv">
                    <div className="title fsbfont">
                        CHATS
                    </div>
                    <div className="messageRequestsMode cp" onClick={() => clickedOnReqss(true)}>
                        Requests
                    </div>
                </div>}

                {
                    showRequest && <div className="titleDiv">
                    <div className="title fsbfont">
                        REQUESTS
                    </div>
                    <div className="messageRequestsMode cp" onClick={() => clickedOnReqss(false)}>
                        Chats
                    </div>
                    </div>
                }

                <div className="messageColumnInCH">
                    {/* <div className="messageDiv selectedMessageDiv cp">
                        <div className="imageProfile">
                            <img src="https://baskworldwide.com/static/media/priyanshu.7a72261026eb62668ddb.png" alt="dp" />
                        </div>
                        <div className="textProfileMe">
                            <div className="nameProfile fsbfont">
                                Priyanshu Mishra
                            </div>
                            <div className="lastText fmfont">
                                <div className="sender">
                                    You  :
                                </div>

                                <div className="message">
                                    Hello
                                </div>

                                <div className="timing">
                                    . 39m
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="messageDiv cp">
                        <div className="imageProfile">
                            <img src="https://baskworldwide.com/static/media/priyanshu.7a72261026eb62668ddb.png" alt="dp" />
                        </div>
                        <div className="textProfileMe">
                            <div className="nameProfile fsbfont">
                                Priyanshu Mishra
                            </div>
                            <div className="lastText fmfont">
                                <div className="sender">
                                    You  :
                                </div>

                                <div className="message">
                                    Hello
                                </div>

                                <div className="timing">
                                    . 39m
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {
                        listOfChatroom.length > 0 && !showRequest ? 
                        listOfChatroom.map((item) => {
                            return <div className={`messageDiv cp ${
                                selectedMessageId === item.id ? "selectedMessageDiv" : ""
                              }`}
                              onClick={() => handleMessageClick(item.id)}

                              >
                            <div className="imageProfile">

                                <img  src={((!item?.profileUser?.img_thumbnail || item?.profileUser?.img_thumbnail === '') && defaultImage) || item?.profileUser?.img_thumbnail}
                                            onError={(e) => {
                                                console.log(e.target); // Log the image element to confirm
                                                e.target.src = defaultImage; // Set the fallback image directly
                                            }}
                                            alt="" />
                            </div>
                            <div className="textProfileMe">
                                <div className="nameProfile fsbfont">
                                    {item?.profileUser?.first_name} {' '} {item?.profileUser?.last_name}
                                </div>
                                <div className="lastText fmfont">
    
                                    <div className="message">
                                        {truncateString(item.last_message)}
                                    </div>
    
                                    <div className="timing">
                                        {/* . 39m */}
{                                        getTimeDifference(item.last_message_time)
}                                    </div>
                                </div>
                            </div>
                        </div>
                        }) : !showRequest && <div className="noChat fmfont">No Message</div>
                    }

                    {
                       Array.isArray(messageRequests) && messageRequests?.length > 0 && showRequest ? 
                        messageRequests.map((item) => {
                            return <div className={`messageDiv cp ${
                                selectedRequestId === item.id ? "selectedMessageDiv" : ""
                              }`}
                              onClick={() => handleRequestClick(item.id)}

                              >
                            <div className="imageProfile">

                                <img  src={((!item.sender.img_thumbnail || item.sender.img_thumbnail === '') && defaultImage) || item.sender.img_thumbnail}
                                            onError={(e) => {
                                                console.log(e.target); // Log the image element to confirm
                                                e.target.src = defaultImage; // Set the fallback image directly
                                            }}
                                            alt="" />
                            </div>
                            <div className="textProfileMe">
                                <div className="nameProfile fsbfont">
                                    {item.sender.first_name} {' '} {item.sender.last_name}
                                </div>
                                <div className="lastText fmfont">
    
                                    <div className="message">
                                        {truncateString(item.message)}
                                    </div>
    
                                    <div className="timing">
                                        {/* . 39m */}
{                                        getTimeDifference(item.timestamp)
}                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        
                        }) : showRequest && <div className="noChat fmfont">No Message</div>
                    }
                </div>
            </div>

            {newChat && <div className="aboluteNewMessageDiv">
                <div className="exitMessageNediv" onClick={() => {
                    setNewChat(false)
                    setListOS([])
                    setSearch('')
                }
                }>


                </div>

                <div className="newMessageDivListing">
                    <div className="titleOfAction fsbfont">
                        New Message
                    </div>
                    <div className="turnTheNameNewMess">
                        <div className="Text fsbfont">
                            To :
                        </div>

                        <div className="searchingName">
                            <input type="text" className="fsbfont" placeholder="Search with first name..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="newMessageCanSendOne">
                        {
                            listOfSenders.map((val, ind) => {
                                return <div className="peopleIdd cp" onClick={() => {
                                    handleCreateRoom(val.id)
                                }}>
                                    <div className="img">
                                        <img id="kollookkookoo2" src={((!val.img_thumbnail || val.img_thumbnail === '') && defaultImage) || val.img_thumbnail}
                                            onError={(e) => {
                                                console.log(e.target); // Log the image element to confirm
                                                e.target.src = defaultImage; // Set the fallback image directly
                                            }}
                                            alt="" />
                                    </div>
                                    <div className="namePep fmfont">
                                        {val.first_name}
                                        {' '}
                                        {val.last_name}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ChatsList;