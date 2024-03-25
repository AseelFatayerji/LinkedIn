import "../CSS/nav.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const name = "username:"+localStorage.getItem("username")
  const company = "company:"+localStorage.getItem("companyname")
  const checkloggedin = () =>{
    const user = localStorage.getItem("username")
    const comp = localStorage.getItem("companyname")
    if( user != null){
      return name
    }
    else if (comp != null){
      return company
    }
  }
  const [checkUser,setUser] = useState(checkloggedin())
  const clearStorage = () =>{
    localStorage.clear()
  }
  return (
    <div className="navBar">
      <div className="home">
            <Link to={"/"+checkUser}>
              Home
            </Link>
          </div>
          <div className="profile">
            <Link to={"/Profile/"+checkUser} >
              Profile
            </Link>
          </div>
          <div className="Jobs">
          <Link to={"/Jobs/"+checkUser}>Jobs</Link>
        </div>
          <div className="login">
          <Link to="/" onClick={clearStorage}>Logout</Link>
        </div>
        
    </div>
  );
}

export default Navbar;
