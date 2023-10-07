import { useState, useContext,useEffect} from "react";

import MyContext from '../context.js';

import TaskCard from "./TaskCard.jsx";

function TasksSection({isHabit, tasks}) {
    const {theme} = useContext(MyContext)
    const [tasksNotDone, setTasksNotDone] = useState(0)

    useEffect(()=>{
        var element = document.getElementById('titleBoxId')
        if(element.className === 'titleBox'){
            element.classList.add("normal")
        }
        setTasksNotDone(tasks.filter(task => !task.is_done).length);
    }, [])

    // It renders the task cards
    function TaskCards() {
        if (tasks.length == 0) {
            return <p className="noTasksText">No tienes {isHabit ? 'ningún hábito':'ninguna tarea'}</p>
        } else {
        return (
            <div className="tasksContainer">
                {tasks.map((task) => (
                    <TaskCard task = {task} isHabit={isHabit}/>
                ))}
            </div>
        );
        }
    }

    return (
        <div className={"sectionContainer " + (theme === (isHabit ? "dark": "light") ? "light" : "dark")}>
           <div className={"addTaskButton " + (theme === (isHabit ? "dark": "light") ? "light" : "dark")}>+</div> 
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