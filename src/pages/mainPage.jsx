import { useEffect, useContext} from "react";

import MyContext from '../context.js';

import UserSection from "../components/UserSection.jsx";
import CalendarSection from "../components/CalendarSection.jsx";
import TasksSection from "../components/TasksSection.jsx";

import {tasks, habits} from '../assets/constants.js'
import { moveHeaderUp } from "../assets/functions.js";

function mainPage() {

    const {currentUser} = useContext(MyContext)

    useEffect(()=>{
        moveHeaderUp()
    }, [])

    return (
        <div className="sectionsMainContainer">
            <div className="leftSectionContainer">
                <UserSection user={currentUser}/>
                <CalendarSection/>    
            </div>
            <TasksSection isHabit={false} tasks ={tasks}/>
            <TasksSection isHabit={true} tasks ={habits}/>
        </div>
    )
}

export default mainPage