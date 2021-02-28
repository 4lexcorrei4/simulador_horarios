import React from "react";
import Timetable from "../component/timetable";
import {useSelector} from "react-redux";

const ContentContainer = () => {
    const shifts = useSelector(state => state.redux.shifts);
    const chosenClasses = useSelector(state => state.redux.classes);
    const view = useSelector(state => state.redux.view);

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

    let showShifts = view == "chosen" ? chosenClasses : shifts;

    Object.keys(showShifts).map(subject => {
        Object.keys(showShifts[subject]).map(type => {
            Object.keys(showShifts[subject][type]).map(number => {
                    let shiftInfo = showShifts[subject][type][number];
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

    return <div id="content">
        <Timetable
            maxClasses={maxClasses}
            hours={hours}
            classes={classes}
            filled={filled}
            chosenClasses={chosenClasses}
        />
    </div>
};

export default ContentContainer;