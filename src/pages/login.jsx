import { useState , useContext, useEffect} from "react";
import { NavLink , useNavigate} from "react-router-dom";

import MyContext from '../context.js';

import { moveHeaderUp, getUserInfo, getHabits, getTasks} from "../assets/functions.js";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const {theme, setCurrentUser, setCurrentHabits, setCurrentTasks} = useContext(MyContext)

    useEffect(()=>{
        moveHeaderUp()
    }, [])

    // Updates fields when they change
    const getEmail = (event) => {
        setEmail(event.target.value);
    };

    const getPassword = (event) => {
        setPassword(event.target.value);
    };

    // Sends the received information to the server
    const handleSubmit = (e) => {
        e.preventDefault();
        const mutation = `
            mutation {
                login(user: {
                    email: "${email}"
                    password: "${password}"
                }) {
                    access
                    refresh
                    status
                }
            }
        `;

        fetch('http://127.0.0.1:5000/graphql', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: mutation}),
        })
        .then((response) => response.json())
        .then((result) => {
            if(!result.errors){
                var access = result.data.login.access
                var refresh = result.data.login.refresh
                localStorage.setItem("access",access)
                localStorage.setItem("refresh",refresh)
                getUserInfo(access).then((userData) => {
                    setCurrentUser(userData)
                    localStorage.setItem('theme', userData.theme)
                })
                getHabits(access).then((habits) => {setCurrentHabits(habits)})
                getTasks(access).then((tasks) => {setCurrentTasks(tasks)})
                navigate("/main");
            }else{
                alert("Usuario o contraseña incorrectos.")
            }
        });  
    };

  return (
    <div className="supremeFormContainer">
    <h1 className={"formTitle " + (theme === "light" ? "light" : "dark")}>login</h1>
    <form className={"formContainer " + (theme === "light" ? "light" : "dark")} onSubmit={handleSubmit}>
        <p className="inputText">correo electrónico*</p>
        <input onChange={getEmail} type="email" className="inputField" required></input>
        
        <p className="inputText">contraseña*</p>
        <input onChange={getPassword} className="inputField" type="password" required></input>

        <button 
            className={"mainButton " + (theme === "light" ? "light" : "dark")}
        >
        ingresar
        </button>

        <div className = "inputText">
            ¿no tienes cuenta?&nbsp;
            <NavLink to="/register" className = {"goToLoginLink "  + (theme === "light" ? "light" : "dark")}>
                registrarse
            </NavLink>
        </div>

    </form>
    </div>
  )
}

export default Login