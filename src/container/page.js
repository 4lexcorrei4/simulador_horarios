import React, {useEffect} from "react";
import TopMenuContainer from "./topMenu";
import ContentContainer from "./content";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../redux/duck/redux.duck";
import Loader from "../component/loader";

const PageContainer = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.redux.loading);

    useEffect(
        () => {
            dispatch(actions.init());
        },
        []
    );

    return <>
        <TopMenuContainer />
        <ContentContainer />
        {
            loading ? <Loader /> : <></>
        }
    </>
};

export default PageContainer;