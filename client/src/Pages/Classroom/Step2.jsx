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
import { useState } from "react";
import axios from "axios";

function ClassroomFormS(props) {
    const checkClosestNumber = (numm) => {
        const targets = [100, 250, 500];
        let num = parseInt(numm)
        
        if (num > 100){
            if (num > 250){
                return 500
            }else{
                return 250
            }
        }else{
            return 100
        }
        // Find the closest target by comparing absolute differences
        // const closest = targets.reduce((prev, curr) => 
        //   Math.abs(num - curr) < Math.abs(num - prev) ? curr : prev
        // );
        
        // return closest;
      };
    
      const nava = useNavigate()

      const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("tokenClr")
          ? localStorage.getItem("tokenClr")
          : null,
      );

    
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };
    const [whichToShow, setWhichToShow] = useState()

    React.useEffect(()=>{
        const nn = checkClosestNumber(props.seatCount)
        if (nn === 100){
            setWhichToShow(2)
        }else if (nn === 250){
            setWhichToShow(3)
        }else if (nn === 500){
            setWhichToShow(1)
        }
    },[])

    const djjj = () => {
        return (<div className="boxesOfFee">
            <div className="Box1">
                <div className="monthB1 fsbfont">
                    Basic Plan
                </div>

                <div className="priceB1 fmfont">
                    Introductory Price: ₹299/month
                    {' '} {' '}
                    <del>₹1,499/month</del>
                </div>

                <div className="descrB1 frfont">
                    <span>
                        Basic Plan Includes 100 seats for your team to collaborate seamlessly
                    </span>
                    <span>
                        Basic Plan Includes  5,000 minutes for your team
                    </span>
                    <span>
                        You can upgrade your subscription at any time. The billing and features of upgraded plan will be applicable after current plan.
                    </span>
                </div>

                <div className="subscriberButton fsbfont" onClick={() => {
                    // displayRazorpay(299)
                    done()
                    // done()
                }}>
                    Subscribe Now
                </div>
            </div>

            <div className="Box1 saBox2">
                <div className="monthB1 fsbfont">
                    Enterprise Plan
                </div>

                <div className="priceB1 fmfont">
                    Introductory Price: ₹799/month
                    {' '} {' '}
                    <del>
                        ₹10,499/month
                    </del>
                </div>

                <div className="descrB1 frfont">
                    <span>
                        Basic Plan Includes 500 seats for your team to collaborate seamlessly
                    </span>
                    <span>
                        Basic Plan Includes  20,000 minutes for your team
                    </span>
                    <span>
                        You can change your subscription at any time. The billing and features of changed plan will be applicable after current plan.
                    </span>
                </div>

                <div className="subscriberButton fsbfont" onClick={() => {
                    displayRazorpay(799)
                }}>
                    Subscribe Now
                </div>
            </div>

            <div className="Box1">
                <div className="monthB1 fsbfont">
                    Standard Plan
                </div>

                <div className="priceB1 fmfont">
                    Introductory Price: ₹499/month {' '} {' '}
                    <del> ₹4,499/month</del>
                </div>

                <div className="descrB1 frfont">
                    <span>
                        Basic Plan Includes 250 seats for your team to collaborate seamlessly
                    </span>
                    <span>
                        Basic Plan Includes  10,000 minutes for your team
                    </span>
                    <span>
                        You can upgrade your subscription at any time. The billing and features of upgraded plan will be applicable after current plan.
                    </span>
                </div>

                <div className="subscriberButton fsbfont" onClick={() => {
                    displayRazorpay(499)
                }}>
                    Subscribe Now
                </div>
            </div>
        </div>)
    }

    const kjjj = () => {
        return (<div className="boxesOfFee">

<div className="Box1">
                <div className="monthB1 fsbfont">
                    Enterprise Plan
                </div>

                <div className="priceB1 fmfont">
                    Introductory Price: ₹799/month
                    {' '} {' '}
                    <del>
                        ₹10,499/month
                    </del>
                </div>

                <div className="descrB1 frfont">
                    <span>
                        Basic Plan Includes 500 seats for your team to collaborate seamlessly
                    </span>
                    <span>
                        Basic Plan Includes  20,000 minutes for your team
                    </span>
                    <span>
                        You can change your subscription at any time. The billing and features of changed plan will be applicable after current plan.
                    </span>
                </div>

                <div className="subscriberButton fsbfont" onClick={() => {
                    displayRazorpay(799)
                }}>
                    Subscribe Now
                </div>
            </div>

            <div className="Box1 saBox2">
                <div className="monthB1 fsbfont">
                    Basic Plan
                </div>

                <div className="priceB1 fmfont">
                    Introductory Price: ₹299/month
                    {' '} {' '}
                    <del>₹1,499/month</del>
                </div>

                <div className="descrB1 frfont">
                    <span>
                        Basic Plan Includes 100 seats for your team to collaborate seamlessly
                    </span>
                    <span>
                        Basic Plan Includes  5,000 minutes for your team
                    </span>
                    <span>
                        You can upgrade your subscription at any time. The billing and features of upgraded plan will be applicable after current plan.
                    </span>
                </div>

                <div className="subscriberButton fsbfont" onClick={() => {
                    // displayRazorpay(299)(
                    // console.log
                    done()
                }}>
                    Subscribe Now
                </div>
            </div>

            

            <div className="Box1">
                <div className="monthB1 fsbfont">
                    Standard Plan
                </div>

                <div className="priceB1 fmfont">
                    Introductory Price: ₹499/month {' '} {' '}
                    <del> ₹4,499/month</del>
                </div>

                <div className="descrB1 frfont">
                    <span>
                        Basic Plan Includes 250 seats for your team to collaborate seamlessly
                    </span>
                    <span>
                        Basic Plan Includes  10,000 minutes for your team
                    </span>
                    <span>
                        You can upgrade your subscription at any time. The billing and features of upgraded plan will be applicable after current plan.
                    </span>
                </div>

                <div className="subscriberButton fsbfont" onClick={() => {
                    displayRazorpay(499)
                }}>
                    Subscribe Now
                </div>
            </div>
        </div>)
    }

    const ljjj = () => {
        return (<div className="boxesOfFee">

<div className="Box1">
                <div className="monthB1 fsbfont">
                    Enterprise Plan
                </div>

                <div className="priceB1 fmfont">
                    Introductory Price: ₹799/month
                    {' '} {' '}
                    <del>
                        ₹10,499/month
                    </del>
                </div>

                <div className="descrB1 frfont">
                    <span>
                        Basic Plan Includes 500 seats for your team to collaborate seamlessly
                    </span>
                    <span>
                        Basic Plan Includes  20,000 minutes for your team
                    </span>
                    <span>
                        You can change your subscription at any time. The billing and features of changed plan will be applicable after current plan.
                    </span>
                </div>

                <div className="subscriberButton fsbfont" onClick={() => {
                    // displayRazorpay(799)
                }}>
                    Subscribe Now
                </div>
            </div>

            <div className="Box1 saBox2">
                <div className="monthB1 fsbfont">
                    Standard Plan
                </div>

                <div className="priceB1 fmfont">
                    Introductory Price: ₹499/month {' '} {' '}
                    <del> ₹4,499/month</del>
                </div>

                <div className="descrB1 frfont">
                    <span>
                        Basic Plan Includes 250 seats for your team to collaborate seamlessly
                    </span>
                    <span>
                        Basic Plan Includes  10,000 minutes for your team
                    </span>
                    <span>
                        You can upgrade your subscription at any time. The billing and features of upgraded plan will be applicable after current plan.
                    </span>
                </div>

                <div className="subscriberButton fsbfont" onClick={() => {
                    // displayRazorpay(499)
                }}>
                    Subscribe Now
                </div>
            </div>

            <div className="Box1">
                <div className="monthB1 fsbfont">
                    Basic Plan
                </div>

                <div className="priceB1 fmfont">
                    Introductory Price: ₹299/month
                    {' '} {' '}
                    <del>₹1,499/month</del>
                </div>

                <div className="descrB1 frfont">
                    <span>
                        Basic Plan Includes 100 seats for your team to collaborate seamlessly
                    </span>
                    <span>
                        Basic Plan Includes  5,000 minutes for your team
                    </span>
                    <span>
                        You can upgrade your subscription at any time. The billing and features of upgraded plan will be applicable after current plan.
                    </span>
                </div>

                <div className="subscriberButton fsbfont" onClick={() => {
                    displayRazorpay(299)
                    done()
                }}>
                    Subscribe Now
                </div>
            </div>

            

            
        </div>)
    }

    

    // const currentObjjjj = {
    //     bio,
    //     currentState,
    //     currentCity,
    //     organization,
    //     seats,
    //     industry,
    //     img,
    //     currPassword,
    // }

    const {
        bio,
        currentState,
        currentCity,
        organization,
        seats,
        industry,
        img,
        currPassword,
    } = JSON.parse(localStorage.getItem("classroomData"))

    const jodaa =  {
        title : organization,
        industry : industry,
        bio : bio,
        city : currentCity,
        state : currentState,
        logo : img,
        adminPass: currPassword
    }

    const displayRazorpay = async (price) => {

        const response = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js",
        );
        if (!response) {
            alert("You are offline");
            return;
        }

        const options = {
            key: "rzp_live_kjPr8fgOj2pb7t",
            currency: "INR",
            amount: price * 100,
            name: 'Classroom Subscription',
            description: "Paying your class fee ",
            // image: "https://blackbox.in/assets/images/logo.png",

            handler: async function (response) {
                done()
                setTimeout(() => {
                    alert("Payment Successful");
                }, 2000);
            },

            // prefill: {
            //     name: nameU,
            //     email: userMailId,
            //     contact: `${numberr.slice(-10)}`,
            // },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    async function done(){
        const data = jodaa
                const url = `${BaseUrl}/register/classroom`
                const mailT = localStorage.getItem('emailClr')
                data.email_type = mailT.split('@')[1]
                const result = await axios.post(url,data,
                    {
                        headers: { Authorization: `Bearer ${authTokens}` },
                      }
                )
                localStorage.setItem('clrId', result.data.id)
                nava('/classroomv2/hub')
                // console.log(result)
                // const url2 = `${BaseUrl}/register/classroom`
                // const result2 = await axios.get(url2,
                //     {
                //         headers: { Authorization: `Bearer ${authTokens}` },
                //       }
                // )
                // console.log(result2)

                
    }


    return (
        <>
            <div className="formForCLR1">
                <div className="titleMain fsbfont">
                    Choose between our plans
                </div>

                <div className="descrMain fsbfont">
                    The First week of Classroom will be free.
                    All plans start at 100 seats. You can upgrade for more seats later
                </div>
            </div>

            {/* <div className="boxesOfFee">
                <div className="Box1">
                    <div className="monthB1 fsbfont">
                        Basic Plan
                    </div>

                    <div className="priceB1 fmfont">
                        Introductory Price: ₹299/month
                        {' '} {' '}
                        <del>₹1,499/month</del>
                    </div>

                    <div className="descrB1 frfont">
                        <span>
                            Basic Plan Includes 100 seats for your team to collaborate seamlessly
                        </span>
                        <span>
                            Basic Plan Includes  5,000 minutes for your team
                        </span>
                        <span>
                            You can upgrade your subscription at any time. The billing and features of upgraded plan will be applicable after current plan.
                        </span>
                    </div>

                    <div className="subscriberButton fsbfont" onClick={() => {
                        // displayRazorpay(299)
                        done()
                    }}>
                        Subscribe Now
                    </div>
                </div>

                <div className="Box1 saBox2">
                    <div className="monthB1 fsbfont">
                        Enterprise Plan
                    </div>

                    <div className="priceB1 fmfont">
                        Introductory Price: ₹799/month
                        {' '} {' '}
                        <del>
                            ₹10,499/month
                        </del>
                    </div>

                    <div className="descrB1 frfont">
                        <span>
                            Basic Plan Includes 500 seats for your team to collaborate seamlessly
                        </span>
                        <span>
                            Basic Plan Includes  20,000 minutes for your team
                        </span>
                        <span>
                            You can change your subscription at any time. The billing and features of changed plan will be applicable after current plan.
                        </span>
                    </div>

                    <div className="subscriberButton fsbfont" onClick={() => {
                        displayRazorpay(799)
                    }}>
                        Subscribe Now
                    </div>
                </div>

                <div className="Box1">
                    <div className="monthB1 fsbfont">
                        Standard Plan
                    </div>

                    <div className="priceB1 fmfont">
                        Introductory Price: ₹499/month {' '} {' '}
                        <del> ₹4,499/month</del>
                    </div>

                    <div className="descrB1 frfont">
                        <span>
                            Basic Plan Includes 250 seats for your team to collaborate seamlessly
                        </span>
                        <span>
                            Basic Plan Includes  10,000 minutes for your team
                        </span>
                        <span>
                            You can upgrade your subscription at any time. The billing and features of upgraded plan will be applicable after current plan.
                        </span>
                    </div>

                    <div className="subscriberButton fsbfont" onClick={() => {
                        displayRazorpay(499)
                    }}>
                        Subscribe Now
                    </div>
                </div>
            </div> */}

            {
                whichToShow === 1 && djjj()
            }

{
                whichToShow === 2 && kjjj()
            }

{
                whichToShow === 3 && ljjj()
            }
        </>
    );
}


export default ClassroomFormS;
