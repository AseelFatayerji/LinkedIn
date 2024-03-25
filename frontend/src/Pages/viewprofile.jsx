import "../CSS/App.css";
import Navbar from "./navbar_user";
import { useState } from "react";
import User_view from "./user_view";
import Company_view from "./company_view";

function ViewProfile() {
  const checkloggedin = () =>{
    const url = window.location.href
    if( url.includes("user")){
      return true
    }
    else{
      return false
    }
  }
  const [checkUser,setUser] = useState(checkloggedin())
  return (
    <div className="Profile">
      <Navbar />
      profile
      {checkUser ? (<User_view />) : (<Company_view />)}
    </div>
  );
}

export default ViewProfile;
