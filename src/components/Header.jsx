import { useContext } from 'react';
import { NavLink } from "react-router-dom";

import MyContext from '../context.js';

import darkLogo from "../assets/logos/darkLogo.png";
import lightLogo from "../assets/logos/lightLogo.png";

function Header() {
    const { theme } = useContext(MyContext)
    return <div className = "titleBox normal" id="titleBoxId">
        <NavLink to="/">
            <img src={theme ==="light" ? lightLogo : darkLogo } className = "websiteLogo"/>
        </NavLink>
    </div>
}

export default Header