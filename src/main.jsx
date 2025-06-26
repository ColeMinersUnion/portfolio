import { createRoot } from 'react-dom/client'
//import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider, Link} from 'react-router-dom'
import PageNotFound from './pages/PageNotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import About from './pages/About.jsx'
//Projects
import Projects from './pages/projects/Projects.jsx'
//Project Groups
//Projects I was paid to do (mostly IDEA)
import Work from './pages/projects/Work/Work.jsx'

//Projects I did to learn or for fun
import Personal from './pages/projects/Personal/Personal.jsx'

//Projects I did for class credit
import Class from './pages/projects/Class/Class.jsx'
import LightSwitch from './pages/projects/Class/SmartLightSwitch.jsx'
import WebServer from './pages/projects/Class/WebServer.jsx'
import Trains from './pages/projects/Class/Trains.jsx'


//Workshops/Makerspace
import Workshops from './pages/workshops/Workshops.jsx'

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
          <Footer />
        </div>
      </div>
    </>
  );
}

const BlankLayout = () => {
  const [background, setBackground] = useState(null);
  return (
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
      <div className="relative z-8">
        <Outlet context={{setBackground}}/>
      </div>
    </div>
  );
}

const ProjectLayout = () => {
  const [background, setBackground] = useState(null);
  return (
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
      <div className="relative z-9">
        <Link to="/projects" className="">Back to Projects</Link>
        <Outlet context={{setBackground}}/>
      </div>
    </div>
  );
}

const WorkshopLayout = () => {
  const [background, setBackground] = useState(null);
  return (
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
      <div className="relative z-9">
        <Link to="/workshops" className="">Back to Workshops</Link>
        <Outlet context={{setBackground}}/>
      </div>
    </div>
  );
}

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
        path: '/projects',
        element: <BlankLayout />,
        children: [
          {
            path: '/projects/',
            element: <Projects />,
          },
          {
            path: '/projects/professional',
            element: <ProjectLayout />,
            children:[
              {
                path: '/projects/professional',
                element: <Work />,
              }
            ],
          },
          {
            path: '/projects/personal',
            element: <ProjectLayout />,
            children: [
              {
                path: '/projects/personal',
                element: <Personal />,
              },
            ],
          },
          {
            path: '/projects/academic',
            element: <ProjectLayout />,
            children: [
              {
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
              }
            ],
          }
        ],
      },
      {
        path: '/workshops',
        element: <BlankLayout />,
        children: [
          {
            path: '/workshops',
            element: <Workshops />,
          },
        ]
      },
      {
        path: '/contact',
        element: <ContactMe />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      }
  ]}
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
