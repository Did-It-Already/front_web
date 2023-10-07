import UserSection from "../components/UserSection.jsx";
import CalendarSection from "../components/CalendarSection.jsx";
import TasksSection from "../components/TasksSection.jsx";

import {tasks, habits, user} from '../assets/constants.js'

function mainPage() {
    return (
        <div className="sectionsMainContainer">
            <div className="leftSectionContainer">
                <UserSection user={user}/>
                <CalendarSection user={user}/>    
            </div>
            <TasksSection isHabit={false} tasks ={tasks}/>
            <TasksSection isHabit={true} tasks ={habits}/>
        </div>
    )
}

export default mainPage