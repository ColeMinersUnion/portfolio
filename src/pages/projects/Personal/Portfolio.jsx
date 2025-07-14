
import { Link } from "react-router-dom";

function PortfolioPreview(){
    return(
        <>
            <p>Portfolio:</p>
            <Link to="/projects/personal/portfolio">
                It's Meta
            </Link>
        </>
    )
}

function Portfolio(){
    return (
        <>
            <p>Imma talk about myself</p>
        </>
    )
}

export {PortfolioPreview};
export default Portfolio;