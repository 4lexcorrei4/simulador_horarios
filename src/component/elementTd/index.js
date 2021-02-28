import React from "react";
import "./index.css";

const ElementTD = ({times}) => {
    let elements = [];
    for (let time = 0; time < times - 1; time++)
        elements.push(1);

    console.log(elements)
    return <>{
        elements.map(obj => <td></td>)
    }
        <td className="with-right-border"></td>
    </>
};

export default ElementTD;