import doneIcon from "../assets/icons/doneIcon.png";

import { togglePopUp } from "../assets/functions";

function NotifyPopUp({message}) {

    return (
        <div className ="popUpWhole" id = "popUpBackground" onClick ={()=>togglePopUp(true)}>
            <div className ="popUpCard" id = "popUpId">
                <p>{message}</p>
                <div className="doneButton" onClick ={()=>togglePopUp(true)}>
                    <img src={doneIcon} className = "doneLogo"/>
                </div>
            </div>
        </div>
    )
}

export default NotifyPopUp