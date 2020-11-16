import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import { IUrlDownloadMasterService } from "../../core/services/contracts/IUrlDownloadMasterService";
import { DataFormater, DataManager } from "../utility/common/index";

export interface ISynchronizationPresenter {
    upload(data: any, token: string): Promise<any>;
    checkServiceAvailable(): Promise<boolean>;
    uploadOnDemand(url: string, data: any, token: string | null): Promise<any>;
}

@injectable()
export class SynchronizationPresenter implements ISynchronizationPresenter {

    private _urlDownloadMasterService: IUrlDownloadMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.IUrlDownloadMasterService) urlDownloadMasterService: IUrlDownloadMasterService) {
        this._urlDownloadMasterService = urlDownloadMasterService;
    }

    public async upload(data: any, token: string): Promise<any> {
        let response: any;
        const url = `${DataManager.API_ROOT()}/TransactionUpload/Upload`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'SECURITY_TOKEN_KEY': token
            },
            body: DataFormater.encodeDataURI(data),
        }).then((response) => response.json()).then((responseJson) => {
            response = responseJson;
        }).catch(error => console.error(error));

        return response;
    }

    public async uploadOnDemand(url: string, data: any, token: string): Promise<any> {
        let response: any;
        const pUrl = `${DataManager.API_ROOT()}${url}`;
        await fetch(pUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'SECURITY_TOKEN_KEY': token
            },
            body: DataFormater.encodeDataURI(data),
        }).then((response) => response.json()).then((responseJson) => {
            response = responseJson;
        }).catch(error => console.error(error));

        return response;
    }

    public async checkServiceAvailable(): Promise<boolean> {
        let status: boolean = false;
        await fetch(DataManager.API_ROOT()).then((responseJson) => {
            debugger;
            status = responseJson.ok;
        }).catch((error) => {
            debugger;
            console.error(error);
        });
        return status;
    }
}