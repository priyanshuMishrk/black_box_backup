import React, { useContext, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
// import AuthContext from "../../Context/AuthContext";


import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const ImageSlider = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  function netter() {
    if (user) {
      navigate('/class-submission')
    } else {
      navigate('/login?l=2')
    }
  }

  const element1Ref = useRef(null);
  const element2Ref = useRef(null);
  const element3Ref = useRef(null);

  const [currentImg, setCurrentImg] = useState(0);
  const [bannerToshow, setBTshow] = useState(0);
  const [bannerToshow1, setBTshow1] = useState(0);
  const [bannerToshow2, setBTshow2] = useState(0);
  const timeoutRef = useRef(null); // Ref to store the timeout for clearing purposes
  let element1Timeout = null;
  let element2Timeout = null;
  let element3Timeout = null;

  useEffect(() => {
    const elements = [element1Ref.current, element2Ref.current, element3Ref.current];
    // const timeoutRef = useRef(null); // Ensure timeoutRef is initialized

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // clearTimeout(timeoutRef.current); // Clear previous timeout

            // Element 1 in view
            if (entry.target === element1Ref.current && currentImg !== 1) {
              clearTimeout(element1Timeout);
              console.log('in the first entry');
              setCurrentImg(1);
              setBTshow(0);
              element1Timeout = setTimeout(() => {
                console.log('Timeout executed for 1');
                setBTshow(1); // Show banner for element 1 after 2 seconds
                setBTshow1(0)
              }, 2500);
            }
            // Element 2 in view
            else if (entry.target === element2Ref.current && currentImg !== 2) {
              setBTshow1(0);
              console.log('in the second entry');
              clearTimeout(element2Timeout);
              setCurrentImg(2);
              element2Timeout = setTimeout(() => {
                console.log('Timeout executed for 2');
                setBTshow1(1); // Show banner for element 2 after 2 seconds
                setBTshow2(0)
              }, 2500);
            }
            // Element 3 in view
            else if (entry.target === element3Ref.current && currentImg !== 3) {
              clearTimeout(element3Timeout);
              console.log('in the third entry');
              setCurrentImg(3);
              setBTshow2(0);
              element3Timeout = setTimeout(() => {
                console.log('Timeout executed for 3');
                setBTshow2(1); 
                setBTshow(0)// Show banner for element 3 after 2 seconds
              }, 2500);
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when at least 50% of an element is visible
    );

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [currentImg]);



  const Carousel1 = 'https://d1bxlu89wy43u2.cloudfront.net/pexels-klaus-nielsen-6287447.jpg'
  const Carousel2 = 'https://d1bxlu89wy43u2.cloudfront.net/pexels-gabby-k-5384538.jpg'
  const Carousel3 = 'https://d1bxlu89wy43u2.cloudfront.net/pexels-fauxels-3183150.jpg'
  const Carousel4 = 'https://d1bxlu89wy43u2.cloudfront.net/pexels-klaus-nielsen-6287244.jpg'
  const Carousel5 = 'https://d1bxlu89wy43u2.cloudfront.net/laura-adai-5H2ketFL1LE-unsplash.jpg'
  const Carousel6 = 'https://d1bxlu89wy43u2.cloudfront.net/ardian-lumi-6Woj_wozqmA-unsplash.jpg'


  return (
    <Container fluid className="p-0 m-0 w-100">
      <Carousel interval={5000} variant="dark" className="caro">
        <Carousel.Item>
          <img
            className="slideimg"
            src={bannerToshow === 0 ? Carousel1 : Carousel4}
            alt="First slide"
            ref={element1Ref}
          />
          <Carousel.Caption className="c2ko fsbfont">
            <div>LEARN FROM THE BEST</div>
            <button onClick={() => navigate(user ? "/host" : "/login")}>
              Join a class
            </button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="slideimg"
            src={bannerToshow1 === 0 ? Carousel2 : Carousel5}
            alt="Second slide"
            ref={element2Ref}
          />
          <Carousel.Caption className="c2ko fsbfont">
            <div>Make the world your classroom</div>
            <button onClick={netter}>Host a class</button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="slideimg"
            src={bannerToshow2 === 0 ? Carousel3 : Carousel6}
            alt="Third slide"
            ref={element3Ref}
          />
          <Carousel.Caption className="c2ko fsbfont">
            <div>STREAMING</div>
            <button onClick={() => navigate("/streamCom")}>Watch now</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default ImageSlider;
