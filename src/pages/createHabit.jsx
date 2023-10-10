import { useState, useContext,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import MyContext from '../context.js';

import goBackIcon from "../assets/icons/goBackIcon.png";

import { moveHeaderUp, accessToken, getHabits } from "../assets/functions.js";

function CreateHabit() {
    const {theme,putNotifyPopUp, setCurrentHabits} = useContext(MyContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("");

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

    const getFrequency = (event) => {
        setFrequency(event.target.value);
    };

    // Sends the received information to the server
    const handleSubmit = (e) => {
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
                putNotifyPopUp("Hábito creado correctamente.")
                setTimeout(function() {
                    getHabits(accessToken()).then((habits) => {
                        setCurrentHabits(habits)
                        navigate("/main")
                    });
                }, 1500);             
            }
        });
    };

    return (
        <div className={"smallSectionContainer " + (theme === "light" ? "dark" : "light")}>
           <div className={"userEditButton userGoBackButton"} onClick={()=> navigate('/main')}>
                <img src={goBackIcon} className="userEditIcon" />
            </div> 
            <h1 className={"sectionTitle"}>añadir hábito</h1>

            <form className="taskEditFormContainer" onSubmit={handleSubmit}>
                <p className="inputText">nombre</p>
                <input onChange={getName} className="inputField" required></input>
                <p className="inputText">descripcion</p>
                <textarea onChange={getDescription} className="inputField description" required></textarea>
                <p className="inputText">frecuencia</p>
                <div className="frequencyContainer">
                    <p className="inputText">cada</p>
                    <input className="inputField frequency" min = "1" defaultValue="1" type="number" onChange={getFrequency} required></input>
                    <p className="inputText">días</p>
                </div>
                <button className={"mainButton " + (theme === "light" ? "light" : "dark")} type="submit">
                    crear hábito
                </button>
            </form>
        </div>
    )
}

export default CreateHabit