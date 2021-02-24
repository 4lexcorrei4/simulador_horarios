import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as redux from "./duck/redux.duck";

export const rootReducer = combineReducers({
    redux: redux.reducer
});

export function* rootSaga() {
    yield all([redux.saga()]);
}
