import { useContext } from "react";

import MyContext from '../context.js';

import editIconLight from "../assets/icons/editIconLight.png";
import userBackgroundLight from "../assets/images/userBackgroundLight.png";
import userBackgroundDark from "../assets/images/userBackgroundDark.png";

function UserSection({user}) {
    const {theme} = useContext(MyContext)

    return (
        <div className={"userSectionContainer " + (user.profile_picture !== "" ? "withPic" : "noPic")}>
            <div className={"userEditButton"}>
                <img src={editIconLight} className="userEditIcon" />
            </div> 
            <h1 className={"sectionTitle"}>
            mi perfil</h1>

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