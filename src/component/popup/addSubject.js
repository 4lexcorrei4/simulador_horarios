import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {actions} from "../../redux/duck/redux.duck";
import $ from "jquery";

const PopupAddSubject = ({departments, department, subjects, subject, closePopup}) => {
    const dispatch = useDispatch();

    const [subjectInfo, setSubjectInfo] = useState(undefined);

    let chosenDepartment = undefined;
    departments.map(dep => {if (dep.id == department) {chosenDepartment = dep}});

    const chooseDepartment = () => {
        const id = $("#department-choose").val();
        let dep = undefined;
        departments.map(this_dep => {if (this_dep.id == id) {dep = this_dep}});
        if (!Number.isNaN(id) && dep) {
            dispatch(actions.setDepartment(id));
            $("#department-choose").val("");
        }
    };

    const addSubject = () => {
        const id = $("#subject-choose").val();
        let sub = undefined;
        subjects.map(this_sub => {if (this_sub.id == id) {sub = this_sub}});
        if (!Number.isNaN(id) && sub) {
            setSubjectInfo(sub);
            $("#subject-choose").val("");
        }
    };

    const chooseSubject = () => {
        dispatch(actions.addSubject(subjectInfo, chosenDepartment.id));
        setSubjectInfo(undefined);
    };

    const chooseSubjectAndClose = () => {
        chooseSubject();
        closePopup();
    };

    return <div id="add-subject">
        <h3>Procurar</h3>
        <div className="block">
            <div className="option-block">
                <h4>Departamento</h4>
                <div>
                    <span>{chosenDepartment ? "(" + chosenDepartment.short + ") " + chosenDepartment.name : ""}</span>
                    <input list="departments" id="department-choose" onChange={() => chooseDepartment()} placeholder="Pesquisar" />
                    <datalist id="departments">
                        {
                            departments.map(dep =>
                                dep.id != department ? <option value={dep.id} label={"(" + dep.short + ") " + dep.name} /> : <></>
                            )
                        }
                    </datalist>
                </div>
            </div>
            <div className="option-block">
                <h4>Cadeira</h4>
                <div>
                    <input list="subjects" id="subject-choose" onChange={() => addSubject()} placeholder="Pesquisar" />
                    <datalist id="subjects">
                        {
                            subjects.map(sub =>
                                (!subjectInfo || subjectInfo.id != sub.id) && (!Object.keys(subject).includes(String(sub.id))) ? <option value={sub.id} label={"(" + sub.short + ") " + sub.name} /> : <></>
                            )
                        }
                    </datalist>
                </div>
            </div>
        </div>
        <h3>Informações</h3>
        <div className="block">
            <div className="option-block">
                <h4>Número</h4>
                <div>
                    <span>{subjectInfo ? subjectInfo.id : ""}</span>
                </div>
            </div>
            <div className="option-block">
                <h4>Sigla</h4>
                <div>
                    <span>{subjectInfo ? subjectInfo.short : ""}</span>
                </div>
            </div>
            <div className="option-block">
                <h4>Nome</h4>
                <div>
                    <span>{subjectInfo ? subjectInfo.name : ""}</span>
                </div>
            </div>
        </div>
        <div className="buttons">
            <div className={"add" + (!subjectInfo ? " disabled" : "")} onClick={() => chooseSubject()}>
                Adicionar
            </div>
            <div className={"add" + (!subjectInfo ? " disabled" : "")} onClick={() => chooseSubjectAndClose()}>
                Adicionar e Fechar
            </div>
        </div>
    </div>
};

export default PopupAddSubject;