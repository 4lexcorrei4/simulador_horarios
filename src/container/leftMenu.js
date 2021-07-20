import React from "react";
import LeftMenu from "../component/leftMenu";
import conf from "../conf";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../redux/duck/redux.duck";
import {toPng} from "html-to-image";

const LeftMenuContainer = ({timetableRef}) => {
    const dispatch = useDispatch();

    const subjects = useSelector(state => state.redux.subject.chosen);
    const chosen_shifts = useSelector(state => state.redux.shift.chosen);
    const view = useSelector(state => state.redux.view);

    const setPopup = (option) => dispatch(actions.setPopup(option));
    const removeSubject = (id) => dispatch(actions.removeSubject(id));
    const setView = (view) => dispatch(actions.setView(view));
    const getImage = () => {
        if (timetableRef)
            toPng(timetableRef.current).then(url => {
                const image = document.createElement("a");
                image.href = url;
                image.download = "horario.png";
                image.click();
                image.remove();
            });
    };

    return <LeftMenu
        logo={conf.logo}
        name={conf.name}
        subjects={subjects}
        view={view}
        setPopup={setPopup}
        removeSubject={removeSubject}
        getImage={getImage}
        setView={setView}
        chosen_shifts={chosen_shifts}
    />
};

export default LeftMenuContainer;