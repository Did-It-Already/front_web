import { useState, useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";

import MyContext from '../context.js';

import TaskCard from "./TaskCard.jsx";

function TasksSection({isHabit, tasks}) {
    const {theme} = useContext(MyContext)
    const [tasksNotDone, setTasksNotDone] = useState(0)
    const[orderedTasks, setOrderedTasks] = useState([])
    
    const navigate = useNavigate()

    useEffect(()=>{
        setTasksNotDone(tasks.filter(task => !task.is_done || task.is_done === "false").length);
        setOrderedTasks(tasks.sort((a, b) => (a.is_done === b.is_done) ? 0 : (a.is_done == true || a.is_done == "true") ? 1 : -1));
    }, [tasks])

    // It renders the task cards
    function TaskCards() {
        if (tasks.length == 0) {
            return <p className="noTasksText">No tienes {isHabit ? 'ningún hábito':'ninguna tarea'}</p>
        } else {
        return (
            <div className="tasksContainer">
                {orderedTasks.map((task) => (
                    <TaskCard task = {task} isHabit={isHabit}/>
                ))}
            </div>
        );
        }
    }

    return (
        <div className={"sectionContainer " + (theme === (isHabit ? "dark": "light") ? "light" : "dark")}>
           <div onClick={()=> navigate(isHabit ? "/createHabit":"/createTask")}className={"addTaskButton " + (theme === (isHabit ? "dark": "light") ? "light" : "dark")} title={'Añadir ' + (isHabit ? 'hábito':'tarea')}>+</div> 
            <h1 className={"sectionTitle"}>{isHabit ? 'hábitos':'tareas'}</h1>
            <TaskCards/>
            {tasks.length > 0 ? 
            <p className={"sectionText"}>
                Tienes {tasksNotDone} {isHabit ? 'hábito(s)':'tarea(s)'} pendientes
            </p>
            :
            <></>}
        </div>
    )
}

export default TasksSection