export class User {

    private _userId: string;

    private _username: string;

    constructor(userId: string = '', username: string) {
        this._userId = userId;
        this._username = username;
    }

    public get Id(): string {
        return this._userId;
    }

    public set Id(id: string) {
        this.Id = id;
    }

    public get username(): string {
        return this._username;
    }

}