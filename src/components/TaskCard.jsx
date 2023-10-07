import editIconLight from "../assets/icons/editIconLight.png";
import editIconDark from "../assets/icons/editIconDark.png";

function TaskCard({task, isHabit}) {
  var date = new Date(task.date).toLocaleDateString();

  return (
    <div className={"taskCard " + (task.is_done  ? "dark" : "light")}>

      <div className="taskMainContainer">
        <div className={"taskCheckbox " + (task.is_done  ? "light" : "dark")} onClick={()=>{}}>
          {task.is_done  ? "✓" : ""}
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

      <div className="taskEditButton" title ="Editar tarea" >
          <img src={task.is_done ? editIconLight: editIconDark} className="taskEditIcon" />
      </div> 
    </div>
  );
}

export default TaskCard;