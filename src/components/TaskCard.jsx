import { useContext} from "react";
import { useNavigate } from 'react-router-dom';

import editIconLight from "../assets/icons/editIconLight.png";
import editIconDark from "../assets/icons/editIconDark.png";

import deleteIconLight from "../assets/icons/deleteIconLight.png";
import deleteIconDark from "../assets/icons/deleteIconDark.png";

import MyContext from '../context.js';

import { accessToken } from "../assets/functions";

function TaskCard({task, isHabit}) {
  const {setCurrentHabits, currentHabits, setCurrentTasks, currentTasks} = useContext(MyContext);

  var date = new Date(task.date).toLocaleDateString();
  const navigate = useNavigate()

  const goToEdit = () => {
    if(isHabit){
      navigate("/editHabit/" + task._id)
    }else{
      navigate("/editTask/" + task._id)
    }
  }

  const markDoneHabit = () => {
    const mutation = `
      mutation {
        updateHabitIsDone(_id:"${task._id}")
      }
      `;

      fetch('http://127.0.0.1:5000/graphql', {
          method: 'POST',
          mode: "cors",
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + accessToken(),
          },
          body: JSON.stringify({query: mutation}),
      })
      .then((response) => response.json())
      .then((result) => {
          if(!result.errors){
            var deepCopyList = JSON.parse(JSON.stringify(currentHabits));
            for (var i = 0; i < deepCopyList.length; i++) {
              if (deepCopyList[i]._id === task._id) {
                deepCopyList[i].is_done = true;
                break;
              }
            }
            setCurrentHabits(deepCopyList)
          }
      });
  }

  const markDoneTask = () => {
    const mutation = `
      mutation {
        updateTaskIsDone(task_id: "${task._id}"){
          ModifiedCount
          MatchedCount
          UpsertedCount
          UpsertedID
        }
      }
    `;

    fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + accessToken(),
        },
        body: JSON.stringify({query: mutation}),
    })
    .then((response) => response.json())
    .then((result) => {
        if(!result.errors){
          var deepCopyList = JSON.parse(JSON.stringify(currentTasks));
          for (var i = 0; i < deepCopyList.length; i++) {
            if (deepCopyList[i]._id === task._id) {
              deepCopyList[i].is_done = deepCopyList[i].is_done == 'true' ? 'false': 'true';
              break;
            }
          }
          setCurrentTasks(deepCopyList)
        }
    });
  }

  const handleDeleteHabit = () => {
    const mutation = `
    mutation {
        deleteHabit(_id:"${task._id}")
      }
    `;

    fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + accessToken(),
        },
        body: JSON.stringify({query: mutation}),
    })
    .then((response) => response.json())
    .then((result) => {
        if(!result.errors){
          setCurrentHabits(currentHabits.filter(item => item._id !== task._id));
          navigate("/main")
        }
    });
  };

  const handleDeleteTask = () => {
    const mutation = `
    mutation {
        deleteTask( task_id: "${task._id}"){
            Msg
      }
    }
    `;

    fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + accessToken(),
        },
        body: JSON.stringify({query: mutation}),
    })
    .then((response) => response.json())
    .then((result) => {
        if(!result.errors){
            setCurrentTasks(currentTasks.filter(item => item._id !== task._id));
            navigate("/main")
        }
    });
  };

  const handleDelete = () => {
    if(isHabit){
      handleDeleteHabit()
    }else{
      handleDeleteTask()
    }
  }

  return (
    <div className={"taskCard " + (task.is_done === true || task.is_done === "true"  ? "dark" : "light")}>

      <div className="taskMainContainer">
          <div className={"taskCheckbox " + (task.is_done === true || task.is_done === "true"  ? "light" : "dark")} onClick={isHabit ? markDoneHabit : markDoneTask}>
            {task.is_done === true || task.is_done === "true"   ? "✓" : ""}
          </div>
        <div className="taskTextContainer">
          <p className="taskCardTitle">
          {task.name}
          </p>

          <p className="taskCardDescription">
          {task.description}
          </p>

          {isHabit ? <></> : 
          <>
            <p className="taskCardDate">
              <b>fecha:</b> {date}
            </p>
          </>}
        </div>
      </div>

      <div>
        <div className="taskEditButton" title ={"Editar " + (isHabit ? "hábito": "tarea")} onClick={goToEdit}>
            <img src={task.is_done === true || task.is_done === "true"  ? editIconLight: editIconDark} className="taskEditIcon" />
        </div> 
        <div className="taskEditButton" title ={"Eliminar " + (isHabit ? "hábito": "tarea")} onClick={ handleDelete }>
            <img src={task.is_done === true || task.is_done === "true"  ? deleteIconLight: deleteIconDark} className="taskEditIcon" />
        </div> 
      </div>

    </div>
  );
}

export default TaskCard;