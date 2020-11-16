import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import _RequestAgent from '../utility/httpAgent';
import { ICollectionMasterService } from "../../core/services/contracts/ICollectionMasterService";

export interface ICollectionMasterPresenter {
    getAllPendingInvoice(): Promise<any>;
    getRetailerPendingInvoiceById(retailerId: number): Promise<any>;
    getRetailerPaymentMode(): Promise<any>;
    getBankList(): Promise<any>;
    getBankBranchList(bankId: number): Promise<any>;
    getRetailerCreditNotes(retailerId: number): Promise<any>;
    savePayment(InsertQueries: any, updateQueries: any): Promise<any>;
    getPaymentForUpload(): Promise<any>;
}

@injectable()
export class CollectionMasterPresenter implements ICollectionMasterPresenter {

    private _collectionMasterService: ICollectionMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.ICollectionMasterService) collectionMasterService: ICollectionMasterService) {
        this._collectionMasterService = collectionMasterService;
    }
    public getAllPendingInvoice(): Promise<any> {
        return this._collectionMasterService.getAllPendingInvoice();
    }
    public getRetailerPendingInvoiceById(retailerId: number): Promise<any> {
        return this._collectionMasterService.getRetailerPendingInvoiceById(retailerId);
    }
    public getRetailerPaymentMode(): Promise<any> {
        return this._collectionMasterService.getRetailerPaymentMode();
    }
    public getBankList(): Promise<any> {
        return this._collectionMasterService.getBankList();
    }
    public getBankBranchList(bankId: number): Promise<any> {
        return this._collectionMasterService.getBankBranchList(bankId);
    }
    public getRetailerCreditNotes(retailerId: number): Promise<any> {
        return this._collectionMasterService.getRetailerCreditNotes(retailerId);
    }
    public savePayment(InsertQueries: any, updateQueries: any): Promise<any> {
        return this._collectionMasterService.savePayment(InsertQueries, updateQueries);
    }
    public getPaymentForUpload(): Promise<any> {
        return this._collectionMasterService.getPaymentForUpload();
    }    
}