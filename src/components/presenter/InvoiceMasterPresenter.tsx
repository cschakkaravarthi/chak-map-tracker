import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import { IInvoiceMasterService } from "../../core/services/contracts/IInvoiceMasterService";
import { ITaxMasterService } from "../../core/services/contracts/ITaxMasterService";

export interface IInvoiceMasterPresenter {
    getAll(): Promise<any>;
    saveInvoice(headerData: any, detailData: any[], taxData: any[], stockData: any[]): Promise<any>;
    getDetailById(invoiceNo: string): Promise<any>;
    saveInvoiceAcceptance(data: any[], stockData: any[]): Promise<any>;
    getTaxDetailById(retailerId: number, taxType: string): Promise<any>;
    getInvoiceAcceptanceForUpload(): Promise<any>;
}

@injectable()
export class InvoiceMasterPresenter implements IInvoiceMasterPresenter {

    private _invoiceMasterService: IInvoiceMasterService;
    private _taxMasterService: ITaxMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.IInvoiceMasterService) invoiceMasterService: IInvoiceMasterService,
        @inject(SERVICE_IDENTIFIER.ITaxMasterService) taxMasterService: ITaxMasterService) {
        this._invoiceMasterService = invoiceMasterService;
        this._taxMasterService = taxMasterService;
    }

    public getAll(): Promise<any> {
        return this._invoiceMasterService.getAll();
    }
    public saveInvoice(headerData: any, detailData: any[], taxData: any[], stockData: any[]): Promise<any> {
        return this._invoiceMasterService.saveInvoice(headerData, detailData, taxData, stockData);
    }
    public getDetailById(invoiceNo: string): Promise<any> {
        return this._invoiceMasterService.getDetailById(invoiceNo);
    }
    public saveInvoiceAcceptance(data: any[], stockData: any[]): Promise<any> {
        return this._invoiceMasterService.saveInvoiceAcceptance(data, stockData);
    }
    public getTaxDetailById(retailerId: number, taxType: string): Promise<any> {
        return this._taxMasterService.getTaxDetailById(retailerId, taxType);
    }    
    public getInvoiceAcceptanceForUpload(): Promise<any> {
        return this._invoiceMasterService.getInvoiceAcceptanceForUpload();
    }
}