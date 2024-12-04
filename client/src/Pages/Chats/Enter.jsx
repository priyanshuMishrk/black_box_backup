import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";
import React, { useContext, useState, useEffect } from "react";
import ChatsList from "./ChatList";
import ChatScreen from "./ChatScreen";


const ChatsOn = () => {
    const [currentChat, setCurrentChat] = useState(0);
    const [messages, setMessages] = useState([]);
    const [chatroomId, setChatroomId] = useState();
    const [createRoom, setCreateRoom] = useState(false);
    const [requestId , setRequestId] = useState(0);
    const [noChat , setNoChat] = useState(true);


    function handleCreateRoom(id) {
        setCreateRoom(true);
        setChatroomId(0);
        setRequestId(id);
        setNoChat(false);
    }

    function sentRequest(){
        setCreateRoom(false);
        setChatroomId(0);
        setRequestId(0);
        setNoChat(true);
    }

    const [viewingReq, setVR] = useState(false)
    const [viewingReqI , setVRI] = useState(0)

    function clickedOnReq(id){
        setCreateRoom(false);
        setChatroomId(0);
        setRequestId(id);
        setVR(true)
        setVRI(id)
        setNoChat(false)
    }

    function clickedOnMessage(id){
        setCreateRoom(false);
        setChatroomId(id);
        setRequestId(0);
        setVR(false)
        setVRI(0)
        setNoChat(false)
    }
    


    return (
        <>
        <Header />
        <div className="messageHub">
            <ChatsList newCon={handleCreateRoom} clickedOnReq={clickedOnReq} clickedOnMessage={clickedOnMessage}/>
            <ChatScreen chatId={chatroomId} reques={requestId} noChat={noChat} doneRes={sentRequest} viewingReq={viewingReq} viewingReqI={viewingReqI}/>

        </div>

        <Footer/>
        </>
    )
}

export default ChatsOn;