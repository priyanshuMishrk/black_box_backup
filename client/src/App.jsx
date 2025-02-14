import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./Utils/PrivateRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Pages/Loader";
// import Home from "./Pages/Home/Home";
import Enter from "./Pages/Home/Enter";
import Main from "./Pages/Home/Main";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Login/Registration2";
import JoinTheClass from "./Pages/Classes/JoinClassInfo";
import JoinTheCourse from "./Pages/Classes/JoinCourseInfo";
import { AuthProvider } from "./Context/AuthContext";
import { SocketProvider } from './Context/SocketContext';
import Profile from "./Pages/Profile/Profile";
import Otp from "./Pages/Login/Otp";
import OtpVerify from "./Pages/Login/OtpVerify";
import Classes from "./Pages/Classes/Classes";
import Join from "./Pages/Classes/Join";
import Host from "./Pages/Classes/Host";
import Burger from "./Pages/Home/Burger";
import Host2 from "./Pages/Classes/Host2";
import Host3 from "./Pages/Classes/Host3";
import LinearStepper from "./Pages/Classes/LinearStepper";
import Privacy from "./Pages/Home/Privacy";
import Terms from "./Pages/Home/Terms";
import { StyleProvider } from "./Context/StyleContext";
import Host4 from "./Pages/Classes/Host4";
import Host5 from "./Pages/Classes/Host5";
import Host6 from "./Pages/Classes/Host6";
import Host7 from "./Pages/Classes/Host7";
import Host8 from "./Pages/Classes/Host8";
import Host9 from "./Pages/Classes/Host9";
import LinearStepper2 from "./Pages/Classes/LinearStepper2";
import LinearStepper3 from "./Pages/Classes/LinearStepper3";
import Choose from "./Pages/Classes/Choose";
import Trainer from "./Pages/Classes/Trainer";
import Edit from "./Pages/Login/Edit";
import EditCourse from "./Pages/Classes/EditCourse";
import BasicTabs from "./Pages/Profile/FriendsTabPanel";
import Change from "./Pages/Login/Change";
import Social from "./Pages/Login/Social";
// import ClassroomLogin from "./Components/Classroom/Login";
import ClassroomRegistration from "./Components/Classroom/Register";
import Classroom from "./Components/Classroom/Classroom";
import Editclssroom from "./Components/Classroom/Editclssroom";
import Hostclassroom from "./Components/Classroom/Hostclassroom";
import UImeeting from "./integration/UImeeting";
import UIjoinmeeting from "./integration/UIjoinmeeting";
import AdminLogin from "./Pages/Admin/Login";
import Streamings from "./Pages/Streaming/Streampage"
import ClassesOnGoing from "./Pages/Classes/ClaasesGoing";
import Streaming from "./Pages/Streaming/OngoingStream";
import Room from "./Pages/Streaming/Room";
import Joins from "./Pages/Streaming/Audience";
import ClassEnter from "./Pages/Classes/DemoClass";
import StartClass from "./Pages/Classes/HostClass";
import JoinClass from "./Pages/Classes/JoinClass";
import StreamSt from "./Pages/Streaming/Stream";
import CalendarIcon from "./Components/Classroom/Callendar";
import ClassroomJoinForm from "./Components/Classroom/JoinClassroom";
import TeachFlowFirst from "./Pages/TeachFlow/First";
import Questions from "./Pages/TeachFlow/Questions";
import ProfileV2 from "./Pages/Profile/ProfileV2";
import ClassHoster from "./Pages/Classes/ClassHosting";
import TACD from "./Pages/Classes/TACD";
import Confirmation from "./Pages/Classes/Confirmation";
import ClassView from "./Pages/Classes/ClassView";
import Cart from "./Pages/Cart/Main";
import ScrollToTop from "./Components/Common/ScrollToTop";
import CourseHosting from "./Pages/Classes/CourseHosting";
import Learn from "./Pages/Classes/Learn";
import LoggedInHP from "./Pages/Home/homePage";
import Friends from "./Pages/Friends/FriendsTab";
import MyProfile from "./Pages/Profile/MyProfile";
import ViewProfileV2 from "./Pages/Profile/ViewProfile";
import MainV2 from "./Pages/Home/MainV2";
import Unaccess from "./Utils/Unaccessible";
import MyNewProfile from "./Pages/Profile/myNewProfile";
import MyProfileV8 from "./Pages/Profile/FinalViewProfile";
import MyProfileV8Classes from "./Pages/Profile/MyClasses";
import MyProfileV8ClassesAtten from "./Pages/Profile/AttendingClasses";
import MyProfileV8ClassesWish from "./Pages/Profile/WishlistClasses";
import MyProfileV8ClassesActivity from "./Pages/Profile/MyActivity";
import MyProfileV8ClassesPrivacy from "./Pages/Profile/MyPrivacy";
import OtherProfileV8 from "./Pages/Profile/otherProfile";
import StreamEnterHome from "./Pages/Streaming/Enter";
import StreamingForm from "./Pages/Streaming/StarterStream";
import SearchPage from "./Pages/Search Page/Manifest";
import ReviewClassCourse from "./Pages/Classes/Review";
import ClassroomFlowFirst from "./Pages/Classroom/Enter";
import ClassroomFlowSecond from "./Pages/Classroom/ClassroomTab";
import ClassroomHub from "./Pages/Classroom/ClassroomHub";
import ClassroomSessSubmit from "./Pages/Classroom/ClassInfo";
import ClassrHostLL from "./Pages/Classroom/ClassHosting";
import JoinTheSession from "./Pages/Classroom/ClassroomSession";
import JoinSession from "./Pages/Classroom/ClassroomMeet";
import HostSession from "./Pages/Classroom/ClassroomHost";
import LoggedInHP2 from "./Pages/Home/homePageV2";
import LoginClr from "./Pages/Classroom/ClassroomLogin";
import SignUpClr from "./Pages/Classroom/ClassroomSignup";
import ChatsOn from "./Pages/Chats/Enter";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <StyleProvider>
          <AuthProvider>
            <SocketProvider>

            
            <ToastContainer />
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/join/:roomid" element={<Joins/>}/>
              <Route path="/qna" element={<Questions/>} />
              <Route path="/streaming" element={<Streaming/>}/>
              <Route path="/room/:roomid" element={<Room/>}/>
              <Route path="/review/:roomid" element={<ReviewClassCourse/>}/>
              

              {/* <Route path="/classroom/join/:id" element={<ClassroomJoinForm/>}/> */}

              <Route path="/class/join/:roomid" element={<JoinClass/>}/>
              <Route path="/class/start" element={<ClassEnter/>}/>
              <Route path="/class/host/:roomid" element={<StartClass/>}/>
              <Route path="/" element={<Enter />} />
              <Route path="/123308" element={<ClassesOnGoing />} />
              {/* <Route path="/main" element={<Main />} /> */}
                <Route path="/loadingProfile" element={<Loader/>}/>

              <Route element={<Unaccess/>}>
              <Route path="/main" element={<MainV2 />} />
              </Route>
              <Route path="/streamCom" element={<StreamEnterHome/>} />
              <Route element={<PrivateRoutes />}>
                <Route path="friends" element={<Friends/>} />
                <Route path="/host" element={<Choose />} />
                <Route path="/hosting" element={<LinearStepper />} />
                <Route path="/hosting2" element={<LinearStepper2 />} />
                <Route path="/hosting3" element={<LinearStepper3 />} />
                <Route path="/profile" element={<LoggedInHP />} />
                <Route path="/profile2" element={<LoggedInHP2 />} />
                <Route path="/edit/profile" element={<Edit />} />
                <Route path="/editProfile" element={<ProfileV2 />} />
                <Route path="/edit/course/:id" element={<EditCourse />} />
                <Route path="/myclasses" element={<BasicTabs />} />
                <Route path="/class-submission" element={<ClassHoster />} />
                <Route path="/course-submission" element={<CourseHosting />} />
                <Route path="/tandC" element={<TACD />}/>
                <Route path="/classSubmitted" element={<Confirmation />}/>
                <Route path="/profileV2" element={<ProfileV2 />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/home" element={<LoggedInHP/>}/>
                <Route path="/myprofile" element={ <MyProfileV8/> }/>
                <Route path="/viewProfileV2" element={<MyProfileV8 />} />
                <Route path="/viewProfileV2/classes" element={<MyProfileV8Classes />} />
                <Route path="/viewProfileV2/classes/attending" element={<MyProfileV8ClassesAtten />} />
                <Route path="/viewProfileV2/classes/wishlist" element={<MyProfileV8ClassesWish />} />
                <Route path="/viewProfileV2/classes/activity" element={<MyProfileV8ClassesActivity />} />
                <Route path="/viewProfileV2/classes/privacy" element={<MyProfileV8ClassesPrivacy />} />
                <Route path="/otherProfile/:id2" element={<OtherProfileV8 />} />
                <Route path="/Stream_Host" element={<StreamSt />} />
                <Route path="/chat" element={<ChatsOn />} />

              </Route>
              <Route path="/learn1" element={<Learn />} />
                <Route path="/classV2/:id" element={<JoinTheClass />} />
                <Route path="/courseV2/:id" element={<JoinTheCourse />} />
                <Route path="/classLinkV2" element={<JoinTheClass />} />
              <Route path="/myProfileV2" element={<MyNewProfile/>} />
              <Route path="/host" element={<Host />} />
              <Route path="/host/2" element={<Host2 />} />
              <Route path="/host/3" element={<Host3 />} />
              <Route path="/host/4" element={<Host4 />} />
              <Route path="/host/5" element={<Host5 />} />
              <Route path="/host/6" element={<Host6 />} />
              <Route path="/host/7" element={<Host7 />} />
              <Route path="/host/8" element={<Host8 />} />
              <Route path="/host/9" element={<Host9 />} />

              <Route path="/nav" element={<Burger />} />
              <Route path="/classes" element={<Learn />} />
              <Route path="/classes/join/:id" element={<Join />} />
              <Route path="/trainer/:id" element={<Trainer />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* <Route path="/classroom/login" element={<ClassroomLogin />} /> */}
              {/* <Route
                path="/classroom/register"
                element={<SignUpClr />}
              />
              <Route path="/classroom/edit" element={<Editclssroom />} />
              <Route path="/classroom" element={<Classroom />} />
              <Route path="/classroom/host" element={<Hostclassroom />} /> */}

              <Route path="/login" element={<Login />} />
              {/* <Route path="/loginClr" element={<LoginClr />} />
              <Route path="/signupClr" element={<SignUpClr />} /> */}
              <Route path="/otplogin" element={<Otp />} />
              <Route path="/otpverify" element={<OtpVerify />} />
              <Route path="/change-password" element={<Change />} />
              <Route path="/streams" element={<Streamings />} />
              <Route path="/signup" element={<Registration />} />
              <Route path="/social/:subUrl" element={<Social />} />
              <Route path="/meeting" element={<UImeeting />} />
              <Route
                path="/joinmeeting/:type/:course_id/:meeting_id/"
                element={<UIjoinmeeting />}
              />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/cal" element={<CalendarIcon/>}/>
              <Route path="/teaching" element={<TeachFlowFirst/>} />
              {/* <Route path="/classroomv2" element={<ClassroomFlowFirst/>} />
              <Route path="/classroomv2/join" element={<ClassroomFlowSecond/>} />
              <Route path="/classroomv2/hub" element={<ClassroomHub/>} />
              <Route path="/classroomv2/hub/host" element={<ClassrHostLL/>} />
              <Route path="/classroomv2/session/:id" element={<JoinTheSession />} />
              <Route path="/classroomv2/meet/:clid/:roomid" element={<JoinSession />} />
              <Route path="/classroomv2/host/:clid/:roomid" element={<HostSession />} /> */}
            </Routes>
            </SocketProvider>
          </AuthProvider>
        </StyleProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
