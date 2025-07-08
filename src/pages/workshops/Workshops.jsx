import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ML_Card } from './ML';
import './workshop.css'; 

function Splash(){
    return (
            <div className="overflow-hidden">
                
                <img src="ML_Teaching.JPG" alt="Teaching Machine Learning" className="w-full" style={{objectFit: 'cover', position: 'absolute'}}/>
                
            </div>
    )
}

function WorkshopList(){
    return (
            <div className="workshop-list">
                <ML_Card className="workshop-item"/>
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
                <div className="snap-always snap-center">
                    <Splash />
                </div>
                <div className="snap-always snap-center">
                    <WorkshopList />
                </div>
            </div>

        </>
    )
}