import React from "react";
import Timetable from "../component/timetable";
import {useSelector} from "react-redux";

const ContentContainer = () => {
    const shifts = useSelector(state => state.redux.shifts);
    const subjects = useSelector(state => state.redux.subject.chosen);

    return <div id="content">
        <Timetable shifts={shifts} subjects={subjects} />
    </div>
};

export default ContentContainer;