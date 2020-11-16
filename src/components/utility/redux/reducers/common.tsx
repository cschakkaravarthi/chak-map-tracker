
import {
    LOGIN_DETAIL, HOME_PAGE_LOADED
} from '../../../../constants/actionTypes';


export default (state = {}, action: any) => {
    switch (action.type) {
        case LOGIN_DETAIL:
            return {
                ...state,
                LoginDetails: action.loginDetails,
                UId: action.UId
            }
        case HOME_PAGE_LOADED:
            return {
                ...state,
                arrUserDetails: action.arrUserDetails
            }
        default:
            return state;
    }
}