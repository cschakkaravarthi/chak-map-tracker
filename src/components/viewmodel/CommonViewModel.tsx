interface IAuthRequestModel {
    LoginId: string,
    Password: string,
    MobileDateTime: Date,
    VersionCode: string
}
interface IRequestModel {
    UserId: number,
    MobileDateTime: Date,
    VersionCode: string
}
interface IUserModel {
    UserId: number,
    LoginId: string,
    VersionCode: string,
    token: string
}

// class AuthRequestModel {
//     constructor(loginId: string, password: string, mobileDateTime: Date, versionCode: string) {
//         this.LoginId = loginId;
//         this.Password = password;
//         this.MobileDateTime = mobileDateTime;
//         this.VersionCode = versionCode;
//     }
//     public LoginId: string;
//     public Password: string;
//     public MobileDateTime: Date;
//     public VersionCode: string;
// }

// export { AuthRequestModel }