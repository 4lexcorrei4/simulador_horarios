import React from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/duck/redux.duck";

const TopMenu = ({name, logo, times, time, departments, department, subjects, subject}) => {
    const dispatch = useDispatch();

    const year = useSelector(state => state.redux.time.chosen);

    const chooseTime = (time) => {
        dispatch(actions.setTime(time));
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

    const chosenSubjects = Object.values(subject).sort((a, b) => {return a.abbreviation > b.abbreviation});

    return <>
        <div id="topMenu">
            <span>
                <img src={logo} />
                <h1>{name}</h1>
            </span>
            <span>
                <select
                    value={time}
                    onChange={(event) => chooseTime(event.target.value)}
                >
                    <option disabled selected>Escolher Período Letivo</option>
                    {
                        times.map(year =>
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
                    onChange={(event) => chooseSubject(event.target.value)}
                >
                    <option value={-1} selected>Adicionar Cadeira</option>
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
            <div id="update" onClick={() => chooseTime(year)}>&#8634; Atualizar</div>
        </div>
    </>
};

export default TopMenu;