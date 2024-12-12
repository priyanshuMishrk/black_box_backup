import React, { useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { useNavigate } from "react-router-dom";
import lien1 from "../../Images/group-line.svg"
import ChatIcon from "../../Images/chat.svg"
import friendsIcon from "../../Images/friends.svg"
import friendsMore from "../../Images/friendMore.svg"

const Friends = () => {
    const nava = useNavigate()

    const [clickedTab, setClickedTab] = useState(1)

    const [whichView, setWhichView] = useState(1)

    const [data, setData] = useState([
        {   
            id : 1,
            name: 'Arun Kumar',
            following: true,
            follower: true
        },
        {
            id : 2,
            name: 'Allison Stinson',
            following: true,
            follower: false
        },
        {
            id : 3,
            name: 'Henry Aldrin',
            following: false,
            follower: true
        },
        {
            id : 4,
            name: 'Peter Scherbatsky',
            following: true,
            follower: true
        },
        {
            id : 5,
            name: 'Marshal Eriksen',
            follower: false,
            following: true
        },
        {
            id : 6,
            name: 'Ted Mosby',
            following: true,
            follower: false
        },
        {
            id : 7,
            name: 'Arun Kumar',
            following: true,
            follower: true
        },
        {
            id : 8,
            name: 'Allison Stinson',
            following: true,
            follower: false
        },
        {
            id : 9,
            name: 'Henry Aldrin',
            following: false,
            follower: true
        },
        {
            id : 10,
            name: 'Peter Scherbatsky',
            following: true,
            follower: true
        },
        {
            id : 11,
            name: 'Marshal Eriksen',
            follower: false,
            following: true
        },
        {
            id : 12,
            name: 'Ted Mosby',
            following: true,
            follower: false
        }
    ])

    function followback(index){
        const newData = [...data]

        for (let i in newData){
            if (i.id === index){
                i.following = true
            }
        }

        setData(newData)
        console.log(data)
    }


    function dataGiveBack(data, categ) {
        if (categ === 1) {
            const newData = data.filter(item => item.follower)
            return (
                <div className="friendGrid">
                    {
                        newData.map((item, index) =>
                            <div className="friendGridI">
                                <div className="imgInFG">
                                </div>
                                <div className="nameAndOptionInFG">
                                    <span className="nameInFgi fmfont">
                                        {item.name}
                                    </span>
                                    <span>
                                        <img src={friendsMore} alt="" />
                                    </span>

                                </div>
                                { !item.following &&
                                    <div className="buttonForFollowBack cp fmfont" onClick={() => followback(item.id)}>
                                        Follow Back
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
            )

        } else if (categ === 2) {
            const newData = data.filter(item => item.following)
            return (
                <div className="friendGrid">
                    {
                        newData.map(item =>
                            <div className="friendGridI">
                                <div className="imgInFG">
                                </div>
                                <div className="nameAndOptionInFG">
                                    <span className="nameInFgi fmfont">
                                        {item.name}
                                    </span>
                                    <span>
                                        <img src={friendsMore} alt="" />
                                    </span>

                                </div>
                            </div>
                        )
                    }
                </div>
            )

        }
    }




    return (
        <>
            <Header />
            <div className="friend">
                <div className="sideStrollerHLIP">
                    <div className="chatIcon">
                        <img src={ChatIcon} alt="" />
                    </div>
                    <div className="friendIcon">
                        <img src={friendsIcon} alt="" />
                    </div>
                </div>

                <div className="tabInFriends fmfont">
                    <div className={`allF ${clickedTab === 1 && 'clickedOnAfriendTab'}`} onClick={() => {
                        setClickedTab(1)
                        setWhichView(1)
                    }}>
                        All Followers
                    </div>

                    <div className={`suggestionWasted ${clickedTab === 2 && 'clickedOnAfriendTab'}`} onClick={() => {
                        setClickedTab(2)
                        setWhichView(3)
                    }}>
                        Follow Requests
                    </div>

                    <div className={`suggestionWasted ${clickedTab === 3 && 'clickedOnAfriendTab'}`} onClick={() => {
                        setClickedTab(3)
                    }}>
                        Suggestions
                    </div>
                </div>

                {clickedTab === 1 &&
                    <div className="AFTIF">
                        <div className="headingOfAFTIF fmfont">
                            <div className={`HOAFTIF1 ${whichView === 1 && 'HOAFTIFS'}`}
                                onClick={() => {
                                    setWhichView(1)
                                }}
                            >
                                Followers
                            </div>

                            <div className={`HOAFTIF2 ${whichView === 2 && 'HOAFTIFS'}`}
                                onClick={() => {
                                    setWhichView(2)
                                }}
                            >
                                Following
                            </div>

                        </div>
                        <div className="instructionAFTIF frfont">
                            Sort by Date followed: Earliest to Latest
                        </div>
                        <div>
                            {dataGiveBack(data, whichView)}
                        </div>
                    </div>

                }

                {

                }

            </div>
        </>)
}

export default Friends;