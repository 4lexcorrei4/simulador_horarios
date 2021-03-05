import React from "react";
import TopMenu from "../component/topMenu";
import conf from "../conf";
import {useSelector} from "react-redux";

const TopMenuContainer = ({timetableRef}) => {
    const years = useSelector(state => state.redux.year.all);
    const year = useSelector(state => state.redux.year.chosen);
    const departments = useSelector(state => state.redux.department.all);
    const department = useSelector(state => state.redux.department.chosen);
    const subjects = useSelector(state => state.redux.subject.all);
    const subject = useSelector(state => state.redux.subject.chosen);

    return <TopMenu
        name={conf.name}
        logo={conf.logo}
        years={years}
        year={year}
        departments={departments}
        department={department}
        subjects={subjects}
        subject={subject}
        timetableRef={timetableRef}
    />
};

export default TopMenuContainer;