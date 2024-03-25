import "../CSS/App.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

function Signup() {
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    address: "",
  });
  const user = () => {
    const form = new FormData();
    form.append("password", credentials.password);
    form.append("address", credentials.address);
    form.append("email", credentials.email);    
    form.append("lastname", credentials.lastname);
    form.append("name", credentials.name);
    
    axios
      .post("http://localhost/fullstack/LinkedIn/backend/user_signup.php", form)
      .then((_) => {        
        localStorage.setItem("username",credentials.name)
        localStorage.setItem("useremail",credentials.email)
        nav("/Profile/username:" + credentials.name, { state: { id: credentials } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const company = () => {
    const form = new FormData();
    form.append("name", credentials.name);
    form.append("email", credentials.email);
    form.append("password", credentials.password);
    axios
      .post(
        "http://localhost/fullstack/LinkedIn/backend/company_signup.php",
        form
      )
      .then((_) => {
        localStorage.setItem("companyname",credentials.name)
        localStorage.setItem("companyemail",credentials.email)
        
        nav("/Profile/copmany:" + credentials.name, { state: { id: credentials } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Signup">
      <Navbar />
      <div className="form"><form>
        <input
          type="text"
          placeholder="firstname"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              name: e.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="lastname"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              lastname: e.target.value,
            });
          }}
        />
        <input
          type="email"
          placeholder="example@gmail.com"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              email: e.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="streetname"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              address: e.target.value,
            });
          }}
        />
        <input
          type="password"
          placeholder="1234567890"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              password: e.target.value,
            });
          }}
        />
        <input type="button" value="Signup" onClick={user} />
      </form>
      <form>
        <input
          type="text"
          placeholder="companyname"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              name: e.target.value,
            });
          }}
        />
        <input
          type="email"
          placeholder="example@gmail.com"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              email: e.target.value,
            });
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="1234567890"
          onChange={(e) => {
            setCredentials({
              ...credentials,
              password: e.target.value,
            });
          }}
        />
        <input type="button" value="Signup" onClick={company} />
      </form></div>
    </div>
  );
}

export default Signup;
