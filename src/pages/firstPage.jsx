import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import MyContext from '../context.js';

import { moveHeaderDown } from "../assets/functions.js";

function FirstPage() {
    const {theme} = useContext(MyContext)

    useEffect(()=>{
        moveHeaderDown()
    }, [])

    return (
        <NavLink to="/login" className={"bigButton " + (theme === "light" ? "light" : "dark")}>
            comenzar
        </NavLink>
    )
}

export default FirstPage