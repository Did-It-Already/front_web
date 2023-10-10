import { useState, useContext,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import MyContext from '../context.js';

import closeIcon from "../assets/icons/closeIcon.png";
import uploadIcon from "../assets/icons/uploadIcon.png";
import goBackIcon from "../assets/icons/goBackIcon.png";

import { moveHeaderUp, deleteLocalStorage, accessToken } from "../assets/functions.js";
import { API } from "../assets/constants.js";

function UserEdit() {
    const {theme, setTheme, currentUser,setCurrentUser, setCurrentTasks, setCurrentHabits, putNotifyPopUp} = useContext(MyContext);
    const navigate = useNavigate();

    const [profilePicture, setProfilePicture] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(()=>{
        moveHeaderUp()
    }, [])

    useEffect(()=>{
        if(currentUser.name){
            setProfilePicture(currentUser.profile_picture);
            setName(currentUser.name);
            setLastName(currentUser.last_name);
            setEmail(currentUser.email);
            document.getElementById("pictureContainerId").style.backgroundImage = "url('" + currentUser.profile_picture +"')";
        }
    }, [currentUser])


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

    const logout = () => {
        deleteLocalStorage();
        setCurrentUser({})
        setCurrentTasks([])
        setCurrentHabits([])
        navigate("/");
    }

    // Sends the received information to the server
    const handleUpdate = (e) => {
        e.preventDefault();

        const mutation = `
        mutation {
            updateUser(user:{
              name: "${name}"
              last_name: "${lastName}"
              theme: "${theme}"
              profile_picture: "${profilePicture}"
            }){
              name
              last_name
              email
              theme
              profile_picture
            }
          }
        `;

        const mutation2 = `
        mutation {
            updateUser(user:{
              name: "${name}"
              last_name: "${lastName}"
              theme: "${theme}"
            }){
              name
              last_name
              email
              theme
              profile_picture
            }
          }
        `;

        // Si la imagen no cambió, no la mandamos de nuevo
        if(profilePicture === currentUser.profile_picture){
            const finalMutation = mutation2
        }else{
            const finalMutation = mutation
        }

        fetch(API, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + accessToken(),
            },
            body: JSON.stringify({query: finalMutation}),
        })
        .then((response) => response.json())
        .then((result) => {
            if(!result.errors){
                setCurrentUser(result.data.updateUser)
                localStorage.setItem('theme', theme)
                putNotifyPopUp("Sus datos fueron actualizados correctamente.")
                navigate("/main")
            }
        });
    };

    // Sends the received information to the server
    const handleDelete = (e) => {
        if (!confirm("¿Desea eliminar su cuenta? Esta acción es irreversible.")) {
            return
        }

        const mutation = `
        mutation {
            deleteUser{
              message
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
                putNotifyPopUp("Su cuenta ha sido eliminada.")
                logout()
            }
        }); 
    };

    return (
        <div className={"wideSectionContainer dark"}>
           <div className={"userEditButton userGoBackButton"} onClick={()=> navigate('/main')}>
                <img src={goBackIcon} className="userEditIcon" />
            </div> 
            <h1 className={"sectionTitle"}>gestionar cuenta</h1>

            <form className="userEditFormContainer" onSubmit={handleUpdate}>
            <div className="userEditFieldsContainer">
                <div className="userEditColumn">
                    <p className="inputText">nombre(s)*</p>
                    <input onChange={getName} className="inputField" defaultValue={name} required></input>
                    <p className="inputText">apellido(s)*</p>
                    <input onChange={getLastName} className="inputField" defaultValue={lastName} required></input>
                    <p className="inputText">correo electrónico</p>
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
                        <label htmlFor="uploadPhoto" className ={"uploadImageButton light"}>
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
                    <button className={"mainButton dark2"} type="submit">
                    actualizar
                    </button>
                    <button className={"mainButton red"} onClick={handleDelete} type="button">
                    eliminar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserEdit