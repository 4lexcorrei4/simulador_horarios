import React from "react";
import "./index.css";

const LeftMenu = ({logo, name, subjects, view, theme, setPopup}) => {
    const chosenSubjects = Object.values(subjects).sort((a, b) => {return a.short > b.short});

    return <div id="leftMenu">
        <div className="top">
            <div className="logo" title={name}>
                <img src={logo} />
            </div>
            <div className="title">
                Cadeiras
            </div>
            <div className="option">
                <span className="content" title="Adicionar">Adicionar</span>
                <span className="symbol green" title="Adicionar" onClick={() => setPopup("add-subject")}>&#43;</span>
            </div>
            {
                chosenSubjects.map(subject =>
                    <div className="option">
                        <span className="content" title={"(" + subject.id + ") " + subject.name}>{subject.short}</span>
                        <span className="symbol red" title="Remover">&#x1F5D1;</span>
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
                <span className="symbol" title="Atualizar">&#8634;</span>
            </div>
            <div className="option">
                <span className="content" title="Imagem">Imagem</span>
                <span className="symbol" title="Imagem"><ion-icon name="image"></ion-icon></span>
            </div>
            <div className="sub-title">
                Visualização
            </div>
            <div className="option vertical">
                <span className={"content" + (!view ? " selected" : "")} title="Escolher">Escolher</span>
                <span className={"content" + (view == "chosen" ? " selected" : "")} title="Escolhido">Escolhido</span>
            </div>
            <div className="sub-title">
                Tema
            </div>
            <div className="option vertical">
                <span className={"content" + (theme == "light" ? " selected" : "")} title="Claro">Claro</span>
                <span className={"content" + (theme == "dark" ? " selected" : "")} title="Escuro">Escuro</span>
            </div>
            <div className="option">
                <span className="content" title="Sobre">Sobre</span>
                <span className="symbol" title="Sobre">&#8505;</span>
            </div>
        </div>
    </div>
};

export default LeftMenu;