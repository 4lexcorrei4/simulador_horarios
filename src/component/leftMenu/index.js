import React from "react";
import "./index.css";

const LeftMenu = ({logo, name, subjects, view, setPopup, removeSubject, getImage, setView, chosen_shifts, update}) => {
    const chosen_subjects = Object.values(subjects).sort((a, b) => {return a.short > b.short});

    return <div id="leftMenu">
        <div className="top">
            <div className="logo" title={name}>
                <img src={logo} alt="LOGO" />
            </div>
            <div className="title">
                Cadeiras
            </div>
            <div className="option">
                <span className="content" title="Adicionar">Adicionar</span>
                <span className="symbol green" title="Adicionar" onClick={() => setPopup("add-subject")}>&#43;</span>
            </div>
            {
                chosen_subjects.map(subject =>
                    <div className="option">
                        <span className="content" title={"(" + subject.id + ") " + subject.name}>{subject.short}</span>
                        {
                            chosen_shifts[subject.id]
                                ? <span className={"symbol blue"} title="Com turnos guardados">&#9733;</span>
                                : <span className={"symbol red"} title="Remover" onClick={() => removeSubject(subject.id)}>&#x1F5D1;</span>
                        }
                    </div>
                )
            }
        </div>
        <div className="bottom">
            <div className="title">
                Opções
            </div>
            <div className="option">
                <span className="content" title="Atualizar">Atualizar</span>
                <span className="symbol" title="Atualizar" onClick={() => update()}>&#8634;</span>
            </div>
            <div className="option">
                <span className="content" title="Imagem">Imagem</span>
                <span className="symbol" title="Imagem" onClick={() => getImage()}><ion-icon name="image"></ion-icon></span>
            </div>
            <div className="sub-title">
                Visualização
            </div>
            <div className="option vertical">
                <span className={"content" + (!view ? " selected" : "")} title="Escolher" onClick={() => setView(undefined)}>Escolher</span>
                <span className={"content" + (view == "chosen" ? " selected" : "")} title="Escolhido" onClick={() => setView("chosen")}>Escolhido</span>
            </div>
            <div className="option">
                <span className="content" title="Definições">Definições</span>
                <span className="symbol" title="Definições" onClick={() => setPopup("settings")}>&#9881;</span>
            </div>
        </div>
    </div>
};

export default LeftMenu;