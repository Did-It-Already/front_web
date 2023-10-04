import { useState , useContext} from "react";
import closeIcon from "../assets/icons/closeIcon.png";
import uploadIcon from "../assets/icons/uploadIcon.png";
import MyContext from '../context.js';
import { NavLink } from "react-router-dom";

function Register() {

    const [profilePicture, setProfilePicture] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const {theme, setTheme} = useContext(MyContext)

    // Updates all fields when they change
    const getName = (event) => {
        setName(event.target.value);
    };

    const getLastName = (event) => {
        setLastName(event.target.value);
    };

    const getEmail = (event) => {
        setEmail(event.target.value);
    };

    const getPassword = (event) => {
        setPassword(event.target.value);
      };

    const getPasswordAgain = (event) => {
        setPasswordAgain(event.target.value);
    };

    // Defining conditional style for password completion
    const s = {
        backgroundColor: (passwordAgain != password) && (passwordAgain != "") ? "#f78b8b": "white",
        color: passwordAgain != password ? "white": "black",    
    };

    const imageUpload = (e) => {
        const files = e.target.files;
        const file = files[0];
        resizeImage(file, 500, 500, function(resizedBase64) {
            setProfilePicture(resizedBase64);
            var element= document.getElementById("pictureContainerId");
            element.style.backgroundImage = "url('" + resizedBase64 +"')";
        });
    }
    
    function resizeImage(file, maxWidth, maxHeight, callback) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var image = new Image();
            image.onload = function() {
                var width = image.width;
                var height = image.height;
                if (width > maxWidth || height > maxHeight) {
                    var ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);
                var resizedBase64 = canvas.toDataURL('image/jpeg');
                callback(resizedBase64);
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    
    // Function for removing an image file
    function removeImage(){
        var element = document.getElementById('uploadPhoto');
        element.value = "";
        setProfilePicture("");
    }

    // Sends the received information to the server
    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            "name": name,
            "last_name": lastName,
            "email": email,
            "theme": theme,
            "profile_picture": profilePicture
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
    <h1 className={"formTitle " + (theme === "light" ? "light" : "dark")}>registro</h1>
    <form className={"formContainer " + (theme === "light" ? "light" : "dark")} onSubmit={handleSubmit}>
        <p className="inputText">nombre(s)*</p>
        <input onChange={getName} className="inputField" required></input>
        <p className="inputText">apellido(s)*</p>
        <input onChange={getLastName} className="inputField" required></input>
        <p className="inputText">correo electrónico*</p>
        <input onChange={getEmail} type="email" className="inputField" required></input>
        
        <p className="inputText">contraseña*</p>
        <input onChange={getPassword} className="inputField" type="password" required></input>
        <p className="inputText">confirmar contraseña*</p>
        <input onChange={getPasswordAgain} className="inputField" type="password" style={s} required></input>
              
        <p className="inputText">tema</p>
        <div className="themeButtonsContainer" onClick={()=>setTheme(theme === "light" ? "dark": "light")}>
            <div className={"themeFocuser " + (theme === "light" ? "selectedLeft" : "selectedRight")}></div>   
            <div className="themeButton">
                {theme === "light" ? "claro" : "oscuro"}
            </div>
        </div>

        <div className="profilePhotoOption">
            <p className="inputText">foto de perfil</p>
            <label htmlFor="uploadPhoto" className ={"uploadImageButton " + (theme === "light" ? "light" : "dark")}>
                <img src={uploadIcon} className="uploadIcon"/>
            </label>
            <input type="file" onChange={imageUpload} className ="notShow" id="uploadPhoto" ></input>
        </div>
        
        <div className ={"imageContainer " + (profilePicture === "" ? "notShow" : "")} id="pictureContainerId">
            <img src={closeIcon} className="closeButton" onClick={removeImage} title="Quitar Imagen"/>
        </div>

        <button 
            className={"mainButton " + (theme === "light" ? "light" : "dark")}
            disabled={((passwordAgain != password) && (passwordAgain != "")) || (password.length < 8)}
            title ={(passwordAgain != password) ? "Las contraseñas no coinciden":(password.length < 8) ? "La contraseña debe tener al menos 8 caracteres": "" }
        >
        registrarse
        </button>

        <div className = "inputText">
            ¿ya tienes cuenta?&nbsp;
            <NavLink to="/login" className = {"goToLoginLink "  + (theme === "light" ? "light" : "dark")}>
            iniciar sesión
            </NavLink>
        </div>

    </form>
    </div>
  )
}

export default Register