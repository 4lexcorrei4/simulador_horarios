import React from "react";
import "./index.css";

const Timetable = ({shifts, subjects}) => {
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
        shifts[subject].map(shift => {
            shift.instances.map(instance => {
                classes[hours.indexOf(instance.start)][instance.weekday].push({
                    id: shift.id,
                    subject: {
                        short: subjects[subject].abbreviation,
                        name: subjects[subject].name
                    },
                    number: shift.number,
                    type: {
                        name: shift.type_display.indexOf("Teórico-Prático") >= 0
                            ? "TP"
                            : shift.type_display.indexOf("Teórico") >= 0
                                ? "T"
                                : "P",
                        title: shift.type_display
                    },
                    class: shift.type_display.indexOf("Teórico-Prático") >= 0
                        ? "tp"
                        : shift.type_display.indexOf("Teórico") >= 0
                            ? "t"
                            : "p",
                    duration: instance.duration / 30,
                    room: instance.room ? instance.room : "-"
                });
                for (let hour = hours.indexOf(instance.start); hour < hours.indexOf(instance.start) + (instance.duration / 30); hour++)
                    filled[hour][instance.weekday]++;
                maxClasses[instance.weekday] = Math.max(maxClasses[instance.weekday], classes[hours.indexOf(instance.start)][instance.weekday].length);
            });
        });
    });

    console.log(classes)
    console.log(maxClasses)

    return <>
        <table className="timetable">
            <thead>
                <th>Hora</th>
                <th colSpan={maxClasses[0]}>2ª</th>
                <th colSpan={maxClasses[1]}>3ª</th>
                <th colSpan={maxClasses[2]}>4ª</th>
                <th colSpan={maxClasses[3]}>5ª</th>
                <th colSpan={maxClasses[4]}>6ª</th>
            </thead>
            <tbody>
            {
                hours.map(hour => <tr>
                    <td>{parseInt(hour/60) < 10 ? "0" + parseInt(hour/60) : parseInt(hour/60)}:{(hour/60).toString().indexOf(".5") > 0 ? "30" : "00"}</td>
                        {
                            [0, 1, 2, 3, 4].map(day => <>
                                {
                                    filled[hours.indexOf(hour)][day]
                                        ? classes[hours.indexOf(hour)][day].sort(
                                            (a, b) => {
                                                if (a.subject.short != b.subject.short)
                                                    return a.subject.short > b.subject.short;
                                                else
                                                    return a.number > b.number;
                                            }
                                        ).map(shift =>
                                            <td rowSpan={shift.duration} className={`class ${shift.class}`}>
                                                <h3 title={shift.subject.name}>{shift.subject.short}</h3>
                                                <p><span title={shift.type.title + " " + shift.number}>{shift.type.name} {shift.number}</span><br />{shift.room}</p>
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