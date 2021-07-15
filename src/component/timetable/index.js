import React from "react";
import "./index.css";
import $ from "jquery";
import {actions} from "../../redux/duck/old_redux.duck";
import {useDispatch} from "react-redux";
import ElementTD from "../elementTd";

const Timetable = ({maxCellShifts, hours, cellShifts, cellFilling, chosenShifts, timetableRef, update_time}) => {
    const dispatch = useDispatch();
    console.log(update_time)

    const onMouseOver = (id, subject) => {
        $("." + id).addClass("hover");
        $("." + subject).addClass("subject-hover");
    };

    const onMouseLeave = (id, subject) => {
        $("." + id).removeClass("hover");
        $("." + subject).removeClass("subject-hover");
    };

    const saveOrRemoveClass = (subject, type, number) => {
        if (chosenShifts[subject] && chosenShifts[subject][type] && chosenShifts[subject][type][number])
            dispatch(actions.removeClass(subject, type, number));
        else
            dispatch(actions.addClass(subject, type, number));
    };

    return <>
        <table ref={timetableRef} className="timetable">
            <thead>
                <tr>
                    <th>Hora</th>
                    <th colSpan={maxCellShifts[0]}>2ª (Seg)</th>
                    <th colSpan={maxCellShifts[1]}>3ª (Ter)</th>
                    <th colSpan={maxCellShifts[2]}>4ª (Qua)</th>
                    <th colSpan={maxCellShifts[3]}>5ª (Qui)</th>
                    <th colSpan={maxCellShifts[4]}>6ª (Sex)</th>
                    <th colSpan={maxCellShifts[5]}>Sábado</th>
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
                            [0, 1, 2, 3, 4, 5].map(day => <>
                                {
                                    cellFilling[hours.indexOf(hour)][day]
                                        ? cellShifts[hours.indexOf(hour)][day].sort(
                                            (a, b) => {
                                                if (a.subject.abbreviation != b.subject.abbreviation)
                                                    return a.subject.abbreviation > b.subject.abbreviation;
                                                else
                                                    return a.shift.number > b.shift.number;
                                            }
                                        ).map(shiftInfo =>
                                            <td
                                                rowSpan={shiftInfo.shift.duration}
                                                className={`class ${shiftInfo.shift.type.name} ${shiftInfo.subject.id} ${shiftInfo.subject.id}-${shiftInfo.shift.type.name}-${shiftInfo.shift.number}`}
                                                onMouseOver={() => onMouseOver(shiftInfo.subject.id + "-" + shiftInfo.shift.type.name + "-" + shiftInfo.shift.number, shiftInfo.subject.id)}
                                                onMouseLeave={() => onMouseLeave(shiftInfo.subject.id + "-" + shiftInfo.shift.type.name + "-" + shiftInfo.shift.number, shiftInfo.subject.id)}
                                            >
                                                {
                                                        chosenShifts[shiftInfo.subject.id] && chosenShifts[shiftInfo.subject.id][shiftInfo.shift.type.name] && chosenShifts[shiftInfo.subject.id][shiftInfo.shift.type.name.toLowerCase()][shiftInfo.shift.number]
                                                            ? <div className="save" title="Remover"
                                                                   onClick={() => saveOrRemoveClass(shiftInfo.subject.id, shiftInfo.shift.type.name, shiftInfo.shift.number)}>&#10005;</div>
                                                            : <div className="save" title="Guardar"
                                                                   onClick={() => saveOrRemoveClass(shiftInfo.subject.id, shiftInfo.shift.type.name, shiftInfo.shift.number)}>&#9733;</div>
                                                }
                                                <h3><a href={shiftInfo.subject.url ? shiftInfo.subject.url : "javascript:;"} target={shiftInfo.subject.url ? "_blank" : ""}><span title={shiftInfo.subject.name}>{shiftInfo.subject.abbreviation}</span></a></h3>
                                                <p><a href={shiftInfo.shift.url ? shiftInfo.shift.url : "javascript:;"} target={shiftInfo.shift.url ? "_blank" : ""}><span title={shiftInfo.shift.type.title + " " + shiftInfo.shift.number}>{shiftInfo.shift.type.name.toUpperCase()} {shiftInfo.shift.number}</span></a><br />{shiftInfo.shift.room}</p>
                                            </td>
                                        )
                                        : <ElementTD times={maxCellShifts[day] - cellFilling[hours.indexOf(hour)][day]} />
                                }
                                {
                                    maxCellShifts[day] > cellFilling[hours.indexOf(hour)][day] && cellFilling[hours.indexOf(hour)][day]
                                        ? <ElementTD times={maxCellShifts[day] - cellFilling[hours.indexOf(hour)][day]} />
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
        <span id="update-time">
            Última atualização: {update_time ? update_time.getDate() + "/" + (update_time.getMonth() + 1) + "/" + update_time.getFullYear() + ", " + update_time.getHours() + ":" + update_time.getMinutes() : ""}
        </span>
    </>
};

export default Timetable;