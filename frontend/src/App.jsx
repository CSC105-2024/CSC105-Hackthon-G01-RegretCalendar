import { useState } from 'react'
import './App.css'
import "./index.css"
import { Outlet } from "react-router-dom";
import Navbar from './assets/components/navbar';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
