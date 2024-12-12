// TabsComponent.js
import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import axios from "axios";
import star from '../../Images/star.svg'
import wishlist from "../../Images/wishlist.svg"
import wishlist2 from "../../Images/almostLikec.svg"
import wishlist3 from "../../Images/liked.svg"
import wishlist4 from "../../Images/almostDisliked.svg"
import { stringify } from 'uuid';
import { useNavigate } from 'react-router-dom';


const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiTabs-indicator': {
    borderBottom: '0.1vw solid black',
    backgroundColor: 'none'
  }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  flexGrow: 1,  // Ensure equal width for all tabs
  width: '25%',  // Each tab takes 25% of the width for four tabs
  maxWidth: 'none',
  flexBasis: '25%',  // Explicitly set flex basis to ensure equal width
  marginRight: '1vw',
  '&.klout': {
    borderBottom: '0.1vw solid #FFCB00',
    color: 'black',
    textTransform: 'capitalize',
    fontFamily: 'Figtree-Regular'

  },
  '&:not(.klout)': {
    borderBottom: '0.3vw solid #D9D9D9',
    color: '#000000A3',
    textTransform: 'capitalize',
    fontFamily: 'Figtree-Regular'
  },
  '&.Mui-selected': {
    color: 'black',
    fontFamily: 'Figtree-Regular'
  },
}));

