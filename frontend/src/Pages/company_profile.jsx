import "../CSS/App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Company_profile() {
  const data = localStorage.getItem("companyname");
  const [credentials, setCredentials] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
  });
  const [post, setPost] = useState({
    id: "",
    info: "",
    img: "",
  });
  const [job, setJob] = useState({
    id: "",
    desc: "",
    pose: "",
    salary: "",
  });
  const updateApp = (id, stat) => {
    const form = new FormData();
    form.append("stat", stat);
    form.append("id", id);
    axios
      .post("http://localhost/fullstack/LinkedIn/backend/edit_app.php", form)
      .then((resp) => {
        console.log(resp.data);
        window.location.href = "/Profile/company:" + credentials.name;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const displayinfo = () => {
    const info = document.createElement("ul");
    const form = new FormData();
    form.append("email", data);
    axios
      .post(
        "http://localhost/fullstack/LinkedIn/backend/display_company.php",
        form
      )
      .then((resp) => {
        const items = Object.keys(resp.data).map((item) => {
          const value = document.createElement("li");
          value.innerText = item + ":" + resp.data[item];
          info.appendChild(value);
        });
        credentials.id = resp.data.company_id;
        credentials.name = resp.data.company_name;
        credentials.password = resp.data.company_password;
        credentials.email = resp.data.company_email;
        post.id = resp.data.company_id;
        job.id = resp.data.company_id;
        document.getElementById("container").appendChild(info);
        const postfrom = new FormData();
        postfrom.append("company_id", post.id);
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
        axios
          .post(
            "http://localhost/fullstack/LinkedIn/backend/display_apps_company.php",
            postfrom
          )
          .then((resp) => {
            const data = resp.data;
            const posts = document.createElement("ul");
            const items = data.map((key, index) => {
              const value = document.createElement("li");
              const acc = document.createElement("input");
              const rej = document.createElement("input");
              acc.type = "button";
              acc.value = "Accept"
              acc.id = data[index].app_id;
              acc.onclick = () => {
                updateApp(acc.id, 1);
              };
              rej.type = "button";
              rej.value ="Reject"
              rej.id = data[index].app_id;
              rej.onclick = () => {
                updateApp(rej.id, 2);
              };
              if (data[index].status === 0) {
                value.innerText =
                  data[index].position +
                  " " +
                  data[index].requirements +
                  " " +
                  data[index].salary +
                  " ";
                  value.appendChild(acc)
                  value.appendChild(rej)
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
  useEffect(() => {
    displayinfo();
  }, []);
  const edit = () => {
    const form = new FormData();
    form.append("password", credentials.password);
    form.append("email", credentials.email);
    form.append("name", credentials.name);
    form.append("id", credentials.id);
    localStorage.setItem("companyname", credentials.name);
    axios
      .post(
        "http://localhost/fullstack/LinkedIn/backend/edit_company.php",
        form
      )
      .then((resp) => {
        console.log(resp.data);
        window.location.href = "/Profile/company:" + credentials.name;
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
        "http://localhost/fullstack/LinkedIn/backend/create_company_post.php",
        form
      )
      .then((resp) => {
        console.log(resp.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createJob = () => {
    const form = new FormData();
    form.append("desc", job.desc);
    form.append("pose", job.pose);
    form.append("salary", job.salary);
    form.append("id", job.id);
    axios
      .post(
        "http://localhost/fullstack/LinkedIn/backend/create_job_post.php",
        form
      )
      .then((resp) => {
        console.log(resp.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Company_profile">
      Company_profile
      <div id="container"></div>
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
        <input type="button" onClick={edit} value="Edit info" />
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
      <div id="jobs"></div>
      <form>
        <input
          type="text"
          placeholder="requirements"
          onChange={(e) => {
            setJob({
              ...post,
              desc: e.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="position"
          onChange={(e) => {
            setJob({
              ...job,
              pose: e.target.value,
            });
          }}
        />
        <input
          type="number"
          placeholder="salary"
          onChange={(e) => {
            setJob({
              ...job,
              salary: e.target.value,
            });
          }}
        />
        <input type="button" onClick={createJob} value="Create Post" />
      </form>
      <div id="apps"></div>
    </div>
  );
}

export default Company_profile;
