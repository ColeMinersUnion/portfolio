import { Link } from "react-router-dom";

function TrainsPreview(){
    return (
        <>
            <p>Emulated Train Control System: </p>
            <Link to="/projects/academic/trains">
                Learn More
            </Link>
        </>
        
    );
}


function Trains(){
    return (
        <>
            <div>
                <p>System Architecture, python, application development, etc.</p>
            </div>
        </>
    );
}

export {TrainsPreview};
export default Trains;