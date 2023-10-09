import { useState, useContext,useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';

import MyContext from '../context.js';

import goBackIcon from "../assets/icons/goBackIcon.png";

import { moveHeaderUp, accessToken } from "../assets/functions.js";

function EditHabit() {
    const {theme} = useContext(MyContext);
    const navigate = useNavigate();
    const { slug } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("");
    const [habit, setHabit] = useState({});

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
        if(habit.name){
            setName(habit.name);
            setDescription(habit.description);
            setFrequency(habit.frequency);
        }
    }, [habit])

    // Updates all fields when they change
    const getName = (event) => {
        setName(event.target.value);
    };

    const getDescription = (event) => {
        setDescription(event.target.value);
    };

    const getFrequency = (event) => {
        setFrequency(event.target.value);
    };

    // Sends the received information to the server
    const handleUpdate = (e) => {
        e.preventDefault();

        const mutation = `
        mutation {
            createHabit( habit: {
              name: "${name}"
              description:"${description}"
              frequency: ${frequency}
            }){
              name
              start_date
              description
              
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
                alert("Hábito actualizado correctamente.")
            }
        });
    };

    return (
        <div className={"smallSectionContainer " + (theme === "light" ? "dark" : "light")}>
           <div className={"userEditButton userGoBackButton"} onClick={()=> navigate('/main')}>
                <img src={goBackIcon} className="userEditIcon" />
            </div> 
            <h1 className={"sectionTitle"}>editar hábito</h1>

            <form className="taskEditFormContainer" onSubmit={handleUpdate}>
                <p className="inputText">nombre</p>
                <input onChange={getName} className="inputField" required defaultValue={name}></input>
                <p className="inputText">descripcion</p>
                <textarea onChange={getDescription} className="inputField description" required defaultValue={description}></textarea>
                <p className="inputText">frecuencia</p>
                <div className="frequencyContainer">
                    <p className="inputText">cada</p>
                    <input className="inputField frequency" min = "1" type="number" onChange={getFrequency} required defaultValue={frequency}></input>
                    <p className="inputText">días</p>
                </div>

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

export default EditHabit


