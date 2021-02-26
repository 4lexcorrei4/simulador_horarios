import React from "react";
import "./index.css";
import {useDispatch} from "react-redux";
import {actions} from "../../redux/duck/redux.duck";

const TopMenu = ({name, logo, times, time, departments, department, subjects, subject}) => {
    const dispatch = useDispatch();

    const chooseTime = (time) => {
        dispatch(actions.setTime(time));
    };

    const chooseDepartment = (department) => {
        dispatch(actions.setDepartment(department));
    };

    const chooseSubject = (subject) => {
        dispatch(actions.addSubject(subject));
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
                            <optgroup label={year.year}>
                                {
                                    year.times.map(time =>
                                        <option value={year.year + "-" + time.id}>{time.name}</option>
                                    )
                                }
                            </optgroup>
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
            {
                chosenSubjects.map(obj =>
                    <div title={obj.name}>
                        {obj.abbreviation}
                        <span onClick={() => removeSubject(obj.id)}>X</span>
                    </div>
                )
            }
        </div>
    </>
};

export default TopMenu;