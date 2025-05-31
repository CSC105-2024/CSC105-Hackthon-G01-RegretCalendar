import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import App from './App.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

import HomePage from './pages/HomePage.jsx'
const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [
    {
      path:"/",
      element: <HomePage/>
    },
    {
      path:"/login",
      element: <Login/>
    },
    {
      path:"/register",
      element: <Register/>
    }
  ]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)