import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import _RequestAgent from '../utility/httpAgent';
import { _UserMasterPresenter } from "../Installer";
import { IRetailerMasterService } from "../../core/services/contracts/IRetailerMasterService";

export interface IRetailerMasterPresenter {
    getAllRetailerById(routeId: number): Promise<any>;
    getRetailerById(retailerId: number): Promise<any>;
    getRetailerInfoById(retailerId: number): Promise<any>;
    savePlan(selectedStore: any, selectedDate: any): Promise<any>;
    getOutletListDateWiseCounts(month: number, year: number): Promise<any>;
    deleteVillageListByDate(pDate: Date): Promise<any>;
    getVillageListByDate(pDate: Date): Promise<any>;
    getTodaysPlannedRetailer(routeId: number): Promise<any>;
    getRetailerOrderValue(retailerId: number): Promise<any>;
    getAllSubChannel(): Promise<any>;
    getAllKPIById(retailerId: number): Promise<any>;
    saveAllRetailer(objRetailer: any): Promise<any>;
    getDateWisePlanForUpload(): Promise<any>;
}

@injectable()
export class RetailerMasterPresenter implements IRetailerMasterPresenter {

    private _retailerMasterService: IRetailerMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.IRetailerMasterService) retailerMasterService: IRetailerMasterService) {
        this._retailerMasterService = retailerMasterService;
    }

    public getAllRetailerById(routeId: number): Promise<any> {
        return this._retailerMasterService.getAllRetailerById(routeId);
    }
    public getRetailerById(retailerId: number): Promise<any> {
        return this._retailerMasterService.getRetailerById(retailerId);
    }
    public getRetailerInfoById(retailerId: number): Promise<any> {
        return this._retailerMasterService.getRetailerInfoById(retailerId);
    }
    public savePlan(selectedStore: any, selectedDate: any): Promise<any> {
        return this._retailerMasterService.savePlan(selectedStore, selectedDate);
    }
    public getOutletListDateWiseCounts(month: number, year: number): Promise<any> {
        return this._retailerMasterService.getOutletListDateWiseCounts(month, year);
    }
    public deleteVillageListByDate(pDate: Date): Promise<any> {
        return this._retailerMasterService.deleteVillageListByDate(pDate);
    }
    public getVillageListByDate(pDate: Date): Promise<any> {
        return this._retailerMasterService.getVillageListByDate(pDate);
    }
    public getTodaysPlannedRetailer(routeId: number): Promise<any> {
        return this._retailerMasterService.getTodaysPlannedRetailer(routeId);
    }
    public getRetailerOrderValue(retailerId: number): Promise<any> {
        return this._retailerMasterService.getRetailerOrderValue(retailerId);
    }
    public getAllSubChannel(): Promise<any> {
        return this._retailerMasterService.getAllSubChannel();
    }
    public getAllKPIById(retailerId: number): Promise<any> {
        return this._retailerMasterService.getAllKPIById(retailerId);
    }
    public saveAllRetailer(objRetailer: any): Promise<any> {
        return this._retailerMasterService.saveAllRetailer(objRetailer);
    }
    public getDateWisePlanForUpload(): Promise<any> {
        return this._retailerMasterService.getDateWisePlanForUpload();
    }
}
