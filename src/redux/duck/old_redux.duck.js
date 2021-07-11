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
    UpdateClasses: "[Redux] UpdateClasses",
    RemoveClass: "[Redux] RemoveClass",
    SetView: "[Redux] SetView",
    LastUpdate: "[Redux] LastUpdate",
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
    loading: true,
    lastUpdate: undefined
};

export const reducer = persistReducer(
    {storage, key: "simuladorHorarios-redux"},
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
    updateClasses: () => ({ type: types.UpdateClasses }),
    removeClass: (subject, type, number) => ({ type: types.RemoveClass, payload: {subject, type, number} }),
    setView: (view) => ({ type: types.SetView, payload: view }),
    lastUpdate: (data) => ({ type: types.LastUpdate, payload: data }),
    nothing: () => ({ type: types.Nothing })
};

export function* saga() {
    yield takeLatest(types.Init, function* () {
        const todayYear = new Date().getFullYear();
        const todayMonth = new Date().getMonth() + 1;
        const todayDay = new Date().getDay();
        const currentYear = todayMonth >= 8 ? todayYear + 1 : todayYear;
        const currentTime =
            todayMonth >= 8
                ? 2 // 1º semestre
                : todayMonth + "" + todayDay <= "215"
                    ? 5 // trimestre
                    : 3 // 2º semestre
        const years = {
            all: [],
            chosen: currentYear + "-" + currentTime
        }
        for (let year = currentYear; year >= 2015; year--)
            years.all.push({
                year: year,
                times: [
                    {
                        id: 2,
                        name: "1º Semestre"
                    },
                    {
                        id: 5,
                        name: "Trimestre"
                    },
                    {
                        id: 3,
                        name: "2º Semestre"
                    }
                ]
            });
        yield put(actions.setYears(years));
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
    });
}
