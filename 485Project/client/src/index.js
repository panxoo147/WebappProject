import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css' 
import './index.css';
import history from './history'

import App from './App';

import {BrowserRouter} from 'react-router-dom'

const AppWithRouter = () => (
  <BrowserRouter  history={history}>
    <App/>
  </BrowserRouter>
);

ReactDOM.render(<AppWithRouter />, document.getElementById('root'))