import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

function Social() {
  let url = "/signup/";
  let { subUrl } = useParams();
  url = url + subUrl;

  const windowsProp = useRef();
  // const [url2, setUrl2] = useState();
  const { loginProcess } = useContext(AuthContext);

  const profileNavigtr = (e) => {
    e.preventDefault();
    axios
      .get(BaseUrl + "/socialuser")
      .then((res) => {
        // req.data.password = "$2b$12$MHbP0b075uWiH20gQOkMRe4bz4h46Rp0X7D/zXA.6qB4fzRSiLlIi"
        console.log(res, "the social res");
        loginProcess(res);
      })
      .catch((err) => {
        console.log(err, "the error of social msg");
      });
      
  };

  useEffect(() => {
    windowsProp.current = window.open(
      BaseUrl + url,
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=0,right=75,width=1000,height=1000",
    );
  }, [url]);

  if (
    windowsProp.current &&
    windowsProp.current.document &&
    windowsProp.current.document.URL &&
    windowsProp.current.document.URL.split("api")[1] &&
    windowsProp.current.document.URL.split("api")[1] === "/protected"
  ) {
    // console.log(windowsProp.current.document.URL.split("api"))
    profileNavigtr();
  }
  return (
    <div className="container-fluid">
      <div className="container d-flex justify-content-end py-5">
        <Button variant="contained" onClick={profileNavigtr}>
          {" "}
          Go to Profile
        </Button>
      </div>
    </div>
  );
}

export default Social;
