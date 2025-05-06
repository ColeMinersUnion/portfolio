//Home     Projects Workshops About      Contact
//----      ----------------------         -----
import { Link } from "react-router-dom";
import "./styles/Nav.css";

export default function Navbar() {
    return (
        <nav className="navbar-container">
            <div className="row links">
                <div className="left-link">
                    <Link to="/" className="link">Home</Link>
                </div>
                <div className="center-links">
                    <Link to="/projects" className="clink link">Projects</Link>
                    <Link to="/workshops" className="clink link">Workshops</Link>
                    <Link to="/about" className="clink link">About Me</Link>
                </div>
                <div className="right-link">
                    <Link to="/contact" className="link">Contact</Link>
                </div>
            </div>
            <div className="row lines">
                <div id="left-line"></div>
                <div id="center-line"></div>
                <div id="right-line"></div>
            </div>
        </nav>
    );


}