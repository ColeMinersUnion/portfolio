import { Link } from "react-router-dom"

function WebServerPreview(){
    return(
        <>
            <p>C++ WebServer</p>
            <Link to="/projects/academic/webserver" >
                Learn More
            </Link>
        </>
    )
}

function WebServer(){
    return (
        <>
            <div>
                <p>C++, Http Requests, Operating Systems</p>
            </div>
        </>
    )
}

export {WebServerPreview};
export default WebServer;