import React from "react";
import Timetable from "../component/timetable";
import {useSelector} from "react-redux";

const ContentContainer = ({timetableRef}) => {
    const shifts = useSelector(state => state.redux.shift.all);
    const chosenShifts = useSelector(state => state.redux.shift.chosen);
    const view = useSelector(state => state.redux.view);
    const update_time = new Date(useSelector(state => state.redux.updateTime.time));

    const hours = [];
    for (let current = 8; current <= 23.5; current = current + 0.5)
        hours.push(current * 60);

    const cellShifts = [];
    const cellFilling = [];
    hours.map(() => {
        let hourCellShifts = [];
        let hourCellFilling = [];
        [1, 2, 3, 4, 5, 6].map(() => {
            hourCellShifts.push([]);
            hourCellFilling.push(0);
        })
        cellShifts.push(hourCellShifts);
        cellFilling.push(hourCellFilling);
    });

    const maxCellShifts = [1, 1, 1, 1, 1, 1];

    let showShifts = view == "chosen" ? chosenShifts : shifts;

    Object.keys(showShifts).map(subject => {
        Object.keys(showShifts[subject]).map(type => {
            Object.keys(showShifts[subject][type]).map(number => {
                    let shiftInfo = showShifts[subject][type][number];
                    shiftInfo.shift.instances.map(instance => {
                        cellShifts[hours.indexOf(instance.start)][instance.day].push({
                            subject: shiftInfo.subject,
                            shift: {
                                ...instance,
                                number: shiftInfo.shift.number,
                                type: shiftInfo.shift.type
                            }
                        });
                        for (let hour = hours.indexOf(instance.start); hour < hours.indexOf(instance.start) + (instance.duration); hour++) {
                            cellFilling[hour][instance.day]++;
                            maxCellShifts[instance.day] = Math.max(maxCellShifts[instance.day], cellFilling[hour][instance.day]);
                        }
                    });
                }
            )
        });
    });

    return <div id="content">
        <Timetable
            maxCellShifts={maxCellShifts}
            hours={hours}
            cellShifts={cellShifts}
            cellFilling={cellFilling}
            chosenShifts={chosenShifts}
            timetableRef={timetableRef}
            update_time={update_time}
        />
    </div>
};

export default ContentContainer;