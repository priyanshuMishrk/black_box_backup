import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../../Components/Common/Header";
import TextField from "@mui/material/TextField";
import {  InputAdornment } from '@mui/material';
import Button from "@mui/material/Button";
import Footer from "../../Components/Common/Footer";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useEffect } from "react";
import ViewPass from '../../Images/viewPassword.svg'
import unViewPass from '../../Images/unviewPassword.svg'

const Login = () => {
  const location = useLocation();

  const [viewPass, setViewPass] = useState(false)

  function clicked(){
    setViewPass(!viewPass)
  }

  const searchParams = new URLSearchParams(location.search);
  let lid = searchParams.get('l');
  if ( !lid){
    lid = '1'
  }
  const {
    loginUser,
    setValues,
    values,
    loading,
    setLoading,
    clsroom,
    setClsroom,
  } = useContext(AuthContext);
  const [clssroom, setClssroom] = useState(false);

  const navigate = useNavigate();

  const google = () => {
    // window.open(
    //   BaseUrl + "/signup/google",
    //   "_blank",
    //   "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400",
    // );
    window.location.href =  `${BaseUrl}/signup/google`
  };

  const facebook = () => {
    window.location.href =  `${BaseUrl}/signup/facebook`
  };

  useEffect(() => {
    setLoading(false);
    if (clsroom) {
      console.log("comming to the login");
      setClssroom(true);
      setClsroom(false);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // eslint-disable-next-line
  }, []);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loginBtnj = async (e) => {
    e.preventDefault();
    if (clssroom) {
      console.log("herere rererererer");
      await setClsroom(true);
    }
    loginUser(e, lid);
  };

  return (
    <>
    <Header/>
    <Container fluid className="loginpage p-0 m-0 mt-5">
      <div className="loginBanner">
        <span className="faded gb mt-5" style={{
          width : 'auto'
        }}>
      

        </span>
      <span className="bold gb mmmmmmm" 
      style={{
        lineHeight : '5.5vw',
        marginTop : '0'
      }}
      >
      Black Box Community.
      </span>
      </div>
      <Container fluid className="d-flex justify-content-center  page p-0 m-0">
        <div className=" logindiv ">

          <div className="optionInSignin">

          <h1 className=" gb title">Sign In </h1>
          <p className="desc gl">
            Want to create a new account?
            <span>{""} </span>
            <Link to={`/signup?l=${lid}`}>
              <span className="underline gsb cp"> Register</span>
            </Link>
          </p>
          </div>

          <form className="d-flex flex-column m-2 mt-4  " onSubmit={loginBtnj}>
            <TextField
              label="Email"
              variant="outlined"
              className=" mb-3"
              name="email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // loginUser();
                }
              }}
              onChange={changeHandler}
            />
            <TextField
              type={viewPass ? 'text' : "password"}
              label="Password"
              variant="outlined"
              name="password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // loginUser();
                }
              }}
              onChange={changeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img className="cp" src={viewPass ? unViewPass : ViewPass} onClick={clicked} alt="" />
                  </InputAdornment>
                ),
              }}
            />
            <div className="mt-3 d-flex flex-column">
              {/* <p className="moto opacity-75">
                Use your email or mobile to signin
              </p> */}
              <div className="mt-1 mb-3 w-100">
                <Button
                  variant="contained"
                  type="submit"
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
                    "  Enter"
                  )}
                </Button>
              </div>
                <Link
                  to="/otplogin"
                  className="underline gl fpassqord"
                  style={{
                    width: "fit-content",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </Link>
            </div>
          </form>
          <div className="my-4">
            <hr className="orinlogin" />
          </div>

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
          <GoogleLoginButton onClick={google} />

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

export default Login;
