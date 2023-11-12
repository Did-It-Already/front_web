import owlIcon from "../assets/images/owl.png";

import { togglePopUp2 } from "../assets/functions";

function MessagePopUp({message}) {

    return (
        <div className ="popUpWhole" id = "popUpBackground2" onClick ={()=>togglePopUp2(true)}>
            <div className ="popUpCard2" id = "popUpId2">
                <img src={owlIcon} className = "owlLogo"/>
                <div>
                <p className="messageTitle">Consejo del día</p>
                <p className="messageText">"{message}"</p>
                </div>
            </div>
        </div>
    )
}

export default MessagePopUp