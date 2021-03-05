import React, {useEffect, useRef} from "react";
import TopMenuContainer from "./topMenu";
import ContentContainer from "./content";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../redux/duck/redux.duck";
import Loader from "../component/loader";
import FooterContainer from "./footer";
import ReactGA from "react-ga";

const PageContainer = () => {
    ReactGA.initialize("UA-190799873-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
    /*ReactGA.initialize("G-6NWXFDQXSZ");
    ReactGA.pageview(window.location.pathname + window.location.search);*/

    const dispatch = useDispatch();
    const loading = useSelector(state => state.redux.loading);
    let timetableRef = useRef(null);

    useEffect(
        () => {
            dispatch(actions.init());
        },
        []
    );

    return <>
        <TopMenuContainer timetableRef={timetableRef} />
        <ContentContainer timetableRef={timetableRef} />
        <FooterContainer />
        {
            loading ? <Loader /> : <></>
        }
    </>
};

export default PageContainer;