const TabPanel12 = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const TabsComponent = () => {
  const {
    user,
    getCourses,
    getClassv
  } = useContext(AuthContext);

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

  function sortClassesByEarliestDate(classes) {
    let classes2 = classes
    return classes2.sort((a, b) => {
      let aEarliestDate = new Date(Math.min(...a.date.map(d => new Date(`${d.date}T${d.time}`))));
      let bEarliestDate = new Date(Math.min(...b.date.map(d => new Date(`${d.date}T${d.time}`))));
      return bEarliestDate - aEarliestDate;
    });
  }

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );

  const [courses, setCls] = useState([])
  const [courses2, setCls2] = useState([])

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

      // setCurrentClasses(res.data)
      if (user) {
        const check = user.email.split('@')
        if (check[1] === 'blackis.in') {
          const d = filterObjects(d3)
          setCls(d)
          const k = sortClassesByEarliestDate(d)
          setCls2(k.reverse())
        }
        else {
          const dataArray = d3
          console.log(dataArray)
          const filteredArray = dataArray.filter(item => item.verified);
          const d = filterObjects(filteredArray)
          setCls(d)
          const k = sortClassesByEarliestDate(d)
          setCls2(k.reverse())
        }
      }
      else {
        const dataArray = d3
        console.log(dataArray)
        const filteredArray = dataArray.filter(item => item.verified);
        const d = filterObjects(filteredArray)
        const k = sortClassesByEarliestDate(d)
        setCls2(k)
        setCls(d)
      }
    }
    getter()
  }, [])
  const navigate = useNavigate()

  let initialState = [];

  useEffect(() => {
    const j = courses2.reduce((acc, item) => {
      acc[item.id] = { liked: 0, currentWish: 1 };
      return acc;
    }, {});
    setStates(j)
  }, [courses2])

  const [states, setStates] = useState(initialState);

  const clickController = (id) => {
    setStates((prevStates) => ({
      ...prevStates,
      [id]: {
        liked: prevStates[id]?.liked === 0 ? 1 : 0,
        currentWish: prevStates[id]?.liked === 0 ? 3 : 1,
      },
    }));
  };

  const controllingHover = (id) => {
    setStates((prevStates) => ({
      ...prevStates,
      [id]: {
        ...prevStates[id],
        currentWish: prevStates[id]?.liked === 0 ? 2 : 4,
      },
    }));
  };

  const controllingHoverOff = (id) => {
    setStates((prevStates) => ({
      ...prevStates,
      [id]: {
        ...prevStates[id],
        currentWish: prevStates[id]?.liked === 0 ? 1 : 3,
      },
    }));
  };

  const [value, setValue] = useState(0);
  const truncateString = (str, num = 30) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function processClassData(classData) {
    // Check if classStructure is a string or array
    let classStructureCheck = Array.isArray(classData.classStructure);

    // Calculate total duration of classes in minutes
    let totalDuration = classData.date.reduce((acc, curr) => {
      return acc + parseInt(curr.duration);
    }, 0);

    // Convert total duration to hours with decimal points for minutes
    let totalHours = totalDuration / 60;
    let durationString = '';

    // Check if totalHours has a decimal part
    if (totalHours % 1 === 0) {
      durationString = `${totalHours} hr${totalHours > 1 ? 's' : ''}`;
    } else {
      totalHours = totalHours.toFixed(1);
      durationString = `${totalHours} hr${totalHours > 1 ? 's' : ''}`;
    }

    // If classStructure is a string
    if (!classStructureCheck) {
      return durationString;
    } else {
      // If classStructure is an array
      return `${classData.date.length} sessions`;
    }
  }

  return (
    <div style={
      { borderBottom: "1px solid #0000001F" }
    }>
      <StyledTabs className='w-50 mt-5' value={value} onChange={handleChange} TabIndicatorProps={{
        style: {
          backgroundColor: 'black', // Black underline for the active tab
        }
      }} aria-label="simple tabs example">
        <StyledTab label="New Classes" />
        <StyledTab label="Trending Classes" />
      </StyledTabs>
      <TabPanel12 value={value} index={0}>
        <div className='d-flex jsodjosjdo'>
          {courses2.map((value, index) => {
            return (<div className="latesCOurseL cp" onClick={() => navigate(`${value.date.length > 1 ? `/courseV2/${value.id}` : `/classV2/${value.id}`}`)} key={index}>
              <div className="img">
                {/* <img
                    key={value.id}
                    className="wishIconLCL"
                    src={states[value.id]?.currentWish === 1 ? wishlist : states[value.id]?.currentWish === 2 ? wishlist2 : states[value.id]?.currentWish === 3 ? wishlist3 : states[value.id]?.currentWish === 4 ? wishlist4 : ""}
                    onMouseEnter={() => controllingHover(value.id)}
                    onMouseLeave={() => controllingHoverOff(value.id)}
                    onClick={() => clickController(value.id)}
                    alt=""
                /> */}
                <img src={value.img[0].url} alt="" />
              </div>
              <div className='LCLDecr'>
                <div className='TitlePri gb'>
                  <span className='LCLTitle'>
                    {truncateString(value.title)}
                  </span>
                  <span className='LCLPrice'>
                    ₹{value.price}
                  </span>
                </div>
                <div className='LCLNameRate'>
                  <span className='LCLName'>
                    {value.user.first_name} {' '}
                    {value.user.last_name.split('')[0]}.
                  </span>
                  <span className='LCLRateTime'>
                    <span className='LCLRate'>
                      <img src={star} alt="" />
                      4.2
                    </span>
                    <span className='LCLTime'>
                      {processClassData(value)}
                    </span>
                  </span>
                </div>
              </div>
            </div>)
          })}
        </div>

      </TabPanel12>
      <TabPanel12 value={value} index={1}>
        <div className='d-flex jsodjosjdo'>
          {courses.map((value, index) => {
            return (<div className="latesCOurseL cp" onClick={() => navigate(`${value.date.length > 1 ? `/courseV2/${value.id}` : `/classV2/${value.id}`}`)} key={index}>
              <div className="img">
                {/* <img
                    key={value.id}
                    className={`wishIconLCL ${ states[value.id]?.currentWish === 1 ? 'oldIconsmall' : ''}`}
                    src={states[value.id]?.currentWish === 1 ? wishlist : states[value.id]?.currentWish === 2 ? wishlist2 : states[value.id]?.currentWish === 3 ? wishlist3 : states[value.id]?.currentWish === 4 ? wishlist4 : ""}
                    onMouseEnter={() => controllingHover(value.id)}
                    onMouseLeave={() => controllingHoverOff(value.id)}
                    onClick={() => clickController(value.id)}
                    alt=""
                /> */}
                <img src={value.img[0].url} alt="" />
              </div>
              <div className='LCLDecr'>
                <div className='TitlePri gb'>
                  <span className='LCLTitle'>
                    {truncateString(value.title)}
                  </span>
                  <span className='LCLPrice'>
                    ₹{value.price}
                  </span>
                </div>
                <div className='LCLNameRate gm'>
                  <span className='LCLName'>
                    {value.user.first_name} {' '}
                    {value.user.last_name.split('')[0]}.
                  </span>
                  <span className='LCLRateTime'>
                    <span className='LCLRate'>
                      <img src={star} className='mb-1' alt="" />
                      4.2
                    </span>
                    <span className='LCLTime'>
                      {processClassData(value)}
                    </span>
                  </span>
                </div>
              </div>
            </div>)
          })}
        </div>
      </TabPanel12>
    </div>
  );
};

export default TabsComponent;










