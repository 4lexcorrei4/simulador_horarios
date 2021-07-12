import React from "react";
import LeftMenu from "../component/leftMenu";
import conf from "../conf";
import {useSelector} from "react-redux";

const LeftMenuContainer = () => {
    const subjects = useSelector(state => state.redux.subject.chosen);

    return <LeftMenu
        logo={conf.logo}
        name={conf.name}
        subjects={subjects}
    />
};

export default LeftMenuContainer;