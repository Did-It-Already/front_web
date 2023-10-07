import { HashRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import MyContext from './context.js';

import Header from "./components/Header.jsx"
import FirstPage from './pages/firstPage.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import MainPage from './pages/mainPage.jsx';

import corner from "./assets/images/corner.png";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') === null ? "light": localStorage.getItem('theme'));

  useEffect(()=>{
    // Store theme in local storage
    localStorage.setItem('theme', theme);
    // Update background color
    document.body.style.backgroundColor = theme === "light" ? "#FFFFFF":"#21282E";
  }, [theme])

  return (
    <MyContext.Provider value={{ theme, setTheme }}>
      <Router>
        <Header/>
        <img src={corner} className = "corner left"/>
        <img src={corner} className = "corner right"/>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  )
}

export default App
