import './workshop.css';
import { useNavigate } from 'react-router-dom';

// For the canvas widget
import React, { useRef, useState } from 'react';
import * as ort from 'onnxruntime-web'; //https://onnxruntime.ai/docs/get-started/with-javascript/web.html


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


/* TODO
? Fix the canvas drawing so that it works with click and drag, not just click.
? Fix the scaling/compression of the canvas drawing to 28x28 grayscale image.

*/

function Canvas_Widget(){
    const canvasRef = useRef();
    const [prediction, setPrediction] = useState(null);
    const model_url = '/models/mnist_dnn.onnx'; 

    const handleSubmit = async () => {
        // 1. Get canvas image data
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 2. Transform canvas to 28x28 grayscale image
        const targetSize = 28;
        const scale = Math.floor(canvas.width / targetSize);
        const transformedImage = new ImageData(targetSize, targetSize);
        
        // This is wrong
        for (let y = 0; y < targetSize; y++) {
            for (let x = 0; x < targetSize; x++) {
                let graySum = 0;
                let pixelCount = 0;

                for (let dy = 0; dy < scale; dy++) {
                    for (let dx = 0; dx < scale; dx++) {
                        const srcX = x * scale + dx;
                        const srcY = y * scale + dy;
                        const srcIndex = (srcY * canvas.width + srcX) * 4;

                        const r = data[srcIndex];
                        const g = data[srcIndex + 1];
                        const b = data[srcIndex + 2];
                        // Optionally use luma (perceptual grayscale) instead of average:
                        const gray = (r + g + b) / 3;

                        graySum += gray;
                        pixelCount++;
                    }
                }

                const avgGray = Math.round(graySum / pixelCount);
                const destIndex = (y * targetSize + x) * 4;
                transformedImage.data[destIndex] = avgGray;
                transformedImage.data[destIndex + 1] = avgGray;
                transformedImage.data[destIndex + 2] = avgGray;
                transformedImage.data[destIndex + 3] = 255; // Fully opaque
                
                    
                

            }
        }

        // Save the transformed image to a data URL (PNG)
        const offscreen = document.createElement('canvas');
        offscreen.width = targetSize;
        offscreen.height = targetSize;
        offscreen.getContext('2d').putImageData(transformedImage, 0, 0);
        const dataUrl = offscreen.toDataURL('image/png');
        // You can now use dataUrl to display or download the image
        console.log(dataUrl);
        
        // 3. Run through ONNX model
        function toTensor(imageData){
            const { data, width, height } = imageData;
            const tensorData = new Float32Array(width * height);

            for (let i = 0; i < width * height; i++) {
                const r = data[i * 4]; 
                //grayscale so only need red channel
                tensorData[i] = r / 255.0;
            }

            return tensorData;
        }

        //Written by GPT-4.1
        async function classifyDigit(imageData, modelPath) {
            // Step 1: Preprocess the image
            const inputTensorData = toTensor(imageData);
            // Step 2: Create a tensor of shape [1, 1, 28, 28]
            const tensor = new ort.Tensor('float32', inputTensorData, [1, 28*28]);

            // Step 3: Load the ONNX model
            // enable DEBUG flag
            ort.env.debug = true;

            // set global logging level
            ort.env.logLevel = 'info';
            ort.env.wasm.wasmPaths = '/'; // or 'public/' if that's where you put the files
            const session = await ort.InferenceSession.create(modelPath);

            // Step 4: Get model input name (assume only one input)
            const inputName = session.inputNames[0];

            // Step 5: Run inference
            const feeds = { [inputName]: tensor };
            const results = await session.run(feeds);

            // Step 6: Get output (assume single output with shape [1, 10])
            const output = results[session.outputNames[0]].data;

            // Step 7: Get predicted class (index of max value)
            const predicted = output.indexOf(Math.max(...output));
            return predicted;
        }

        const predictedDigit = await classifyDigit(transformedImage, model_url);
        // 4. Set & Display prediction
        setPrediction(predictedDigit);
        console.log(`Predicted digit: ${predictedDigit}`);


    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setPrediction(null); // Clear prediction
    };


    const draw = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const pen = (ctx, x, y) => {
            console.log("Drawing at", x, y);
            const rad = 20

            ctx.beginPath();
            ctx.arc(x, y, rad, 0, 2 * Math.PI);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.stroke();
        }

        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        pen(ctx, x, y);
    };

    //I should learn sass: https://css-tricks.com/gradient-borders-in-css/
    const CanvasSize = 280;
    return (
        <div>
            <canvas ref={canvasRef} width={CanvasSize} height={CanvasSize} onClick={draw} className=""/* drawing logic here */ />
            <div className="">
                <button className="canvasButton heffect1" onClick={handleClear} >Clear</button>
                <button onClick={handleSubmit} className="canvasButton heffect1">Submit</button>
            </div>
            {prediction !== null && <div>Prediction: {prediction}</div>}
        </div>
    );
}

export default function ML(){

    return(
        <>
            <h1>Machine Learning workshop here</h1>
            <Canvas_Widget />
        </>
    )
}