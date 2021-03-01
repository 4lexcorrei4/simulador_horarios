import React from "react";
import "./index.css";
import {NavLink} from "react-router-dom";

const Footer = () => {
    return <div id="footer">
        <img id="logo" src={"/logo.png"} />
        <div id="menu">
            {/*<a href="https://github.com/4lexcorrei4/simulador_horarios" target="_blank" className="option">
                <ion-icon name="logo-github"></ion-icon>Código
            </a>
            <a href="https://bitsys.tech" target="_blank" className="option">
                <img src="https://bitsys.tech/logo.png" />Desenvolvedor
            </a>*/}
            <NavLink to="/about" className="option">
                <ion-icon name="information-circle"></ion-icon>Sobre
            </NavLink>
        </div>
    </div>
};

export default Footer;