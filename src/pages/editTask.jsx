import { useState, useContext,useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';

import MyContext from '../context.js';

import goBackIcon from "../assets/icons/goBackIcon.png";

import { moveHeaderUp, accessToken } from "../assets/functions.js";
import { API } from "../assets/constants.js";

function EditTask() {
    const {theme, currentTasks, setCurrentTasks, putNotifyPopUp} = useContext(MyContext);
    const navigate = useNavigate();
    const { slug } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [task, setTask] = useState({});

    useEffect(()=>{
        moveHeaderUp()
        const query = `
        query {
            taskById(task_id:"${slug}"){
                name
                description
                date
                is_done
            }
        }
        `;
        fetch(API, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + accessToken(),
            },
            body: JSON.stringify({query}),
        })
        .then((response) => response.json())
        .then((result) => {
            if(!result.errors){
                setTask(result.data.taskById)
            }else{
                navigate("/main")
            }
        });
    }, [])

    useEffect(() => {
        if(task.name) {
            setName(task.name);
            setDescription(task.description);
            setDate(task.date);
        }
    }, [task])

    // Updates all fields when they change
    const getName = (event) => {
        setName(event.target.value);
    };

    const getDescription = (event) => {
        setDescription(event.target.value);
    };

    const getDate = (event) => {
        setDate(event.target.value);
    };

    // Sends the received information to the server
    const handleUpdate = (e) => {
        e.preventDefault();

        const mutation = `
        mutation {
            updateTask(task_id: "${slug}",task: {
              name: "${name}"
              description:"${description}"
              date: "${date}"
            }){
              MatchedCount
              ModifiedCount
              UpsertedCount
              UpsertedID
            }
          }
        `;

        fetch(API, {
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
                putNotifyPopUp("Tarea actualizada correctamente.")
                var deepCopyList = JSON.parse(JSON.stringify(currentTasks));
                const indexToUpdate = deepCopyList.findIndex(item => item._id === slug);
                deepCopyList[indexToUpdate].name = name;
                deepCopyList[indexToUpdate].description = description;
                deepCopyList[indexToUpdate].date = date;
                setCurrentTasks(deepCopyList)
                navigate("/main")
            }
        });
    };

    return (
        <div className={"smallSectionContainer " + (theme === "light" ? "light" : "dark")}>
           <div className={"userEditButton userGoBackButton"} onClick={()=> navigate('/main')}>
                <img src={goBackIcon} className="userEditIcon" />
            </div> 
            <h1 className={"sectionTitle"}>editar tarea</h1>

            <form className="taskEditFormContainer" onSubmit={handleUpdate}>
                <p className="inputText">nombre</p>
                <input onChange={getName} className="inputField" required defaultValue={name}></input>
                <p className="inputText">descripcion</p>
                <textarea onChange={getDescription} className="inputField description" required defaultValue={description}></textarea>
                <p className="inputText">fecha</p>
                <input className="inputField date" type="date" onChange={getDate} required defaultValue={date}></input>

                <button className={"mainButton dark2"} type="submit">
                    actualizar
                </button>
            </form>
        </div>
    )
}

export default EditTask