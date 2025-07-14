import { Link } from "react-router-dom";


function PotholePreview(){
    return (
        <>
            <p>Pothole: </p>
            <Link to="/projects/professional/pothole">
                Learn More
            </Link>
            
        </>
    );
}

function Pothole() {
    return (
        <>
            <p>Pothole page</p>
            <p>Things to talk about:</p>
            <ul>
                <li>Story Chronologically</li>
                <li>Research Phase</li>
                <li>Interfacing with the XCarve</li>
                <li>Designing a Pothole Filling Algorithm</li>
                <li>Creating a slicer to write GCODE</li>
                <li>Integration</li>

            </ul>
            <p>Things to stress:</p>
            <ul>
                <li>Working with a team</li>
                <li>Managing codebases</li>
                <li>Working with clients</li>
            </ul>
        </>
    );
}

export { PotholePreview };
export default Pothole;