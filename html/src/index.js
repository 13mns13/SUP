import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createBrowserHistory } from "history";
import {BrowserRouter, Router} from "react-router-dom";

const customHistory = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={customHistory}>
    <App customHistory={customHistory}/>
  </BrowserRouter>,
  document.getElementById('root')
);
