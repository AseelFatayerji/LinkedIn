import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../CSS/App.css";
import Login from "./login";
import Profile from "./profile";
import Signup from "./signup";
import Home from "./home";
import Job from "./jobs";
import ViewProfile from "./viewprofile";

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:user" element={<Home />} />
            <Route path="/:company" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Profile/:user" element={<Profile />} />
            <Route path="/Profile/:company" element={<Profile />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Jobs" element={<Job />} />
            <Route path="/Jobs/:user" element={<Job />} />
            <Route path="/Jobs/:company" element={<Job />} />
            <Route path="/ViewProfile/:user" element={<ViewProfile />} />
            <Route path="/ViewProfile/:company" element={<ViewProfile />} />
          </Routes>
    </div>
  );
}

export default App;
