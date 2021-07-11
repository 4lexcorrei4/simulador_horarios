import React from "react";
import "./index.css";

const LeftMenu = ({logo, name}) => {
    return <div id="leftMenu">
        <div className="top">
            <div className="logo" title={name}>
                <img src={logo} />
            </div>
            <div className="title">
                Cadeiras
            </div>
            <div className="option">
                +
            </div>
        </div>
        <div className="bottom">
            <div className="option">
                ?
            </div>
        </div>
    </div>
};

export default LeftMenu;