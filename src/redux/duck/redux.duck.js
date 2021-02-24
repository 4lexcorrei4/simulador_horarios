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
    SetSubject: "[Redux] SetSubject"
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
        chosen: undefined
    }
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
            case types.SetSubject: {
                const newState = {...state};
                newState.subject = {
                    ...state.subject,
                    chosen: action.payload
                };
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
    setSubject: (subject) => ({ type: types.SetSubject, payload: subject })
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
}
