import React from "react";
import "./index.css";
import {NavLink} from "react-router-dom";

const About = () => {
    return <div id="about">
        <div id="content">
            <div className="header">
                <h2>Sobre</h2>
                <NavLink id="close" to="/">&#10005;</NavLink>
            </div>
            <div className="content">
                <h4>Objetivo</h4>
                Permitir a simulação de horários da <a href="https://www.fct.unl.pt/" target="_blank">NOVA School of Science and Technology | FCT NOVA</a>.
                <h4>Contribuir</h4>
                Quaisquer sugestões de melhoria são sempre bem vindas!<br />
                O código que permite pôr esta plataforma em funcionamento está disponível <a href="https://github.com/4lexcorrei4/simulador_horarios" target="_blank">aqui</a>.<br />
                Sente-te à vontade para contribuir e ajudar, sempre segundo a licensa <a href="https://github.com/4lexcorrei4/simulador_horarios/blob/master/LICENSE" target="_blank">GPLv3</a>.
                <h4>Contacto</h4>
                Para me contactares basta enviares mensagem por uma das redes sociais disponíveis <a href="https://bitsys.tech/" target="_blank">aqui</a>.
                <h4>Desenvolvedor</h4>
                <a href="https://bitsys.tech/" target="_blank">Alexandre Correia</a>
                <h4>Créditos</h4>
                Frameworks e serviços usados:
                <ul>
                    <li><a href="https://reactjs.org/" target="_blank">React</a>: Front-end</li>
                    <li><a href="https://supernova.nunl.pt/" target="_blank">Supernova</a>: Acesso aos conteúdos</li>
                </ul>
            </div>
        </div>
    </div>
};

export default About;
