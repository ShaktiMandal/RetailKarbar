import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import './index.module.css';
import App from './App';
import reducer from './Store/Reducers/Reducer';

const middleWare = [thunk];

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(...middleWare)));

const app = (
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>       
    );

ReactDOM.render( app, document.getElementById('root'));
