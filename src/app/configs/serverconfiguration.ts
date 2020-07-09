export class ServerConfigurations {

    public static readonly PRODUCTION: boolean = false;

    public static readonly PORT: string =  "5000";

    public static readonly MAINHUB: string = "/api/MainHub";

    public static readonly PREFIXURL: string = ServerConfigurations.PRODUCTION ? 
        'https://webchatter.io' : 
        'http://127.0.0.1:' + ServerConfigurations.PORT;

}