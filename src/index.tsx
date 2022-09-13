import * as React from 'react';
import { render } from 'react-dom';
import styles from "/src/styles.module.scss";
import 'regenerator-runtime';
import "config/configureMobX";

import App from "./App";

render(
    <div className={styles.title}><React.StrictMode>
        <App />
    </React.StrictMode>
    </div>,
    document.getElementById('root'))

if (module.hot) {
    module.hot.accept();
}

