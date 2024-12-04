import * as React from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";
import { ReactTyped } from "react-typed";
import whatsapp from '../../Images/whatsapp.svg'
import email from '../../Images/mail.svg'
import copyLink from '../../Images/copy.svg'
import Select from 'react-select';
import countryData from './country.json';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function ClassroomFormF(props) {
    const options = [
        { value: '5000', label: '5000' },
        { value: '10000', label: '10000' },
        { value: '20000', label: '20000' },
    ];
    
    
    React.useEffect(() => {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        const keys = Object.keys(countryData);
        const statess = []
        for (let i of keys) {
            console.log(i)
            const obj = {
                value: i,
                label: i
            }
            states.push(obj)
        }
        
        const newJsonData = countryData
        
        // Get the keys from the JSON
        setStates(states); // Store the keys in the state
        setCities(newJsonData); // Store the JSON data as an object in the state
    }, []);
    
    const [currentData, setCurrentData] = React.useState([])
    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState({});
    const [currentState, setCS] = React.useState('')
    const [currentCity, setCC] = React.useState('')
    const [organization , setOrganization] = React.useState('')
    const [seats , setSeats] = React.useState('')
    const [industry , setIndustry] = React.useState('')
    const [img , setImg] = React.useState('')
    const [currPassword, setCp] = useState('')
    const [confPassword, setCfp] = useState('')
    const [bio, setBio] = useState('')

    useEffect(() => {   

        if (currPassword !== '' && currPassword === confPassword && img !== '' && seats !== '' && industry !== '' && organization !== '' && currentCity !== '' && currentState !== '' && bio !== '' ){
            localStorage.setItem('moveNext' , 't')
            const currentObjjjj = {
                bio,
                currentState,
                currentCity,
                organization,
                seats,
                industry,
                img,
                currPassword,
            }

            localStorage.setItem("classroomData", JSON.stringify(currentObjjjj));
        }else {
            localStorage.setItem('moveNext' , 'f')
        }

    },[bio,currentState,currentCity, organization , seats , industry , img , currPassword , confPassword])

    


    async function changeTheImage(e){
        const url = `https://api.cloudinary.com/v1_1/black-box/image/upload`;
        const selectedFile = e.target.files[0];
        if (selectedFile.size > 500 * 1024) {
            alert('Image size should be less than 500kb')
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'i1m10bd7');

        const datas = await axios.post(url , formData)
        setImg(datas.data.secure_url)
    }

    function changeTheState(e) {
        setCS(e.value)
    }

    function changeTheCity(e) {
        setCC(e.value)
    }


    return (
        <>
            <div className="formForCLR1">
                <div className="titleMain fsbfont">
                    We need a few details to
                    complete your set up
                </div>

                <div className="descrMain fsbfont">
                    If you are the admin of your company , please fill out these details and proceed to subscribe to your Black box classroom
                </div>
                <div className="inputBoxesBox">
                    <input type="text" className="fmfont" onChange={(e) => {
                        setOrganization(e.target.value)
                    }} placeholder="Organization Name" />
                    <input type="text" className="fmfont" onChange={(e) => {
                        setSeats(e.target.value)
                    }} placeholder="How many seats do you need?" />
                    <input type="text" className="fmfont" onChange={(e) => {
                        setIndustry(e.target.value)
                    }} placeholder="Industry" />

                    {/* <Select
                        value={'ss'}
                        // onChange={this.handleChange}
                        options={options}
                        placeholder='How many seats do you need?'
                        className="fmfont"
                    /> */}

                    {/* <Select
                        value={'ss'}
                        // onChange={this.handleChange}
                        options={options}
                        placeholder='Industry'
                        className="fmfont"
                    /> */}

                    <div className="orgDescrrr">
                        <div className="titto fsbfont">
                            Organisation Description
                        </div>
                        <textarea className="fmfont" onChange={(e) => {
                            setBio(e.target.value)
                        }}/>
                    </div>

                    <div className="residenceitit">
                        <Select
                            value={`${currentState}`}
                            // onChange={this.handleChange}
                            onChange={changeTheState}
                            options={states}
                            placeholder={currentState === '' ? 'State' : currentState}
                            className="fmfont sellelelele"
                        />

                        <Select
                        value={'ss'}
                        onChange={changeTheCity}
                        options={cities[currentState]}
                        placeholder={currentCity === '' ? 'City' : currentCity}
                        className="fmfont"
                    />
                    </div>

                    <div className="orgDP">
                        <div className="hehhehe fsbfont">
                        Upload Organisation Logo
                        </div>

                        <div className="figmaBox">
                            {
                            img === '' &&
                            <div className="bigGreyBox">
                                <span className="heeeod  fmfont">
                                    +
                                </span>
                                <span className="typerrroororo fmfont">
                                    .png / .jpg
                                </span>
                                <input type="file" id="imageInput" onChange={changeTheImage} accept="image/*" />
                            </div>
                            }

                            {
                            img !== '' &&
                            <div className="bigGreyBox">
                                <img src={img} alt="" />
                                <input type="file" id="imageInput" onChange={changeTheImage} accept="image/*" />
                            </div>
                            }

                            <div className="textYouShouldSee fmfont">
                            *Only upload .jpg and .png files upto 500kb max 
                            </div>
                        </div>
                    </div>

                    <div className="linennnenenne">

                    </div>

                    <div className="adminAccountInfo">
                        <input type="text" placeholder="Create Password" onChange={(e) => {
                            setCp(e.target.value)
                        }} className="fmfont" />
                        <input type="text" placeholder="Confirm Password" onChange={(e) => {
                            setCfp(e.target.value)
                        }} className="fmfont" minlength="8" />
                    </div>
                    
                    {
                        currPassword !== '' && currPassword !== confPassword &&
                        <span className="errormessageCF fmfont">
                            Password Not Matching
                        </span>
                    }

                    {/* <div className="Nest">
                        Save And Proceed
                    </div> */}
                </div>
            </div>
        </>
    );
}


export default ClassroomFormF;