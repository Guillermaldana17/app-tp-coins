import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import CoinReducer from './redux/CoinReducer';
import TaskReducer from './redux/TaskReducer';
import AppContext from './context/AppContext';

import logger from 'redux-logger'

/* Persist */
import { } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //local storage
//import storageSession from 'redux-persist/lib/storage/session' //session Storage
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
/* Fin Persist */

import thunk from 'redux-thunk';


const rootStore = combineReducers({ coin: CoinReducer, task: TaskReducer });

//const store = createStore(rootStore, composeEnhancers());

const middlewares = [thunk, logger]

if (process.env.NODE_ENV === `development`) {
  //middlewares.push(logger);
}

const config = {
  key: 'root',
  storage: storage,
  transforms: [
    encryptTransform({ secretKey: 'daskdjaslkdjsalkdjsakl' }),
  ]
};

const persisted = persistReducer(config, rootStore);

const store = createStore(persisted, applyMiddleware(...middlewares));
//const store = createStore(rootStore, applyMiddleware(...middlewares));

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppContext />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
