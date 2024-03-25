import { Link } from "react-router-dom";
import "../CSS/App.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar_user";
import axios from "axios";
import { useState } from "react";
function Home() {
  const checkloggedin = () => {
    const user = localStorage.getItem("username");
    const comp = localStorage.getItem("companyname");
    if (user != null || comp != null) {
      return true;
    } else {
      return false;
    }
  };
  const [isLoggedin, setLoggedin] = useState(checkloggedin());
  const openProfile = (id) =>{
    window.location.href = "/ViewProfile/" + id;
  }
  const displayposts = () => {
    axios
      .post("http://localhost/fullstack/LinkedIn/backend/display_all_posts.php")
      .then((resp) => {
        const data = resp.data;
        const posts = document.createElement("ul");
        const items = resp.data.map((key, index) => {
          const value = document.createElement("li");
          const view = document.createElement("input");
          view.value = "View profile";
          view.type = "button"
          value.innerText = data[index].post_info + ": " + data[index].post_img;
          if (data[index].user_id != undefined) {
            view.id = data[index].user_id;
            view.onclick = () => {
              const url = "user:"+view.id
              openProfile(url);
            };
            value.appendChild(view);
            posts.appendChild(value);
          } else {
            view.id = data[index].company_id;
            view.onclick = () => {
              const url = "company:"+view.id
              openProfile(url);
            };
            value.appendChild(view);
            posts.appendChild(value);
          }
        });
        document.getElementById("posts").appendChild(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Home">
      {isLoggedin ? <Navbar2 /> : <Navbar />}
      HOME
      <div id="posts">{displayposts()}</div>
    </div>
  );
}

export default Home;
