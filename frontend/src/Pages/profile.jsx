import "../CSS/App.css";
import Navbar from "./navbar_user";
import { useState } from "react";
import User_profile from "./user_profile";
import Company_profile from "./company_profile";

function Profile() {
  const name = localStorage.getItem("username")
  const company = localStorage.getItem("companyname")
  const checkloggedin = () =>{
    const user = localStorage.getItem("username")
    if( name != null){
      return true
    }
    else if (company != null){
      return false
    }
  }
  const [checkUser,setUser] = useState(checkloggedin())
  return (
    <div className="Profile">
      <Navbar />
      profile
      {checkUser ? (<User_profile />) : (<Company_profile />)}
    </div>
  );
}

export default Profile;
