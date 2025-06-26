
import './App.css'
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ScrollPage from './pages/templates/Scroll';
import Splash from './pages/Splash';
import MiniAbout from './pages/MiniAbout';
import Spotlight from './pages/Spotlight';


function App() {

  const { setBackground } = useOutletContext();

  useEffect(() => {
    setBackground("bg bg1"); // Example gradient background
    return () => setBackground(null); // Clean up when leaving
  }, []);

  return (
    <>
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen ">
            <div className="snap-always snap-center">
              <ScrollPage>
                <Splash />
              </ScrollPage> 
            </div>
            <div className="snap-always snap-center" >
              <ScrollPage>
                <MiniAbout />
              </ScrollPage> 
            </div>
            <div className="snap-always snap-center" >
              <ScrollPage>
                <Spotlight />
              </ScrollPage> 
            </div>
            {/*TODO: This is a comment!*/}
        </div>
    </>
  )
}

export default App
