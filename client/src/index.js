import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setupAxios } from './config/axios';

setupAxios();

ReactDOM.render(<App/>, document.getElementById('root'));
