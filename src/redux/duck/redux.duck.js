import {put, takeLatest, select, all} from "redux-saga/effects";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as api from "../api/api";
import conf from "../../conf";
import $ from "jquery";
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
    AddOrUpdateSubject: "[Redux] AddOrUpdateSubject",
    RemoveSubject: "[Redux] RemoveSubject",
    GetUpdateTime: "[Redux] GetUpdateTime",
    SetUpdateTime: "[Redux] SetUpdateTime",
    SetSemester: "[Redux] SetSemester",
    AddSubjectShifts: "[Redux] AddSubjectShifts",
    RemoveSubjectShifts: "[Redux] RemoveSubjectShifts",
    SaveSubjectShift: "[Redux] SaveSubjectShift",
    UnsaveSubjectShift: "[Redux] UnsaveSubjectShift",
    RemoveAllSubjectShifts: "[Redux] RemoveAllSubjectShifts"
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
            case types.AddOrUpdateSubject: {
                const chosen_subjects = {...state.subject.chosen};
                let subjects = action.payload.subject;
                if (!Array.isArray(subjects))
                    subjects = [{...subjects, department: action.payload.depId}];
                subjects.map(sub => {
                    chosen_subjects[sub.id] = {...sub};
                });
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
                    updateTime: {...action.payload}
                }
            }
            case types.SetSemester: {
                return {
                    ...state,
                    semester: {...action.payload}
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
            case types.RemoveAllSubjectShifts: {
                const all_shifts = {...state.shift.all};
                delete all_shifts[action.payload];
                const chosen_shifts = {...state.shift.chosen};
                delete chosen_shifts[action.payload];
                return {
                    ...state,
                    shift: {
                        all: {...all_shifts},
                        chosen: {...chosen_shifts}
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
    addOrUpdateSubject: (subject, depId) => ({ type: types.AddOrUpdateSubject, payload: {subject, depId} }),
    removeSubject: (value) => ({ type: types.RemoveSubject, payload: value }),
    setUpdateTime: (times) => ({ type: types.SetUpdateTime, payload: times }),
    setSemester: (year, timeId) => ({ type: types.SetSemester, payload: { year, timeId } }),
    addSubjectShifts: (id, shifts) => ({ type: types.AddSubjectShifts, payload: {id, shifts} }),
    removeSubjectShifts: (id) => ({ type: types.RemoveSubjectShifts, payload: id }),
    saveSubjectShift: (id, type, number) => ({ type: types.SaveSubjectShift, payload: { id, type, number } }),
    unsaveSubjectShift: (id, type, number) => ({ type: types.UnsaveSubjectShift, payload: { id, type, number } }),
    removeAllSubjectShifts: (id) => ({ type: types.RemoveAllSubjectShifts, payload: id })
};

export function* saga() {
    yield takeLatest(types.Init, function* () {
        const {data: {year, timeId}} = yield api.getSemester();
        yield put(actions.setSemester(year, timeId));

        const my_update_time = yield select(state => state.redux.updateTime);
        const {data: {subjects, shifts}} = yield api.getUpdates();
        const max_time = new Date(subjects) > new Date(shifts) ? subjects : shifts;

        if (!my_update_time || !my_update_time.subjects || !my_update_time.shifts || new Date(my_update_time.subjects) < new Date(subjects) || new Date(my_update_time.shifts) < new Date(shifts)) {
            const subjects_to_update = [];
            const chosen_subjects = yield select(state => state.redux.subject.chosen);
            const to_verify = Object.keys(chosen_subjects).sort((a, b) => {return a.short > b.short});
            for (let index = 0; index < to_verify.length; index++) {
                const sub = chosen_subjects[to_verify[index]];
                try {
                    // check if selected subject still exist
                    yield api.getSubject(sub.department, sub.id);
                    subjects_to_update.push(sub);
                } catch (error) {
                    if (error.response && error.response.status == 404) {
                        // remove if selected subject does not exist
                        yield put(actions.removeAllSubjectShifts(sub.id));
                        yield put(actions.removeSubject(sub.id));
                    }
                }
            }
            if (subjects_to_update.length > 0)
                yield put(actions.addOrUpdateSubject(subjects_to_update, undefined));
        }

        yield put(actions.setUpdateTime({
            ...my_update_time,
            subjects: subjects,
            shifts: shifts,
            time: !my_update_time.time || new Date(my_update_time.time) < new Date(max_time) ? max_time : my_update_time.time
        }));

        yield put(actions.initEnd());
    });
    yield takeLatest(types.SetPopup, function* ({payload: option}) {
        if (option == "add-subject") {
            yield put(actions.getDepartments());
        }
        yield put(actions.setPopupEnd());
    });
    yield takeLatest(types.GetDepartments, function* () {
        let update_time;
        let my_update_time;
        {
            const {data: {departments}} = yield api.getUpdates();
            update_time = departments;
            my_update_time = yield select(state => state.redux.updateTime.department);
        }
        if (!my_update_time || new Date(my_update_time) < new Date(update_time)) {
            const {data} = yield api.getDepartments();
            yield put(actions.setDepartments(data));

            const my_update_times = yield select(state => state.redux.updateTime);
            yield put(actions.setUpdateTime({
                ...my_update_times,
                departments: update_time,
                time: new Date(my_update_times.time) > new Date(update_time) ? my_update_times.time : update_time
            }));
        }
    });
    yield takeLatest(types.SetDepartment, function* ({payload: value}) {
        const {data: {subjects}} = yield api.getDepartmentSubjects(value);
        yield put(actions.setSubjects(subjects));
    });
    yield takeLatest(types.AddOrUpdateSubject, function* ({payload: {subject, depId}}) {
        let idx = 0;
        do {
            const this_subject = Array.isArray(subject) ? subject[idx++] : {...subject, department: depId};
            const {data: {subject: subject_info, shifts}} = yield api.getSubject(this_subject.department, this_subject.id);
            const {year, timeId} = yield select(state => state.redux.semester);
            const shifts_infos = {};
            shifts.map(shift => {
                shift.instances.map(instance => {
                    instance.duration /= 30;
                    instance.url = "https://clip.fct.unl.pt/utente/eu/aluno/informa%E7%E3o_acad%E9mica/sector/ano_lectivo/unidade_curricular/actividade/turnos" +
                        "?tipo_de_per%EDodo_lectivo=" + conf.timeType(timeId) + "&sector=98021&ano_lectivo=" + year +
                        "&per%EDodo_lectivo=" + conf.timeNumber(timeId) + "&institui%E7%E3o=97747&unidade_curricular=" + subject_info.id +
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
                    ...subject_info,
                    url: "https://clip.fct.unl.pt/utente/eu/aluno/informa%E7%E3o_acad%E9mica/sector/ano_lectivo/unidade_curricular" +
                        "?tipo_de_per%EDodo_lectivo=" + conf.timeType(timeId) + "&sector=98021&ano_lectivo=" + year +
                        "&per%EDodo_lectivo=" + conf.timeNumber(timeId) + "&institui%E7%E3o=97747&unidade_curricular=" + subject_info.id
                };
                shifts_infos[shift.type.name][shift.number] = shift;
            });
            yield put(actions.addSubjectShifts(subject_info.id, shifts_infos));

            // check chosen shifts updates
            const new_shifts = {};
            shifts.map(shift => {
                if (!new_shifts[subject_info.id])
                    new_shifts[subject_info.id] = {}
                if (!new_shifts[subject_info.id][conf.classesTypes(shift.type.id)])
                    new_shifts[subject_info.id][conf.classesTypes(shift.type.id)] = {}
                new_shifts[subject_info.id][conf.classesTypes(shift.type.id)][shift.number] = 1
            });

            const chosen_shifts = yield select(state => state.redux.shift.chosen);
            if (chosen_shifts[subject_info.id]) {
                const shift_types = Object.keys(chosen_shifts[subject_info.id]);
                for (let shift_type_idx = 0; shift_type_idx < shift_types.length; shift_type_idx++) {
                    const shift_type = shift_types[shift_type_idx];
                    const shift_numbers = Object.keys(chosen_shifts[subject_info.id][shift_type]);
                    for (let shift_number_idx = 0; shift_number_idx < shift_numbers.length; shift_number_idx++) {
                        const shift_number = shift_numbers[shift_number_idx];
                        if (!new_shifts[subject_info.id] || !new_shifts[subject_info.id][shift_type] || !new_shifts[subject_info.id][shift_type][shift_number])
                            yield put(actions.unsaveSubjectShift(subject_info.id, shift_type, shift_number));
                    }
                }
            }
        } while(Array.isArray(subject) && idx < subject.length);
    });
    yield takeLatest(types.RemoveSubject, function* ({payload: value}) {
        yield put(actions.removeSubjectShifts(value));
    });
}
