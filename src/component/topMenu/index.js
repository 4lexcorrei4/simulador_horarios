import React from "react";
import "./index.css";
import InputDropdown from "../inputDropdown";
import {useDispatch} from "react-redux";
import {actions} from "../../redux/duck/redux.duck";

const TopMenu = ({name, logo, departments, department, subjects, subject}) => {
    const dispatch = useDispatch();

    const chooseDepartment = (department) => {
        dispatch(actions.setDepartment(department));
    };
    const clearDepartment = () => {
        dispatch(actions.setDepartment(undefined));
    };

    const chooseSubject = (subject) => {
        dispatch(actions.setDepartment(subject));
    };
    const clearSubject = () => {
        dispatch(actions.setDepartment(undefined));
    };

    return <div id="topMenu">
        <span>
            <img src={logo} />
            <h1>{name}</h1>
        </span>
        <span>
            <InputDropdown
                label="Escolher Departamento"
                options={departments}
                chosen={department}
                chooseFunction={(option) => chooseDepartment(option)}
                clearFunction={() => clearDepartment()}
            />
            <InputDropdown
                label="Escolher Cadeira"
                options={subjects}
                chosen={subject}
                chooseFunction={(option) => chooseSubject(option)}
                clearFunction={() => clearSubject()}
            />
        </span>
    </div>
};

export default TopMenu;