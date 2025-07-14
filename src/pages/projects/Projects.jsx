import { Link } from "react-router-dom";
import { PotholePreview } from "./Work/Pothole";
import { PittSensePreview } from "./Work/PittSense";
import { GolfPreview } from "./Work/Golf";

export default function Projects(props){


    return (
        <>
            <div className="prj title">
                <h1>Projects!</h1>
            </div>
            <div className="prj-links">
                <Link to="/projects/academic" className="prj-link">
                    <h3>Academic </h3>
                </Link>
                <Link to="/projects/professional" className="prj-link">
                    <h3>Professional </h3>
                </Link>
                <PotholePreview />
                <PittSensePreview />
                <GolfPreview />
                <Link to="/projects/personal" className="prj-link">
                    <h3>Personal</h3>
                </Link>
            </div>
            <div className="prj-cards">
                
            </div>
        </>
    )
}
