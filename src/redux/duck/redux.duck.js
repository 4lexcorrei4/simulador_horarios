import {put, takeLatest, select} from "redux-saga/effects";
import {persistReducer} from "redux-persist";
import {useHistory} from "react-router-dom";
import storage from "redux-persist/lib/storage";
import * as api from "../api/api";
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";

//const swal = withReactContent(Swal);

export const types = {
    Init: "[Redux] Init",
    SetTime: "[Redux] SetTime",
    GetDepartments: "[Redux] GetDepartments",
    SetDepartments: "[Redux] SetDepartments",
    SetDepartment: "[Redux] SetDepartment",
    GetDepartmentSubjects: "[Redux] GetDepartmentSubjects",
    SetSubjects: "[Redux] SetSubjects",
    AddSubject: "[Redux] AddSubject",
    AddSubjectDone: "[Redux] AddSubjectDone",
    RemoveSubject: "[Redux] RemoveSubject",
    AddShifts: "[Redux] AddShifts"
};

const initialState = {
    time: {
        all: [
            {
                year: 2021,
                times: [
                    {
                        id: 1,
                        name: "1º Semestre"
                    },
                    {
                        id: 2,
                        name: "Trimestre"
                    },
                    {
                        id: 3,
                        name: "2º Semestre"
                    }
                ]
            }
        ],
        chosen: "2021-3"
    },
    department: {
        all: [],
        chosen: undefined
    },
    subject: {
        all: [],
        chosen: {}
    },
    shifts: {}
};

export const reducer = persistReducer(
    {storage, key: "simulador-horarios"},
    (state = initialState, action) => {
        switch (action.type) {
            case types.SetTime: {
                const newState = {...state};
                newState.time = {
                    ...state.time,
                    chosen: action.payload
                };
            }
            case types.SetDepartments: {
                const newState = {...state};
                newState.department = {
                    ...state.department,
                    all: action.payload
                };
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
            case types.SetSubjects: {
                const newState = {...state};
                newState.subject = {
                    ...state.subject,
                    all: action.payload
                };
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
                newState.shifts = {
                    ...newShifts
                };
                return newState;
            }
            case types.AddShifts: {
                const newState = {...state};
                newState.shifts = {...state.shifts};
                newState.shifts[action.payload.subject] = action.payload.shifts;
                return newState;
            }
            default:
                return state;
        }
    }
);

export const actions = {
    init: () => ({ type: types.Init }),
    setTime: (time) => ({ type: types.SetTime, payload: time }),
    getDepartments: () => ({ type: types.GetDepartments }),
    setDepartments: (departments) => ({ type: types.SetDepartments, payload: departments }),
    setDepartment: (department) => ({ type: types.SetDepartment, payload: department }),
    getDepartmentSubjects: (department) => ({ type: types.GetDepartmentSubjects, payload: department }),
    setSubjects: (subjects) => ({ type: types.SetSubjects, payload: subjects }),
    addSubject: (subject) => ({ type: types.AddSubject, payload: subject }),
    addSubjectDone: (subjectInfo) => ({ type: types.AddSubjectDone, payload: subjectInfo }),
    removeSubject: (subject) => ({ type: types.RemoveSubject, payload: subject }),
    addShifts: (subject, shifts) => ({ type: types.AddShifts, payload: {subject, shifts} })
};

export function* saga() {
    yield takeLatest(types.Init, function* () {
        yield put(actions.getDepartments());
    });
    yield takeLatest(types.GetDepartments, function* () {
        const {data} = yield api.getDepartments();
        yield put(actions.setDepartments(data));
    });
    yield takeLatest(types.SetDepartment, function* ({payload: department}) {
        const {data} = yield api.getDepartmentSubjects(department);
        yield put(actions.setSubjects(data.classes));
    });
    yield takeLatest(types.AddSubject, function* ({payload: subject}) {
        if (subject > 0) {
            const {data} = yield api.getSubject(subject);
            let subjectInfo = data;
            let instances = data.instances;
            const {time: {chosen}} = yield select(state => state.redux);
            let chosenComps = chosen.split("-");
            let year = chosenComps[0];
            let time = chosenComps[1];
            let found = false;
            let instance = undefined;
            for (let index = 0; !found && index < instances.length; index++) {
                if (instances[index].year == year && instances[index].period == time) {
                    instance = instances[index].id;
                    found = true;
                }
            }
            if (instance) {
                yield put(actions.addSubjectDone(subjectInfo));
                const {data} = yield api.getSubjectShifts(instance);
                yield put(actions.addShifts(subject, data));
            }
        }
    });
}
