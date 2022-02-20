const permissionReducer = (state = [], action) => {
 
    switch (action.type) {
    case 'GET_PERMISSION_DATA':
    return action.payload;
    case 'SET_PERMISSION_DATA':  
    console.log(state)
            return {    
                ...state,    
                [action.payload.key]: state[action.payload.key]?.map(    
                    (content, i) => content.taskId === action.payload.taskId ? {...content, asProductAdministrator : action.payload.asProductAdministrator ,  asEngineer : action.payload.asEngineer }    
                                            : content)    
            }; 
    default:
    return state;
    }
    }
    export default permissionReducer;