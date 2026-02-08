import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Hero from '../components/Hero/Hero.jsx'
import Home from '../pages/Home'
import Valentine from '../pages/Valentine/Valentine.jsx'

function App() {

  return (

    
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valentine" element={<Valentine />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
