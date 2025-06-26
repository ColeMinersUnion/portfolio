import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';


function Splash(){
    return (
        <div className="snap-always snap-center">
            <div className="z-2 overflow-hidden">
                <img src="ML_Teaching.JPG" alt="Teaching Machine Learning" className="w-full" style={{objectFit: 'cover', position: 'absolute'}}/>
            </div>
        </div>
    )
}

function WorkshopList(){
    return (
        <div className="snap-always snap-center">
            <p>Workshops go here</p>
        </div>
    )
}


export default function Workshops(props) {
    // const { setBackground } = useOutletContext();

    // useEffect(() => {
    //     setBackground("bg bg1"); // Example gradient background
    //     return () => setBackground(null); // Clean up when leaving
    // }, []);


    return (
        <>
            <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
                <Splash />
                <WorkshopList />
            </div>

        </>
    )
}