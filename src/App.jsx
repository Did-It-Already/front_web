import { BrowserRouter  as Router, Routes, Route , Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react'
import MyContext from './context.js';

import Header from "./components/Header.jsx"
import NotifyPopUp from './components/NotifyPopUp.jsx';
import MessagePopUp from './components/MessagePopUp.jsx';
import UserEdit from './pages/userEdit.jsx';
import FirstPage from './pages/firstPage.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import MainPage from './pages/mainPage.jsx';
import CreateTask from './pages/createTask.jsx';
import CreateHabit from './pages/createHabit.jsx';
import EditTask from './pages/editTask.jsx';
import EditHabit from './pages/editHabit.jsx';

import corner from "./assets/images/corner.png";
import { changeBodyColor, loggedInUser, getUserInfo, accessToken, getHabits, getTasks, togglePopUp, togglePopUp2} from './assets/functions.js';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") !== null ? localStorage.getItem("theme") : 'light');
  const [currentUser, setCurrentUser] = useState({});
  const [currentHabits, setCurrentHabits] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [motivationalMessage, setMotivationalMessage] = useState("");

  const putNotifyPopUp = (message)=> {
    setNotifyMessage(message)
    togglePopUp(false)
  }

  const putMessagePopUp = (message)=> {
    setMotivationalMessage(message)
    togglePopUp2(false)
  }

  useEffect(()=>{
    changeBodyColor(theme)
  }, [theme])

  useEffect(()=>{
    if(loggedInUser()){
      getUserInfo(accessToken()).then((userData) => {setCurrentUser(userData)})
      getHabits(accessToken()).then((habits) => {setCurrentHabits(habits)})
      getTasks(accessToken()).then((tasks) => {setCurrentTasks(tasks)})
    }
  }, [])

  useEffect(()=>{
    if(currentUser.name){
      setTheme(currentUser.theme)
      putMessagePopUp("No dejes para mañana lo que puedes hacer hoy")
      setTimeout(() => {
        togglePopUp2(true);
      }, 5000); 
    }
  }, [currentUser])

  return (
    <MyContext.Provider value={{ theme, setTheme, currentUser, setCurrentUser , currentHabits, setCurrentHabits, currentTasks, setCurrentTasks, putNotifyPopUp}}>
      <Router>
        <Header/>
        <NotifyPopUp message={notifyMessage}/>
        <MessagePopUp message={motivationalMessage}/>
        <img src={corner} className = "corner left"/>
        <img src={corner} className = "corner right"/>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/register" element={!loggedInUser() ? <Register/>:<Navigate replace to={"/main"}/>}/>
          <Route path="/login" element={!loggedInUser() ? <Login/>:<Navigate replace to={"/main"}/>}  />
          <Route path="/main" element={loggedInUser() ? <MainPage/>:<Navigate replace to={"/login"}/>} />
          <Route path="/user" element={loggedInUser() ? <UserEdit/>:<Navigate replace to={"/login"}/>}  />
          <Route path="/createTask" element={loggedInUser() ? <CreateTask/>:<Navigate replace to={"/login"}/>} />
          <Route path="/createHabit" element={loggedInUser() ? <CreateHabit/>:<Navigate replace to={"/login"}/>}  />
          <Route path="/editTask/:slug" element={loggedInUser() ? <EditTask/>:<Navigate replace to={"/login"}/>} />
          <Route path="/editHabit/:slug" element={loggedInUser() ? <EditHabit/>:<Navigate replace to={"/login"}/>}  /> 
        </Routes>
      </Router>
    </MyContext.Provider>
  )
}

export default App
