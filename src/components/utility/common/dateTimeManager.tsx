import moment from 'moment';

const _dateTimeManager = {
    dateKey: () => {
        return {
            DATE: 'D',
            DATETIME: 'DT',
            DATETIME_SECONDS: 'DTS',
            DATETIME_SECONDS_MILLISECONDS: 'DTSM',
        }
    },
    appDateFormat: (format: string) => {
        var dateFormat = '';
        var key = _dateTimeManager.dateKey();
        switch (format) {
            case key.DATE:
                dateFormat = "YYYY/MM/DD";
                break;
            case key.DATETIME:
                dateFormat = "YYYY/MM/DD HH:mm";
                break;
            case key.DATETIME_SECONDS:
                dateFormat = "YYYY/MM/DD HH:mm:ss";
                break;
            case key.DATETIME_SECONDS_MILLISECONDS:
                dateFormat = "YYYY/MM/DD HH:mm:ss:SSS";
                break;
            default:
                dateFormat = "YYYY/MM/DD";
        }
        return dateFormat;
    },
    appCurrentDate: (dateformat: string) => {
        var currentDate = moment().format(dateformat);
        return currentDate;
    }
}

export default _dateTimeManager;