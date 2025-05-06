import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import About from './pages/About.jsx'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
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
