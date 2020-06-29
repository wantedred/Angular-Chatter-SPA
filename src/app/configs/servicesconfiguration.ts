import { ToasterHorizontalTypes, ToasterVertialTypes } from '../shared/models/toaster';

export class ServicesConfiguration {

    public static readonly TOASTERVERTICALTYPES: 
        ToasterVertialTypes = ToasterVertialTypes.BOTTOM;

    public static readonly TOASTERHORIZONTALTYPES: 
        ToasterHorizontalTypes = ToasterHorizontalTypes.CENTER;

    public static readonly TOASTERDURATION: number = 2000;

    public static readonly TOASTERACTIONTEXT: string = 'Dismiss';

}