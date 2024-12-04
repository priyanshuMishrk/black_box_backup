import React, { useContext, useEffect, useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import axios from "axios";
import downIcon from '../../Images/Vector2.svg'
import { useNavigate } from "react-router-dom";
import star from '../../Images/star.svg'
import PublicPostModule from "../Home/PublicPostModule";
import dep from '../../Images/defualtProPic.jpg'

const SearchPage = () => {
    const nav = useNavigate()
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default action (e.g., form submission)
          postPublic()
        }
      };
    const {
        user, value, setValue
    } = useContext(AuthContext);

    const [classes, setClasses] = useState([])
    const [posts, setPosts] = useState([])
    const [profile, setProfile] = useState([])

    async function postPublic() {
        const result = await axios.get(`${BaseUrl}/searchQuery?tag=${value}`
        )
        const data = result.data
        setClasses(data.classes.concat(data.course))
        setPosts(data.publicPost)
        setProfile(data.profile)
    }

    useEffect(() => {
        async function postPublic() {
            const result = await axios.get(`${BaseUrl}/searchQuery?tag=${value}`
            )
            const data = result.data
            setClasses(data.classes.concat(data.course))
            setPosts(data.publicPost)
            setProfile(data.profile)
        }
        postPublic()
    }, [])

    const [showDropDown, setShowDropDown] = useState(false)
    const [currentTagSelected, setCurrentTagSelected] = useState('Most Relevant to you')

    function show(bool) {
        setShowDropDown(bool)
    }

    function changeTag(tag) {
        setCurrentTagSelected(tag)
    }

    const [pdon, setPdon] = useState(false)
    const [format, setFormat] = useState(false)
    const [langOn, setLangon] = useState(false)

    const truncateString = (str, num = 30) => {
        if (str.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    function processClassData(classData) {
        // Check if classStructure is a string or array
        let classStructureCheck = Array.isArray(classData.classStructure);

        // Calculate total duration of classes in minutes
        let totalDuration = classData.date.reduce((acc, curr) => {
            return acc + parseInt(curr.duration);
        }, 0);

        // Convert total duration to hours with decimal points for minutes
        let totalHours = totalDuration / 60;
        let durationString = '';

        // Check if totalHours has a decimal part
        if (totalHours % 1 === 0) {
            durationString = `${totalHours} hr${totalHours > 1 ? 's' : ''}`;
        } else {
            totalHours = totalHours.toFixed(1);
            durationString = `${totalHours} hr${totalHours > 1 ? 's' : ''}`;
        }

        // If classStructure is a string
        if (!classStructureCheck) {
            return durationString;
        } else {
            // If classStructure is an array
            return `${classData.date.length} sessions`;
        }
    }

    const navigate = useNavigate();

    const [isHovered, setIsHovered] = useState(0);

    const renderClass = (cls, index) => {
        const a = cls.img && cls.img.length > 0 ? cls.img[0].url : "";
        if (a=== ''){
            return
        }

        return (
            <div
                onClick={() => navigate(`${cls.date.length > 1 ? `/courseV2/${cls.id}` : `/classV2/${cls.id}`}`)}
                className="ClassGridBox cp"
            >
                <div className="">
                    <img src="" alt="" />
                    <img src={cls.img[0].url} alt="" className="imgClassGrid" />
                </div>
                <div className='LCLDecr'>
                    <div className='TitlePri gb'>
                        <span className='LCLTitle'>
                            {truncateString(cls.title)}
                        </span>
                        <span className='LCLPrice'>
                            ₹{cls.price}
                        </span>
                    </div>
                    <div className='LCLNameRate gm'>
                        <span className='LCLName'>
                            {cls.user.first_name} {' '}
                            {cls.user.last_name.split('')[0]}.
                        </span>
                        <span className='LCLRateTime'>
                            <span className='LCLRate'>
                                <img src={star} alt="" />
                                4.2
                            </span>
                            <span className='LCLTime'>
                                {processClassData(cls)}
                            </span>
                        </span>
                    </div>
                </div>

                {isHovered === index + 1 && <div className={`awesomePopup ${(index + 1) % 3 === 0 && 'jodjddojdodjdojdojdojdodj'}`}>
                    <div className={`triangle ${(index + 1) % 3 === 0 && 'righhhhh'}`}></div>
                    <div className="apTitle gb">
                        {cls.title}
                    </div>
                    <div className="aptimeLan gm">
                        <div className="mkmk">
                            {processClassData(cls)}
                        </div>
                        <div>
                            {cls.languageOfClass}
                        </div>
                    </div>
                    <div className="apDescre frfont" dangerouslySetInnerHTML={{ __html: cls.description }}>

                    </div>
                    <div className="apcta frfont">
                        <span>
                            Add to Cart
                        </span>
                    </div>
                </div>}
            </div>
        );
    };

    const [checkboxes, setCheckboxes] = useState({
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes({
            ...checkboxes,
            [name]: checked,
        });
    };

    const [formatSelected, setformatSelected] = useState(0)
    const nava = useNavigate()

    return (
        <>
            <Header />

            <div className="searchPageForuser">
                <div className="seracher">
                    <input type="text" className="frfont" value={value} onChange={(e) => {
                        setValue(e.target.value)
                    }} onKeyDownCapture={handleKeyDown} />
                </div>

                <div className="resulterWithf">

                    <div className="filters">

                        <div className="secondFiltet" onClick={() => show(!showDropDown)}>
                            <div className="sf1">
                                <span className="SFF1 frfont">
                                    Sort By
                                </span>
                                <span className="SFF2 fmfont">
                                    {currentTagSelected}
                                </span>
                            </div>

                            <div className="sf2">
                                <img src={downIcon} alt="" />
                            </div>
                        </div>

                        <div className={`${showDropDown ? 'secondFilterDropper fmfont' : 'h000'}`}>
                            <span onClick={() => {
                                changeTag('Most Relevant to you')
                                show(false)
                            }
                            } >
                                Most Relevant to you
                            </span>

                            <span onClick={() => { changeTag('Newest'); show(false); }}>
                                Newest
                            </span>
                        </div>




                        <div className="fourthFilterGroup">
                            <div className="headTFGG fmfont cuzNeedCls cp" onClick={() => {
                                setFormat(!format)
                            }}>
                                <span>
                                    Category
                                </span>

                                <img src={downIcon} style={{
                                    transition: 'all 0.3s ease-in-out'
                                }} className={`${format && 'opened'}`} alt="" />
                            </div>

                            {
                                format && (
                                    <div>
                                        <div>
                                            <label className="checkBoxAtLearn frfont">
                                                <input
                                                    // checked={isChecked}
                                                    // onChange={handleCheckboxChange}
                                                    type="checkbox"
                                                    name="checkbox6"
                                                    checked={formatSelected === 1}
                                                    onChange={() => {
                                                        setformatSelected((prv) => {
                                                            if (prv === 1) {
                                                                return 0
                                                            } else {
                                                                return 1
                                                            }
                                                        })
                                                    }}
                                                />
                                                Class / Course ({classes.length})
                                            </label>
                                        </div>
                                        <div>
                                            <label className="checkBoxAtLearn frfont">
                                                <input
                                                    // checked={isChecked}
                                                    // onChange={handleCheckboxChange}
                                                    type="checkbox"
                                                    name="checkbox5"
                                                    checked={formatSelected === 2}
                                                    onChange={() => {
                                                        setformatSelected((prv) => {
                                                            if (prv === 2) {
                                                                return 0
                                                            } else {
                                                                return 2
                                                            }
                                                        })
                                                    }}
                                                />
                                                People ({profile.length})
                                            </label>
                                        </div>

                                        <div>
                                            <label className="checkBoxAtLearn frfont">
                                                <input
                                                    // checked={isChecked}
                                                    // onChange={handleCheckboxChange}
                                                    type="checkbox"
                                                    name="checkbox5"
                                                    checked={formatSelected === 3}
                                                    onChange={() => {
                                                        setformatSelected((prv) => {
                                                            if (prv === 3) {
                                                                return 0
                                                            } else {
                                                                return 3
                                                            }
                                                        })
                                                    }}
                                                />
                                                Posts ({posts.length})
                                            </label>
                                        </div>
                                    </div>
                                )
                            }
                        </div>



                    </div>

                    <div className="Result">
                        {
                            formatSelected === 0 && (
                                <div className="allResult">
                                    <div className="profilerrr">
                                        <div className="head fsbfont">
                                            Profiles that match this search
                                        </div>
                                        <div className="listt fmfont">
                                            {profile.length > 0 ? profile.map((ele, index) => (
                                                <div key={index} className="profileItem cp"
                                                    onClick={() => nava(`/otherProfile/${ele.id}`)}
                                                >
                                                    <div className="imgggg">
                                                        <img src={ele.img === '' || !ele.img ? dep : ele.img} alt="Profile" />
                                                    </div>
                                                    <div className="nameeeee fmfont">
                                                        {ele.full_name}
                                                    </div>
                                                </div>
                                            )) : "No profiles found"}
                                        </div>
                                    </div>

                                    <div className="classerrr">
                                        <div className="head fsbfont">
                                            Classes and Courses
                                        </div>

                                        <div className="gridderForCourse fmfont">
                                            {
                                               classes.length > 0 ? classes.map((ele, index) => {
                                                    return renderClass(ele, index)
                                                }) : "No classes found"
                                            }
                                        </div>
                                    </div>


                                    <div className="posterrr">
                                        <div className="head fsbfont">
                                            Posts
                                        </div>

                                        <div className={`postsShouldBeCetn fmfont ${posts.length === 0 && 'psdppsdp'}`}>
                                            {   posts.length > 0 ?
                                                posts.map((ele, index) => {
                                                    return (<PublicPostModule index={index} data={ele} />)
                                                }) : "No posts found"

                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            formatSelected === 2 && (
                                <div className="allResult">
                                    <div className="profilerrr">
                                        <div className="listt">
                                            {profile.map((ele, index) => (
                                                <div key={index} className="profileItem cp"
                                                    onClick={() => nava(`/otherProfile/${ele.id}`)}
                                                >
                                                    <div className="imgggg">
                                                        <img src={ele.img} alt="Profile" />
                                                    </div>
                                                    <div className="nameeeee fmfont">
                                                        {ele.full_name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                        {
                            formatSelected === 1 && (
                                <div className="allResult">
                                    <div className="classerrr">
                                        

                                        <div className="gridderForCourse">
                                            {
                                                classes.map((ele, index) => {
                                                    return renderClass(ele, index)
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }

{
                            formatSelected === 3 && (
                                <div className="allResult">
                                    <div className="posterrr">
                                        <div className="head fsbfont">
                                            Posts
                                        </div>

                                        <div className="postsShouldBeCetn">
                                            {
                                                posts.map((ele, index) => {
                                                    return (<PublicPostModule index={index} data={ele} />)
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }



                    </div>

                </div>

            </div>

            <Footer />
        </>
    )
}

export default SearchPage;