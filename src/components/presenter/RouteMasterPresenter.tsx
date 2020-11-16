import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import _RequestAgent from '../utility/httpAgent';
import { _UserMasterPresenter } from "../Installer";
import { IRouteMasterService } from "../../core/services/contracts/IRouteMasterService";
import { RouteMasterModel } from "../../core/models/RouteMasterModel";

export interface IRouteMasterPresenter {
    getAll(): Promise<RouteMasterModel[]>;
    getRouteSummaryById(routeId: number): Promise<any>;
    getAddressType(): Promise<any>;
}

@injectable()
export class RouteMasterPresenter implements IRouteMasterPresenter {

    private _routeMasterService: IRouteMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.IRouteMasterService) routeMasterService: IRouteMasterService) {
        this._routeMasterService = routeMasterService;
    }

    public async getAll(): Promise<RouteMasterModel[]> {
        return await this._routeMasterService.getAll();
    }
    public async getRouteSummaryById(routeId: number): Promise<any> {
        return await this._routeMasterService.getRouteSummaryById(routeId);
    }
    public async getAddressType(): Promise<any> {
        return await this._routeMasterService.getAddressType();
    }
}
