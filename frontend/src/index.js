import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configStore } from "./store";

ReactDOM.render(
    <Provider store={configStore}>
        <App />
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
