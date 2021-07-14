import React from "react";
import "./index.css";
import PopupAddSubject from "./addSubject";
import {useSelector} from "react-redux";

const Popup = ({option, close}) => {
    const departments = useSelector(state => state.redux.department.all);
    const department = useSelector(state => state.redux.department.chosen);
    const subjects = useSelector(state => state.redux.subject.all);
    const subject = useSelector(state => state.redux.subject.chosen);

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
                    { option == "add-subject" ? <PopupAddSubject departments={departments} department={department} subjects={subjects} subject={subject} /> : <></> }
                </div>
            </div>
        </div>
    </>
};

export default Popup;