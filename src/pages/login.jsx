import { useState , useContext, useEffect} from "react";
import { NavLink } from "react-router-dom";

import MyContext from '../context.js';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {theme} = useContext(MyContext)

    useEffect(()=>{
        var element = document.getElementById('titleBoxId')
        if(element.className === 'titleBox'){
            element.classList.add("normal")
        }
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

        const body = {
            "email": email,
            "password": password
        };

        alert(JSON.stringify(body))
    
        fetch("http://127.0.0.1:8000/users/", {
            method: "POST",
            mode: "cors",
            body: formData
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.user_id){
                alert("Usuario creado correctamente");
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