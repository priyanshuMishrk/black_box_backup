/* eslint-disable no-undef */
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";
// import Class2 from "../../Images/Classes/class2.jpg";
import { Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import AlertDialog from "./AlertDialog";
import { Link, useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, setShowclasses, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs() {

  const {
    allFriends,
    areFriends,
    allAcceptingFrnds,
    acceptngFrnd,
    acceptFrnd,
    dismissFrnd,
  } = useContext(AuthContext);

//   const navigate = useNavigate();

  useEffect(() => {
    // hostedClasses();
    // joinedClasses();
    // eslint-disable-next-line
    allFriends()
    console.log(areFriends) // is a list of friends
    // areFriends()
    // acceptngFrnd is a list of request
    allAcceptingFrnds()
  }, []);

  return (
    <div className="boxshadow bgw p-4 rounded-3">
        <Tabs>
        <Tab label="Friends">
        </Tab>
              <Tab label="Requests" />
              <Tab
                label="X"
                // onClick={() => setShowclasses(false)}
                className="d-flex justify-content-start"
              />
        </Tabs>
    </div>
  );
}
