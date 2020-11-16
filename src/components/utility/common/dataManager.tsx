import { ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import moment from 'moment';
import _dateTimeManager from './dateTimeManager';

const _dataManager = {
    toast: (msg: any) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    },
    statusKey: () => {
        return {
            ACCEPT: 'S',
            DECLINE: 'D',
            PENDING: 'P',
        }
    },
    generateUniqueId: (userId: number, prefix: string = '') => {
        if (userId && userId != null) {
            let cDate = moment();
            return prefix + userId + cDate.format('MMDDYYYYHHmmssSSSS');
        }
        return '';
    },
    navigateTo: (key: string, param: any = {}) => {
        Actions[key](param);
    },
    status: (type: string, screen: string = '') => {
        let result: string;
        let key = _dataManager.statusKey();
        switch (screen) {
            case 'IA':
                result = (type == key.PENDING ? 'Pending' : type == key.ACCEPT ? 'Accepted' : 'Declined')
                break;
            default:
                result = (type == key.ACCEPT ? 'Completed' : 'Pending')
                break;
        }
        return result;
    },
    API_ROOT: () => {
        var api_root = 'https://dev.ivymobileapps.com/ivycpg_product_webapi/api'
        return api_root;
    }
};

export default _dataManager;