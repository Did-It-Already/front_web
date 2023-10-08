import { BrowserRouter  as Router, Routes, Route , Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react'
import MyContext from './context.js';

import Header from "./components/Header.jsx"
import UserEdit from './pages/userEdit.jsx';
import FirstPage from './pages/firstPage.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import MainPage from './pages/mainPage.jsx';

import corner from "./assets/images/corner.png";
import { changeBodyColor, loggedInUser, getUserInfo, accessToken } from './assets/functions.js';

function App() {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState({});

  useEffect(()=>{
    changeBodyColor(theme)
  }, [theme])

  useEffect(()=>{
    if(loggedInUser()){
      getUserInfo(accessToken()).then((userData) => {setCurrentUser(userData)})
    }
  }, [])

  useEffect(()=>{
    if(currentUser.name){
      setTheme(currentUser.theme)
    }
  }, [currentUser])

  return (
    <MyContext.Provider value={{ theme, setTheme, currentUser, setCurrentUser }}>
      <Router>
        <Header/>
        <img src={corner} className = "corner left"/>
        <img src={corner} className = "corner right"/>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/register" element={!loggedInUser() ? <Register/>:<Navigate replace to={"/main"}/>}/>
          <Route path="/login" element={!loggedInUser() ? <Login/>:<Navigate replace to={"/main"}/>}  />
          <Route path="/main" element={loggedInUser() ? <MainPage/>:<Navigate replace to={"/login"}/>} />
          <Route path="/user" element={loggedInUser() ? <UserEdit/>:<Navigate replace to={"/login"}/>}  />
        </Routes>
      </Router>
    </MyContext.Provider>
  )
}

export default App
