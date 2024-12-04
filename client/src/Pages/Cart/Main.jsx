import React, { useEffect, useState } from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ImageSlider from "../../Components/Home/ImageSliderStream";
import { useNavigate } from "react-router-dom";
import lien1 from "../../Images/group-line.svg"
import { BaseUrl } from "../../Context/AuthContext";
import axios from "axios";

const Cart = () => {

  const [coursesInCart, setCoursesInCart] = useState([])
  const [total, setTotal] = useState(0)

  const calculateTotalPrice = () => {
    if (coursesInCart && coursesInCart.length > 0) {
      const j = coursesInCart.reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + price;
      }, 0);

      setTotal(j)
    }
  };

  function formatDate(obj) {
    // Parse the date string into a Date object
    const dateObj = new Date(obj.date);
    // Get the day, month, and year
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    // Format the date as desired
    const daySuffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    return `${day}${daySuffix} ${month}, ${year}`;
  }

  function formatTime(obj) {
    // Parse the time string into a Date object
    const [hours, minutes] = obj.time.split(':').map(Number);
    const startTimeObj = new Date();
    startTimeObj.setHours(hours, minutes);

    // Calculate the end time by adding the duration
    const durationMinutes = Number(obj.duration);
    const endTimeObj = new Date(startTimeObj.getTime() + durationMinutes * 60000);

    // Format the start and end times as desired
    const formatTime = (dateObj) => {
      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      return `${formattedHours}:${formattedMinutes}${ampm}`;
    };

    return `${formatTime(startTimeObj)} - ${formatTime(endTimeObj)}`;
  }

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );

  async function delOfCart(id, type) {
    const data = {
      id,
      type
    }
    const res = await axios.patch(BaseUrl + `/cart`,
      data,
      {
        params: data,
        headers: { Authorization: `Bearer ${authTokens}` },
      }
    );
    const res2 = await axios.get(BaseUrl + `/cart`,
      {
        headers: { Authorization: `Bearer ${authTokens}` },
      }
    );
    const clss = res2.data.classes
    const course = res2.data.courses
    const s = clss.concat(...course)
    setCoursesInCart(s)
  }

  async function moveToWishList(id, typee) {
    const data = {
      id,
      type: typee
    }
    console.log(data)
    const res = await axios.post(BaseUrl + `/wishlist`,
      data,
      {
        params: data,
        headers: { Authorization: `Bearer ${authTokens}` },
      }
    );
    delOfCart(id,typee)
  }

  useEffect(() => {
    async function subsOfCart() {
      const res = await axios.get(BaseUrl + `/cart`,
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        }
      );
      const clss = res.data.classes
      const course = res.data.courses
      const s = clss.concat(...course)
      setCoursesInCart(s)
    }
    subsOfCart()
  }, [])

  useEffect(() => {
    calculateTotalPrice()
  }, [coursesInCart])


  return (
    <>
      <Header />

      <div className="cartMain">
        <div className="head">
          <span className="main gb">
            My Cart
          </span>
          <span className="desc gm">
            {coursesInCart ? coursesInCart.length : 0} Classes in Cart
          </span>
        </div>

        {coursesInCart && coursesInCart.length > 0 && <div className="cart-view">
          <div className="cart-item">
            {coursesInCart && coursesInCart.length > 0 && coursesInCart.map((item, index) => (
              <div className="item" key={index}>
                <div className="item-1-1">
                  <img src={item.img[0]?.url} alt="" />
                </div>
                <div className="desc">
                  <div className="name gb">
                    {item.title}
                  </div>
                  <div className="auth gm">{`${item.user.first_name} ${item.user.last_name}`}</div>
                  <div className="dttt gm">
                    <span className="timem">
                      {/* Assuming date is an array with date string at first index */}
                      {
                        formatDate(item.date[0])
                      }
                    </span>
                    <span className="rating">
                      <span style={{ color: "#F8F3E3", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>&#9733;</span>
                      {/* Assuming you have a rating property */}
                      {'4.2'}
                    </span>
                  </div>
                </div>
                <div className="priceInCart">
                  <div className="priceforItemInCart gsb">
                    ₹{item.price}
                  </div>
                  <div className="removeforItemInCart gm" onClick={
                    () => {
                      delOfCart(item.id, `${item.date.length > 1 ? 'course' : 'class'}`)
                    }
                  }>
                    Remove
                  </div>
                  <div className="whishlistforItemInCart gm" onClick={
                    () => {
                      moveToWishList(item.id, `${item.date.length > 1 ? 'course' : 'class'}`)
                    }
                  }>
                    Move to Wishlist
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-bill">
            <span className="totoal gm">
              Total :
            </span>
            <span className="finalPrice gsb">
              ₹ {total}
            </span>
            <span className="checkOutButt gm">
              Checkout
            </span>
            <div className="bgGreyLine">

            </div>
          </div>
        </div>}

        {
          coursesInCart && coursesInCart.length === 0 &&
          <div className="fsbfont aosjdojdfof">
            No classes added
          </div>
}
      </div>

      <div className="cartSuggestion">

      </div>

    </>)
}

export default Cart;