import { useState, useContext,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import MyContext from '../context.js';

import goBackIcon from "../assets/icons/goBackIcon.png";

import { moveHeaderUp, accessToken } from "../assets/functions.js";

function CreateTask() {
    const {theme} = useContext(MyContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    useEffect(()=>{
        moveHeaderUp()
    }, [])

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
            createTask(task: {
              name: "${name}"
              description:"${description}"
              date: "${date}"
            }){
              InsertedID
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
                alert("Tarea creada correctamente.")
                window.location.reload()
            }
        });
    };

    return (
        <div className={"smallSectionContainer " + (theme === "light" ? "light" : "dark")}>
           <div className={"userEditButton userGoBackButton"} onClick={()=> navigate('/main')}>
                <img src={goBackIcon} className="userEditIcon" />
            </div> 
            <h1 className={"sectionTitle"}>añadir tarea</h1>

            <form className="taskEditFormContainer" onSubmit={handleUpdate}>
                <p className="inputText">nombre</p>
                <input onChange={getName} className="inputField" required></input>
                <p className="inputText">descripcion</p>
                <input onChange={getDescription} className="inputField" required></input>
                <p className="inputText">fecha</p>
                <input className="inputField" type="date" onChange={getDate} required></input>

                <button className={"mainButton " + (theme === "light" ? "dark" : "light")} type="submit">
                    crear tarea
                </button>
            </form>
        </div>
    )
}

export default CreateTask