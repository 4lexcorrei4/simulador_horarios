import React, {useState} from "react";
import "./index.css";

const InputDropdown = ({label, options, chosen, chooseFunction, clearFunction}) => {
    const [search, setSearch] = useState("");

    return <div className="inputDropdown">
        <span className="clear" onClick={() => {clearFunction() ; setSearch("")}}>&#10005;</span>
        <input
            type="search"
            value={"Clear"}
            placeholder={label}
            value={chosen ? chosen.name : search}
            onChange={(event) => setSearch(event.target.value)}
        />
        <div class="results">
            {
                options.map(option =>
                    option.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
                        ? <div className="result" onClick={() => chooseFunction(option)}>
                            {option.name}
                        </div>
                        : <></>
                )
            }
        </div>
    </div>
};

export default InputDropdown;