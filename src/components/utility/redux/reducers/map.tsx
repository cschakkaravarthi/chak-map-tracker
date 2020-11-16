
import {
    ON_LOAD_MAP,ON_LOAD_USERMAP,ON_LOAD_WATCHID
} from '../../../../constants/actionTypes';
import firestore from "../../../../core/database/firestore";

export default (state = {}, action: any) => {
    switch (action.type) {
        case ON_LOAD_MAP:
            return {
                ...state,
                UserDetails: action.UserDetails,
            }
            case ON_LOAD_USERMAP:
            return {
                ...state,
                LatLongDetails:action.LatLongDetails
            }
            case ON_LOAD_WATCHID:
            return {
                ...state,
                watchID:action.watchID
            }
        default:
            return state;
    }
}