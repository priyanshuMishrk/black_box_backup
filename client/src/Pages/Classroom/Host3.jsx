// import React from 'react'
import {
  Box,
  Button,
  // ButtonBase,
  // InputAdornment,
  TextField,
} from "@mui/material";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import Footer from "../../Components/Common/Footer";
// import Header from "../../Components/Common/Header";
import AuthContext from "../../Context/AuthContext";
import "react-phone-input-2/lib/bootstrap.css";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import DatePicker from "react-multi-date-picker";
import { useEffect } from "react";
import StyleContext from "../../Context/StyleContext";
import Cookies from 'js-cookie';

const Host3 = ({ onAdd, onGet, mode }) => {

  function sortEventsByDateTime(events) {
    return events.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA - dateTimeB;
    });
  }

  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 15));
  const formattedMinDate = minDate.toISOString().split('T')[0];
  const {
    classes,
    setClasses,
    HostClasses,
    classlist,
    setClasslist,
    // setHostClasses,
  } = useContext(AuthContext);
  const { errorToast } = useContext(StyleContext);
  // let j = onGet()
  // console.log(j)
  // if (!j){
  //   console.log(true)
  //   j = []
  // }


  const [currentClassList, setCurrentClassList] = useState([])

  useEffect(() => {
    const date = onGet()
    console.log(date)
    if (date && currentClassList != date) {
      const j = sortEventsByDateTime(date)
      setCurrentClassList(j)
    }
  }, [])

  useEffect(() => {
    const savedState1 = Cookies.get('state1cls');
    if (savedState1) {
      const obj = JSON.parse(savedState1)
      const d = obj['date']
      if (d && d.length > 0 && currentClassList != d) {
        const j = sortEventsByDateTime(d)
        setCurrentClassList(j)
      }
    }
  }, [])

  useEffect(() => {
    onAdd(currentClassList)
  }, [currentClassList, onAdd]);

  return (
    <Container fluid className=" p-0 m-0 ">
      <Container className="d-flex justify-content-center align-items-center mt-3">
        <div className="w-100 text-center mt-3">
          {currentClassList.length > 0 && <h4 className="mb-4 fmfont">List Of Classes</h4>}
          {currentClassList.length > 0 && (
            <b>
              <Row className="w-100 mb-2">
                <Col md={2} className="frfont">No.</Col>
                <Col md={2} className="frfont">Date</Col>
                <Col md={2} className="frfont">Time</Col>
                <Col md={2} className="frfont">Duration</Col>
                <Col md={2} className="frfont">Action</Col>
              </Row>
            </b>
          )}
          {currentClassList.length > 0 &&
            currentClassList.map((item, index) => (
              <Row className="w-100 mb-3  " key={index}>
                <Col md={2} className="flfont">#{index + 1}</Col>
                <Col md={2} className="flfont">{item.date}</Col>
                <Col md={2} className="flfont">{item.time}</Col>
                <Col md={2} className="flfont">{item.duration + " mins"}</Col>
                <Col md={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      // setClasslist(classlist.filter((i) => i !== item)); //filtering out the item that is clicked on and setting the new array to the classlist state variable.

                      // console.log(classlist);
                      let currentList = currentClassList;
                      currentList.splice(index, 1);
                      let newList = sortEventsByDateTime(currentList)
                      setCurrentClassList(newList);
                    }}
                    className="deleteButtonOfC1 deleteButtonOfC2 gb"
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
        </div>
      </Container>
      <Container fluid className="d-flex justify-content-center m-0 p-0">
        {/* <Container fluid className="reg_div py-5">
          <div>
            <h1 className="regtitle">Step 3</h1>
          </div>
        </Container> */}

        <Container className=" my-5  w-100 d-flex justify-content-center">
          <div className="d-flex justify-content-center w-100 m-2 ">
            <Box>
              {/* <h5 className="text-start my-3">Add classes</h5> */}
              <Row className="signupform ">

                {/* <Col md={6} className="">
                  <div className="d-flex">
                    
                    <TextField
                      label="Fee"
                      name="fee"
                      value={classes.fee}
                      onChange={(e) =>
                        setClasses({ ...classes, fee: e.target.value })
                      }
                      variant="outlined"
                      placeholder="e.g : Rs 100"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                      className=" mb-3 w-100"
                    />
                  </div>
                </Col> */}

                <Col md={4} xs={12} className="">
                  <>
                    {/* <DatePicker
                      className="w-100"
                      placeholder="Date"
                      value={classes.date}
                      onChange={(e) =>
                        setClasses({ ...classes, date: e.target.value })
                      }
                    />
                    {classes.date?.toDate?.().toString()} */}
                    <input
                      type="date"
                      value={classes.date}
                      className="w-100 p-2 rounded-2 timefield border-1"
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      min={formattedMinDate}
                      onChange={(e) => {
                        setClasses({ ...classes, date: e.target.value });
                        // console.log(classes.date);
                        // console.log(e);
                      }}
                    />
                  </>
                </Col>
                <Col md={4}>
                  <input
                    type="time"
                    value={classes.time}
                    onChange={(e) => {
                      setClasses({ ...classes, time: e.target.value });
                      // console.log(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    className="w-100 p-2 rounded-2 timefield border-1"
                  />
                </Col>
                <Col md={4}>
                  <TextField
                    label="Duration"
                    name="duration"
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: 1,
                        inputMode: 'numeric'
                      },
                      // Hides the arrows using CSS
                      sx: {
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                          display: "none",
                        },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        }
                      }
                    }}
                    placeholder="e.g : 45"
                    variant="outlined"
                    value={classes.duration}
                    onChange={(e) =>
                      setClasses({ ...classes, duration: e.target.value })
                    }
                    className="mb-3 w-100"
                  />

                  <span style={{ position: 'absolute', transform: 'translateX(-150%) translateY(70%)' }}>min</span>
                </Col>
                <Col md={12} className="mt-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        console.log(classes);
                        setClasses({
                          title: "",
                          fee: "",
                          description: "",
                          date: "",
                          time: "",
                          duration: "",
                        });
                      }}
                      className="deleteButtonOfC2 gsb"
                    >
                      Clear
                    </Button>
                    {!(mode === 'class' && currentClassList.length >= 1) && <Button
                      color="primary"
                      variant="contained"
                      className="w-25 AddButtonOfC2 gb"
                      onClick={() => {
                        // console.log(classes);
                        if (
                          (classes && classes.date === "") ||
                          classes.time === "" ||
                          classes.duration === ""
                        )
                          errorToast("The class timing infos are required");
                        else {
                          const newElement = {
                            date: classes.date,
                            time: classes.time,
                            duration: classes.duration,
                          }
                          const d = currentClassList
                          d.push(newElement)
                          let newList = sortEventsByDateTime(d)
                          setCurrentClassList(newList)

                          setClasses({
                            title: "",
                            description: "",
                            fee: "",
                            date: "",
                            time: "",
                            duration: "",
                          });
                        }
                      }}
                    >
                      Add Class
                    </Button>}
                  </div>
                </Col>
              </Row>
            </Box>
          </div>
        </Container>
      </Container>
      {/* <Footer /> */}
    </Container>
  );
};

export default Host3;
