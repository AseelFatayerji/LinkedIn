import "../CSS/App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Company_view() {
  const getId = () =>{
    const url = window.location.href
    return url[url.length-1];
  }
  const data = getId();
  const follow = () =>{
    const user = localStorage.getItem("id")
    const form = new FormData()
    form.append("id",data)
    form.append("user",user)
    axios.post(
      "http://localhost/fullstack/LinkedIn/backend/following.php",
      form
    ).then ((_)=>{
    }).catch((err)=>{
      console.log(err)
    })
  }
  const displayinfo = () => {
    const info = document.createElement("ul");
    const form = new FormData();
    form.append("id", data);
    axios
      .post(
        "http://localhost/fullstack/LinkedIn/backend/display_company_view.php",
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
        postfrom.append("company_id", data);
        axios
          .post(
            "http://localhost/fullstack/LinkedIn/backend/display_company_posts.php",
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
        axios
          .post(
            "http://localhost/fullstack/LinkedIn/backend/display_job_posts.php",
            postfrom
          )
          .then((resp) => {
            const data = resp.data;
            const posts = document.createElement("ul");
            const items = resp.data.map((key, index) => {
              const value = document.createElement("li");
              value.innerText =
                data[index].position +
                " " +
                data[index].requirements +
                " " +
                data[index].salary;
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
    <div className="Company_view">
      Company_view
      <div id="container">
      <input type="button" onClick={()=>{follow()}}>Follow</input>
      </div>

      <div id="posts"></div>

      <div id="jobs"></div>
    </div>
  );
}

export default Company_view;
