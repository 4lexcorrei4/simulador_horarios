import {put, takeLatest, select, all} from "redux-saga/effects";
import {persistReducer} from "redux-persist";
import {useHistory} from "react-router-dom";
import storage from "redux-persist/lib/storage";
import * as api from "../api/api";
import conf from "../../conf";
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";

//const swal = withReactContent(Swal);

export const types = {
    Init: "[Redux] Init",
    InitEnd: "[Redux] InitEnd",
    SetPopup: "[Redux] SetPopup",
    SetPopupEnd: "[Redux] SetPopupEnd",
    ClearPopup: "[Redux] ClearPopup",
    SetDepartments: "[Redux] SetDepartments",
    SetDepartment: "[Redux] SetDepartment",
    SetSubjects: "[Redux] SetSubjects",
    AddSubject: "[Redux] AddSubject"
};

const initialState = {
    view: undefined,
    theme: "light",
    department: {
        all: [],
        chosen: undefined
    },
    subject: {
        all: [],
        chosen: {}
    },
    shift: {
        all: {},
        chosen: {}
    },
    loading: true,
    updateTime: {
        "departments": undefined,
        "subjects": undefined,
        "shifts": undefined
    },
    popup: undefined
};

export const reducer = persistReducer(
    {storage, key: "simulador-horarios-v2"},
    (state = initialState, action) => {
        switch (action.type) {
            case types.InitEnd: {
                return {
                    ...state,
                    loading: false
                };
            }
            case types.SetPopup: {
                return {
                    ...state,
                    popup: action.payload,
                    loading: true
                };
            }
            case types.SetPopupEnd: {
                return {
                    ...state,
                    loading: false
                }
            }
            case types.ClearPopup: {
                return {
                    ...state,
                    popup: undefined
                }
            }
            case types.SetDepartments: {
                return {
                    ...state,
                    department: {
                        ...state.department,
                        all: action.payload
                    }
                }
            }
            case types.SetDepartment: {
                return {
                    ...state,
                    department: {
                        ...state.department,
                        chosen: action.payload
                    }
                }
            }
            case types.SetSubjects: {
                return {
                    ...state,
                    subject: {
                        ...state.subject,
                        all: action.payload
                    }
                }
            }
            case types.AddSubject: {
                const chosen_subjects = {...state.subject.chosen};
                chosen_subjects[action.payload.id] = action.payload;
                return {
                    ...state,
                    subject: {
                        ...state.subject,
                        chosen: {...chosen_subjects}
                    }
                }
            }
            /*case types.Set: {
                const newState = {...state};
                newState[action.payload.name] = action.payload.content;
                return newState;
            }
            case types.SetYears: {
                const newState = {...state};
                newState.year = action.payload;
                return newState;
            }
            case types.ChangeYear: {
                const newState = {...state};
                newState.year.chosen = action.payload;
                return newState;
            }
            case types.GetDepartments: {
                const newState = {...state};
                newState.loading = true;
                return newState;
            }
            case types.SetDepartments: {
                const newState = {...state};
                newState.department = {
                    ...state.department,
                    all: action.payload
                };
                newState.loading = false;
                return newState;
            }
            case types.SetDepartment: {
                const newState = {...state};
                newState.department = {
                    ...state.department,
                    chosen: action.payload
                };
                return newState;
            }
            case types.GetDepartmentSubjects: {
                const newState = {...state};
                newState.loading = true;
                return newState;
            }
            case types.SetSubjects: {
                const newState = {...state};
                newState.subject = {
                    ...state.subject,
                    all: action.payload
                };
                newState.loading = false;
                return newState;
            }
            case types.AddOrUpdateSubjects: {
                const newState = {...state};
                newState.loading = true;
                return newState;
            }
            case types.AddSubjectDone: {
                const newState = {...state};
                let newChosen = {...state.subject.chosen};
                newChosen[action.payload.id] = action.payload;
                newState.subject = {
                    ...state.subject,
                    chosen: {...newChosen}
                };
                return newState;
            }
            case types.RemoveSubject: {
                const newState = {...state};
                let newChosen = {...state.subject.chosen};
                delete newChosen[action.payload];
                newState.subject = {
                    ...state.subject,
                    chosen: {...newChosen}
                };
                let newShifts = {...state.shifts};
                delete newShifts[action.payload];
                newState.shifts = {...newShifts};
                return newState;
            }
            case types.AddOrUpdateShifts: {
                const newState = {...state};
                newState.shifts = {...state.shifts};
                newState.shifts[action.payload.subject] = action.payload.shifts;
                return newState;
            }
            case types.SaveClass: {
                const newState = {...state};
                const newClasses = {...state.classes};
                if (!newClasses[action.payload.subject]) {
                    newClasses[action.payload.subject] = {};
                    newClasses[action.payload.subject].count = 1;
                } else {
                    newClasses[action.payload.subject].count++;
                }
                if (!newClasses[action.payload.subject][action.payload.type])
                    newClasses[action.payload.subject][action.payload.type] = {};
                newClasses[action.payload.subject][action.payload.type][action.payload.number] = {...state.shifts[action.payload.subject][action.payload.type][action.payload.number]};
                newState.classes = newClasses;
                return newState;
            }
            case types.UpdateClasses: {
                const newState = {...state};
                const newClasses = {...state.classes};
                Object.keys(newClasses).map(subject => {
                    Object.keys(newClasses[subject]).map(type => {
                        Object.keys(newClasses[subject][type]).map(number => {
                            newClasses[subject][type][number] = newState.shifts[subject][type][number];
                        });
                    });
                });
                newState.classes = {...newClasses};
                return newState;
            }
            case types.RemoveClass: {
                const newState = {...state};
                const newClasses = {...state.classes};
                newClasses[action.payload.subject].count--;
                delete newClasses[action.payload.subject][action.payload.type][action.payload.number];
                if (newClasses[action.payload.subject].count == 0)
                    delete newClasses[action.payload.subject];
                newState.classes = newClasses;
                return newState;
            }
            case types.SetView: {
                const newState = {...state};
                newState.view = action.payload;
                return newState;
            }
            case types.LastUpdate: {
                const newState = {...state};
                newState.lastUpdate = action.payload;
                return newState;
            }*/
            default:
                return state;
        }
    }
);

