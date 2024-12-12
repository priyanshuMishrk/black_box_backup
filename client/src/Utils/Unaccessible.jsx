import { Outlet, Navigate } from "react-router-dom";

const Unaccess = () => {
  let token = localStorage.getItem("authTokens");
  return token ? <Navigate to="/profile" /> : <Outlet />  ;
};

export default Unaccess;