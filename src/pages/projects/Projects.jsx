import { Link } from "react-router-dom";
//*Class Project Previews
import { LightSwitchPreview } from "./Class/SmartLightSwitch";
import { TrainsPreview } from "./Class/Trains";
import { WebServerPreview } from "./Class/WebServer";

//* Work Project Previews
import { PotholePreview } from "./Work/Pothole";
import { PittSensePreview } from "./Work/PittSense";
import { GolfPreview } from "./Work/Golf";

//*Personal Project Previews
import { PortfolioPreview } from "./Personal/Portfolio";
import { MacropadPreview } from "./Personal/Macropad";
import { SproutPreview } from "./Personal/Sprout";

export default function Projects(){


    return (
        <>
            <div className="prj title">
                <h1>Projects!</h1>
            </div>
            <div className="prj-links">
                <Link to="/projects/academic" className="prj-link">
                    <h3>Academic </h3>
                </Link>
                <div classNamae="preview academic">
                    <LightSwitchPreview />
                    <TrainsPreview />
                    <WebServerPreview />
                </div>
                <Link to="/projects/professional" className="prj-link">
                    <h3>Professional </h3>
                </Link>
                <div className="preview professional">
                    <PotholePreview />
                    <PittSensePreview />
                    <GolfPreview />
                </div>
                
                <Link to="/projects/personal" className="prj-link">
                    <h3>Personal</h3>
                </Link>
                <div className ="preview personal">
                    <PortfolioPreview />
                    <MacropadPreview />
                    <SproutPreview />
                </div>
            </div>
            <div className="prj-cards">
                
            </div>
        </>
    )
}
