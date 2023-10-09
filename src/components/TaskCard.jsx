import { useContext} from "react";

import editIconLight from "../assets/icons/editIconLight.png";
import editIconDark from "../assets/icons/editIconDark.png";

import MyContext from '../context.js';

import { accessToken } from "../assets/functions";

function TaskCard({task, isHabit}) {
  var date = new Date(task.date).toLocaleDateString();

  const {setCurrentHabits, currentHabits, setCurrentTasks, currentTasks} = useContext(MyContext);

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

      <div className="taskEditButton" title ={"Editar " + (isHabit ? "hábito": "tarea")}>
          <img src={task.is_done === true || task.is_done === "true"  ? editIconLight: editIconDark} className="taskEditIcon" />
      </div> 
    </div>
  );
}

export default TaskCard;