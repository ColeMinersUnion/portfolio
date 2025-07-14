import { Link } from "react-router-dom";

function GolfPreview(){
    return(
        <>
            <p>Golf: </p>
            <Link to="/projects/professional/golf">
                Learn More
            </Link>
        </>
    );
}

function Golf() {
    return (
        <>
            <p>Golf Page</p>
            <p>I hate this project. May get replacd with César's project</p>
        </>
    )
}

export { GolfPreview };
export default Golf;