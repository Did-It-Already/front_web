import { useEffect, useContext} from "react";

import MyContext from '../context.js';

import UserSection from "../components/UserSection.jsx";
import CalendarSection from "../components/CalendarSection.jsx";
import TasksSection from "../components/TasksSection.jsx";

import { moveHeaderUp } from "../assets/functions.js";

function mainPage() {

    const {currentHabits, currentTasks, currentUser} = useContext(MyContext)

    useEffect(()=>{
        moveHeaderUp()
    }, [])

    return (
        <div className="sectionsMainContainer">
            <div className="leftSectionContainer">
                <UserSection user ={currentUser}/>
                <CalendarSection/>    
            </div>
            <TasksSection isHabit={false} tasks={currentTasks}/>
            <TasksSection isHabit={true} tasks={currentHabits}/>
        </div>
    )
}

export default mainPage