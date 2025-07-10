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
    const [isDrawing, setIsDrawing] = useState(false);
    const lastPos = useRef({ x: 0, y: 0 });
    const model_url = '/models/mnist_dnn3.onnx'; 

    const handleMouseDown = (event) => {
        setIsDrawing(true);
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        lastPos.current = { x, y };
    };

    const handleMouseMove = (event) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;

        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "white"; // Draw with white pen
        ctx.lineWidth = 20; // match your pen size
        ctx.lineCap = "round";
        ctx.stroke();

        lastPos.current = { x, y };
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleMouseLeave = () => {
        setIsDrawing(false);
    };

    // Find the bounding box of the digit
    function getBoundingBox(imageData) {
        const { data, width, height } = imageData;
        let minX = width, minY = height, maxX = 0, maxY = 0;
        let found = false;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                // If any channel is not black, it's part of the digit
                if (data[idx] !== 0 || data[idx+1] !== 0 || data[idx+2] !== 0) {
                    found = true;
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }
        if (!found) return null; // No digit found
        return { minX, minY, maxX, maxY };
    }

    // Center and resize the digit to 28x28 with the digit in a 20x20 box
    function centerAndResize(imageData) {
        const bbox = getBoundingBox(imageData);
        if (!bbox) return imageData; // fallback: nothing drawn

        const { minX, minY, maxX, maxY } = bbox;
        const digitWidth = maxX - minX + 1;
        const digitHeight = maxY - minY + 1;

        // Crop to bounding box
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = digitWidth;
        tmpCanvas.height = digitHeight;
        const tmpCtx = tmpCanvas.getContext('2d');
        tmpCtx.putImageData(imageData, -minX, -minY);

        // Resize to 20x20
        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = 20;
        resizedCanvas.height = 20;
        const resizedCtx = resizedCanvas.getContext('2d');
        resizedCtx.drawImage(tmpCanvas, 0, 0, 20, 20);

        // Center in 28x28
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = 28;
        finalCanvas.height = 28;
        const finalCtx = finalCanvas.getContext('2d');
        finalCtx.fillStyle = 'black';
        finalCtx.fillRect(0, 0, 28, 28);

        const xOffset = Math.floor((28 - 20) / 2);
        const yOffset = Math.floor((28 - 20) / 2);
        finalCtx.drawImage(resizedCanvas, xOffset, yOffset);

        // Return the centered image data
        return finalCtx.getImageData(0, 0, 28, 28);
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
    
    // Downscale imageData to 28x28 using area averaging, average RGB, ignore alpha
    function toTensor(imageData) {
        const { data, width, height } = imageData;
        const targetSize = 28;
        const scale = width / targetSize;
        const tensorData = new Float32Array(targetSize * targetSize);
        const mean = 0.1307;
        const std = 0.3081;

        for (let ty = 0; ty < targetSize; ty++) {
            for (let tx = 0; tx < targetSize; tx++) {
                let sum = 0;
                let count = 0;
                const xStart = Math.floor(tx * scale);
                const xEnd = Math.min(Math.floor((tx + 1) * scale), width);
                const yStart = Math.floor(ty * scale);
                const yEnd = Math.min(Math.floor((ty + 1) * scale), height);

                for (let sy = yStart; sy < yEnd; sy++) {
                    for (let sx = xStart; sx < xEnd; sx++) {
                        const idx = (sy * width + sx) * 4;
                        const r = data[idx];
                        const g = data[idx + 1];
                        const b = data[idx + 2];
                        // Average RGB for grayscale
                        const gray = (r + g + b) / (3 * 255); // [0,1], 1=white, 0=black
                        sum += gray;
                        count++;
                    }
                }
                // If no pixels, just use 1 (white background)
                const avgGray = count > 0 ? sum / count : 1;
                //const inverted = 1 - avgGray; // MNIST: 1=ink, 0=background
                const normalized = (avgGray - mean) / std;
                tensorData[ty * targetSize + tx] = normalized;
            }
        }
        return tensorData;
    }

    const handleSubmit = async () => {
        // 1. Get canvas image data
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Center and resize the digit before converting to tensor
        const centeredImageData = centerAndResize(imageData);        

        const predictedDigit = await classifyDigit(centeredImageData, model_url);
        // 4. Set & Display prediction
        setPrediction(predictedDigit);
        console.log(`Predicted digit: ${predictedDigit}`);
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setPrediction(null); // Clear prediction
    };

    React.useEffect(() => {
        // Fill canvas with black on mount
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);


    //I should learn sass: https://css-tricks.com/gradient-borders-in-css/
    const CanvasSize = 280;
    return (
        <div>
            <canvas 
                ref={canvasRef} 
                width={CanvasSize} 
                height={CanvasSize} 
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className=""
            />
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