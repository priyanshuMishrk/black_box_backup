import React from "react";
import { Col, Container } from "react-bootstrap";
import Logo from "../../blackbox-logo-01.png";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = (props) => {
  const nava = useNavigate()
  return (
    <Container
      fluid
      className="m-0 p-0 boxshadow"
      style={{ bottom: 0, zIndex: 999 }}
    >
      {props.feeds ? (
        " "
      ) : (
        <div className="m-0 p-0 footerrow d-flex"
      >
        <Col md={4} className="footercol d-none d-md-block">
          <center>
            <h2 className="gl ">CONTACT</h2>
            <a className="gl moto" href="mailto:learn@blackis.in">learn@blackis.in</a>
          </center>
        </Col>
        <Col
          md={4}
          className="footercol "
          style={{
            borderRight: "1.5px solid #000",
            borderLeft: "1.5px solid #000",
          }}
        >
          <center>
            <div className="icon1 mb-5">
              <h2 className="gl ">CONTACT</h2>
              <a className="gl moto " href="mailto:learn@blackis.in">learn@blackis.in</a>
            </div>
            <img src={Logo} alt="logo" width={230} className="mb-4 pb-2" />
            <p className="gl moto">
              TEACH WHAT YOU LOVE.
              <br />
              LEARN WHAT YOU SEEK.
            </p>
            <div className="w-50 mt-5 d-flex">
              <Col xs={3}>
                <GrFacebookOption size={25} />
              </Col>
              <Col xs={3}>
                <AiOutlineInstagram size={25} />
              </Col>
              <Col xs={3}>
                <AiOutlineTwitter size={25} />
              </Col>
              <Col xs={3}>
                <FaLinkedinIn size={25} />
              </Col>
            </div>
            <div className="icon1 mt-5 cp" onClick={() => {
          nava('/teaching#faq')
        }}>
              <h2 className="gl ">FAQs</h2>
              <p className="gl moto">your questions answered</p>
            </div>
          </center>
        </Col>
        <Col md={4} className="footercol d-none d-md-block cp" onClick={() => {
          nava('/teaching#faq')
        }}>
          <center>
            <h2 className="gl ">FAQs</h2>
            <p className="gl moto">your questions answered</p>
            {/* <a className="gl moto" href="mailto:info@blackis.in">info@blackis.in</a> */}
          </center>
        </Col>
      </div>
      )
      }
    </Container>
  );
};

export default Footer;
