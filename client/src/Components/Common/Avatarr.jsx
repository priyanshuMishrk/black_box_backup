import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AuthContext from "../../Context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChatIcon from '@mui/icons-material/Chat';
import ExitToApp from '@mui/icons-material/ExitToApp';



const Avatarr = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (user || showClassroomLogout) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/login");
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logoutUser, setShowclasses, scollToRef, user } =
    React.useContext(AuthContext);

  function takeToEdit(){
    navigate('/editProfile')
  }

  function takeToView(){
    navigate('/viewProfileV2')
  }

  function takeToChat(){
    navigate('/chat')
  }

  const pro = localStorage.getItem("propic");
  const emailClr = localStorage.getItem("emailClr");
  const clrId = localStorage.getItem("clrId");
  const tokenClr = localStorage.getItem("tokenClr");
  console.log(location.pathname)
  const showClassroomLogout = tokenClr && location.pathname.startsWith('/classroomv2/');
  console.log(showClassroomLogout)

  const propic = pro ? (pro.includes("{") ? JSON.parse(pro).secure_url : pro) : "";
  const name = localStorage.getItem("name");

  return (
    <>
      <Box sx={{ alignItems: "center", textAlign: "center" }}>
        <Tooltip title="View Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {name ? (
              propic ? (
                <Avatar src={propic} />
              ) : (
                <Avatar sx={{ width: 30, height: 30 }}>
                  {name[0].toUpperCase()}
                </Avatar>
              )
            ) : (
              <Avatar />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        className="d-flex justify-content-center flex-column"
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 15,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {name ? (
          [
            <MenuItem key="profile" onClick={takeToView}>
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              View Profile
            </MenuItem>,
            <MenuItem key="chat" onClick={takeToChat}>
              <ListItemIcon>
                <ChatIcon fontSize="small" />
              </ListItemIcon>
              Chat
            </MenuItem>,
            <MenuItem key="wishlist" onClick={() => navigate('/viewProfileV2/classes/wishlist')}>
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              Wishlist
            </MenuItem>,
            <MenuItem key="logout" onClick={logoutUser}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>,
            showClassroomLogout && (
              <MenuItem key="logoutClassroom" onClick={() => {
                localStorage.removeItem("emailClr");
                localStorage.removeItem("clrId");
                localStorage.removeItem("tokenClr");
                navigate("/signupClr");
              }}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                LogOut Classroom
              </MenuItem>
            )
          ]
        ) : (
[
          <MenuItem onClick={() => navigate("/login")}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>, 
           showClassroomLogout && (
            <MenuItem key="logoutClassroom" onClick={() => {
              localStorage.removeItem("emailClr");
              localStorage.removeItem("clrId");
              localStorage.removeItem("tokenClr");
              navigate("/signupClr");
            }}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Log Out From Classroom
            </MenuItem>
          )  
        ]
        )}
      </Menu>
    </>
  );
};

export default Avatarr;
