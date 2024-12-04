import React, { useState } from 'react';
import { ReactComponent as Star } from '../../Images/star.svg';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import { useNavigate } from 'react-router-dom';

const ReviewClassCourse = () => {
    const name = localStorage.getItem("name");

    const [starSel , setStarSel] = useState(0)


    const [value , setValue] = useState('')

    const nav = useNavigate()

    function kkk(){
        if (value !== '' && starSel != 0){
            nav('/profile')
    }
    }

  return <> 
    <Header/>
        <div className="ratingForClasses">
                <div className="BannerForRFC fsbfont">
                Hey {name}, we hope you enjoyed the class. <br/>
                Please take few minutes to tell us how it was. 
                </div>

                <div className='rater'>
                    <div className="textyyyj frfont">
                    How would you rate your overall experience?
                    </div>

                    <div className="starsInthesky">
                        <Star className={`${starSel >= 1 && 'selectedStar'} cp stt`} onClick={() => setStarSel(1)}></Star>
                        <Star className={`${starSel >= 2 && 'selectedStar'} cp stt`} onClick={() => setStarSel(2)}></Star>
                        <Star className={`${starSel >= 3 && 'selectedStar'} cp stt`} onClick={() => setStarSel(3)}></Star>
                        <Star className={`${starSel >= 4 && 'selectedStar'} cp stt`} onClick={() => setStarSel(4)}></Star>
                        <Star className={`${starSel >= 5 && 'selectedStar'} cp stt`} onClick={() => setStarSel(5)}></Star>
                    </div>
                    <div className='starDescr'>
                            <div>
                            Very poor
                            </div>

                            <div>
                            Excellent
                            </div>
                    </div>

                    <div className="textBox">
                        <textarea name="review" value={value} onChange={
                            (e)=>{
                                setValue(e.target.value)
                            }

                        } className='fmfont' rows={6} cols={60} placeholder='Would you like to share specific feedback?' id="rev"></textarea>
                    </div>

                    <div className='buttons'>
                        <span className='frfont'
                            onClick={() => nav('/profile')}
                        >
                        Skip
                        </span>

                        <span className={`fmfont ${ value === '' || starSel === 0 && 'disable'}`}
                            onClick={kkk}
                        >
                        Submit
                        </span>
                    </div>
                </div>
        </div>
    <Footer/>
  </>;
};

export default ReviewClassCourse;