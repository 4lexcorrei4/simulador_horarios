import {put, takeLatest, select, all} from "redux-saga/effects";
import {persistReducer} from "redux-persist";
import {useHistory} from "react-router-dom";
import storage from "redux-persist/lib/storage";
import * as api from "../api/api";
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";

//const swal = withReactContent(Swal);

export const types = {
    Init: "[Redux] Init",
    Set: "[Redux] Set",
    SetYears: "[Redux] SetYears",
    ChangeYear: "[Redux] ChangeYear",
    GetDepartments: "[Redux] GetDepartments",
    SetDepartments: "[Redux] SetDepartments",
    SetDepartment: "[Redux] SetDepartment",
    GetDepartmentSubjects: "[Redux] GetDepartmentSubjects",
    SetSubjects: "[Redux] SetSubjects",
    AddOrUpdateSubjects: "[Redux] AddOrUpdateSubjects",
    AddSubjectDone: "[Redux] AddSubjectDone",
    RemoveSubject: "[Redux] RemoveSubject",
    AddOrUpdateShifts: "[Redux] AddOrUpdateShifts",
    SaveClass: "[Redux] SaveClass",
    RemoveClass: "[Redux] RemoveClass",
    SetView: "[Redux] SetView",
    Nothing: "[Redux] Nothing",
};

const initialState = {
    view: undefined,
    year: {
        all: [],
        chosen: undefined
    },
    department: {
        all: [],
        chosen: undefined
    },
    subject: {
        all: [],
        chosen: {}
    },
    shifts: {},
    classes: {},
    loading: true
};

export const reducer = persistReducer(
    {storage, key: "simulador-horarios"},
    (state = initialState, action) => {
        switch (action.type) {
            case types.Set: {
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
                if (!newClasses[action.payload.subject])
                    newClasses[action.payload.subject] = {};
                if (!newClasses[action.payload.subject][action.payload.type])
                    newClasses[action.payload.subject][action.payload.type] = {};
                newClasses[action.payload.subject].number = newClasses[action.payload.subject].number ? newClasses[action.payload.subject].number + 1 : 1;
                newClasses[action.payload.subject][action.payload.type][action.payload.number] = {...state.shifts[action.payload.subject][action.payload.type][action.payload.number]};
                newState.classes = newClasses;
                return newState;
            }
            case types.RemoveClass: {
                const newState = {...state};
                const newClasses = {...state.classes};
                delete newClasses[action.payload.subject][action.payload.type][action.payload.number];
                newClasses[action.payload.subject].count--;
                if (newClasses[action.payload.subject].count <= 0)
                    delete newClasses[action.payload.subject];
                newState.classes = newClasses;
                return newState;
            }
            case types.SetView: {
                const newState = {...state};
                newState.view = action.payload;
                return newState;
            }
            default:
                const newState = {...state};
                newState.loading = false;
                return newState;
        }
    }
);

export const actions = {
    init: () => ({ type: types.Init }),
    set: (name, content) => ({ type: types.Set, payload: {name, content} }),
    setYears: (years) => ({ type: types.SetYears, payload: years }),
    changeYear: (year) => ({ type: types.ChangeYear, payload: year }),
    getDepartments: () => ({ type: types.GetDepartments }),
    setDepartments: (departments) => ({ type: types.SetDepartments, payload: departments }),
    setDepartment: (department) => ({ type: types.SetDepartment, payload: department }),
    getDepartmentSubjects: (department) => ({ type: types.GetDepartmentSubjects, payload: department }),
    setSubjects: (subjects) => ({ type: types.SetSubjects, payload: subjects }),
    addOrUpdateSubjects: (subjects) => ({ type: types.AddOrUpdateSubjects, payload: subjects }),
    addSubjectDone: (subjectInfo) => ({ type: types.AddSubjectDone, payload: subjectInfo }),
    removeSubject: (subject) => ({ type: types.RemoveSubject, payload: subject }),
    addOrUpdateShifts: (subject, shifts) => ({ type: types.AddOrUpdateShifts, payload: {subject, shifts} }),
    addClass: (subject, type, number) => ({ type: types.SaveClass, payload: {subject, type, number} }),
    removeClass: (subject, type, number) => ({ type: types.RemoveClass, payload: {subject, type, number} }),
    setView: (view) => ({ type: types.SetView, payload: view }),
    nothing: () => ({ type: types.Nothing })
};

export function* saga() {
    yield takeLatest(types.Init, function* () {
        const years = {
            all: [],
            chosen: new Date().getMonth() >= 9 ? new Date().getFullYear() + 1 : new Date().getFullYear()
        }
        for (let year = years.chosen; year >= 2015; year--)
            years.all.push(year);
        yield put(actions.setYears(years));
        yield put(actions.getDepartments());

        const classes = yield select(state => state.redux.classes);
        if (Array.isArray(classes))
            yield put(actions.set("classes", {}));
        const view = yield select(state => state.redux.view);
        if (view != "chosen")
            yield put(actions.set("view", undefined));
    });
    yield takeLatest(types.GetDepartments, function* () {
        const {data} = yield api.getDepartments();
        yield put(actions.setDepartments(data));
    });
    yield takeLatest(types.SetDepartment, function* ({payload: department}) {
        const {data} = yield api.getDepartmentSubjects(department);
        yield put(actions.setSubjects(data.classes));
    });
    yield takeLatest(types.ChangeYear, function* ({payload: year}) {
        const subjects = yield select(state => state.redux.subject.chosen);
        yield put(actions.addOrUpdateSubjects(Object.keys(subjects)));
    });
    yield takeLatest(types.AddOrUpdateSubjects, function* ({payload: subjects}) {
        let index = 0;
        do {
            let subject = Array.isArray(subjects) ? subjects[index++] : subjects;
            if (subject > 0) {
                const {data} = yield api.getSubject(subject);
                let subjectInfo = data;
                let instances = data.instances;
                const year = yield select(state => state.redux.year.chosen);
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
                    const {data} = yield api.getSubjectShifts(instance);
                    const shiftsInformation = data;
                    const shifts = {
                        t: {},
                        to: {},
                        tp: {},
                        tpo: {},
                        p: {},
                        po: {}
                    };
                    const {data: {building: {abbreviation}}} = yield api.getDepartmentSubjects(infoSubject.department.id);
                    shiftsInformation.map(shift => {
                        let infoShift = {...shift};
                        delete infoShift.teachers;
                        delete infoShift.url;
                        for (let index = 0; index < infoShift.instances.length; index++) {
                            infoShift.instances[index].duration = infoShift.instances[index].duration / 30;
                            infoShift.instances[index].room = infoShift.instances[index].room ? abbreviation + " " + infoShift.instances[index].room : undefined;
                        }
                        let type = shift.type_display.indexOf("Teórico-Prático") >= 0
                            ? "TP"
                            : shift.type_display.indexOf("Teórico") >= 0
                                ? "T"
                                : "P";
                        if (shift.type_display.indexOf("Online") >= 0)
                            type += "O";
                        infoShift.type = {
                            name: type,
                            title: shift.type_display
                        };
                        delete infoShift.type_display;
                        shifts[type.toLowerCase()][shift.number] = {
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
    });
}
