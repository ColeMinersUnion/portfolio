import { createRoot } from 'react-dom/client'
//import { useOutletContext } from 'react-router-dom'
import {useState } from 'react'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import PageNotFound from './pages/PageNotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import About from './pages/About.jsx'
//Projects
import Projects from './pages/projects/Projects.jsx'
//Project Groups
//Projects I was paid to do (mostly IDEA)
import Work from './pages/projects/Work/Work.jsx'
import Pothole from './pages/projects/Work/Pothole.jsx'
import PittSense from './pages/projects/Work/PittSense.jsx'
import Golf from './pages/projects/Work/Golf.jsx'

//Projects I did to learn or for fun
import Personal from './pages/projects/Personal/Personal.jsx'
import {Macropad as MacropadPrj} from './pages/projects/Personal/Macropad.jsx'
import Portfolio from './pages/projects/Personal/Portfolio.jsx'
import Sprout from './pages/projects/Personal/Sprout.jsx'

//Projects I did for class credit
import Class from './pages/projects/Class/Class.jsx'
import LightSwitch from './pages/projects/Class/SmartLightSwitch.jsx'
import WebServer from './pages/projects/Class/WebServer.jsx'
import Trains from './pages/projects/Class/Trains.jsx'

//Workshops/Makerspace
import Workshops from './pages/workshops/Workshops.jsx'
import ML from './pages/workshops/ML.jsx'
import {Macropad as MacropadWrkshp} from './pages/workshops/Macropad.jsx'
import Arduino from './pages/workshops/Arduino.jsx'

//Extra Pages
import ContactMe from './pages/Contact.jsx'


const Layout = () => {  
  const [background, setBackground] = useState(null);
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {background && (
          <div className="absolute inset-0 z-0">
            {typeof background === "string" ? (
              <div className={background} />
            ) : (
              background // JSX like <ThreeScene />
            )}
          </div>
        )}
      
        {/* Content & overlays */}
        <div className="relative z-10">
          <Navbar />
          <Outlet context={{setBackground}}/>
          {/*<Footer />*/}
        </div>
      </div>
    </>
  );
}

//Router setup 
const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/About',
        element: <About />,
      },
      {
        path: '/contact',
        element: <ContactMe />,
      },
      
      { //!WORKSHOPS BELOW
        path: '/workshops',
        element: <Workshops />,
      },
      {
        path: '/workshops/ml',
        element: <ML />,
      },
      {
        path: '/workshops/macropad',
        element: <MacropadWrkshp />,
      },
      {
        path: '/workshops/arduino',
        element: <Arduino />,
      },
      {
        path: '/projects/',
        element: <Projects />,
      },
      { //!WORK PROJECTS
        path: '/projects/professional',
        element: <Work />,
      },
      {
        path: '/projects/professional/pothole',
        element: <Pothole />,
      },
      {
        path: '/projects/professional/pittsense',
        element: <PittSense />,
      },
      {
        path: '/projects/professional/golf',
        element: <Golf />,
      },
      { //!PERSONAL PROJECTS
        path: '/projects/personal',
        element: <Personal />,
      
      },
      {
        path: '/projects/personal/macropad',
        element: <MacropadPrj />,
      },
      {
        path: '/projects/personal/portfolio',
        element: <Portfolio />
      },
      {
        path: '/projects/personal/sprout',
        element: <Sprout />
      },
      { //!CLASS PROJECTS
        path: '/projects/academic',
        element: <Class />,
      },
      {
        path: '/projects/academic/smartlightswitch',
        element: <LightSwitch />,
      },
      {
        path: '/projects/academic/webserver',
        element: <WebServer />,
      },
      {
        path: '/projects/academic/trains',
        element: <Trains />,
      },
      
            
  ]},
  {
    path: '*',
    element: <PageNotFound />,
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
