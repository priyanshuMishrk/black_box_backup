import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Carousel3 from "../../Images/Carousel/carousel3.jpg";
import Carousel4 from "../../Images/Carousel/carousel4.jpg";
import { useNavigate } from "react-router-dom";

const ImageSlider = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="p-0 w-100 mt-10">
      <Carousel variant="dark" className="caro">
        <Carousel.Item>
          <img
            className="slideimg "
            src="https://ik.imagekit.io/Michu/BlackBox/A_8IkCQUbCwI.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1663565505200"
            alt="Second slide"
            style={{
              objectPosition: "top",
            }}
          />
          <Carousel.Caption>
            <p id="liveText" className="gx">LIVE</p>
          </Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            className="slideimg "
            src="https://ik.imagekit.io/Michu/BlackBox/B_03SngjxZ2.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1663565484866"
            alt="First slide"
            style={{
              objectPosition: "bottom",
            }}
          />
          <Carousel.Caption >
          <p id="liveText" className="gx">LIVE</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="slideimg " src={Carousel3} alt="Third slide" />
          <Carousel.Caption>
          <p id="liveText" className="gx">LIVE</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="slideimg " src={Carousel4} alt="Third slide" />
          <Carousel.Caption>
          <p id="liveText" className="gx">LIVE</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default ImageSlider;
