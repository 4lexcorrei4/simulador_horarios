import axios from "axios";
import urls from "./urls";

/* Account */
export function login(username, password) {
    const data = { username, password };
    return axios.post(urls.login(), data);
}

export function signup(username, mail, password, confirmation) {
    const data = { username, email: mail, password, confirmation, acc_state: "active" };
    return axios.post(urls.signup(), data);
}

export function logout(username, tokenId) {
    const data = { username, tokenId };
    return axios.post(urls.logout(), data);
}

export function changePassword(username, tokenId, oldPwd, newPwd, confirmPwd) {
    const data = {
        username,
        tokenId,
        password: oldPwd,
        newPassword: newPwd,
        confirmation: confirmPwd
    };
    return axios.post(urls.changePassword(), data);
}

/* Balance */
export function getBalanceList(username, tokenId) {
    const data = { username, tokenId, numberList: 3 };
    return axios.post(urls.balanceList(), data);
}

export function getUserInfo(username, tokenId) {
    const data = { username, tokenId};
    return axios.post(urls.userInfo(), data);
}

/* Simple Trade - Market */
export function calculate(username, tokenId, assets, amount) {
    return
}