import React, {useEffect} from "react";
import TopMenuContainer from "./topMenu";
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

    return <TopMenuContainer />
};

export default PageContainer;