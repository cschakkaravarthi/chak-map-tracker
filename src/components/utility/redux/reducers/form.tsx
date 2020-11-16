import { LOGIN, UPDATE_FIELD,
    CLEAR_UPDATED_FIELD
 } from '../../../../constants/actionTypes';

export default (state = {}, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                username: action.username,
                password: action.password
            }
        case UPDATE_FIELD: 
            return {
                ...state,
                [action.key]: action.value
            }
        case CLEAR_UPDATED_FIELD:
            return { }
        default:
            return state;
    }

}