import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import Valentine from './pages/Valentine/Valentine.jsx'
import ProjectPage from "./pages/ProjectPage/ProjectPage.jsx";
import NavigationBar from "./components/NavigationBar/NavigationBar.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  return (
    <>
    <BrowserRouter>
      <ScrollToTop />
      <NavigationBar />
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
