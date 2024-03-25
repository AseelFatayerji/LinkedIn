import "../CSS/App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function User_profile() {
  const data = localStorage.getItem("useremail");
  const [credentials, setCredentials] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
    address: "",
  });
  const [post, setPost] = useState({
    id: "",
    info: "",
    img: "",
  });
  const displayinfo = () => {
    const info = document.createElement("ul");
    const form = new FormData();
    form.append("email", data);
    axios
      .post(
        "http://localhost/fullstack/LinkedIn/backend/display_user.php",
        form
      )
      .then((resp) => {
        const items = Object.keys(resp.data).map((item) => {
          const value = document.createElement("li");
          value.innerText = item + ":" + resp.data[item];
          info.appendChild(value);
        });
        localStorage.setItem("id", resp.data.user_id);
        credentials.id = resp.data.user_id;
        credentials.name = resp.data.name;
        credentials.lastname = resp.data.lastname;
        credentials.password = resp.data.password;
        credentials.address = resp.data.address;
        credentials.email = resp.data.email;
        post.id = resp.data.user_id;
        document.getElementById("container").appendChild(info);
        const postfrom = new FormData();
        postfrom.append("user_id", credentials.id);
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
          axios
          .post(
            "http://localhost/fullstack/LinkedIn/backend/display_apps.php",
            postfrom
          )
          .then((resp) => {
            const data = resp.data;
            const posts = document.createElement("ul");
            const items = data.map((key, index) => {
              const value = document.createElement("li");
              value.innerText =  data[index].position + " " + data[index].requirements + " " + data[index].salary + " ";
              if( data[index].status === 0){
                value.innerText += "Pending"
                posts.appendChild(value);
              }
              else if( data[index].status === 1){
                value.innerText += "Accepted"
                posts.appendChild(value);
              }
              else{
                value.innerText += "Rejected"
                posts.appendChild(value);
              }

              
            });
            document.getElementById("apps").appendChild(posts);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const edit = () => {
    const form = new FormData();
    form.append("password", credentials.password);
    form.append("email", credentials.email);
    form.append("lastname", credentials.lastname);
    form.append("name", credentials.name);
    form.append("address", credentials.address);
    form.append("id", data);
    axios
      .post("http://localhost/fullstack/LinkedIn/backend/edit_user.php", form)
      .then((resp) => {
        localStorage.setItem("useremail", credentials.email);
        window.location.href = "/Profile/username:" + credentials.name;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createPost = () => {
    const form = new FormData();
    form.append("info", post.info);
    form.append("img", post.img);
    form.append("id", post.id);
    axios
      .post(
        "http://localhost/fullstack/LinkedIn/backend/create_user_post.php",
        form
      )
      .then((_) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    displayinfo();
  }, []);
  return (
    <div className="User_profile">
      User_profile
      <div id="container"></div>
      <form>
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
        <button onClick={edit}>Edit info</button>
      </form>
      <div id="posts"></div>
      <form>
        <input
          type="text"
          placeholder="post"
          onChange={(e) => {
            setPost({
              ...post,
              info: e.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="url"
          onChange={(e) => {
            setPost({
              ...post,
              img: e.target.value,
            });
          }}
        />
        <input type="button" onClick={createPost} value="Create Post" />
      </form>
      <div id="apps"></div>
      <div id="following"></div>
    </div>
  );
}

export default User_profile;
