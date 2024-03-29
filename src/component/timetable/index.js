import React from "react";
import "./index.css";
import $ from "jquery";
import ElementTD from "../elementTd";

const Timetable = ({maxCellShifts, hours, cellShifts, cellFilling, chosenShifts, timetableRef, update_time, saveOrUnsaveShift}) => {
    const update_time_date = new Date(update_time);

    const onMouseOver = (id, subject) => {
        $("." + id).addClass("hover");
        $("." + subject).addClass("subject-hover");
    };

    const onMouseLeave = (id, subject) => {
        $("." + id).removeClass("hover");
        $("." + subject).removeClass("subject-hover");
    };

    return <>
        <div className="timetableContainer">
            <div className="timetableContainerInner">
                <table ref={timetableRef} className="timetable">
                    {/*<thead>
                        <tr>
                            <th>Hora</th>
                            <th colSpan={maxCellShifts[0]}>2ª (Seg)</th>
                            <th colSpan={maxCellShifts[1]}>3ª (Ter)</th>
                            <th colSpan={maxCellShifts[2]}>4ª (Qua)</th>
                            <th colSpan={maxCellShifts[3]}>5ª (Qui)</th>
                            <th colSpan={maxCellShifts[4]}>6ª (Sex)</th>
                            <th colSpan={maxCellShifts[5]}>Sábado</th>
                        </tr>
                    </thead>*/}
                    <thead>
                    <tr>
                        <th>Hora</th>
                        <th colSpan={maxCellShifts[0]}>Seg</th>
                        <th colSpan={maxCellShifts[1]}>Ter</th>
                        <th colSpan={maxCellShifts[2]}>Qua</th>
                        <th colSpan={maxCellShifts[3]}>Qui</th>
                        <th colSpan={maxCellShifts[4]}>Sex</th>
                        <th colSpan={maxCellShifts[5]}>Sáb</th>
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
                                                        if (a.subject.short != b.subject.short)
                                                            return a.subject.short > b.subject.short;
                                                        else
                                                            return a.number > b.number;
                                                    }
                                                ).map(shift_info =>
                                                    <td
                                                        rowSpan={shift_info.duration}
                                                        className={`class ${shift_info.type.name} ${shift_info.subject.id} ${shift_info.subject.id}-${shift_info.type.name}-${shift_info.number}`}
                                                        onMouseOver={() => onMouseOver(shift_info.subject.id + "-" + shift_info.type.name + "-" + shift_info.number, shift_info.subject.id)}
                                                        onMouseLeave={() => onMouseLeave(shift_info.subject.id + "-" + shift_info.type.name + "-" + shift_info.number, shift_info.subject.id)}
                                                    >
                                                        {
                                                                chosenShifts[shift_info.subject.id] && chosenShifts[shift_info.subject.id][shift_info.type.name] && chosenShifts[shift_info.subject.id][shift_info.type.name.toLowerCase()][shift_info.number]
                                                                    ? <div className="save" title="Remover"
                                                                           onClick={() => saveOrUnsaveShift(shift_info.subject.id, shift_info.type.name, shift_info.number)}>&#10005;</div>
                                                                    : <div className="save" title="Guardar"
                                                                           onClick={() => saveOrUnsaveShift(shift_info.subject.id, shift_info.type.name, shift_info.number)}>&#9733;</div>
                                                        }
                                                        <h3><a href={shift_info.subject.url ? shift_info.subject.url : "javascript:;"} target={shift_info.subject.url ? "_blank" : ""} rel="noreferrer"><span title={shift_info.subject.name}>{shift_info.subject.short}</span></a></h3>
                                                        <p><a href={shift_info.url ? shift_info.url : "javascript:;"} target={shift_info.url ? "_blank" : ""} rel="noreferrer"><span title={shift_info.type.title + " " + shift_info.number}>{shift_info.type.name.toUpperCase()} {shift_info.number}</span></a><br />{shift_info.building ? shift_info.building + ": " + shift_info.room : "Online"}</p>
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
            </div>
        </div>
        <span id="update-time">
            Última atualização: {update_time ? update_time_date.getDate() + "/" + (update_time_date.getMonth() + 1) + "/" + update_time_date.getFullYear() + ", " + (update_time_date.getHours() < 10 ? "0" + update_time_date.getHours() : update_time_date.getHours()) + ":" + (update_time_date.getMinutes() < 10 ? "0" + update_time_date.getMinutes() : update_time_date.getMinutes()) : ""}
        </span>
    </>
};

export default Timetable;