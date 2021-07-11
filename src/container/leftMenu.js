import React from "react";
import LeftMenu from "../component/leftMenu";
import conf from "../conf";
import {useSelector} from "react-redux";

const LeftMenuContainer = () => {
    return <LeftMenu
        logo={conf.logo}
        name={conf.name}
    />
};

export default LeftMenuContainer;