import '../CSS/App.css';
import Navbar from './navbar';
import Navbar2 from './navbar_user';
import axios from 'axios';
import { useState } from 'react';

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
  const displayposts = () =>{
    axios
          .post(
            "http://localhost/fullstack/LinkedIn/backend/display_all_jobs.php",
          )
          .then((resp) => {
            const data = resp.data
            const jobs = document.createElement("ul");
            const items = resp.data.map((key,index) => {
                const value = document.createElement("li");
                value.innerText =  data[index].position + " " + data[index].requirements + " " + data[index].salary;
                jobs.appendChild(value)
              
            });
            document.getElementById("jobs").appendChild(jobs);
          })
          .catch((err) => {
            console.log(err);
          });
  }
  return (
    <div className="Job">
      {isLoggedin ? (<Navbar2 />):(<Navbar />)}
      Job
      <div id="jobs">
    {displayposts()}
      </div>
    </div>
  )
}

export default Job;
