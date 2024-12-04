import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import FormWithSections from './ClassInfo';
import ClassPricing from './Pricing';
import Verification from './Verification';
import PreviewClass from './Preview';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../Context/AuthContext';
import axios from "axios";
import Cookies from 'js-cookie';



const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: 'none',
  display: 'flex',
  justifyContent: 'space-between',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  flexGrow: 1,  // Ensure equal width for all tabs
  width: '25%',  // Each tab takes 25% of the width for four tabs
  maxWidth: 'none',
  flexBasis: '25%',  // Explicitly set flex basis to ensure equal width
  cursor: 'default',
  '&.klout': {
    borderBottom: 'none',
    borderTop: '0.5vw solid #FFCB00',
    color: 'black',
    textTransform: 'capitalize',
    fontFamily: 'Figtree-Regular',
    cursor: 'default'

  },
  '&:not(.klout)': {
    borderBottom: 'none',
    borderTop: '0.5vw solid #0000001F',
    color: '#000000A3',
    textTransform: 'capitalize',
    fontFamily: 'Figtree-Regular',
    cursor: 'default'
  },
  '&.Mui-selected': {
    color: 'black',
    fontFamily: 'Figtree-Regular',
    cursor: 'default'
  },
}));

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );

  function hasAllKeys(obj) {
    const requiredKeys = [
      "languageOfClass", "date", "title", "description", "trainerBio",
      "classStructure", "studentsWho", "requirements", "studentLim",
      "price", "accN", "bankN", "holderN", "accTpe",
      "ifsc", "img"
    ];
  
    const missingKeys = requiredKeys.filter(key => !(key in obj));
  
    // Check if 'img' key exists and has at least two elements
    if (!obj.img) {
      missingKeys.push("'Image' is required but not provided.");
    } else if (obj.img.length < 2) {
      missingKeys.push("'Image' must have at least two items.");
    }
  
    // If there are missing keys, return them
    if (missingKeys.length > 0) {
      return { isValid: false, missingKeys };
    }
  
    // If all keys are present
    return { isValid: true, missingKeys: [] };
  }
  
  const uiid = localStorage.getItem('User')
  const [userProfile, setuserr] = useState({})

    useEffect(() => {
        async function getPr() {
            let reqOptions = {
                url: `${BaseUrl}/profileDetails/other?id=${uiid}`,
                method: "GET",
            }

            let response = await axios.request(reqOptions);
            console.log(response.data);
            setuserr(response.data)
          }

        getPr()
    },[])

  const handleNextTab = () => {
    if (activeTab === 2) {
      if (!userProfile.img || userProfile.img === ''){
        return alert(`Please add a profile image before hosting a class`)
      }
      const bool = hasAllKeys(Object.assign({}, section1v, section2v, section3v))
      if (!bool.isValid) {
        return alert(`${bool.missingKeys.join(', ')} Please fill all the details`)
      }

    }
    setActiveTab((prevTab) => (prevTab < 3 ? prevTab + 1 : prevTab));
  };

  const handlePreviousTab = () => {
    setActiveTab((prevTab) => (prevTab > 0 ? prevTab - 1 : prevTab));
  };

  const nav = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  async function nava() {
    const data = Object.assign({}, section1v, section2v, section3v)
    console.log(data)
    const res = await axios.post(BaseUrl + `/classInfo`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
    console.log(res)
    clearCookies()
    nav("/tandC")
  }

  const [account, setAcc] = useState({
    accN: '',
    bankN: '',
    holderN: '',
    accTpe: '',
    ifsc: ''
  })

  const [isTeacher, setIsTeacher] = useState(false)
  const id = localStorage.getItem("User");
  useEffect(() => {
    async function teachedVerify() {
      const res = await axios.get(BaseUrl + `/isTeacher?id=${id}`);
      setIsTeacher(res.data)
    }

    teachedVerify()

  }, [])

  useEffect(() => {
    async function getAccountDetails() {
      const res = await axios.get(BaseUrl + `/accountInfo/my`,
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
      console.log(res.data)
      if (isTeacher) {
        section2v({
          accN: res.data.accN,
          bankN: res.data.bankN,
          holderN: res.data.holderN,
          accTpe: res.data.accTpe,
          ifsc: res.data.ifsc
        })
      }

    }

    getAccountDetails()
  }, [])

  const [section1v, setSection1v] = useState({
    languageOfClass: "English"
  });
  const [section2v, setSection2v] = useState({});
  const [section3v, setSection3v] = useState({});

  const jett2 = (tab, obj, volva) => {
    // console.log("fdosajdoasjdoasjd")
    if (tab === 1) {
      setSection1v(prevObject => ({
        ...prevObject,
        [obj]: volva
      }))
    } else if (tab === 2) {
      setSection2v(prevObject => ({
        ...prevObject,
        [obj]: volva
      }))
    } else if (tab === 3) {
      setSection3v(prevObject => ({
        ...prevObject,
        [obj]: volva
      }))
    }

    setTimeout(() => {
      saveToCookies();
    }, 100);

  };

  const jett = (tab, obj, volva) => (event) => {
    console.log(tab , obj , volva)
    if (obj === 'description') {
        console.log(event)
      const words = event.replace(/<\/?[^>]+(>|$)/g, "").split(/\s+/); // Removing HTML tags and splitting by whitespace
      console.log(words.length)
      if (words.length > 50) {
        return 
      }
    }
    // console.log("fdosajdoasjdoasjd")
    let value;
    if (event) {
      value = typeof event !== 'string' && tab !== 3 ? event.target.value : event
    }
    if (tab === 1) {
      setSection1v(prevObject => ({
        ...prevObject,
        [obj]: volva ? volva : value
      }))
    } else if (tab === 2) {
      setSection2v(prevObject => ({
        ...prevObject,
        [obj]: volva ? volva : value
      }))
    } else if (tab === 3) {
      setSection3v(prevObject => ({
        ...prevObject,
        [obj]: volva ? volva : value
      }))
    }


    setTimeout(() => {
      saveToCookies();
    }, 100);
  };

  const gett = (tab, obj) => {
    if (tab === 1) {
      return section1v[obj]
    } else if (tab === 2) {
      console.log(section2v[obj], obj)
      return section2v[obj]
    } else if (tab === 3) {
      return section3v[obj]
    }
    console.log(section1v)
  };



  const saveToCookies = () => {
    Cookies.set('state1', JSON.stringify(section1v), { expires: 0.0104 }); // 15 minutes = 0.0104 days
    Cookies.set('state2', JSON.stringify(section2v), { expires: 0.0104 });
    Cookies.set('state3', JSON.stringify(section3v), { expires: 0.0104 });
  };


  const clearCookies = () => {
    Cookies.remove('state1cls');
    Cookies.remove('state2cls');
    Cookies.remove('state3cls');
  };



  // Use this to retrieve the state from cookies if needed
  useEffect(() => {
    const savedState1 = Cookies.get('state1');
    const savedState2 = Cookies.get('state2');
    const savedState3 = Cookies.get('state3');

    if (savedState1) setSection1v(JSON.parse(savedState1));
    if (savedState2) setSection2v(JSON.parse(savedState2));
    if (savedState3) setSection3v(JSON.parse(savedState3));
  }, []);


  return (
    <>
      <Header />
      <div className="tacHead fbfont">
        Teach a Class
      </div>
      <div className="tabs-container mt-4">
        <StyledTabs value={activeTab}
          TabIndicatorProps={{ style: { display: 'none' } }}
          className='classTabsForReg'
        >
          <StyledTab label="Class Information" className={activeTab === 0 ? 'klout' : ''} />
          <StyledTab label="Pricing" className={activeTab === 1 ? 'klout' : ''} />
          <StyledTab label="Verification" className={activeTab === 2 ? 'klout' : ''} />
          <StyledTab label="Review" className={activeTab === 3 ? 'klout' : ''} />
        </StyledTabs>
        <TabPanel value={activeTab} index={0}>

          <FormWithSections infoTaker={jett} infoGetter={gett} inf2={jett2} />
          <div className="jakeAndBean">
            <Button variant="contained" color="primary" className='butto2'
              style={{
                fontFamily: 'Figtree-medium'
              }}
              onClick={handleNextTab} >
              Save and Proceed
            </Button>

          </div>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ClassPricing infoTaker={jett} infoGetter={gett} />

          <div className='jakeAndBean2'>
            <Button variant="contained" color="primary" className='butto1' onClick={handlePreviousTab}>
              Back
            </Button>
            <Button variant="contained" color="primary" className='butto2' onClick={handleNextTab} style={{ marginLeft: 10 }}>
              Save and Proceed
            </Button>

          </div>
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Verification infoTaker={jett2} sect3={section3v} />
          <div className='jakeAndBean2'>
            <Button variant="contained" color="primary" className='butto1' onClick={handlePreviousTab}>
              Back
            </Button>
            <Button variant="contained" color="primary" className='butto2' onClick={handleNextTab} style={{ marginLeft: 10 }}>
              Save and Proceed
            </Button>

          </div>
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <PreviewClass infoGetter={gett} sect1={section1v} sect2={section2v} sect3={section3v} />
          <div className='jakeAndBean2'>
            <Button variant="contained" color="primary" className='butto1' onClick={handlePreviousTab}>
              Back
            </Button>
            <Button variant="contained" color="primary" className='butto2' onClick={open} style={{ marginLeft: 10 }}>
              Save and Proceed
            </Button>

          </div>
        </TabPanel>
      </div>

      {isOpen && <div className='popupInCS'>
        <div className='popupInCSW'>
          <span className='prName gsb gyyyta'>
            This is your final submission to the Black box Team
          </span>
          <span className='gyyyta gm jolojoloj'>
            Join me as we embark on a delightful journey into the world of floral painting. In this comprehensive tutorial, we'll unravel the secrets behind creating captivating nasturtium flower paintings, from their graceful shapes to their intricate details
          </span>
          <span className='fbfont d-flex gap-3 jakallakak'>
            <button className='f' onClick={close}>
              Cancel
            </button>
            <button className='t' onClick={nava}>
              Submit
            </button>
          </span>
        </div>
      </div>}
    </>
  );

}

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

export default App;
