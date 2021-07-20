import React from "react";
import Timetable from "../component/timetable";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../redux/duck/redux.duck";

const ContentContainer = ({timetableRef}) => {
    const dispatch = useDispatch();

    const shifts = useSelector(state => state.redux.shift.all);
    const chosen_shifts = useSelector(state => state.redux.shift.chosen);
    const view = useSelector(state => state.redux.view);
    const update_time = useSelector(state => state.redux.updateTime.time);

    const saveOrUnsaveShift = (subject, type, number) => {
        if (chosen_shifts[subject] && chosen_shifts[subject][type] && chosen_shifts[subject][type][number])
            dispatch(actions.unsaveSubjectShift(subject, type, number));
        else
            dispatch(actions.saveSubjectShift(subject, type, number));
    };

    const hours = [];
    for (let current = 8; current <= 23.5; current = current + 0.5)
        hours.push(current * 60);

    const cell_shifts = [];
    const cell_filling = [];
    hours.map(() => {
        let hour_cell_Shifts = [];
        let hour_cell_filling = [];
        [1, 2, 3, 4, 5, 6].map(() => {
            hour_cell_Shifts.push([]);
            hour_cell_filling.push(0);
        })
        cell_shifts.push(hour_cell_Shifts);
        cell_filling.push(hour_cell_filling);
    });

    const max_cell_shifts = [1, 1, 1, 1, 1, 1];

    let show_shifts = view == "chosen" ? chosen_shifts : shifts;

    Object.keys(show_shifts).map(subject => {
        Object.keys(show_shifts[subject]).map(type => {
            Object.keys(show_shifts[subject][type]).map(number => {
                    let shift_info = show_shifts[subject][type][number];
                    shift_info.instances.map(instance => {
                        cell_shifts[hours.indexOf(instance.start)][instance.day].push({
                            ...instance,
                            subject: shift_info.subject,
                            type: shift_info.type,
                            number: shift_info.number
                        });
                        for (let hour = hours.indexOf(instance.start); hour < hours.indexOf(instance.start) + (instance.duration); hour++) {
                            cell_filling[hour][instance.day]++;
                            max_cell_shifts[instance.day] = Math.max(max_cell_shifts[instance.day], cell_filling[hour][instance.day]);
                        }
                    });
                }
            )
        });
    });

    return <div id="content">
        <Timetable
            maxCellShifts={max_cell_shifts}
            hours={hours}
            cellShifts={cell_shifts}
            cellFilling={cell_filling}
            chosenShifts={chosen_shifts}
            timetableRef={timetableRef}
            update_time={update_time}
            saveOrUnsaveShift={saveOrUnsaveShift}
        />
    </div>
};

export default ContentContainer;