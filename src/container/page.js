import React, {useEffect} from "react";
import TopMenuContainer from "./topMenu";
import ContentContainer from "./content";
import {useDispatch} from "react-redux";
import {actions} from "../redux/duck/redux.duck";

const PageContainer = () => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(actions.init());
        },
        []
    );

    return <>
        <TopMenuContainer />
        <ContentContainer />
    </>
};

export default PageContainer;