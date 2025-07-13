import { Link } from "react-router-dom";


export function PotholePreview({props}){
    return (
        <>
            <p>Pothole: </p>
            <Link to="/projects/professional/pothole">
                Learn More
            </Link>
        </>
    );
}

export default function Pothole() {
    return (
        <>
            <p>Pothole page</p>
        </>
    );
}