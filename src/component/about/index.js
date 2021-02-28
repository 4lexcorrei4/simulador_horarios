import React from "react";
import "./index.css";
import {NavLink} from "react-router-dom";

const About = () => {
    return <div id="about">
        <div id="content">
            <div className="header">
                <h3>Sobre</h3>
                <NavLink id="close" to="/">&#10005;</NavLink>
            </div>
            <div className="content">
                Descrição: plataforma que permite a simulação e criação de horários.
                <br /><br />
                Licensa: <a href="https://github.com/4lexcorrei4/simulador_horarios/blob/master/LICENSE" target="_blank">GPLv3</a>
                <br /><br />
                Recursos:
                <ul>
                    <li><a href="https://github.com/4lexcorrei4/simulador_horarios" target="_blank">GitHub</a>: Código</li>
                    <li><a href="https://reactjs.org/" target="_blank">React</a>: Front-end</li>
                    <li><a href="https://supernova.nunl.pt/" target="_blank">Supernova</a>: Back-end</li>
                </ul>
            </div>
        </div>
    </div>
};

export default About;