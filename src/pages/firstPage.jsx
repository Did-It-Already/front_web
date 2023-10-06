import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import MyContext from '../context.js';

function FirstPage() {

    const {theme} = useContext(MyContext)

    useEffect(()=>{
        var element = document.getElementById('titleBoxId')
        if(element.className === 'titleBox normal'){
            element.classList.remove("normal")
        }
    }, [])

    
    return (
        <NavLink to="/login" className={"bigButton " + (theme === "light" ? "light" : "dark")}>
            comenzar
        </NavLink>
    )
}

export default FirstPage