import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import { ResponseJsonData } from "../../core/utility/ResponseJsonData";
import { IUrlDownloadMasterService } from "../../core/services/contracts/IUrlDownloadMasterService";
import _dataManager from "../utility/common/dataManager";
import DOWNLOAD_URL_MASTER from "../../constants/UrlTypes";


export interface IUrlDownloadMasterPresenter {
    get(data: IRequestModel, token: string): Promise<ResponseJsonData>;
    downloadMasters(reqData: IRequestModel, token: string, data: any[]): Promise<void>;
    upload(data: any, token: string): Promise<any>;
    getUrlByMaster(type: string | null, master: string | null): Promise<any>;
    add(data: any[]): Promise<number>;
    updateUploadedData(data: any[]): Promise<any>;
}

@injectable()
export class UrlDownloadMasterPresenter implements IUrlDownloadMasterPresenter {

    private _urlDownloadMasterService: IUrlDownloadMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.IUrlDownloadMasterService) urlDownloadMasterService: IUrlDownloadMasterService) {
        this._urlDownloadMasterService = urlDownloadMasterService;
    }
    public getUrlByMaster(type: string, master: string): Promise<any> {
        return this._urlDownloadMasterService.getUrlByMaster(type, master);
    }

    public async get(data: IRequestModel, token: string): Promise<ResponseJsonData> {
        let response: any = {};
        let jsonData: ResponseJsonData;
        const url = `${_dataManager.API_ROOT()}/v2/UrlDownloadMaster/Masters`;

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'SECURITY_TOKEN_KEY': token
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.ErrorCode == '0') {
                    jsonData = new ResponseJsonData(responseJson.Master, responseJson.Field, responseJson.Data);
                    this._urlDownloadMasterService.add([jsonData]);
                    response = jsonData;

                } else
                    console.error(responseJson.ErrorMsg);
            })
            .catch((error) => {
                console.error(error);
            });

        return response;
    }

    public async add(data: any[]): Promise<number> {
        if (data && data != null && data.length > 0)
            return this._urlDownloadMasterService.add([data]);
        return 0
    }

    public async  downloadMasters(reqData: IRequestModel, token: string, data: any[]): Promise<void> {
        const api_root = _dataManager.API_ROOT();
        for (let i = 0; i < data.length; i++) {
            await this.apiCalling(reqData, token, (api_root + data[i][1]))
        }
        data = [];
    }

    public async upload(data: any, token: string): Promise<any> {
        let response: any;
        const url = `${_dataManager.API_ROOT()}${DOWNLOAD_URL_MASTER}`;
        var toUrlEncoded = (obj: any) => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(JSON.stringify(obj[k]))).join('&');
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'SECURITY_TOKEN_KEY': token
            },
            body: toUrlEncoded(data),
        }).then((response) => response.json())
            .then((responseJson) => {
                response = responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

        return response;
    }

    public updateUploadedData(data: any[]): Promise<any> {
        return this._urlDownloadMasterService.updateUploadedData(data);
    }

    private async apiCalling(reqData: IRequestModel, token: string, url: string) {
        let responseData: any = {};
        try {
            await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'SECURITY_TOKEN_KEY': token
                }),
                body: JSON.stringify(reqData),
            }).then(data => data.json())
                .then((response) => {
                    responseData = response;
                }).catch((error) => {
                    console.error(error);
                })

            this._urlDownloadMasterService.add([responseData])
        }
        catch (e) {
        }
    }
}