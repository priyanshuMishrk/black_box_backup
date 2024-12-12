import { Box, Button, TextField } from "@mui/material";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Default from "../../Images/defualtProPic.jpg";
import {  useNavigate } from "react-router-dom";
// import ProfilePic from "../../Components/Common/Crop";
import axios from "axios";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import CropImage from "../../Components/Common/CropImage";

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
    .required("Confirm password is required"),

  about: yup
    .string()
    .min(10, "Should contain a minimum of 10 characters")
    .required("About is required"),
});

const Registration = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let lid = searchParams.get('l');
  if ( !lid){
    lid = '1'
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

  const facebook = () => {
    window.location.href =  `${BaseUrl}/signup/facebook`
  };

  const google = () => {
    // window.open(
    //   BaseUrl + "/signup/google",
    //   "_blank",
    //   "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400",
    // );
    window.location.href =  `${BaseUrl}/signup/google`
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
          signupUser(propic);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      signupUser(propic);
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
    <Container fluid className="loginpage p-0 m-0 ">
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center  page mb-5 m-0 p-0"
      >
        <Container fluid className="reg_div py-5">
          <div>
            <h1 className="regtitle">REGISTRATION</h1>
            {clssroom && (
              <p>
                This registration is for the Classroom subscription, please use
                corporate email.
              </p>
            )}
          </div>
        </Container>
        <div className=" logindiv">
          {/* <div>
            <img src={Default} width={200} />
            <Col  className="p-0" form={null}>
              <div  className="d-flex justify-content-end pe-3 pt-1">
                <label htmlFor="upload_image">
                  <Button
                    className="px-4 py-2 rounded-3 bgdark text-light"
                    variant="contained"
                    onClick={uploadImage}
                  >
                    Change
                  </Button>
                </label>
              </div>
              <Col
                
                className={`px-3 py-0 mb-4 d-flex justify-content-center`}
              >
                <ProfilePic
                  cropped={setImage}
                  image={profile ? profile.photo : Default}
                  aspect={1 / 1}
                  className="rounded-circle"
                  width={50}
                />
              </Col>
            </Col>
          </div> */}

          <Container className="d-flex justify-content-center">
            <form
              className="d-flex justify-content-center flex-column w-100  m-2 mt-5"
              onSubmit={handleSubmit(uploadImage)}
            >
              <Box>
                
                
                
                <div className="mt-3 d-flex flex-column t-3">
                  <p className="moto opacity-75">
                    Already logged in?
                    <Link to="/login" className="text-decoration-none">
                      {" "}
                      Login {clssroom && setClsroom(true)}
                    </Link>
                  </p>
                  <center>
                    {/* eslint-disable-next-line */}
                    <a
                      className="underline "
                      style={{
                        width: "fit-content",
                        color: "black",
                        cursor: "pointer",
                      }}
                    >
                      Forgot your password
                    </a>
                  </center>
                  <div className="mt-4 pt-2 w-100">
                    <Button
                      variant="contained"
                      type="submit"
                      className="bgdark w-100"
                    >
                      {loading ? (
                        <>
                          <div className="loadingio-spinner-rolling-jm01qv7mmak mx-2">
                            <div className="ldio-cqj9sf9mcdj">
                              <div></div>
                            </div>
                          </div>
                          Connecting
                        </>
                      ) : (
                        "Join here "
                      )}
                    </Button>
                  </div>
                </div>
              </Box>
            </form>
          </Container>
          <hr className="my-3" />
          <div className="d-flex justify-content-between w-100">
            <GoogleLoginButton onClick={google}>
              <span>Signup with Google</span>
            </GoogleLoginButton>
            <FacebookLoginButton onClick={facebook}>
              <span>Signup with Facebook</span>
            </FacebookLoginButton>
          </div>
        </div>
      </Container>
      <Footer />
    </Container>
  );
};

export default Registration;
