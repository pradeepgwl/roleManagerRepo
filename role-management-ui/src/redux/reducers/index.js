import { combineReducers } from 'redux';
 // Imported employee reducer
 import permissionReducer from './permissionReducer';
 
 const rootReducer = combineReducers({
 permissionData: permissionReducer,
 });
 
 export default rootReducer;