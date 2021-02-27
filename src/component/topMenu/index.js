import React from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/duck/redux.duck";

const TopMenu = ({name, logo, years, year, departments, department, subjects, subject}) => {
    const dispatch = useDispatch();

    const view = useSelector(state => state.redux.view);

    const changeYear = (year) => {
        dispatch(actions.changeYear(year));
    };

    const chooseDepartment = (department) => {
        dispatch(actions.setDepartment(department));
    };

    const chooseSubject = (subject) => {
        dispatch(actions.addOrUpdateSubjects(subject));
    };

    const removeSubject = (subject) => {
        dispatch(actions.removeSubject(subject));
    };

    const setView = (view) => {
        dispatch(actions.setView(view));
    };

    const chosenSubjects = Object.values(subject).sort((a, b) => {return a.abbreviation > b.abbreviation});

    return <>
        <div id="topMenu">
            <span>
                <img src={logo} />
                <h1>{name}</h1>
            </span>
            <span>
                <select
                    value={year}
                    onChange={(event) => changeYear(event.target.value)}
                >
                    <option disabled selected>Escolher Ano Letivo</option>
                    {
                        years.map(year =>
                            <option value={year}>{year}</option>
                        )
                    }
                </select>
                <select
                    value={department}
                    onChange={(event) => chooseDepartment(event.target.value)}
                >
                    <option disabled selected>Escolher Departamento</option>
                    {
                        departments.map(option =>
                            <option value={option.id}>{option.name}</option>
                        )
                    }
                </select>
                <select
                    disabled={chosenSubjects.length == 5 ? true : ""}
                    onChange={(event) => chooseSubject(event.target.value)}
                >
                    <option value={-1} selected>{chosenSubjects.length < 5 ? "Adicionar Cadeira" : "Remover Cadeira para Adicionar Outra"}</option>
                    {
                        subjects.map(option =>
                            subject[option.id]
                                ? <></>
                                : <option value={option.id}>{option.name}</option>
                        )
                    }
                </select>
            </span>
        </div>
        <div id="subTopMenu">
            <div id="subjects">
                {
                    chosenSubjects.map(obj =>
                        <div title={obj.name}>
                            {obj.abbreviation}
                            <span onClick={() => removeSubject(obj.id)}>X</span>
                        </div>
                    )
                }
            </div>
            <div id="menu">
                <div className="option" id="update" onClick={() => changeYear(year)}><span>&#8634; Atualizar</span></div>
                <div id="view">
                    <span className={view == "subjects" ? "active" : ""} onClick={() => setView("subjects")}>Turnos</span>
                    <span className={view == undefined ? "active" : ""} onClick={() => setView(undefined)}>Escolher</span>
                    <span className={view == "classes" ? "active" : ""} onClick={() => setView("classes")}>Escolhido</span>
                </div>
            </div>
        </div>
    </>
};

export default TopMenu;