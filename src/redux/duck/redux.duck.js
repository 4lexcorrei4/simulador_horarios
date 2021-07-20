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
    SetView: "[Redux] SetView",
    SetTheme: "[Redux] SetTheme",
    GetDepartments: "[Redux] GetDepartments",
    SetDepartments: "[Redux] SetDepartments",
    SetDepartment: "[Redux] SetDepartment",
    SetSubjects: "[Redux] SetSubjects",
    AddSubject: "[Redux] AddSubject",
    RemoveSubject: "[Redux] RemoveSubject",
    GetUpdateTime: "[Redux] GetUpdateTime",
    SetUpdateTime: "[Redux] SetUpdateTime",
    GetSemester: "[Redux] GetSemester",
    SetSemester: "[Redux] SetSemester",
    AddSubjectShifts: "[Redux] AddSubjectShifts",
    RemoveSubjectShifts: "[Redux] RemoveSubjectShifts",
    SaveSubjectShift: "[Redux] SaveSubjectShift",
    UnsaveSubjectShift: "[Redux] UnsaveSubjectShift"
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
        departments: undefined,
        subjects: undefined,
        shifts: undefined,
        time: undefined
    },
    semester: {
        year: undefined,
        timeId: undefined
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
            case types.SetView: {
                return {
                    ...state,
                    view: action.payload
                }
            }
            case types.SetTheme: {
                return {
                    ...state,
                    theme: action.payload
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
            case types.RemoveSubject: {
                const chosen_subjects = {...state.subject.chosen};
                delete chosen_subjects[action.payload];
                return {
                    ...state,
                    subject: {
                        ...state.subject,
                        chosen: {...chosen_subjects}
                    }
                }
            }
            case types.SetUpdateTime: {
                return {
                    ...state,
                    updateTime: action.payload
                }
            }
            case types.SetSemester: {
                return {
                    ...state,
                    semester: action.payload
                }
            }
            case types.AddSubjectShifts: {
                const all_shifts = {...state.shift.all};
                all_shifts[action.payload.id] = action.payload.shifts;
                return {
                    ...state,
                    shift: {
                        ...state.shift,
                        all: {...all_shifts}
                    }
                }
            }
            case types.RemoveSubjectShifts: {
                const all_shifts = {...state.shift.all};
                delete all_shifts[action.payload];
                return {
                    ...state,
                    shift: {
                        ...state.shift,
                        all: {...all_shifts}
                    }
                }
            }
            case types.SaveSubjectShift: {
                const sub_id = action.payload.id;
                const shift_type = action.payload.type;
                const shift_number = action.payload.number;

                const saved_shifts = {...state.shift.chosen};
                if (!saved_shifts[sub_id]) {
                    saved_shifts[sub_id] = {};
                    saved_shifts[sub_id]["counter"] = 0;
                }
                if (!saved_shifts[sub_id][shift_type])
                    saved_shifts[sub_id][shift_type] = {};
                saved_shifts[sub_id][shift_type][shift_number] = {
                    ...state.shift.all[sub_id][shift_type][shift_number]
                }
                saved_shifts[sub_id]["counter"]++;
                return {
                    ...state,
                    shift: {
                        ...state.shift,
                        chosen: {...saved_shifts}
                    }
                }
            }
            case types.UnsaveSubjectShift: {
                const sub_id = action.payload.id;
                const shift_type = action.payload.type;
                const shift_number = action.payload.number;

                const saved_shifts = {...state.shift.chosen};
                delete saved_shifts[sub_id][shift_type][shift_number];
                saved_shifts[sub_id]["counter"]--;
                if (saved_shifts[sub_id]["counter"] == 0)
                    delete saved_shifts[sub_id];
                return {
                    ...state,
                    shift: {
                        ...state.shift,
                        chosen: {...saved_shifts}
                    }
                }
            }
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
    setView: (option) => ({ type: types.SetView, payload: option }),
    setTheme: (option) => ({ type: types.SetTheme, payload: option }),
    getDepartments: () => ({ type: types.GetDepartments }),
    setDepartments: (values) => ({ type: types.SetDepartments, payload: values }),
    setDepartment: (value) => ({ type: types.SetDepartment, payload: value }),
    setSubjects: (values) => ({ type: types.SetSubjects, payload: values }),
    addSubject: (value) => ({ type: types.AddSubject, payload: value }),
    removeSubject: (value) => ({ type: types.RemoveSubject, payload: value }),
    setUpdateTime: (times) => ({ type: types.SetUpdateTime, payload: times }),
    getSemester: () => ({ type: types.GetSemester }),
    setSemester: (year, timeId) => ({ type: types.SetSemester, payload: { year, timeId } }),
    addSubjectShifts: (id, shifts) => ({ type: types.AddSubjectShifts, payload: {id, shifts} }),
    removeSubjectShifts: (id) => ({ type: types.RemoveSubjectShifts, payload: id }),
    saveSubjectShift: (id, type, number) => ({ type: types.SaveSubjectShift, payload: { id, type, number } }),
    unsaveSubjectShift: (id, type, number) => ({ type: types.UnsaveSubjectShift, payload: { id, type, number } })
};

export function* saga() {
    yield takeLatest(types.Init, function* () {
        yield put(actions.getSemester());
        // check if selected subjects still exist
        // check shifts updates
        yield put(actions.initEnd());
    });
    yield takeLatest(types.SetPopup, function* ({payload: option}) {
        if (option == "add-subject") {
            yield put(actions.getDepartments());
        }
        yield put(actions.setPopupEnd());
    });
    yield takeLatest(types.GetDepartments, function* () {
        let update_times = {};
        let my_update_time;
        {
            const {data} = yield api.getUpdates();
            update_times = data;
            my_update_time = yield select(state => state.redux.updateTime.department);
        }
        if (!my_update_time || new Date(my_update_time) < new Date(update_times.departments)) {
            const {data} = yield api.getDepartments();
            yield put(actions.setDepartments(data));
            let time = new Date(update_times.departments) > new Date(update_times.subjects) ? update_times.departments : update_times.subjects;
            time = new Date(time) > new Date(update_times.shifts) ? time : update_times.shifts;
            yield put(actions.setUpdateTime({
                ...update_times,
                time: time
            }));
        }
    });
    yield takeLatest(types.SetDepartment, function* ({payload: value}) {
        const {data: {subjects}} = yield api.getDepartmentSubjects(value);
        yield put(actions.setSubjects(subjects));
    });
    yield takeLatest(types.AddSubject, function* ({payload: value}) {
        const depId = yield select(state => state.redux.department.chosen);
        const {data: {subject, shifts}} = yield api.getSubject(depId, value.id);
        const {year, timeId} = yield select(state => state.redux.semester);
        const shifts_infos = {};
        shifts.map(shift => {
            shift.instances.map(instance => {
                instance.duration /= 30;
                instance.url = "https://clip.fct.unl.pt/utente/eu/aluno/informa%E7%E3o_acad%E9mica/sector/ano_lectivo/unidade_curricular/actividade/turnos" +
                    "?tipo_de_per%EDodo_lectivo=" + conf.timeType(timeId) + "&sector=98021&ano_lectivo=" + year +
                    "&per%EDodo_lectivo=" + conf.timeNumber(timeId) + "&institui%E7%E3o=97747&unidade_curricular=" + subject.id +
                    "&tipo=" + conf.classesTypesCLIP(shift.type.id) + "&n%BA=" + shift.number;
            })
            shift.type = {
                ...shift.type,
                name: conf.classesTypes(shift.type.id),
                title: shift.type.name
            }
            if (!shifts_infos[shift.type.name])
                shifts_infos[shift.type.name] = {}
            shift.subject = {
                ...subject,
                url: "https://clip.fct.unl.pt/utente/eu/aluno/informa%E7%E3o_acad%E9mica/sector/ano_lectivo/unidade_curricular" +
                    "?tipo_de_per%EDodo_lectivo=" + conf.timeType(timeId) + "&sector=98021&ano_lectivo=" + year +
                    "&per%EDodo_lectivo=" + conf.timeNumber(timeId) + "&institui%E7%E3o=97747&unidade_curricular=" + subject.id
            };
            shifts_infos[shift.type.name][shift.number] = shift;
        });
        yield put(actions.addSubjectShifts(subject.id, shifts_infos));
    });
    yield takeLatest(types.RemoveSubject, function* ({payload: value}) {
        yield put(actions.removeSubjectShifts(value));
    });
    yield takeLatest(types.GetSemester, function* () {
        const {data: {year, timeId}} = yield api.getSemester();
        yield put(actions.setSemester(year, timeId));
    });
}
