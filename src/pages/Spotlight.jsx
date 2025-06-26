import { Link } from "react-router-dom"

export default function Spotlight() {
    return (
        <>
            <div>
                <h1>Project Spotlight</h1>
                <p>A random project that I want to show off</p>
                <Link to="/projects" className="">See More</Link>
            </div>
        
        </>
    )
}