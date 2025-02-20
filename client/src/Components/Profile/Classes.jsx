import React, { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const Classes = () => {
  const { getCoursesList, courseList, value } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    getCoursesList();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      fluid
      className="p-0 m-0 d-flex justify-content-center classescontainer w-100"
    >  

      <Container className="p-0 m-0 mb-5">
        <div className="d-flex justify-content-center flex-column w-100 pt-2">
          <div>
            <h2 className="text-center gl my-3">CLASSES</h2>
          </div>
          <Row className="pb-4 ">
            <div
              className="d-flex w-100 abc"
              style={{
                overflowX: "scroll",
                overflowY: "hidden",
              }}
            >
              {courseList &&
                courseList.length > 0 &&
                // eslint-disable-next-line
                courseList.map((course) => {
                  const a = JSON.parse(course.images)[0];
                  //check if the course name or course description is in the search bar
                  if (
                    course.title.toLowerCase().includes(value.toLowerCase()) ||
                    course.description
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    value === ""
                  ) {
                    return (
                      <div
                        className="my-4 mt-1 me-4 class "
                        onClick={() => navigate("/classes/join/" + course.id)}
                        key={course.id}
                      >
                        <div
                          className="boxshadow  mb-2 mb-5 cp my-4 zoom"
                          style={{
                            width: "190px",
                          }}
                        >
                          <div className="profileclassesimg22">
                            <img
                              src={a}
                              className="classesimg22"
                              alt="classImg"
                            />
                          </div>
                          <Row className="profilest bw m-0 ">
                            <div
                              className="d-flex"
                              style={{
                                overflowX: "hidden",
                              }}
                            >
                              <div className=" w-100 pe-1 ms-1 pt-1 pb-1">
                                <b>
                                  <h5
                                    className="gx py-1 text-dark"
                                    style={{
                                      margin: "auto",
                                      fontSize: "16px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {course.title && course.title.length > 30
                                      ? course.title
                                          .substring(0, 35)
                                          .split(" ")
                                          .slice(0, -1)
                                          .join(" ") + "..."
                                      : course.title}
                                  </h5>
                                </b>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    lineHeight: "1.2",
                                  }}
                                >
                                  {course.description &&
                                  course.description.length > 45
                                    ? course.description
                                        .substring(0, 45)
                                        .split(" ")
                                        .slice(0, -1)
                                        .join(" ") + "..."
                                    : course.description}
                                </p>

                                <div className="  clsfee ">
                                  <div className="d-flex">
                                    <h6 className="gx">
                                      <span className="textgrey">FEE:</span> ₹
                                      {course.price}
                                      <span className="gl">/ person</span>
                                    </h6>
                                  </div>
                                  <div className="d-flex">
                                    <h6 className="gx">
                                      <span className="textgrey"> Type:</span>
                                      {course.duration_type}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </Row>
        </div>
      </Container>
    </Container>
  );
};

export default Classes;
