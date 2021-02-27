import React from "react";
import Timetable from "../component/timetable";
import {useSelector} from "react-redux";

const ContentContainer = () => {
    const shifts = useSelector(state => state.redux.shifts);

    return <div id="content">
        <Timetable shifts={shifts} />
    </div>
};

export default ContentContainer;