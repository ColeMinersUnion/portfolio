import "./styles/splash.css";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


function ball(){
  const gltf = useLoader(GLTFLoader, '../assets/models/basketball.glb')
  return <primitive object={gltf.scene} />
}


export default function Splash(props) {
    return (
        <>
        <div className="splash-container">
            
        </div>
            
        </>
    );
}