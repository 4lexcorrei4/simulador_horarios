import React from "react";
import "./index.css";
import InputDropdown from "../inputDropdown";
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
        dispatch(actions.setSubject(subject));
    };

    return <div id="topMenu">
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
                value={subject}
                onChange={(event) => chooseSubject(event.target.value)}
            >
                <option disabled selected>Escolher Cadeira</option>
                {
                    subjects.map(option =>
                        <option value={option.id}>{option.name}</option>
                    )
                }
            </select>
            {/*<InputDropdown
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
            />*/}
        </span>
    </div>
};

export default TopMenu;