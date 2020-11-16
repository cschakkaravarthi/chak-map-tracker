import { injectable, inject } from "inversify";
import { IProductMasterService } from "../../core/services/contracts/IProductMasterService";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import { SalesReturnHeaderModel } from "../../core/models/SalesReturnModel";

export interface IProductMasterPresenter {
    get(): Promise<any>;
    getAllProductById(retailerId: number): Promise<any>;
    getProductStockInHand(): Promise<any>;
    getProductSalesReturn(retailerID:number): Promise<any>;
    getReasonSalesReturn(): Promise<any>;
    SaveSalesReturn(header: any, detailList: any): Promise<any>;
    getProductSIHForUpload(): Promise<any>;
    getProductLevel(): Promise<any>;
    getAllProducts(): Promise<any>;
}

@injectable()
export class ProductMasterPresenter implements IProductMasterPresenter {

    private _productMasterService: IProductMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.IProductMasterService) productMasterService: IProductMasterService) {
        this._productMasterService = productMasterService;
    }

    public get(): Promise<any> {
        return this._productMasterService.get();
    }
    public getAllProductById(retailerId: number): Promise<any> {
        return this._productMasterService.getAllProductById(retailerId);
    }
    public getProductStockInHand(): Promise<any> {
        return this._productMasterService.getProductStockInHand();
    }
    public getProductSalesReturn(retailerID:number): Promise<any>{
        return this._productMasterService.getProductSalesReturn(retailerID);
    }
    public getReasonSalesReturn(): Promise<any> {
        return this._productMasterService.getReasonSalesReturn();
    }
    public SaveSalesReturn(header: any, detailList: any): Promise<any> {
        return this._productMasterService.SaveSalesReturn(header, detailList);
    }
    public getProductSIHForUpload(): Promise<any> {
        return this._productMasterService.getProductSIHForUpload();
    }
    public getProductLevel(): Promise<any>{
        return this._productMasterService.getProductLevel();
    }
    public  getAllProducts(): Promise<any>{
        return this._productMasterService.getAllProducts();
    }
}