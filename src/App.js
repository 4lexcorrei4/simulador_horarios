import React from 'react';
import axios from "axios";
import * as _redux from "./redux";
import store, {persistor} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import './App.css';
import PageContainer from "./container/page";
import "./component/global.css";

function App() {
    _redux.setupAxios(axios, store);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <PageContainer />
            </PersistGate>
        </Provider>
    );
}

export default App;