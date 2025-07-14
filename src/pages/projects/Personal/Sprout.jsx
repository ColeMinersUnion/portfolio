import { Link } from "react-router-dom";

function SproutPreview(){
    return (
        <>
            <p>Sprout: </p>
            <Link to="/projects/personal/sprout">
                Learn More
            </Link>
        </>
    );
}


function Sprout(){
    return (
        <>
            <h1>Morgan and I's project for the 2024 Google Gemini Competition</h1>
        </>
    );
}

export {SproutPreview}
export default Sprout;