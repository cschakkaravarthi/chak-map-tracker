import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import { ISchemeMasterService } from "../../core/services/contracts/ISchemeMasterService";

export interface ISchemeMasterPresenter {
    getSchemeDetailById(retailerId: number, locationID: number,channelID: number): Promise<any>;
}

@injectable()
export class SchemeMasterPresenter implements ISchemeMasterPresenter {

    private _schemeMasterService: ISchemeMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.ISchemeMasterService) schemeMasterService: ISchemeMasterService) {
        this._schemeMasterService = schemeMasterService;
    }

    public getSchemeDetailById(retailerId: number, locationID: number,channelID: number): Promise<any> {
        return this._schemeMasterService.getSchemeDetailById(retailerId, locationID,channelID);       
    }
}