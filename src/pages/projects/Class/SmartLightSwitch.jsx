import { Link } from "react-router-dom";

function LightSwitchPreview(){
    return (
        <>
            <p>Custom Smart Light Switch: </p>
            <Link to="/projects/academic/smartlightswitch">
                Learn More
            </Link>
        </>
        
    )
}

function LightSwitch(){
    return (
        <>
            <div>
                <p>Future me please add an interractive demo. That'd be neat.</p>
            </div>
        </>
    )
}

export {LightSwitchPreview};
export default LightSwitch;