export const actions = {
    init: () => ({ type: types.Init }),
    initEnd: () => ({ type: types.InitEnd }),
    setPopup: (option) => ({ type: types.SetPopup, payload: option }),
    setPopupEnd: () => ({ type: types.SetPopupEnd }),
    clearPopup: () => ({ type: types.ClearPopup }),
    setDepartments: (values) => ({ type: types.SetDepartments, payload: values }),
    setDepartment: (value) => ({ type: types.SetDepartment, payload: value }),
    setSubjects: (values) => ({ type: types.SetSubjects, payload: values }),
    addSubject: (value) => ({ type: types.AddSubject, payload: value })
};

export function* saga() {
    yield takeLatest(types.Init, function* () {
        // check if selected subjects still exist
        // check shifts updates
        yield put(actions.initEnd());
    });
    yield takeLatest(types.SetPopup, function* ({payload: option}) {
        if (option == "add-subject") {
            const {data} = yield api.getDepartments();
            yield put(actions.setDepartments(data));
        }
        yield put(actions.setPopupEnd());
    });
    yield takeLatest(types.SetDepartment, function* ({payload: value}) {
        const {data: {subjects}} = yield api.getDepartmentSubjects(value);
        yield put(actions.setSubjects(subjects));
    });
    /*yield takeLatest(types.Init, function* () {
        yield put(actions.getDepartments());

        const classes = yield select(state => state.redux.classes);
        if (Array.isArray(classes))
            yield put(actions.set("classes", {}));
        const view = yield select(state => state.redux.view);
        if (view != "chosen")
            yield put(actions.set("view", undefined));

        let lastUpdate = yield select(state => state.redux.lastUpdate);
        const {data} = yield api.lastUpdate(currentYear, currentTime);
        const lastDBUpdate = new Date(Date.parse(data));
        let updateShifts = false;
        if (!lastUpdate)
            updateShifts = true;
        else {
            lastUpdate = new Date(Date.parse(yield select(state => state.redux.lastUpdate)));
            updateShifts = lastUpdate < lastDBUpdate;
        }
        if (updateShifts)
            yield put(actions.changeYear(years.chosen));
    });
    yield takeLatest(types.GetDepartments, function* () {
        const {data} = yield api.getDepartments();
        data.sort((a, b) => a.name == b.name ? 0 : a.name > b.name ? 1 : -1);
        yield put(actions.setDepartments(data));
    });
    yield takeLatest(types.SetDepartment, function* ({payload: department}) {
        const yearTime = yield select(state => state.redux.year.chosen);
        const year = yearTime.split("-")[0];
        const time = yearTime.split("-")[1];
        const subjectsInfos = {};
        {
            const {data} = yield api.getDepartmentSubjects(department);
            data.classes.map(subject => {
                subjectsInfos[subject.id] = subject.name;
            });
        }
        const {data} = yield api.getDepartmentSubjectsByYear(department, year);
        const subjectsNames = {};
        const subjectsObj = {};
        data.map(subject => {
            if (subject.period == time || subject.period == 1) {
                subjectsObj[subject.parent] = {
                    id: subject.parent,
                    name: subjectsInfos[subject.parent]
                };
                if (!subjectsNames[subjectsInfos[subject.parent]])
                    subjectsNames[subjectsInfos[subject.parent]] = [subject.parent];
                else
                    subjectsNames[subjectsInfos[subject.parent]].push(subject.parent);
            }
        });
        for (let index = 0; index < Object.keys(subjectsNames).length; index++) {
            let name = Object.keys(subjectsNames)[index];
            if (subjectsNames[name].length > 1) {
                let ids = subjectsNames[name];
                for (let indexIds = 0; indexIds < ids.length; indexIds++) {
                    let id = ids[indexIds];
                    const {data} = yield api.getSubject(id);
                    subjectsObj[id].clipId = data.external_id;
                }
            }
        }
        const subjectArray = Object.values(subjectsObj);
        subjectArray.sort((a, b) => a.name == b.name ? 0 : a.name > b.name ? 1 : -1);
        yield put(actions.setSubjects(subjectArray));
    });
    yield takeLatest(types.ChangeYear, function* ({payload: year}) {
        const subjects = yield select(state => state.redux.subject.chosen);
        yield put(actions.addOrUpdateSubjects(Object.keys(subjects)));
        yield put(actions.updateClasses());
    });
    yield takeLatest(types.AddOrUpdateSubjects, function* ({payload: subjects}) {
        let index = 0;
        let depsShort = {};
        do {
            let subject = Array.isArray(subjects) ? subjects[index++] : subjects;
            if (subject > 0) {
                const {data} = yield api.getSubject(subject);
                let subjectInfo = data;
                let instances = data.instances;
                const yearTime = yield select(state => state.redux.year.chosen);
                const year = yearTime.split("-")[0];
                const time = yearTime.split("-")[1];
                let found = false;
                let instance = undefined;
                for (let index = 0; !found && index < instances.length; index++) {
                    if (instances[index].year == year) {
                        instance = instances[index].id;
                        found = true;
                    }
                }
                if (instance) {
                    yield put(actions.addSubjectDone(subjectInfo));
                    let infoSubject = {...subjectInfo};
                    infoSubject.credits = infoSubject.credits / 2;
                    delete infoSubject.instances;
                    delete infoSubject.url;
                    const {data} = yield api.getSubjectShifts(subjectInfo.external_id, year, time);
                    const shiftsInformation = data;
                    const shifts = {};
                    const depId = infoSubject.department.id;
                    if (!depsShort[depId]) {
                        const {data: {building: {abbreviation}}} = yield api.getDepartmentSubjects(depId);
                        depsShort[depId] = abbreviation;
                    }
                    shiftsInformation.map(shift => {
                        let infoShift = {...shift};
                        delete infoShift.teachers;
                        delete infoShift.url;
                        for (let index = 0; index < infoShift.instances.length; index++) {
                            infoShift.instances[index].duration = infoShift.instances[index].duration / 30;
                            infoShift.instances[index].room = infoShift.instances[index].room ? depsShort[depId] + " " + infoShift.instances[index].room : undefined;

                            infoShift.instances[index].url = "https://clip.fct.unl.pt/utente/eu/aluno/informa%E7%E3o_acad%E9mica/sector/ano_lectivo/unidade_curricular/actividade/turnos" +
                                "?tipo_de_per%EDodo_lectivo=" + conf.timeType(time) + "&sector=98021&ano_lectivo=" + year +
                                "&per%EDodo_lectivo=" + conf.timeNumber(time) + "&institui%E7%E3o=97747&unidade_curricular=" + subjectInfo.external_id +
                                "&tipo=" + conf.classesTypesCLIP(shift.type) + "&n%BA=" + infoShift.number;
                        }
                        infoShift.type = {
                            name: conf.classesTypes(shift.type),
                            title: shift.type_display
                        };
                        delete infoShift.type_display;
                        if (!shifts[infoShift.type.name])
                            shifts[infoShift.type.name] = {};
                        infoSubject.url = "https://clip.fct.unl.pt/utente/eu/aluno/informa%E7%E3o_acad%E9mica/sector/ano_lectivo/unidade_curricular" +
                            "?tipo_de_per%EDodo_lectivo=" + conf.timeType(time) + "&sector=98021&ano_lectivo=" + year +
                            "&per%EDodo_lectivo=" + conf.timeNumber(time) + "&institui%E7%E3o=97747&unidade_curricular=" + subjectInfo.external_id;
                        shifts[infoShift.type.name][shift.number] = {
                            subject: infoSubject,
                            shift: infoShift
                        };
                    });
                    yield put(actions.addOrUpdateShifts(subject, shifts));
                } else {
                    yield put(actions.removeSubject(subject));
                }
            }
        } while (Array.isArray(subjects) && index <= subjects.length);
        yield put(actions.nothing());

        const yearTime = yield select(state => state.redux.year.chosen);
        const year = yearTime.split("-")[0];
        const time = yearTime.split("-")[1];
        const {data} = yield api.lastUpdate(year, time);
        yield put(actions.lastUpdate(data));
    });*/
}
