import React from "react";
import LeftMenu from "../component/leftMenu";
import conf from "../conf";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../redux/duck/redux.duck";

const LeftMenuContainer = () => {
    const dispatch = useDispatch();

    const subjects = useSelector(state => state.redux.subject.chosen);
    const view = useSelector(state => state.redux.view);
    const theme = useSelector(state => state.redux.theme);

    const setPopup = (option) => dispatch(actions.setPopup(option));
    const removeSubject = (id) => dispatch(actions.removeSubject(id));

    return <LeftMenu
        logo={conf.logo}
        name={conf.name}
        subjects={subjects}
        view={view}
        theme={theme}
        setPopup={setPopup}
        removeSubject={removeSubject}
    />
};

export default LeftMenuContainer;