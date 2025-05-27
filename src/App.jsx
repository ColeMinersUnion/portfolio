
import './App.css'
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function App() {

  const { setBackground } = useOutletContext();

  useEffect(() => {
    setBackground("bg bg1"); // Example gradient background
    return () => setBackground(null); // Clean up when leaving
  }, []);

  return (
    <>
      <h1>Cole Hansen's Portfolio</h1>
      <div>
        <div>
          <h1>Page 1: COLE HANSEN</h1>
        </div>
        <div>
          <h1>Page 2: Mini About me</h1>
        </div>
        <div>
          <h1>Page 3: Project Spotlight (from JSON)</h1>
        </div>
      </div>
    </>
  )
}

export default App
