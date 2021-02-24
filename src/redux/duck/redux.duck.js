import {put, takeLatest, select} from "redux-saga/effects";
import {persistReducer} from "redux-persist";
import {useHistory} from "react-router-dom";
import storage from "redux-persist/lib/storage";
import * as api from "../api/api";
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";

//const swal = withReactContent(Swal);

export const types = {
    Login: "[Account] Login",
    AfterLogin: "[Account] AfterLogin",
    Signup: "[Account] Signup",
    Logout: "[Account] Logout",
    ChangePassword: "[Redux] ChangePassword",
    GetBalanceList: "[Redux] GetBalanceList",
    SetBalanceList: "[Redux] SetBalanceList",
    GetUserInfo: "[Redux] GetUserInfo",
    SetUserInfo: "[Redux] SetUserInfo",
};

const initialState = {
    username: undefined,
    email: undefined,
    token: undefined,
    expires: undefined,
    role: undefined,
    balances: [],
    orders: {
        open: [],
        filled: []
    }
};

export const reducer = persistReducer(
    {storage, key: "lofi-account", whitelist: ["username", "email", "token", "expires", "role", "balances", "orders"]},
    (state = initialState, action) => {
        switch (action.type) {
            case types.AfterLogin: {
                const newState = {...state};
                newState.username = action.payload.username;
                newState.token = action.payload.token;
                newState.expirationDate = action.payload.expirationDate;
                newState.role = action.payload.role;
                return newState;
            }
            case types.Logout: {
                const newState = {...initialState};
                return newState;
            }
            case types.SetBalanceList: {
                const newState = {...state};
                newState.balances = action.payload;
                return newState;
            }
            case types.SetUserInfo: {
                const newState = {...state};
                newState.email = action.payload;
                return newState;
            }
            default:
                return state;
        }
    }
);

export const actions = {
    login: (username, password) => ({ type: types.Login, payload:{username, password}}),
    afterLogin: (username, token , expirationDate, role) => ({type: types.AfterLogin, payload: {username, token, expirationDate, role}}),
    signup: (username, mail, password, confirmation) => ({ type: types.Signup, payload: { username, mail, password, confirmation } }),
    logout: () => ({ type: types.Logout }),
    changePassword: (oldPwd, newPwd, confirmPwd) => ({ type: types.ChangePassword, payload : { oldPwd, newPwd, confirmPwd } }),
    getBalanceList: () => ({ type: types.GetBalanceList }),
    setBalanceList: (list) => ({ type: types.SetBalanceList, payload: list }),
    getUserInfo: () => ({ type: types.GetUserInfo }),
    setUserInfo: (list) => ({ type: types.SetUserInfo, payload: list })
};

export function* saga() {
    /*yield takeLatest(types.Login, function* ({payload: {username, password}}) {
        const response = yield api.login(username, password);
        if (response.status != 200)
            yield put(generalActions.setErrorMsg("login", msgs.generic[response.response.data]));
        else {
            const {data} = response;
            yield put(actions.afterLogin(data.username, data.tokenId, data.expirationData, data.role));
        }
    });
    yield takeLatest(types.Signup, function* ({payload: {username, mail, password, confirmation}}) {
        const response = yield api.signup(username, mail, password, confirmation);
        if (response.status != 200)
            yield put(generalActions.setErrorMsg("signup", msgs.generic[response.response.data]));
        else {
            const {data} = response;
            yield put(actions.afterLogin(data.username, data.tokenId, data.expirationData, data.role));
        }
    });
    yield takeLatest(types.Logout, function* () {
        const { username, token } = yield select(state => state.account);
        yield api.logout(username, token);
    });
    yield takeLatest(types.ChangePassword, function* ({payload: {oldPwd, newPwd, confirmPwd}}) {
        const { username, token } = yield select(state => state.account);
        const response = yield api.changePassword(username, token, oldPwd, newPwd, confirmPwd);
        if (response.status != 200)
            yield put(generalActions.setErrorMsg("changePassword", msgs.generic[response.response.data]));
        else {
            swal.fire({
                title: response.data,
                showConfirmButton: true,
                showCancelButton: false,
                icon: "info"
            })
                .then(result => {
                    if (result.isConfirmed)
                        window.location.reload();
                });
        }
    });
    yield takeLatest(types.GetBalanceList, function* () {
        const { username, token } = yield select(state => state.account);
        const res = yield api.getBalanceList(username, token);
        let balances = {};
        res.data.forEach(balance => {
            let tokenSymbol = balance.key.path[0].name.split("-")[0];
            balances[tokenSymbol] = balance.properties.quantity.value;
        });
        yield put(actions.setBalanceList(balances));
    });
    yield takeLatest(types.GetUserInfo, function* () {
        const { username, token } = yield select(state => state.account);
        const res = yield api.getUserInfo(username, token);
        let {data} = res;
        yield put(actions.setUserInfo(data[0]));
    });*/
}
