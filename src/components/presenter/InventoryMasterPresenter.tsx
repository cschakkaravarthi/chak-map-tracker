import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import { IInventoryMasterService } from "../../core/services/contracts/IInventoryMasterService";

export interface IInventoryMasterPresenter {
    getAll(): Promise<any>;
}

@injectable()
export class InventoryMasterPresenter implements IInventoryMasterPresenter {

    private _inventoryMasterService: IInventoryMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.IInventoryMasterService) inventoryMasterService: IInventoryMasterService) {
        this._inventoryMasterService = inventoryMasterService;
    }

    public getAll(): Promise<any> {
        return this._inventoryMasterService.getAll();       
    }
}