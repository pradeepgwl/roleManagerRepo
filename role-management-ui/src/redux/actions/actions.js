import { GET_PERMISSION_DATA, SET_PERMISSION_DATA } from '../actiontypes/actiontypes';
import axios from 'axios';

export const getPermissionData = () => {
return dispatch => {
return axios.get("https://localhost:5001/api/RoleManager").then((response) => {
dispatch({ type: GET_PERMISSION_DATA, payload: response.data });
})
}
}

export const setPermissionData = (data) => {
    return dispatch => {  
        return dispatch({  
            type: 'SET_PERMISSION_DATA',  
            payload: data  
        });  
    }
}

export const savePermissionData = (data)=> {
    return dispatch => {
        return axios.put("https://localhost:5001/api/RoleManager", data)
        .then((response) => {
        dispatch({ type: GET_PERMISSION_DATA, payload: response.data });
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
}