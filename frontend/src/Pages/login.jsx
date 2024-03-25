import "../CSS/App.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

function Login() {
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const Authenticate = () => {
    const form = new FormData();
    form.append("email", credentials.email);
    form.append("password", credentials.password);
    axios
      .post("http://localhost/fullstack/LinkedIn/backend/login_user.php", form)
      .then((response) => {
        if (response.data.status === "logged in") {
          const data = response.data;
          localStorage.setItem("username", data.name);
          localStorage.setItem("useremail", data.email);
          localStorage.setItem("userid", data.user_id);
          nav("/Profile/username:" + data.name, { state: { id: data } });
        } else {
          axios
            .post(
              "http://localhost/fullstack/LinkedIn/backend/login_company.php",
              form
            )
            .then((response) => {
              if (response.data.status === "logged in") {
                const data = response.data;
                localStorage.setItem("companyname", data.company_name);
                localStorage.setItem("companyid", data.company_id);

                nav("/Profile/company:" + data.company_name, {
                  state: { id: data },
                });
              } else {
                console.log(response);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <Navbar />
      <form>
        <input
          type="email"
          name="name"
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
        <input type="button" value="Login" onClick={Authenticate} />
        <a href="/Signup">No account</a>
      </form>
    </div>
  );
}

export default Login;
