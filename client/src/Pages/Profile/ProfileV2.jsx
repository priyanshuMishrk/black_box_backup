    import React, { useContext, useEffect, useRef, useState } from "react";
    import { Button, Col, Container, Row } from "react-bootstrap";
    import axios from "axios";
    import AuthContext, { BaseUrl } from "../../Context/AuthContext";
    import Footer from "../../Components/Common/Footer";
    import Header from "../../Components/Common/Header";
    import DefaultPic from "../../Images/defualtProPic.jpg";
    import { Link, useNavigate, useLocation } from "react-router-dom";
    import { } from "@mui/material/styles";
    import Typography from "@mui/material/Typography";
    import { ReactComponent as Icon } from "../../Images/Vector.svg"
    import { ReactComponent as Icon2 } from "../../Images/Vector2.svg"
    import TextField from "@mui/material/TextField";
    import { LocalizationProvider } from '@mui/x-date-pickers';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
    import { DatePicker } from '@mui/x-date-pickers';
    import dayjs from 'dayjs';
    import { Checkbox, FormControlLabel, Box, Grid } from '@mui/material';
    import { Check } from '@mui/icons-material';
    import { ReactComponent as Icon3 } from "../../Images/Vector3.svg"
    import { ReactComponent as Icon4 } from "../../Images/Vector4.svg"
    import { ReactComponent as Icon5 } from "../../Images/Vector5.svg"
    import { ReactComponent as Icon6 } from "../../Images/Vector6.svg"





    const ProfileV2 = () => {

        const navigate = useNavigate()
        function navigator(e){
            e.preventDefault()
            navigate('/class-submission')
        }
        const { authTokens, BaseUrl, editProfile, loading, setLoading } =
            useContext(AuthContext);
        const [profile, setPro] = useState({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            cpassword: "",
            about: "",
            phone_num: "",
        });

        const [selectedDate, setSelectedDate] = useState(null);
        const [showDatePicker, setShowDatePicker] = useState(false);

        const toggleDatePicker = (e) => {
            e.preventDefault();
            setShowDatePicker(!showDatePicker);
        };

        const handleDateChange = (date) => {
            setProfile({
                ...profileFa,
                dob: date
            });
    
            setSelectedDate(date);
            toggleDatePicker(); // Close the date picker after selecting a date
        };

        useEffect(() => {
            setLoading(false);
            const getMyProfile = async () => {
                await axios
                    .get(BaseUrl + "/profile", {
                        headers: { Authorization: `Bearer ${authTokens}` },
                    })
                    .then((res) => {
                        setPro(res.data.result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            };
            getMyProfile();
            // eslint-disable-next-line
        }, []);


        const [selectedOptions, setSelectedOptions] = useState([]);
        const name = localStorage.getItem("name");
        const pro = localStorage.getItem("propic");
        const [profileFa, setProfile] = useState({
            first_name: name.split(" ")[0],
            last_name: name.split(" ")[1]?name.split(" ")[1]:'',
            email: "",
            dob: null,
            languages: selectedOptions,
            about: "",
            education: "",
            currentCompany: "",
            currentDesignation: "",
            interests: [],
            awards: [],
            flink: "",
            xlink: "",
            tubelink: "",
            linkedin: ""
        });
        let prop;
        let propic;
        if (pro.includes("{")) {
            prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
            propic = prop.secure_url;
        } else {
            prop = pro;
            propic = pro;
        }
        const about = localStorage.getItem("userDetails");

        const {
            user,
            getCoursesList,
            DynamicTimer,
            getWorkSpaceAllow,
            setSeenavs,
            // willBeFrnd,
            allFriends,
            allAcceptingFrnds
        } = useContext(AuthContext);

        useEffect(() => {
            (async () => {
                setSeenavs(false);
                if (!user.classroom_id) {
                    await getWorkSpaceAllow(user.email);
                }
                await getCoursesList();
                await DynamicTimer();
                await allFriends();
                await allAcceptingFrnds();
            })();
        }, []);
        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const paramValue = queryParams.get('role');

        const [role, setRole] = useState("")

        useEffect(() => {
            if (paramValue === "teacher") {
                setRole("T")
            } else {
                setRole("U")
            }
        }
            , [setRole, paramValue]
        )


        const today = dayjs()

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setProfile({
                ...profileFa,
                [name]: value
            });
        };



        const options = ['English', 'Gujarathi', 'Malayalam', 'Kannad', 'Hindi', 'Tamil', 'Urdu', 'Telugu', 'Marathi', 'Odia', 'Punjabi', 'Gujarati'];

        const handleToggle = (option) => {
            let currentLang;
            console.log( typeof option)
            console.log(option)
            if (typeof option !== "string" && option.key === "Enter"){
                setSelectedOptions((prevSelectedOptions) =>
                    prevSelectedOptions.includes(option.target.value)
                        ? prevSelectedOptions.filter((item) => item !== option.target.value)
                        : [...prevSelectedOptions, option.target.value]
                );
                currentLang = selectedOptions
            }
            else{
                console.log("in else", option)
                setSelectedOptions((prevSelectedOptions) =>
                    prevSelectedOptions.includes(option)
                        ? prevSelectedOptions.filter((item) => item !== option)
                        : [...prevSelectedOptions, option]
                );
                currentLang = selectedOptions
            }

            
            console.log(profileFa , "\n" , selectedOptions)

        };
        useEffect(() => {
            setProfile({
                ...profileFa,
                ["languages"]: selectedOptions
            });
        }, [selectedOptions,profileFa]);





        

        return (
            <Container fluid className="m-0 p-0 ">
                <Header />
                {
                    role === "T" ?
                        <div className="PBannerP">
                            <div className="profileBanner">
                                <div className="profileBannerText">
                                    <span className="PBTHead gb">
                                        Hello {profileFa.first_name}! Welcome to Blackbox
                                    </span>
                                    <span className="PBTDescription gl">
                                        You’re almost there to jump right into setting up your class, however, we recommend completing your profile so that our Black box community and your future students know who you are
                                    </span>
                                </div>
                                <div className="profileBannerButtonD gsb">
                                    <button className="profileBannerButton" onClick={navigator}> Proceed to Hosting </button>
                                </div>
                            </div>
                        </div>
                        : ""
                }

                <div className="ProfileV2">
                    <div className="PV2D1">
                        <div className="V2D1IMG">
                            {prop ? (
                                propic ? (
                                    <img
                                        width={100}
                                        height={100}
                                        src={propic}
                                        alt=""
                                    />

                                    // <link rel="preload" href={propic} as="image"  className=" mb-1 mt-3 ic2 "></link>
                                ) : (
                                    <img
                                        width={100}
                                        height={100}
                                        src={DefaultPic}
                                        alt=""
                                    />
                                )
                            ) : (
                                <img
                                    src={DefaultPic}
                                    width={100}
                                    height={100}
                                    alt=""
                                />
                            )}
                        </div>
                        <div className="V2D1Name gsb">
                            {`${profileFa.first_name} ${profileFa.last_name}`}
                        </div>
                        <div className="V2D1Button">

                            <button className="V2D1Share gsb">
                                <Icon className="iconV2D1" />
                                <span>
                                    Share Profile
                                </span>
                            </button>
                        </div>
                        <div className="V2D1ActionItems gm">
                            <span>
                                View Public Profile
                            </span>

                            <span>
                                Profile
                            </span>

                            <span>
                                <span>
                                    Your Classes
                                </span>
                                <Icon2 className="iconV2D12" />
                            </span>

                            <span>
                                Account
                            </span>

                            <span>
                                Privacy and settings
                            </span>

                            <span>
                                Logout
                            </span>
                        </div>
                    </div>
                    <div className="PV2D2">
                        <form className="PV2D2Form">
                            <div className="inputRow inputRow1">
                                <TextField
                                    className="textAreas"
                                    label="First name"
                                    name="first_name"
                                value={profileFa.first_name}
                                onChange={handleInputChange}
                                    variant="outlined"
                                //   onChange={changeHandler}
                                />
                                <TextField
                                    className="textAreas"
                                    label="Last name"
                                    name="last_name"
                                value={profileFa.last_name}
                                onChange={handleInputChange}
                                    variant="outlined"
                                //   onChange={changeHandler}
                                />
                            </div>
                            <div className="inputRow inputRow1">
                                <TextField
                                    className="textAreas"
                                    label="Email Id"
                                    name="emailid"
                                    value={profile.email}
                                    variant="outlined"
                                //   onChange={changeHandler}
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {/* {children} */}
                                    <DatePicker
                                        value={selectedDate}
                                        inputFormat="DD/MM/YYYY"
                                        maxDate={today} // Set maxDate to today's date
                                        slotProps={{
                                            textField
                                                : { placeholder: 'DOB' }
                                        }}
                                        className="datePickerInForm"
                                        onChange={handleDateChange}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className=" inputRow1">
                                <span className="languageSelection gsb">
                                    Languages you know
                                </span>
                                <Grid container spacing={1} >
                                    {options.map((option) => (
                                        <Grid item xs={12} sm={6} md={2.5} key={option} >
                                            <FormControlLabel
                                                className="formForSlecetion"
                                                control={
                                                    <Checkbox
                                                        checked={selectedOptions.includes(option)}
                                                        onChange={() => handleToggle(option)}
                                                        className="CheckboxinFormSelection"
                                                        icon={
                                                            <Box
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    backgroundColor: 'white',
                                                                    border: '1px solid #0000008F',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                }}
                                                            />
                                                        }
                                                        checkedIcon={
                                                            <Box
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    backgroundColor: 'black',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <Check sx={{ color: 'white' }} />
                                                            </Box>
                                                        }
                                                    />
                                                }
                                                label={<Typography className="spanInOption gm" sx={{ color: 'black' }}>{option}</Typography>}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <TextField
                                    label="If others, specify"
                                    name="languages"
                                    variant="outlined"
                                    className="otherLanguagesBox"
                                    //   onChange={changeHandler}
                                    // onChange={handleToggle}
                                    onKeyDown={handleToggle}
                                    
                                    placeholder="Languages"
                                />
                            </div>

                            <div className="dottedLineInForm">
                            </div>
                            <div className="aboutDivYour">
                                <TextField
                                    label="About Yourself"
                                    name="aboutyourself"
                                    variant="outlined"
                                    className="aboutYourselfForm"
                                    value={profile.about}
                                    //   onChange={changeHandler}
                                    placeholder="About Yourself"
                                    minRows={5}  // This sets the minimum number of rows to display
                                    maxRows={10}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            alignItems: 'flex-start',
                                        },
                                    }}
                                    multiline
                                />

                            </div>
                            <div>

                                <TextField
                                    label="Education Qualification"
                                    name="educationqualification"
                                    variant="outlined"
                                    className="educationQualfForm"
                                    //   onChange={changeHandler}
                                    placeholder="Education Qualification"
                                />
                            </div>

                            <div className="inputRow inputRow1">

                                <TextField
                                    className="textAreas"
                                    label="Current Company"
                                    name="currentCompany"
                                    variant="outlined"
                                //   onChange={changeHandler}
                                />
                                <TextField
                                    className="textAreas"
                                    label="Current Designation"
                                    name="currentdesignation"
                                    variant="outlined"
                                //   onChange={changeHandler}
                                />

                            </div>
                            <div className="dottedLineInForm">
                            </div>

                            <div>
                                <span className="headingInFormSpan gsb">
                                    Interests
                                </span>
                                <div className="tagsInFormDiv gm">
                                    <span>
                                        Wellness
                                    </span>

                                    <span>
                                        Health
                                    </span>

                                    <span>
                                        Marketing
                                    </span>

                                    <span>
                                        Photography
                                    </span>

                                    <span>
                                        Music
                                    </span>

                                    <span>
                                        Arts and Crafts
                                    </span>

                                    <span>
                                        Writing
                                    </span>

                                    <span>
                                        Design
                                    </span>

                                    <span>
                                        Pottery
                                    </span>

                                    <span>
                                        Baking
                                    </span>

                                    <span>
                                        Culinary Arts
                                    </span>

                                    <span>
                                        Technology
                                    </span>

                                    <span>
                                        Performing arts
                                    </span>

                                    <span>
                                        Science
                                    </span>

                                    <span>
                                        Cinema
                                    </span>

                                    <span>
                                        Coding
                                    </span>
                                </div>
                            </div>

                            <div className="dottedLineInForm">
                            </div>

                            <div>
                                <span className="headingInFormSpan gsb">
                                    Awards and Cerfiticates
                                </span>
                                <span className="buttonInFormSpan">
                                    <Button variant="outlined gm" >
                                        Add +
                                    </Button>
                                </span>
                            </div>

                            <div className="dottedLineInForm">
                            </div>

                            <div className="addLinks gm">
                                    <span>
                                        <Icon3 className="LinkSvg"/>
                                        <input type="text"  placeholder="Facebook Link"/>
                                    </span>
                                    <span>
                                    <Icon4 className="LinkSvg"/>
                                    <input type="text"  placeholder="X Link"/>
                                    </span>
                                    <span>
                                    <Icon5 className="LinkSvg"/>
                                    <input type="text"  placeholder="Youtube Link"/>
                                    </span>
                                    <span>
                                    <Icon6 className="LinkSvg"/>
                                    <input type="text"  placeholder="Linkedin Link"/>
                                    </span>
                            </div>

                        </form>
                    </div>
                </div>
                <Footer />
            </Container>
        );
    };

    export default ProfileV2;
