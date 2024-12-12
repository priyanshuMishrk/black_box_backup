import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import axios from "axios";
import TabsComponent from "../../Components/Learn/TabPannel";
import star from '../../Images/star.svg'
import downIcon from '../../Images/Vector2.svg'


const Learn = () => {

    async function postPublic(value) {
        const result = await axios.get(`${BaseUrl}/searchQuery?tag=${value}`
        )
        const data = result.data
        setCls(data.classes.concat(data.course))
        setClassLength(data.classes)
        setCourseLength(data.course)
    }

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



    function sortClassesByEarliestDate(classes) {
        const returner =  classes.sort((a, b) => {
            let aEarliestDate = new Date(Math.min(...a.date.map(d => new Date(`${d.date}T${d.time}`))));
            let bEarliestDate = new Date(Math.min(...b.date.map(d => new Date(`${d.date}T${d.time}`))));
            return aEarliestDate - bEarliestDate;
        });

        const jooooo = classes.sort((a, b) => {
            let aEarliestDate = new Date(Math.min(...a.date.map(d => new Date(`${d.date}T${d.time}`))));
            let bEarliestDate = new Date(Math.min(...b.date.map(d => new Date(`${d.date}T${d.time}`))));
            return bEarliestDate - aEarliestDate;
        })
        setCls(jooooo)
        return returner
    }

    const { goToTop, getCoursesList, courseList, user } =
        useContext(AuthContext);

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        if (user) {
            const name = localStorage.getItem("name");
            setName(name)
        }
    }, [])

    useEffect(() => {
        goToTop();
        // getCoursesList();
        // eslint-disable-next-line
    }, []);

    const renderClasses = () => {
        if (!clss || clss.length === 0) {
            return null;
        }




        const filteredCourses = clss.filter(
            (cls) =>
                cls.title.toLowerCase().includes(value.toLowerCase()) ||
                cls.description.toLowerCase().includes(value.toLowerCase()) ||
                value === ""
        );

        const rows = [];
        for (let i = 0; i < filteredCourses.length; i += 4) {
            const coursesInRow = filteredCourses.slice(i, i + 4);
            rows.push(
                <Row key={i} className=" p-4 pb-0 pt-0">
                    {coursesInRow.map((course, index) => (
                        <Col key={index} md={3}>
                            {renderClass(course)}
                        </Col>
                    ))}
                </Row>
            );
        }
        return rows;
    };

    const [selectedTag , setSekgn] = useState(0)

    function filterObjects(objects) {
        const excludedKeys = ["accN", "bankN", "holderN", "accTpe", "ifsc", "upi", 'currency',  'users'];

        return objects.filter(obj => {
            return Object.keys(obj).every(key => {
                if (excludedKeys.includes(key)) {
                    return true;
                }
                const value = obj[key];
                if (Array.isArray(value)) {
                    return value.length > 0 && value.every(subObj => filterObjects([subObj]).length > 0);
                }
                return value !== undefined && value !== null && value !== "";
            });
        });
    }

    let [clss, setCls] = useState([])
    const [courseLength, setCourseLength] = useState(0)
    const [classLength, setClassLength] = useState(0)
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );

    async function getter() {
        const res = await axios.get(BaseUrl + `/classInfo/all`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            });

        const res2 = await axios.get(BaseUrl + `/courseInfo/all`,
            {
                headers: { Authorization: `Bearer ${authTokens}` },
            });

        const d1 = res.data
        setClassLength(filterObjects(d1))
        const d2 = res2.data
        setCourseLength(filterObjects(d2))

        let d3 = d1.concat(...d2)
        d3 = d3

        // setCurrentClasses(res.data)
        if (user) {
            const check = user.email.split('@')
            if (check[1] === 'blackis.in') {
                const d = filterObjects(d3)
                setCls(d)
            }
            else {
                const dataArray = d3
                console.log(dataArray)
                const filteredArray = dataArray.filter(item => item.verified);
                const d = filterObjects(filteredArray)
                setCls(d)
            }
        }
        else {
            const dataArray = d3
            console.log(dataArray)
            const filteredArray = dataArray.filter(item => item.verified);
            const d = filterObjects(filteredArray)
            setCls(d)
        }
    }

    useEffect(() => {
        async function getter() {
            const res = await axios.get(BaseUrl + `/classInfo/all`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                });

            const res2 = await axios.get(BaseUrl + `/courseInfo/all`,
                {
                    headers: { Authorization: `Bearer ${authTokens}` },
                });

            const d1 = res.data
            setClassLength(filterObjects(d1))
            const d2 = res2.data
            setCourseLength(filterObjects(d2))

            let d3 = d1.concat(...d2)
            d3 = d3

            // setCurrentClasses(res.data)
            if (user) {
                const check = user.email.split('@')
                if (check[1] === 'blackis.in') {
                    const d = filterObjects(d3)
                    setCls(d)
                }
                else {
                    const dataArray = d3
                    console.log(dataArray)
                    const filteredArray = dataArray.filter(item => item.verified);
                    const d = filterObjects(filteredArray)
                    setCls(d)
                }
            }
            else {
                const dataArray = d3
                console.log(dataArray)
                const filteredArray = dataArray.filter(item => item.verified);
                const d = filterObjects(filteredArray)
                setCls(d)
            }
        }
        getter()
    }, [])

    const [isHovered, setIsHovered] = useState(0);

    const handleMouseEnter = (ind) => {
        setIsHovered(ind);
    };

    const handleMouseLeave = () => {
        setIsHovered(0);
    };


    const { value, setValue } = useContext(AuthContext);
    





    const renderClass = (cls, index) => {
        const a = cls.img && cls.img.length > 0 ? cls.img[0].url : "";

        if (cls.title.toLowerCase().includes(value.toLowerCase()) ||
        cls.description.toLowerCase().includes(value.toLowerCase()) ||
        value === "")

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

    const handleInputChange22 = (e) => {
        setValue(e.target.value);
      };




    const renderClass2 = (cls) => {
        const a = cls.img && cls.img.length > 0 ? cls.img[0].url : "";
        return (
            <div>
                {cls.title}
            </div>
        );
    };




    const words = ['Topics', 'Classes', 'Course', 'Crafts', 'Music', 'Chess'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 4000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, []);


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

    const [checkboxes, setCheckboxes] = useState({
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes({
            ...checkboxes,
            [name]: checked,
        });
    };

    function sortClassesByEarliestDate(classes) {
        return classes.sort((a, b) => {
          let aEarliestDate = new Date(Math.min(...a.date.map(d => new Date(`${d.date}T${d.time}`))));
          let bEarliestDate = new Date(Math.min(...b.date.map(d => new Date(`${d.date}T${d.time}`))));
          return bEarliestDate - aEarliestDate;
        });
      }

    const [ltst, setLtst] = useState()
    const [rtings, setRtings] = useState()

    useEffect(() => {
        let j = sortClassesByEarliestDate(clss)
        setLtst(j)
    }, [clss])

    const [formatSelected, setformatSelected] = useState(0)


    return (
        <Container fluid className="p-0 m-0">
            <Header />
            <Container fluid className="p-0  white mx-2"></Container>
            <Container fluid className="mb-5 m-0 p-0 mx-2">
                <Container fluid className="p-0 m-0 d-flex justify-content-center w-100">
                    <Container className="p-3 m-0 mb-5">
                        <div className="d-flex justify-content-center flex-column w-100">
                            {/* <div>
                <h2 className="text-center gx my-5 ml-4 classTitleX">CLASSES</h2>
              </div> */}

                            {/* {renderClasses()} */}
                            <div className="mt-4">
                                <span className="fsbfont firstLearnText">
                                    Hi {name.split(' ')[0]}, What would you like to learn today?
                                </span>
                            </div>


                            <div className="mt-2 frfont pprreell">
                                <input
                                    type="text"
                                    placeholder={`Search`}
                                    onChange={handleInputChange22}
                                    value={value}
                                />
                                {
                                    !value &&
                                    <div className="placeholder-container">
                                    <div className="animationHappensHere">
                                        {words[currentWordIndex]}
                                    </div>

                                </div>}
                            </div>

                            {!value && <TabsComponent />}


                            <div className="d-flex">
                                <div className="filters">

                                    <div className="FirstFilter">
                                        <span className="fsbfont">All Classes and Courses</span>
                                    </div>

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

                                        <span onClick={() => { changeTag('Highest Rated'); show(false); }}>
                                            Highest Rated
                                        </span>
                                    </div>


                                    <div className="fourthFilterGroup">
                                        <div className="headTFGG fmfont cuzNeedCls cp" onClick={() => {
                                            setFormat(!format)
                                        }}>
                                            <span>
                                                Format
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
                                                                onChange={() => {setformatSelected((prv) => {
                                                                    if (prv === 1){
                                                                        return 0
                                                                    } else {
                                                                        return 1
                                                                    }
                                                                })}}
                                                            />
                                                            Class ({classLength.length})
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
                                                                onChange={() => {setformatSelected((prv) => {
                                                                    if (prv === 2 ){
                                                                        return 0
                                                                    } else {
                                                                        return 2
                                                                    }
                                                                })}}
                                                            />
                                                            Course ({courseLength.length})
                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div> 

                                    <div className="thirdFilterGroup">
                                        <div className="headTFGG fmfont">
                                            Suggested Topics
                                        </div>

                                        <div className="bodyTFGG frfont">
                                            <span className={`bodyTFGGContent ${selectedTag === 1 && 'isfh'}`} 
                                                onClick={
                                                    () => {
                                                        postPublic('camera')
                                                        if (selectedTag === 1){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(1)
                                                    }
                                                }
                                            >
                                                Photography
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 2 && 'isfh'}`}
                                                onClick={
                                                    () => {
                                                        postPublic('art')
                                                        if (selectedTag === 2){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(2)
                                                    }
                                                }
                                            >
                                                Arts and crafts
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 3 && 'isfh'}`}
                                                onClick={
                                                    () => {
                                                        postPublic('chess')
                                                        if (selectedTag === 3){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(3)
                                                    }
                                                }
                                            >
                                                Chess
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 4 && 'isfh'}`} 
                                                onClick={
                                                    () => {
                                                        postPublic('dance')
                                                        if (selectedTag === 4){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(4)
                                                    }
                                                }
                                            >
                                                Music
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 5 && 'isfh'}`} 
                                                onClick={
                                                    () => {
                                                        postPublic('dance')
                                                        if (selectedTag === 5){
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(5)
                                                    }
                                                }
                                            >
                                                Folk Dance
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 6 && 'isfh'}`} 
                                                    onClick={
                                                        () => {
                                                            postPublic('story')
                                                            if (selectedTag === 6){
                                                                getter()
                                                                return setSekgn(0)
                                                            }
                                                            setSekgn(6)
                                                        }
                                                    } 
                                            >
                                                Story
                                            </span>

                                            <span className={`bodyTFGGContent ${selectedTag === 7 && 'isfh'}`}
                                                onClick={
                                                    () => {
                                                        postPublic('Embroidery')
                                                        if (selectedTag === 7){
                                                            postPublic('')
                                                            getter()
                                                            return setSekgn(0)
                                                        }
                                                        setSekgn(7)
                                                    }
                                                }
                                            >
                                                Embroidery
                                            </span>
                                        </div>
                                    </div>

                                    


                                    



                                </div>
                                <div className="courseListing mt-5">
                                    <div className="gridderForCourse">
                                        {formatSelected === 1 ? classLength.map((ele , index) =>{
                                            return renderClass(ele, index)
                                        }) : formatSelected === 2 ? courseLength.map((ele , index) =>{
                                            return renderClass(ele, index)
                                        }) :  currentTagSelected === 'Newest' ? ltst.map((ele, index) => {
                                            return renderClass(ele, index)
                                        }) : clss.map((ele, index) => {
                                            return renderClass(ele, index)
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Container>
                </Container>
            </Container>
            <Footer />
        </Container>
    );
};

export default Learn;
