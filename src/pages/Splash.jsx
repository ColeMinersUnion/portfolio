import "./styles/splash.css";
import { useLoader, useFrame, Canvas } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useRef, forwardRef } from "react";

const Ball = forwardRef((props, ref) => {
  const gltf = useLoader(GLTFLoader, '/models/basketball.glb')
  return <primitive object={gltf.scene} ref={ref} />
});

function Scene(){


    const myMesh = useRef();
    useFrame(({ clock }) => {
        myMesh.current.rotation.y = 5 * clock.elapsedTime;
        myMesh.current.rotation.z = 0.1 * clock.elapsedTime;
    });
    return (
        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }} className="canvas">
            <Ball ref={myMesh} />
            <ambientLight intensity={0.1} />
            <directionalLight />
        </Canvas>
    )

}


export default function Splash(props) {
    return (
        <>
        <div className="splash-container">
            <div className="splash-media">
                
            </div>
            <div className="splash-text">
                <h1>COLE HANSEN</h1>
            </div>
        </div>
            
        </>
    );
}