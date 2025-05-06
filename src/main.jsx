import { createRoot } from 'react-dom/client'
//import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import About from './pages/About.jsx'

const Layout = () => {

  const [background, setBackground] = useState(null);
  

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic background */}
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
        path: '*',
        element: <PageNotFound />,
      }
  ]}
])




createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
