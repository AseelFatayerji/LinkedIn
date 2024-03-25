import "../CSS/nav.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navBar">
      <div>
        <div className="home">
          <Link to="/">Home</Link>
        </div>
        <div className="login">
          <Link to="/Login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
