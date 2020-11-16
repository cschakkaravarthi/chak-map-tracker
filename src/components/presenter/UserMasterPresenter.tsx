import { injectable, inject } from "inversify";
import SERVICE_IDENTIFIER from "../../core/utility/ConstantIdentifier";
import { ResponseJsonData } from "../../core/utility/ResponseJsonData";
import { IUserMasterService } from "../../core/services/contracts/IUserMasterService";
import _RequestAgent from '../utility/httpAgent';
import { _UserMasterPresenter } from "../Installer";
import API_URLS from "../../constants/UrlTypes";

export interface IUserMasterPresenter {
    authenticate(data: IAuthRequestModel): Promise<any>;
    authenticateExistUser(loginId: string): Promise<any>;
    add(data: ResponseJsonData): Promise<any>;
    authorize(data: IAuthRequestModel): Promise<any>;
}

@injectable()
export class UserMasterPresenter implements IUserMasterPresenter {

    private _userMasterService: IUserMasterService;

    constructor(@inject(SERVICE_IDENTIFIER.IUserMasterService) userMasterService: IUserMasterService) {
        this._userMasterService = userMasterService;
    }
    public async  authenticate(data: IAuthRequestModel): Promise<any> {
        return await _RequestAgent.post(API_URLS.USER_AUTHENTICATE, data);
    }
    public async authenticateExistUser(loginId: string): Promise<any> {
        return await this._userMasterService.authenticateExistUser(loginId);;
    }
    public async add(data: ResponseJsonData): Promise<number> {
        return await this._userMasterService.add(data);
    }
    public async authorize(data: IAuthRequestModel): Promise<any> {
        return await _RequestAgent.post(API_URLS.USER_AUTHORIZE, data);
    }
}
