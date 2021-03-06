import React from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/duck/redux.duck";
import {NavLink} from "react-router-dom";
import {toPng} from "html-to-image";
import $ from "jquery";

const TopMenu = ({name, logo, years, year, departments, department, subjects, subject, timetableRef}) => {
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

    const takeScreenshot = () => {
        if (timetableRef)
            toPng(timetableRef.current).then(url => {
                const toDownload = document.createElement("a");
                console.log(toDownload)
                toDownload.href = url;
                toDownload.download = "horario.png";
                toDownload.click();
                toDownload.remove();
            });
    };

    const chosenSubjects = Object.values(subject).sort((a, b) => {return a.abbreviation > b.abbreviation});

    return <>
        <div id="topMenu">
            <span>
                <img src={logo} />
                <h1>{name}</h1>
            </span>
            <span>
                {/*<select
                    value={year}
                    onChange={(event) => changeYear(event.target.value)}
                >
                    <option disabled selected>Escolher Período Letivo</option>
                    {
                        years.map(year =>
                            <optgroup label={year.year}>
                                {
                                    year.times.map(time =>
                                        <option value={year.year + "-" + time.id}>{time.name}</option>
                                    )
                                }
                            </optgroup>
                        )
                    }
                </select>*/}
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
                                : <option value={option.id}>{option.name}{option.clipId ? " - " + option.clipId: ""}</option>
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
                <div className="option option-only" onClick={() => changeYear(year)}><span>&#8634; Atualizar</span></div>
                <div className="option option-only" onClick={() => takeScreenshot()}><span>&#128247; Imagem</span></div>
                <div id="view" className="option">
                    <span className={view == undefined ? "active" : ""} onClick={() => setView(undefined)}>Escolher</span>
                    <span className={view == "chosen" ? "active" : ""} onClick={() => setView("chosen")}>Escolhido</span>
                </div>
            </div>
        </div>
    </>
};

export default TopMenu;