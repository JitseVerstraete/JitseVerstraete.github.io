import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import Valentine from './pages/Valentine/Valentine.jsx'
import ProjectPage from "./pages/ProjectPage/ProjectPage.jsx";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valentine" element={<Valentine />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
