import { useState, useContext,useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';

import MyContext from '../context.js';

import goBackIcon from "../assets/icons/goBackIcon.png";

import { moveHeaderUp, accessToken } from "../assets/functions.js";

function EditHabit() {
    const {theme, currentHabits, setCurrentHabits, putNotifyPopUp} = useContext(MyContext);
    const navigate = useNavigate();
    const { slug } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("");
    const [habit, setHabit] = useState({});

    useEffect(()=>{
        moveHeaderUp()
        const query = `
        query {
            userHabits(_id: "${slug}"){
              name
              start_date
              description
              _id
              is_done
              frequency
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
            body: JSON.stringify({query}),
        })
        .then((response) => response.json())
        .then((result) => {
            if(!result.errors){
                setHabit(result.data.userHabits[0])
            }else{
                navigate("/main")
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
            updateHabit(_id: "${slug}", habit: {
              name: "${name}"
              description: "${description}"
              frequency: ${frequency}
            }){
              name
              start_date
              description
              frequency
              _id
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
                putNotifyPopUp("Hábito actualizado correctamente.")
                var deepCopyList = JSON.parse(JSON.stringify(currentHabits));
                const indexToUpdate = deepCopyList.findIndex(item => item._id === slug);
                deepCopyList[indexToUpdate].name = name;
                deepCopyList[indexToUpdate].description = description;
                deepCopyList[indexToUpdate].frequency = frequency;
                setCurrentHabits(deepCopyList)
                navigate("/main")
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

                <button className={"mainButton dark2"} type="submit">
                actualizar
                </button>
            </form>
        </div>
    )
}

export default EditHabit


