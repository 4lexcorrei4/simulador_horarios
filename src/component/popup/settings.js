import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/duck/redux.duck";
import $ from "jquery";

const Settings = ({closePopup}) => {
    const dispatch = useDispatch();

    const theme = useSelector(state => state.redux.theme);

    const setTheme = (option) => dispatch(actions.setTheme(option));

    return <div id="settings">
        {/*<div id="look" className="option-block">
            <div className="option">
                Aparência
            </div>
            <div className="content">
                <div className="switch">
                    <div className="title">
                        Tema
                    </div>
                    <div className="options">
                        <span className={"switch-option" + (theme == "light" ? " selected" : "")} title="Claro" onClick={() => setTheme("light")}>Claro</span>
                        <span className={"switch-option" + (theme == "dark" ? " selected" : "")} title="Escuro" onClick={() => setTheme("dark")}>Escuro</span>
                    </div>
                </div>
            </div>
        </div>*/}
        <div id="theme" className="option-block">
            <div className="option">
                Tema
            </div>
            <div className="content">
                <span className={"switch" + (theme == "light" ? " selected" : "")} title="Claro" onClick={() => setTheme("light")}>Claro</span>
                <span className={"switch" + (theme == "dark" ? " selected" : "")} title="Escuro" onClick={() => setTheme("dark")}>Escuro</span>
            </div>
        </div>
        <div id="about" className="option-block">
            <div className="option">
                Sobre
            </div>
            <div className="content">
                <h4>Objetivo</h4>
                Permitir aos alunos da <a href="https://www.fct.unl.pt/" target="_blank">NOVA School of Science and Technology | FCT NOVA</a> uma fácil visualização dos vários turnos disponíveis e a construção de um horário otimizado e personalizado.
                <h4>Contribuir</h4>
                Quaisquer sugestões de melhoria são sempre bem vindas!<br />
                O código que permite pôr esta plataforma em funcionamento está disponível <a href="https://github.com/4lexcorrei4/simulador_horarios" target="_blank">aqui</a>.<br />
                Podes contribuir e ajudar sempre que quiseres, sempre segundo a licensa <a href="https://github.com/4lexcorrei4/simulador_horarios/blob/master/LICENSE" target="_blank">GPLv3</a>.
                <h4>Contacto</h4>
                Para me contactares basta enviares mensagem por uma das redes sociais disponíveis <a href="https://bitsys.tech/" target="_blank">aqui</a>.
                <h4>Desenvolvedor</h4>
                <a href="https://bitsys.tech/" target="_blank">Alexandre Correia</a>
            </div>
        </div>
        {/*<h3>Procurar</h3>
        <div className="block">
            <div className="option-block">
                <h4>Departamento</h4>
                <div>
                    <span>{chosenDepartment ? "(" + chosenDepartment.short + ") " + chosenDepartment.name : ""}</span>
                    <input list="departments" id="department-choose" onChange={() => chooseDepartment()} placeholder="Pesquisar" />
                    <datalist id="departments">
                        {
                            departments.map(dep =>
                                dep.id != department ? <option value={dep.id} label={"(" + dep.short + ") " + dep.name} /> : <></>
                            )
                        }
                    </datalist>
                </div>
            </div>
            <div className="option-block">
                <h4>Cadeira</h4>
                <div>
                    <input list="subjects" id="subject-choose" onChange={() => addSubject()} placeholder="Pesquisar" />
                    <datalist id="subjects">
                        {
                            subjects.map(sub =>
                                (!subjectInfo || subjectInfo.id != sub.id) && (!Object.keys(subject).includes(String(sub.id))) ? <option value={sub.id} label={"(" + sub.short + ") " + sub.name} /> : <></>
                            )
                        }
                    </datalist>
                </div>
            </div>
        </div>
        <h3>Informações</h3>
        <div className="block">
            <div className="option-block">
                <h4>Número</h4>
                <div>
                    <span>{subjectInfo ? subjectInfo.id : ""}</span>
                </div>
            </div>
            <div className="option-block">
                <h4>Sigla</h4>
                <div>
                    <span>{subjectInfo ? subjectInfo.short : ""}</span>
                </div>
            </div>
            <div className="option-block">
                <h4>Nome</h4>
                <div>
                    <span>{subjectInfo ? subjectInfo.name : ""}</span>
                </div>
            </div>
        </div>
        <div className="buttons">
            <div className={"add" + (!subjectInfo ? " disabled" : "")} onClick={() => chooseSubject()}>
                Adicionar
            </div>
            <div className={"add" + (!subjectInfo ? " disabled" : "")} onClick={() => chooseSubjectAndClose()}>
                Adicionar e Fechar
            </div>
        </div>*/}
    </div>
};

export default Settings;