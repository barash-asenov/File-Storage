// CSS Imports
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/dashboard/dist/style.css'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';
import axios from 'axios';
import { setupAxios } from './config/axios';

setupAxios(axios, store);

ReactDOM.render(<App/>, document.getElementById('root'));
