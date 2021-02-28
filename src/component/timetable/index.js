import React from "react";
import "./index.css";
import $ from "jquery";
import {actions} from "../../redux/duck/redux.duck";
import {useDispatch} from "react-redux";
import ElementTD from "../elementTd";

const Timetable = ({maxClasses, hours, classes, filled, chosenClasses}) => {
    const dispatch = useDispatch();

    const onMouseOver = (id) => {
        $("." + id).addClass("hover");
    };

    const onMouseLeave = (id) => {
        $("." + id).removeClass("hover");
    };

    const saveOrRemoveClass = (subject, type, number) => {
        if (chosenClasses[subject] && chosenClasses[subject][type] && chosenClasses[subject][type][number])
            dispatch(actions.removeClass(subject, type, number));
        else
            dispatch(actions.addClass(subject, type, number));
    };

    return <>
        <table id="timetable" className="timetable">
            <thead>
                <tr>
                    <th>Hora</th>
                    <th colSpan={maxClasses[0]}>2ª</th>
                    <th colSpan={maxClasses[1]}>3ª</th>
                    <th colSpan={maxClasses[2]}>4ª</th>
                    <th colSpan={maxClasses[3]}>5ª</th>
                    <th colSpan={maxClasses[4]}>6ª</th>
                </tr>
            </thead>
            <tbody>
            {
                hours.map(hour => <tr>
                    <td>{
                        (hour/60).toString().indexOf(".5") == -1
                            ? parseInt(hour/60) < 10
                                ? "0" + parseInt(hour/60)
                                : parseInt(hour/60)
                            : parseInt(hour/60)+1 < 10
                                ? "0" + (parseInt(hour/60)+1)
                                : (parseInt(hour/60)+1)

                    }:00</td>
                        {
                            [0, 1, 2, 3, 4].map(day => <>
                                {
                                    filled[hours.indexOf(hour)][day]
                                        ? classes[hours.indexOf(hour)][day].sort(
                                            (a, b) => {
                                                if (a.subject.abbreviation != b.subject.abbreviation)
                                                    return a.subject.abbreviation > b.subject.abbreviation;
                                                else
                                                    return a.shift.number > b.shift.number;
                                            }
                                        ).map(shiftInfo =>
                                            <td
                                                rowSpan={shiftInfo.shift.duration} className={`class ${shiftInfo.shift.type.name.toLowerCase()} ${shiftInfo.subject.id}-${shiftInfo.shift.type.name.toLowerCase()}-${shiftInfo.shift.number}`}
                                                onMouseOver={() => onMouseOver(shiftInfo.subject.id + "-" + shiftInfo.shift.type.name.toLowerCase() + "-" + shiftInfo.shift.number)}
                                                onMouseLeave={() => onMouseLeave(shiftInfo.subject.id + "-" + shiftInfo.shift.type.name.toLowerCase() + "-" + shiftInfo.shift.number)}
                                            >
                                                {
                                                        chosenClasses[shiftInfo.subject.id] && chosenClasses[shiftInfo.subject.id][shiftInfo.shift.type.name.toLowerCase()] && chosenClasses[shiftInfo.subject.id][shiftInfo.shift.type.name.toLowerCase()][shiftInfo.shift.number]
                                                            ? <div className="save" title="Remover"
                                                                   onClick={() => saveOrRemoveClass(shiftInfo.subject.id, shiftInfo.shift.type.name.toLowerCase(), shiftInfo.shift.number)}>X</div>
                                                            : <div className="save" title="Guardar"
                                                                   onClick={() => saveOrRemoveClass(shiftInfo.subject.id, shiftInfo.shift.type.name.toLowerCase(), shiftInfo.shift.number)}>&#9733;</div>
                                                }
                                                <h3><span title={shiftInfo.subject.name}>{shiftInfo.subject.abbreviation}</span></h3>
                                                <p><span title={shiftInfo.shift.type.title + " " + shiftInfo.shift.number}>{shiftInfo.shift.type.name} {shiftInfo.shift.number}</span><br />{shiftInfo.shift.room}</p>
                                            </td>
                                        )
                                        : <ElementTD times={maxClasses[day] - filled[hours.indexOf(hour)][day]} />
                                }
                                {
                                    maxClasses[day] > filled[hours.indexOf(hour)][day] && filled[hours.indexOf(hour)][day]
                                        ? <ElementTD times={maxClasses[day] - filled[hours.indexOf(hour)][day]} />
                                        : <></>
                                }
                                </>
                            )
                        }
                </tr>
                )
            }
            </tbody>
        </table>
    </>
};

export default Timetable;