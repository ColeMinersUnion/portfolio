import { Link } from "react-router-dom";

function PittSensePreview() {
    return (
        <>
            <p>PittSense: </p>
            <Link to="/projects/professional/pittsense">
                Learn More
            </Link>
        </>
    );
}

function PittSense(){
    return (
        <>
            <p>PittSense Page</p>
            <p>Software</p>
            <ul>
                <li>Tech Stack!</li>
                <li>Purposes</li>
                <li>How it works</li>
                <li>Still under development</li>
            </ul>
            <p>Firmware</p>
            <ul>
                <li>MCU Selection</li>
                <li>Developing libraries</li>
                <li>Interfacing with the Application</li>
                <li>Still under development</li>
            </ul>
        </>
    )
}

export { PittSensePreview };
export default PittSense;