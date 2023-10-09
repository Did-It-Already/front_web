import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import MyContext from '../context.js';

import { deleteLocalStorage } from "../assets/functions.js";

import editIconLight from "../assets/icons/editIconLight.png";
import logoutIcon from "../assets/icons/logoutIcon.png";
import userBackgroundLight from "../assets/images/userBackgroundLight.png";
import userBackgroundDark from "../assets/images/userBackgroundDark.png";

function UserSection({user}) {
    const {theme, setCurrentUser, setCurrentTasks, setCurrentHabits} = useContext(MyContext)
    const navigate = useNavigate();

    const logout = () => {
        deleteLocalStorage();
        setCurrentUser({})
        setCurrentTasks([])
        setCurrentHabits([])
        navigate("/");
    }

    return (
        <div className={"userSectionContainer " + (user.profile_picture !== "" ? "withPic" : "noPic")}>
            <div className={"userEditButton"}onClick={()=> navigate('/user')} title ="Gestionar cuenta">
                <img src={editIconLight} className="userEditIcon" />
            </div> 
            <div className={"userEditButton logoutButton"}onClick={logout} title ="Cerrar sesión">
                <img src={logoutIcon} className="userEditIcon" />
            </div> 
            <h1 className={"sectionTitle"}>
            mi cuenta</h1>

            <img src={user.profile_picture !== "" ? user.profile_picture : (theme === 'light' ? userBackgroundLight: userBackgroundDark)} className="userImage" />
            
            <div className="userNameContainer">
                <p className={"userCardTitle"}>
                    {user.name}
                </p>
                <p className={"userCardDescription"}>
                    {user.last_name}
                </p>
            </div>
        </div>
    )
}

export default UserSection