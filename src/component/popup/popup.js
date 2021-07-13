import React from "react";
import "./index.css";

const Popup = ({option, close}) => {
    return <>
        <div id="popup-container" onClick={() => close()}></div>
        <div id="popup-content-container">
            <div id="popup-content">
                <div className="header">
                    <h2>
                        { option == "add-subject" ? "Adicionar Cadeira" : "" }
                    </h2>
                    <div id="close" onClick={() => close()}>&#10005;</div>
                </div>
                <div className="content">

                </div>
            </div>
        </div>
    </>
};

export default Popup;