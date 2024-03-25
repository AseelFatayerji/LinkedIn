import '../CSS/App.css';
import Navbar from './navbar';
import Navbar2 from './navbar_user';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Job() {
  
  const checkloggedin = () =>{
    const user = localStorage.getItem("username")
    const comp = localStorage.getItem("companyname")
    if( user != null || comp != null){
      return true
    }
    else{
      return false
    }
  }
  const [isLoggedin,setLoggedin] = useState(checkloggedin())
  const applyJob = (id) => {
    const form = new FormData()
    const users = localStorage.getItem("userid")
    form.append("id",id)
    form.append("user",users)
    axios
    .post(
      "http://localhost/fullstack/LinkedIn/backend/apply_to_job.php",form
    )
    .then((resp) => {
      console.log(resp)
     
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const displayposts = () =>{
    axios
          .post(
            "http://localhost/fullstack/LinkedIn/backend/display_all_jobs.php",
          )
          .then((resp) => {
            console.log(resp.data)
            const data = resp.data
            const jobs = document.createElement("ul");
            const items = resp.data.map((key,index) => {
                const value = document.createElement("li");
                const apply = document.createElement("input");
                apply.type = "button"
                apply.value = "Apply"
                apply.id = (data[index].job_id)
                apply.onclick = () =>{
                  applyJob(apply.id)
                }
                value.innerText =  data[index].position + " " + data[index].requirements + " " + data[index].salary;
                value.appendChild(apply)
                jobs.appendChild(value)                
            });
            document.getElementById("jobs").appendChild(jobs);
          })
          .catch((err) => {
            console.log(err);
          });
  }
  useEffect(() => {
    displayposts();
  }, []);
  return (
    <div className="Job">
      {isLoggedin ? (<Navbar2 />):(<Navbar />)}
      Job
      <div id="jobs">
      </div>
    </div>
  )
}

export default Job;
