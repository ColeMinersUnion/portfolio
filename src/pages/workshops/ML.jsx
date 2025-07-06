import './workshop.css';
import { useNavigate } from 'react-router-dom';


export function ML_Card(){
    const navigate = useNavigate();
    return (
        <>
            <div className="ML wcard" onClick={() => navigate('/workshops/ML')}>
                <img src="DNN.png" alt="Dense Neural Network" className=""/>
                <div className="wcard-body">
                    <div className="wcard-skills">
                        <span className="skill">PyTorch</span>
                        <span className="skill"></span>
                    </div>
                    <h2 className="wcard-title text-2xl font-bold">Machine Learning Workshop</h2>
                    <p className="wcard-blurb text-lg">
                        This workshop taught the basics of machine learning, and implemented a simple neural network
                        to classify handwritten digits using the MNIST dataset. 
                    </p>
                </div>
                
            </div>
        </>
    )
}

export default function ML(){
    return(
        <>
            <h1>Machine Learning workshop here</h1>
        </>
    )
}