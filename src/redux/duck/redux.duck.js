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
    GetDepartments: "[Redux] GetDepartments",
    SetDepartments: "[Redux] SetDepartments",
    SetDepartment: "[Redux] SetDepartment",
    GetDepartmentSubjects: "[Redux] GetDepartmentSubjects",
    SetSubjects: "[Redux] SetSubjects",
    SetSubject: "[Redux] SetSubject"
};

const initialState = {
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
    {storage, key: "simulador-horarios", whitelist: ["department", "subject"]},
    (state = initialState, action) => {
        switch (action.type) {
            case types.SetDepartments: {
                const newState = {...state};
                newState.department.all = action.payload;
                return newState;
            }
            case types.SetDepartment: {
                const newState = {...state};
                newState.department.chosen = action.payload;
                return newState;
            }
            case types.SetSubjects: {
                const newState = {...state};
                newState.subject.all = action.payload;
                return newState;
            }
            case types.SetSubject: {
                const newState = {...state};
                newState.subject.chosen = action.payload;
                return newState;
            }
            default:
                return state;
        }
    }
);

export const actions = {
    init: () => ({ type: types.Init }),
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
    yield takeLatest(types.SetDepartment, function* ({payload}) {
        const {data} = yield api.getDepartmentSubjects(payload);
        yield put(actions.setSubjects(data.classes));
    });
}
