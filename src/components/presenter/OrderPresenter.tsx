import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import { IOrderService } from "../../core/services/contracts/IOrderService";

export interface IOrderPresenter {
    get(): Promise<any>;
    getOrder(): Promise<any>;
    getOrderDetailById(orderId: string): Promise<any>;
    saveOrder(headerData: any, detailData: any[]): Promise<any>;
    getPlacedOrder(): Promise<any>;
    getPlacedOrderDetailById(orderId: string): Promise<any>;
    updateOrder(orderId: string, column: string, value: string): Promise<any>;
    getOrderHeaderForUpload(): Promise<any>;
    getOrderDetailForUpload(): Promise<any>;
}

@injectable()
export class OrderPresenter implements IOrderPresenter {
   
    private _orderService: IOrderService;

    constructor(@inject(SERVICE_IDENTIFIER.IOrderService) orderService: IOrderService) {
        this._orderService = orderService;
    }

    public get(): Promise<any> {
        return this._orderService.get();
    }

    public getOrder(): Promise<any> {
        return this._orderService.getOrder();
    }

    public getOrderDetailById(orderId: string): Promise<any> {
        return this._orderService.getOrderDetailById(orderId);
    }

    public saveOrder(headerData: any, detailData: any[]): Promise<any> {
        return this._orderService.saveOrder(headerData, detailData);
    }

    public getPlacedOrder(): Promise<any> {
        return this._orderService.getPlacedOrder();
    }
    public getPlacedOrderDetailById(orderId: string): Promise<any> {
        return this._orderService.getPlacedOrderDetailById(orderId);
    }  
    public updateOrder(orderId: string, column: string, value: string): Promise<any> {
        return this._orderService.updateOrder(orderId, column, value);
    }
    public getOrderHeaderForUpload(): Promise<any> {
        return this._orderService.getOrderHeaderForUpload();
    }
    public getOrderDetailForUpload(): Promise<any> {
        return this._orderService.getOrderDetailForUpload();
    }
}