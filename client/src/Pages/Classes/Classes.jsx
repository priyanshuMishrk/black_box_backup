import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import axios from "axios";

const Classes = () => {

  function sortClassesByEarliestDate(classes) {
    return classes.sort((a, b) => {
      let aEarliestDate = new Date(Math.min(...a.date.map(d => new Date(`${d.date}T${d.time}`))));
      let bEarliestDate = new Date(Math.min(...b.date.map(d => new Date(`${d.date}T${d.time}`))));
      return aEarliestDate - bEarliestDate;
    });
  }

  const { goToTop, getCoursesList, courseList, value, user } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    goToTop();
    getCoursesList();
    // eslint-disable-next-line
  }, []);

  const renderClasses = () => {
    if (!clss || clss.length === 0) {
      return null;
    }




    const filteredCourses = clss.filter(
      (cls) =>
        cls.title.toLowerCase().includes(value.toLowerCase()) ||
        cls.description.toLowerCase().includes(value.toLowerCase()) ||
        value === ""
    );

    const rows = [];
    for (let i = 0; i < filteredCourses.length; i += 4) {
      const coursesInRow = filteredCourses.slice(i, i + 4);
      rows.push(
        <Row key={i} className=" p-4 pb-0 pt-0">
          {coursesInRow.map((course, index) => (
            <Col key={index} md={3}>
              {renderClass(course)}
            </Col>
          ))}
        </Row>
      );
    }
    return rows;
  };

  function filterObjects(objects) {
    const excludedKeys = ["accN", "bankN", "holderN", "accTpe", "ifsc", "upi", 'currency',  'users'];

    return objects.filter(obj => {
        return Object.keys(obj).every(key => {
            if (excludedKeys.includes(key)) {
                return true;
            }
            const value = obj[key];
            if (Array.isArray(value)) {
                return value.length > 0 && value.every(subObj => filterObjects([subObj]).length > 0);
            }
            return value !== undefined && value !== null && value !== "";
        });
    });
}

  let [clss, setCls] = useState([])
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );

  useEffect(() => {
    async function getter() {
      const res = await axios.get(BaseUrl + `/classInfo/all`,
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        });

      const res2 = await axios.get(BaseUrl + `/courseInfo/all`,
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        });

        const d1 = res.data
        const d2 = res2.data

        let d3 = d1.concat(...d2)
        d3 = sortClassesByEarliestDate(d3)

      // setCurrentClasses(res.data)
      if (user) {
        const check = user.email.split('@')
        if (check[1] === 'blackis.in') {
          const d = filterObjects(d3)
          setCls(d)
        }
        else {
          const dataArray = d3
          console.log(dataArray)
          const filteredArray = dataArray.filter(item => item.verified);
          const d = filterObjects(filteredArray)
          setCls(d)
        }
      }
      else {
        const dataArray = d3
        console.log(dataArray)
        const filteredArray = dataArray.filter(item => item.verified);
        const d = filterObjects(filteredArray)
        setCls(d)
      }
    }
    getter()
  }, [])

  const renderClass = (cls) => {
    const a = cls.img && cls.img.length > 0 ? cls.img[0].url : "";
    return (
      <div
        className="rounded-4 mb-2 mb-5 cp ssh bgw"
        style={{
          width: "23vw",
          height: "37vw "
        }}
        onClick={() => navigate(`${cls.date.length > 1 ? `/courseV2/${cls.id}` : `/classV2/${cls.id}`}`)}
      >
        <div className="profileclassesimg22">
          <img src={a} className="classesimg22" alt="" />
        </div>
        <div className="d-flex" style={{ overflowX: "hidden", paddingTop: "1vw" }}>
          <img src={cls.user.img_thumbnail} alt="nothingcool" className="dfimg" />
          <div className="cDiv">
            <span className="ctitle gb">{cls.title}</span>
            <span className="cName gsb">
              {`${cls.user.first_name} ${cls.user.last_name}`}
            </span>
          </div>

        </div>
      </div>
    );
  };

  return (
    <Container fluid className="p-0 m-0 bggrey">
      <Header />
      <Container fluid className="p-0 m-0 white"></Container>
      <Container fluid className="mb-5 m-0 p-0 bggrey">
        <Container fluid className="p-0 m-0 d-flex justify-content-center classescontainer w-100">
          <Container className="p-0 m-0 mb-5">
            <div className="d-flex justify-content-center flex-column w-100">
              <div>
                <h2 className="text-center gx my-5 ml-4 classTitleX">CLASSES</h2>
              </div>
              {renderClasses()}
            </div>
          </Container>
        </Container>
      </Container>
      <Footer />
    </Container>
  );
};

export default Classes;
