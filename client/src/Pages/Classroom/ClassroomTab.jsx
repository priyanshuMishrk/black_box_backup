/* eslint-disable no-undef */
import * as React from "react";
import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";
import ClassroomFormF from "./Step1";
import ClassroomFormS from "./Step2";

function ClassroomFlowSecond(props) {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
      


    const [currentSubm , setCS] = React.useState(0)

    function changeSubm(){
        setCS(1)
    }

    function changeSubmBack(){
        setCS(0)
    }

    const [ borderOn , setBorderOn ] = React.useState(0)
    const [seatCount , setSeatCount] = React.useState('')

    const handelSubmit = (id, callbackFunction) => {
        // Scroll to the element with the specified ID
        const newSeat = localStorage.getItem('moveNext')
        const seatsNeeded = JSON.parse(localStorage.getItem("classroomData"))
        setSeatCount(seatsNeeded.seats)

        if (newSeat !== 't'){
            alert('Please fill all the details')
            return
        }



        const element = document.getElementById('jaoasjoasjaojas');
        if (element) {
            const offset = window.innerHeight * 0.12; // 6vh in pixels
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          element.scrollIntoView({top: 23, behavior: 'smooth' });
          setTimeout(() => {
            setBorderOn(1)
          }, 300)
          // Call the callback function after scrolling
          setTimeout(() => {
            setCS(1)
          }, 1000); // Adjust the timeout based on the smooth scroll duration
        }
      };

    return (
        <>
            <Header />
                <div id="jaoasjoasjaojas">

                </div>
                <div className="indicatorCRT" id="indicatorCRT">

                    <div className={`stp1CRT frfont`}>
                        1
                        <span className="fsbfont">
                        CREATE ACCOUNT
                        </span>
                    </div>

                    <div className={`wayToCrt2`}>
                        <div className={`WTC2 ${borderOn === 1 && 'active'}`}>

                        </div>
                    </div>

                    <div className={`stp2CRT frfont ${currentSubm === 1 && 'selectedTab'}`}>
                        2
                        <span className="fsbfont">
                        CHOOSE PLAN
                        </span>
                    </div>

                </div>
                {
                    currentSubm === 0 && <ClassroomFormF />
                }

            {
                    currentSubm === 1 && <ClassroomFormS seatCount={seatCount}/>
                }

                <div className="SVPCLroom fsbfont" onClick={handelSubmit}>
                    Save and Proceed
                </div>
            <Footer />
        </>
    );
}


export default ClassroomFlowSecond;