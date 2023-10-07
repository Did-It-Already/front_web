import { useEffect} from "react";


import UserSection from "../components/UserSection.jsx";
import CalendarSection from "../components/CalendarSection.jsx";
import TasksSection from "../components/TasksSection.jsx";

import {tasks, habits, user} from '../assets/constants.js'

import { moveHeaderUp } from "../assets/functions.js";

function mainPage() {

    useEffect(()=>{
        moveHeaderUp()
    }, [])

    return (
        <div className="sectionsMainContainer">
            <div className="leftSectionContainer">
                <UserSection user={user}/>
                <CalendarSection/>    
            </div>
            <TasksSection isHabit={false} tasks ={tasks}/>
            <TasksSection isHabit={true} tasks ={habits}/>
        </div>
    )
}

export default mainPage