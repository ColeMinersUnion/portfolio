//Home     Projects Workshops About      Contact
//----      ----------------------         -----
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar-container">
            <div className="row1 links">
                <div className="left-link">
                    <Link to="/">Home</Link>
                </div>
                <div className="center-links">
                    <Link to="/projects">Projects</Link>
                    <Link to="/workshops">Workshops</Link>
                    <Link to="/about">About Me</Link>
                </div>
                <div className="right-link">
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
            <div className="row2 lines">
                <div className="left-line"></div>
                <div className="center-line"></div>
                <div className="right-line"></div>
            </div>
        </nav>
    );


}