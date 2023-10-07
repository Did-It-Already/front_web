import { useState, useContext,useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';

import MyContext from '../context.js';

import closeIcon from "../assets/icons/closeIcon.png";
import uploadIcon from "../assets/icons/uploadIcon.png";
import { user} from '../assets/constants.js';

function UserEdit() {
    const {theme, setTheme} = useContext(MyContext);
    const navigate = useNavigate();
    const { slug } = useParams();

    const [profilePicture, setProfilePicture] = useState(user.profile_picture);
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);

    useEffect(()=>{
        var element = document.getElementById('titleBoxId')
        if(element.className === 'titleBox'){
            element.classList.add("normal")
        }
        element= document.getElementById("pictureContainerId");
        element.style.backgroundImage = "url('" + profilePicture +"')";
    }, [])

    // Updates all fields when they change
    const getName = (event) => {
        setName(event.target.value);
    };

    const getLastName = (event) => {
        setLastName(event.target.value);
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
        <div className={"wideSectionContainer " + (theme === "dark" ? "light" : "dark")}>
           <div className={"goBackButton " + (theme === "dark" ? "light" : "dark")} onClick={()=> navigate('/main')}>volver</div> 
            <h1 className={"sectionTitle"}>gestionar perfil</h1>

            <form className="userEditFormContainer" onSubmit={handleSubmit}>
            <div className="userEditFieldsContainer">
                <div className="userEditColumn">
                    <p className="inputText">nombre(s)*</p>
                    <input onChange={getName} className="inputField" defaultValue={user.name}required></input>
                    <p className="inputText">apellido(s)*</p>
                    <input onChange={getLastName} className="inputField" defaultValue={user.last_name} required></input>
                    <p className="inputText">correo electrónico*</p>
                    <p className="emailFieldText">{email}</p>
                </div>

                <div className="userEditColumn">
                    <p className="inputText">tema</p>
                    <div className="themeButtonsContainer2" onClick={()=>setTheme(theme === "light" ? "dark": "light")}>
                        <div className={"themeFocuser " + (theme === "light" ? "selectedLeft" : "selectedRight2")}></div>   
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
                </div>
                </div>

                <div className="userEditButtons">
                    <button className={"mainButton " + (theme === "light" ? "light" : "dark")}>
                    editar
                    </button>
                    <button className={"mainButton " + (theme === "light" ? "light" : "dark")}>
                    borrar
                    </button>
                    <button className={"mainButton " + (theme === "light" ? "light" : "dark")}>
                    cerrar sesión
                    </button>
                </div>

            </form>




        </div>
    )
}

export default UserEdit