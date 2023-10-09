import { useState, useContext,useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';

import MyContext from '../context.js';

import goBackIcon from "../assets/icons/goBackIcon.png";

import { moveHeaderUp, accessToken } from "../assets/functions.js";

function EditTask() {
    const {theme} = useContext(MyContext);
    const navigate = useNavigate();
    const { slug } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [task, setTask] = useState({});

    useEffect(()=>{
        moveHeaderUp()
        var id = slug;
        fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/activity/"+id , {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken()
            } 
        })
        .then((res) => res.json())
        .then((dato) => {
            if(dato.error){
                navigate("/main");
            }else{

            }
        });
    }, [])

    useEffect(()=>{
        if(task.name){
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
                alert("Tarea actualizada correctamente.")
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

                <div className="taskEditButtons">
                    <button className={"mainButton dark2"} type="submit">
                    actualizar
                    </button>
                    <button className={"mainButton red"} type="button">
                    eliminar
                    </button>
                </div>

            </form>
        </div>
    )
}

export default EditTask