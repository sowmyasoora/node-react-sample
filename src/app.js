import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import DashboardPage from './components/DashboardPage'; 
import configureDataStore from './store/configureDataStore';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureDataStore();

const jsx = (
    <Provider store={store}>
        <DashboardPage />
    </Provider>
  );
  

ReactDOM.render(jsx, document.getElementById('app'));

