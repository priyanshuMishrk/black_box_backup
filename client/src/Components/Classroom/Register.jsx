import { Box, Button, TextField } from "@mui/material";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Default from "../../Images/defualtProPic.jpg";
// import ProfilePic from "../../Components/Common/Crop";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { FacebookLoginButton } from "react-social-login-buttons";
// import { GoogleLoginButton } from "react-social-login-buttons";
import CropImage from "../../Components/Common/CropImage";

const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title should contain 3 characters")
    .required("Title is required"),

  description: yup.string(),

  // email: yup.string() .email("Invalid email").required("Email is required"),

  // password: yup
  //   .string()
  //   .min(6, "Password should contain 6 characters")
  //   .required("Password is required"),

  // cpassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), "Passwords not matching"])
  //   .required("Confirm password is required"),

  // about: yup
  //   .string()
  //   .min(10, "Should contain a minimum of 10 characters")
  //   .required("About is required"),
});

const Registration = () => {
  const [image, setImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);
  // const [thumbnail, setThumbnail] = useState("");

  const {
    user,
    // backendUpdate,
    createWorkSpace,
    setValues,
    values,
    workspaceAllow,
    // profile,
    // cloud,
    // setCloud,
    loading,
    setLoading,
    workdata,
    standingData,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (!workspaceAllow) {
      navigate("/signup");
    }
    // eslint-disable-next-line
  }, []);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const uploadImage = () => {
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
          console.log(workdata);
          createWorkSpace(workdata.id, {
            title: values.title,
            description: values.description,
            logo: propic,
          });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      createWorkSpace(workdata.id, {
        title: values.title,
        description: values.description,
      });
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
      <Container fluid className="d-flex justify-content-center page">
        <Container fluid style={{ marginTop: "20px" }} className="reg_div py-4">
          <div>
            <h1 className="regtitle"> SUBSCRIPTION</h1>
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
                <div className="profile-img text-center my-1">
                  {!image ? (
                    // <img
                    //   width={250}
                    //   src={profile.avatar ? profile.avatar.url : Default }
                    //   alt=""
                    // />
                    ""
                  ) : (
                    <img width={250} src={image ? image : Default} alt="" />
                  )}
                  <div className="edit-profile-pic d-flex justify-content-center">
                    <div className="d-flex">
                      <FormControl
                        className="d-none"
                        id="upload_image"
                        type="file"
                        onChange={(e) => {
                          setCropImage(e.target.files[0]);
                          setShowCropper(true);
                        }}
                        accept=".jpg,.jpeg,.png,"
                      />
                      <label htmlFor="upload_image">
                        <span className="profilepic__icon">
                          {!image ? (
                            <p className=" mx-auto bg-dark p-2 text-white rounded-3 px-4 cp blw">
                              Upload Logo
                            </p>
                          ) : (
                            <p className=" mx-auto bg-dark p-2 text-white rounded-3 px-4 cp mt-4 blw ">
                              Change photo
                            </p>
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

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

                <Row className="signupform">
                  <Col md={12}>
                    <TextField
                      label="Company Name"
                      name="title"
                      {...register("title")}
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.title && errors.title.message}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                  </Col>
                  {/* <Col md={6}>
                    <TextField
                      label="Last name"
                      name="lastname"
                      {...register("lastname")}
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.lastname && errors.lastname.message}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      label="Email"
                      name="email"
                      {...register("email")}
                      variant="outlined"
                      autoComplete="false"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.email && errors.email.message}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <PhoneInput
                      // inputStyle={{color:'green'}}
                      enableSearch={true}
                      // containerStyle={{margin:'20px'}}
                      // buttonStyle={{}}
                      dropdownStyle={{ height: "200px" }}
                      country={"in"}
                      containerClass=" mobile m-0 p-0"
                      required={true}
                      // value="1425652"
                      onChange={(phone) =>
                        setValues({ ...values, mobile: phone })
                      }
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
                      {...register("password")}
                      type="password"
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.password && errors.password.message}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      label="Confirm Password"
                      name="cpassword"
                      {...register("cpassword")}
                      type="password"
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.cpassword && errors.cpassword.message}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                  </Col> */}
                  <Col md={12}>
                    <textarea
                      rows="4"
                      className="w-100 noti-content"
                      name="description"
                      {...register("description")}
                      placeholder="About Company"
                      onChange={changeHandler}
                      // onKeyDown={(e) => {
                      //   e.key === "Enter" && e.preventDefault();
                      // }}
                    />
                    <p className="text-danger text-start">
                      {errors.description && errors.description.message}
                    </p>
                  </Col>
                </Row>

                <div className="mt-3 d-flex flex-column t-3">
                  <p className="moto opacity-75 gsb">
                    Want subscription for classroom?
                    <Button
                      onClick={() => {
                        if (user) navigate("/profile");
                        else {
                          standingData(workdata.email, workdata.password);
                        }
                      }}
                      // to={user ? "/profile" : "/login"}
                      className="text-decoration-none"
                    >
                      {" "}
                      Skip
                    </Button>
                  </p>
                  {/* <center>
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
                  </center> */}
                  <div className="mt-4 pt-2 w-100">
                    <Button
                      variant="contained"
                      type="submit"
                      className="bgdark w-100 gsb mb-4"
                    >
                      {loading ? (
                        <>
                          <div className="loadingio-spinner-rolling-jm01qv7mmak mx-2">
                            <div className="ldio-cqj9sf9mcdj ">
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
          {/* <hr className="my-3" /> */}
          {/* <div className="d-flex justify-content-between w-100">
            <GoogleLoginButton>
              <span>Signup with Google</span>
            </GoogleLoginButton>
            <FacebookLoginButton>
              <span>Signup with Facebook</span>
            </FacebookLoginButton>
          </div> */}
        </div>
      </Container>
      <Footer />
    </Container>
  );
};

export default Registration;
