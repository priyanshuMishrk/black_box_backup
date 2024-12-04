import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../../Components/Common/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../../Components/Common/Footer";
import AuthContext from "../../Context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { FacebookLoginButton } from "react-social-login-buttons";
// import { GoogleLoginButton } from "react-social-login-buttons";
import { useEffect } from "react";

const AdminLogin = () => {
  const {
    // loginUser, 
    // setValues,
    // values, sampath@blackis.in , priyanshu@blackis.in
    loading,
    setLoading,
    // clsroom,
    // setClsroom,
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState('');
  //   const [clssroom, setClssroom] = useState(false);

  //   const navigate = useNavigate();

  //   const google = () => {
  //     // window.open(
  //     //   BaseUrl + "/signup/google",
  //     //   "_blank",
  //     //   "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400",
  //     // );
  //     navigate("/social/google");
  //   };

  //   const facebook = () => {
  //     navigate("/social/facebook");
  //   };

  useEffect(() => {
    setLoading(false);
    // if (clsroom) {
    //   console.log("comming to the login");
    //   setClssroom(true);
    //   setClsroom(false);
    // }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // eslint-disable-next-line
  }, []);

  const [showPass , SetShowPass] = useState(false)

  const changeHandler = (e) => {
    setInputValue('')
    e.preventDefault()
    SetShowPass(true)
    console.log(showPass)
  };

  const loginBtnj = async (e) => {
    e.preventDefault();
    // if (clssroom) {
    // //   console.log("herere rererererer");
    //   await setClsroom(true);
    // }
    // loginUser(e);
  };

  return (
    <Container fluid className="loginpage p-0 m-0 ">
      <Header />
      <Container fluid className="white m-0 p-0"></Container>

      <Container fluid className="d-flex justify-content-center  page p-0 m-0">
        <div className=" logindiv ">
          <h1 className=" gl title">ADMIN </h1>
          {showPass ? 
          <form className="d-flex flex-column m-2 mt-5  " onSubmit={loginBtnj}>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            className=" mb-3"
            name="Password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          
          <div className="mt-3 d-flex flex-column">
            <div className="mt-4 pt-2 w-100">
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
                  " Enter "
                )}
              </Button>
            </div>
          </div>
        </form>
          : <form className="d-flex flex-column m-2 mt-5  " onSubmit={changeHandler}>
            <TextField
              label="Email"
              variant="outlined"
              className=" mb-3"
              name="email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setInputValue(e.target.value)}              
            />
            
            <div className="mt-3 d-flex flex-column">
              <div className="mt-4 pt-2 w-100">
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
                    " Enter "
                  )}
                </Button>
              </div>
            </div>
          </form>}
          <div className="my-4">
            <hr />
          </div>
        </div>
      </Container>

      <Footer />
    </Container>
  );
};

export default AdminLogin;
