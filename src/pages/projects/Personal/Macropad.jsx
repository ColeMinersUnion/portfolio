//import Model from "../../templates/Model";
import { Link } from "react-router-dom";

function MacropadPreview(){
    return (
        <>
            <p>Macropad: </p>
            <Link to="/projects/personal/macropad">
                Learn More
            </Link>
        </>
    );
}


function Macropad(){
    return (
        <>
            <h1>Macropad</h1>
        </>
    );
}

export {MacropadPreview, Macropad}
export default Macropad;