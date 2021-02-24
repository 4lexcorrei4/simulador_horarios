import React from "react";
import TopMenu from "../component/topMenu";
import conf from "../conf";
import {useSelector} from "react-redux";

const TopMenuContainer = () => {
    const departments = useSelector(state => state.redux.department.all);
    const department = useSelector(state => state.redux.department.chosen);
    const subjects = useSelector(state => state.redux.subject.all);
    const subject = useSelector(state => state.redux.subject.chosen);

    return <TopMenu
        name={conf.name}
        logo={conf.logo}
        departments={departments}
        department={department}
        subjects={subjects}
        subject={subject}
    />
};

export default TopMenuContainer;