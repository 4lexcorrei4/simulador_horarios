import React from "react";
import "./index.css";
import {useSelector} from "react-redux";
import Loader from "../loader";

const Timetable = ({shifts}) => {
    const hours = [];
    for (let current = 8; current <= 23.5; current = current + 0.5)
        hours.push(current * 60);

    const classes = [];
    const filled = [];
    hours.map(() => {
        let hour1 = [];
        let hour2 = [];
        [1, 2, 3, 4, 5].map(() => {
            hour1.push([]);
            hour2.push(0);
        })
        classes.push(hour1);
        filled.push(hour2);
    });

    const maxClasses = [1, 1, 1, 1, 1];

    Object.keys(shifts).map(subject => {
        Object.keys(shifts[subject]).map(type => {
            Object.keys(shifts[subject][type]).map(number => {
                    let shiftInfo = shifts[subject][type][number];
                    shiftInfo.shift.instances.map(instance => {
                        classes[hours.indexOf(instance.start)][instance.weekday].push({
                            subject: shiftInfo.subject,
                            shift: {
                                ...instance,
                                number: shiftInfo.shift.number,
                                type: shiftInfo.shift.type
                            }
                        });
                        for (let hour = hours.indexOf(instance.start); hour < hours.indexOf(instance.start) + (instance.duration); hour++) {
                            filled[hour][instance.weekday]++;
                            maxClasses[instance.weekday] = Math.max(maxClasses[instance.weekday], filled[hour][instance.weekday]);
                        }
                    });
                }
            )
        });
    });

    return <>
        <table className="timetable">
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
                                            <td rowSpan={shiftInfo.shift.duration} className={`class ${shiftInfo.shift.type.name.toLowerCase()}`}>
                                                <h3><span title={shiftInfo.subject.name}>{shiftInfo.subject.abbreviation}</span></h3>
                                                <p><span title={shiftInfo.shift.type.title + " " + shiftInfo.shift.number}>{shiftInfo.shift.type.name} {shiftInfo.shift.number}</span><br />{shiftInfo.shift.room}</p>
                                            </td>
                                        )
                                        : <td colSpan={maxClasses[day] - filled[hours.indexOf(hour)][day]}></td>
                                }
                                {
                                    maxClasses[day] > filled[hours.indexOf(hour)][day] && filled[hours.indexOf(hour)][day]
                                        ? <td colSpan={maxClasses[day] - filled[hours.indexOf(hour)][day]}></td>
                                        : <></>
                                }
                                </>
                            )
                        }
                    {/*
                        [0, 1, 2, 3, 4].map(day => <>
                            {
                                classes[hours.indexOf(hour)][day].map(shift => <td>
                                    {shift.id}
                                </td>)
                            }
                        </>)
                    */}
                </tr>
                )
            }
            </tbody>
        </table>
    </>
};

export default Timetable;