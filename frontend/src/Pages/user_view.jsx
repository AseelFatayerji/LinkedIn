import "../CSS/App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function User_view() {
  const getId = () =>{
    const url = window.location.href
    return url[url.length-1];
  }
  const data = getId();

  const displayinfo = () => {
    const info = document.createElement("ul");
    const form = new FormData();
    form.append("id", data);
    axios
      .post(
        "http://localhost/fullstack/LinkedIn/backend/display_user_view.php",
        form
      )
      .then((resp) => {
        const items = Object.keys(resp.data).map((item) => {
          const value = document.createElement("li");
          value.innerText = item + ":" + resp.data[item];
          info.appendChild(value);
        });
        document.getElementById("container").appendChild(info);
        const postfrom = new FormData();
        postfrom.append("user_id", data);
        axios
          .post(
            "http://localhost/fullstack/LinkedIn/backend/display_user_posts.php",
            postfrom
          )
          .then((resp) => {
            const data = resp.data;
            const posts = document.createElement("ul");
            const items = resp.data.map((key, index) => {
              const value = document.createElement("li");
              value.innerText =
                data[index].post_info + ": " + data[index].post_img;
              posts.appendChild(value);
            });
            document.getElementById("posts").appendChild(posts);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    displayinfo();
  }, []);
  return (
    <div className="User_view">
      User_view
      <div id="container"></div>
      Posts
      <div id="posts"></div>
      
    </div>
  );
}

export default User_view;
