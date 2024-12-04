import React, { useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "../../Components/Common/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../../Components/Common/Footer";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
// import { useEffect } from "react";
import { Box } from "@mui/material";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import React, { useContext, useEffect, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
// import Footer from "../../Components/Common/Footer";
// import Header from "../../Components/Common/Header";
import Default from "../../Images/defualtProPic.jpg";
// import {  useNavigate } from "react-router-dom";
// import ProfilePic from "../../Components/Common/Crop";
import axios from "axios";
// import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
// import { Link } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CropImage from "../../Components/Common/CropImage";
// import axios from 'axios';
import ViewPass from '../../Images/viewPassword.svg'
import unViewPass from '../../Images/unviewPassword.svg'
import { InputAdornment } from '@mui/material';

let schema = yup.object().shape({
    firstname: yup
        .string()
        .min(3, "Firstname should contain 3 characters")
        .required("Firstname is required"),

    lastname: yup.string(),

    email: yup.string().email("Invalid email").required("Email is required"),

    password: yup
        .string()
        .min(6, "Password should contain 6 characters")
        .required("Password is required"),

    cpassword: yup
        .string()
        .oneOf([yup.ref("password"), "Passwords not matching"])
        .required("Confirm password is required")
});

const SignUpClr = () => {
    const location = useLocation();

    const [first_name, setFirstname] = useState(""); 
    const [last_name, setLastname] = useState("");
    const [email_id, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [phone_number, setPhone] = useState("");

    async function submitDetails(e){
        e.preventDefault();
        const publicDomains = [
            "gmail.com",
            "yahoo.com",
            "outlook.com",
            "hotmail.com",
            "aol.com",
            "icloud.com",
            "mail.com",
            "yandex.com",
            // Add other public domains as needed
          ];

          const domain = email_id.split('@')[1];

        if (password !== cpassword) {
            return alert("Password not matching");
        }

        if (publicDomains.includes(domain.toLowerCase())){
            return alert("Please use your coroporate email address");
        }

        if (email_id === ""){
            return alert("Email is required");
        }
        if (first_name === ""){
            return alert("Firstname is required");
        }
        if (last_name === ""){
            return alert("Lastname is required");
        }
        if (phone_number === ""){
            return alert("Phone number is required");
        }
        
        // console.log(first_name, last_name, email_id, password, cpassword, phone_number);
        const obj = {
            first_name,
            last_name,
            email_id,
            password,
            phone_number
        }

        const endpointee = BaseUrl + "/signup/classroomV2";
        const result = await axios.post(endpointee, obj)
        console.log(result.data, "\n result from classroom")
        localStorage.setItem("tokenClr", result.data.token);
        localStorage.setItem("emailClr", result.data.result.email_id);
        if(result.data.result.ClassroomId){
            localStorage.setItem("clrId", result.data.result.ClassroomId)
            return navigate("/classroomv2/hub");
        }
        navigate("/classroomv2/join");

        
        

    }

    const searchParams = new URLSearchParams(location.search);
    let lid = searchParams.get('l');
    if (!lid) {
        lid = '4'
    }
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [cropImage, setCropImage] = useState(false);
    // const [thumbnail, setThumbnail] = useState("");
    const [clssroom, setClssroom] = useState(false);

    const {
        // backendUpdate,
        signupUser,
        setValues,
        values,
        // profile,
        // cloud,
        // setCloud,
        loading,
        setLoading,
        clsroom,
        setClsroom,
    } = useContext(AuthContext);

    const [viewPass, setViewPass] = useState(false)

    function clicked() {
        setViewPass(!viewPass)
    }

    const facebook = () => {
        window.location.href = `${BaseUrl}/signup/facebook`
    };

    const google = () => {
        // window.open(
        //   BaseUrl + "/signup/google",
        //   "_blank",
        //   "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400",
        // );
        window.location.href = `${BaseUrl}/signup/google`
    };

    useEffect(() => {
        if (clsroom) {
            setClssroom(true);
            setClsroom(false);
        }
        setLoading(false);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        // eslint-disable-next-line
    }, []);

    const changeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const uploadImage = () => {
        if (clssroom) {
            console.log("registrationk arerererere");
            setClsroom(true);
        }
        var propic = "";
        if (image !== null) {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "i1m10bd7");
            data.append("cloud_name", "black-box");
            axios
                .post("https://api.cloudinary.com/v1_1/black-box/image/upload", data)
                .then((data) => {
                    console.log(data);
                    // backendUpdate({
                    //   secure_url: data.data.secure_url,
                    //   public_id: data.data.public_id,
                    //   signature: data.data.signature,
                    //   timestamp: data.data.created_at,
                    // });

                    // setCloud(JSON.stringify(data.data));
                    propic = data.data.secure_url;
                    signupUser(propic, lid);
                })
                .catch((err) => {
                    alert(err);
                });
        } else {
            signupUser(propic, lid);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <>
            <Header />
            <Container fluid className="loginpage p-0 m-0 mt-5">
                <div className="loginBanner">
                    <span className="faded gb mt-5" style={{
                        width: 'auto'
                    }}>
                        Welcome to

                    </span>
                    <span className="bold gb mmmmmmm mt-2"
                        style={{
                            lineHeight: '5.5vw',
                            marginTop: '0'
                        }}
                    >
                        Black Box
                    </span>
                    <span className="faded gb mt-2" style={{
                        width: 'auto'
                    }}>
                        Classroom.

                    </span>
                </div>
                <Container fluid className="d-flex justify-content-center  page p-0 m-0">
                    <div className=" logindiv ">

                        <div className="optionInSignin">

                            <h1 className=" gb title">Create a new account </h1>
                            <p className="desc gl">
                                Already have an account ?
                                <span>{""} </span>
                                <Link to={`/loginClr?l=${lid}`}>
                                    <span className="underline gsb cp"> Login</span>
                                </Link>
                            </p>
                        </div>

                        <form className="d-flex flex-column m-2 mt-4  ">
                            <Row className="signupform">
                                <Col md={6}>
                                    <TextField
                                        label="First name"
                                        name="firstname"
                                        // {...register("firstname")}
                                        variant="outlined"
                                        className=" mb-3 w-100"
                                        value={first_name}
                                        onChange={(e) =>{
                                            setFirstname(e.target.value)
                                        }}
                                        helperText={errors.firstname && errors.firstname.message}
                                        onKeyDown={(e) => {
                                            e.key === "Enter" && e.preventDefault();
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField
                                        label="Last name"
                                        name="lastname"
                                        // {...register("lastname")}
                                        variant="outlined"
                                        className=" mb-3 w-100"
                                        value={last_name}
                                        onChange={(e) =>{
                                            setLastname(e.target.value)
                                        }}
                                        // onChange={changeHandler}
                                        helperText={errors.lastname && errors.lastname.message}
                                        onKeyDown={(e) => {
                                            e.key === "Enter" && e.preventDefault();
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField
                                        label="Company Email"
                                        name="email"
                                        // {...register("email")}
                                        variant="outlined"
                                        autoComplete="false"
                                        className=" mb-3 w-100"
                                        value={email_id}
                                        onChange={(e) =>{
                                            setEmail(e.target.value)
                                        }}
                                        helperText={errors.email && errors.email.message}
                                        onKeyDown={(e) => {
                                            e.key === "Enter" && e.preventDefault();
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <PhoneInput
                                        countryCodeEditable={false}
                                        // inputStyle={{color:'green'}}
                                        enableSearch={true}
                                        // containerStyle={{margin:'20px'}}
                                        // buttonStyle={{}}
                                        dropdownStyle={{ height: "200px" }}
                                        country={"in"}
                                        containerClass=" mobile m-0 p-0"
                                        // required={true}
                                        // value="1425652"
                                        // onChange={(phone) =>
                                        //     setValues({ ...values, mobile: phone })
                                        // }
                                        value={phone_number}
                                        onChange={(e)=>{
                                            setPhone(e)
                                        }}
                                        helperText={errors.phone && errors.phone.message}
                                        onKeyDown={(e) => {
                                            e.key === "Enter" && e.preventDefault();
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        // {...register("password")}
                                        type={viewPass ? 'text' : "password"}
                                        variant="outlined"
                                        className=" mb-3 w-100"
                                        // onChange={changeHandler}
                                        value={password}
                                        onChange={(e) =>{
                                            setPassword(e.target.value)
                                        }}
                                        helperText={errors.password && errors.password.message}
                                        onKeyDown={(e) => {
                                            e.key === "Enter" && e.preventDefault();
                                        }}

                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <img className="cp" src={viewPass ? unViewPass : ViewPass} onClick={clicked} alt="" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField
                                        label="Confirm Password"
                                        name="cpassword"
                                        // {...register("cpassword")}
                                        type={viewPass ? 'text' : "password"}
                                        variant="outlined"
                                        className=" mb-3 w-100"
                                        value={cpassword}
                                        onChange={(e) =>{
                                            setCpassword(e.target.value)
                                        }}
                                        helperText={errors.cpassword && errors.cpassword.message}
                                        onKeyDown={(e) => {
                                            e.key === "Enter" && e.preventDefault();
                                        }}

                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <img className="cp" src={viewPass ? unViewPass : ViewPass} onClick={clicked} alt="" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Col>
                                <Col md={12}>

                                    <p className="text-danger text-start">
                                        {errors.about && errors.about.message}
                                    </p>
                                </Col>
                            </Row>

                            {showCropper && (
                                <CropImage
                                    cropRatio={{ width: 320, height: 420 }}
                                    src={cropImage}
                                    imageCallback={(image) => {
                                        setImage(image);
                                        setShowCropper(false);
                                    }}
                                    closeHander={() => {
                                        setShowCropper(false);
                                    }}
                                />
                            )}
                            <div className=" d-flex flex-column">
                                {/* <p className="moto opacity-75">
                Use your email or mobile to signin
              </p> */}
                                <div className=" mb-3 w-100">
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        onClick={submitDetails}
                                        className="bgdark w-100 "

                                    >
                                        {loading ? (
                                            <>
                                                <div className="loadingio-spinner-rolling-jm01qv7mmak mx-2">
                                                    <div className="ldio-cqj9sf9mcdj">
                                                        <div> </div>
                                                    </div>
                                                </div>
                                                Logging in
                                            </>
                                        ) : (
                                            "Sign up"
                                        )}
                                    </Button>
                                </div>
                                {/* <Link
                                    to="/otplogin"
                                    className="underline gl fpassqord"
                                    style={{
                                        width: "fit-content",
                                        color: "black",
                                        cursor: "pointer",
                                    }}
                                >
                                    Forgot Password?
                                </Link> */}
                            </div>
                        </form>
                        {/* <div className="my-4">
                            <hr className="orinlogin" />
                        </div> */}

                        {/* <a className="hollow button primary w-100" href="#"
          >
            <img
              width={15}
              style={{ marginBottom: "3px", marginRight: "5px" }}
              alt="Google login"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            Sign in with Google
          </a> */}
                        {/* <GoogleLoginButton onClick={google} /> */}

                        {/* <a className="hollow button primary w-100" href="#"
          >
            <img
              width={15}
              style={{ marginBottom: "3px", marginRight: "5px" }}
            />
            Sign in with Facebook
          </a> */}
                        {/* <FacebookLoginButton onClick={facebook} /> */}
                    </div>
                </Container>

            </Container>
            <Footer />
        </>
    );
};

export default SignUpClr;



