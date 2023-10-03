import { useContext } from "react";
import { NavLink } from "react-router-dom";
import MyContext from '../context.js';

function FirstPage() {

    const {theme} = useContext(MyContext)
    
    return (
        <NavLink to="/register">
            <div className={"formContainer " + (theme === "light" ? "light" : "dark")}>
                comenzar
            </div>
        </NavLink>
    )
}

export default FirstPage