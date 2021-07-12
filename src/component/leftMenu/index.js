import React from "react";
import "./index.css";

const LeftMenu = ({logo, name, subjects}) => {
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
                <span className="symbol green" title="Adicionar">&#43;</span>
            </div>
            {
                chosenSubjects.map(subject =>
                    <div className="option">
                        <span className="content" title={"(" + subject.id + ") " + subject.name}>{subject.short}</span>
                        <span className="symbol red" title="Remover">&#215;</span>
                    </div>
                )
            }
        </div>
        <div className="bottom">
        </div>
    </div>
};

export default LeftMenu;