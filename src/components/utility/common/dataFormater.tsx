const _dataFormater = {
    removeNullOrEmpty: (key: any, value: any): any => {
        if ((typeof value === 'string' || typeof value === 'object') && (value === null || value === ''))
            return undefined;
        return value;
    },
    parse: function (data: any): any {
        if (data != null)
            return JSON.stringify(data, this.removeNullOrEmpty)
        return null;
    },
    encodeDataURI: function (obj: any): string | null {
        return Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(this.parse(obj[k]))).join('&');
    }
};
export default _dataFormater;