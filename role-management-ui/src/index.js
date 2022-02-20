import React from 'react';
 import ReactDOM from 'react-dom';
 import { Provider } from 'react-redux';
 import ReduxThunk from 'redux-thunk';
 import { createStore, applyMiddleware } from 'redux';
 import rootReducer from './redux/reducers/index';
 import App from './App';
 
 // To use bootstrap css
 import 'bootstrap/dist/css/bootstrap.min.css';
 
 // To apply middleware to the store
 const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
 
 // Providing root reducer to the app component
 ReactDOM.render(
 <Provider store={createStoreWithMiddleware(rootReducer)}>
 <App />
 </Provider>, 

 document.getElementById('root')
 );