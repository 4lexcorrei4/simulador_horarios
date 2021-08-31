import React, {useEffect, useRef} from "react";
import ContentContainer from "./content";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../redux/duck/redux.duck";
import Loader from "../component/loader";
import ReactGA from "react-ga";
import LeftMenuContainer from "./leftMenu";
import Popup from "../component/popup/popup";
import $ from "jquery";

const PageContainer = () => {
    //ReactGA.initialize("UA-190799873-1");
    //ReactGA.pageview(window.location.pathname + window.location.search);
    /*ReactGA.initialize("G-6NWXFDQXSZ");
    ReactGA.pageview(window.location.pathname + window.location.search);*/

    const dispatch = useDispatch();
    const loading = useSelector(state => state.redux.loading);
    const popup = useSelector(state => state.redux.popup);
    const theme = useSelector(state => state.redux.theme);
    let timetableRef = useRef(null);

    const closePopup = () => dispatch(actions.clearPopup());

    useEffect(
        () => {
            dispatch(actions.init());
        },
        []
    );

    $("body").attr("class", theme);

    const openCloseMenu = () => {
        if ($("#menuButton").html().charCodeAt(0) == 10005) {
            $("#menuButton").html("&#9776;");
            $("#leftMenu").removeClass("open");
            $("#leftMenu").addClass("closed");
        } else {
            $("#menuButton").html("&#10005;");
            $("#leftMenu").addClass("open");
            $("#leftMenu").removeClass("closed");
        }
    }

    return <>
        <span id="menuButton" className="menuButtons" onClick={() => openCloseMenu()}>&#10005;</span>
        <LeftMenuContainer timetableRef={timetableRef} />
        <ContentContainer timetableRef={timetableRef} />
        {
            popup ? <Popup loading={loading} option={popup} closePopup={closePopup} /> : <></>
        }
        {
            loading ? <Loader /> : <></>
        }
    </>
};

export default PageContainer;
