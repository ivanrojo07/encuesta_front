import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './styles.css';
import { BrowserRouter } from "react-router-dom";
import Context from './Context';

ReactDOM.render(
    <Context.Provider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>,
    document.getElementById('app')
    );