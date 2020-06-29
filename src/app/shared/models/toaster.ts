import { ServicesConfiguration } from 'src/app/configs/servicesconfiguration';

export class Toaster {

    public message: string;
    public horizontalTypes: ToasterHorizontalTypes;
    public verticalTypes: ToasterVertialTypes;
    public duration: number;
    public actionText: string;

    constructor(message: string, 
        horizontalTypes: ToasterHorizontalTypes = ServicesConfiguration.TOASTERHORIZONTALTYPES,
        verticalTypes: ToasterVertialTypes = ServicesConfiguration.TOASTERVERTICALTYPES,
        duration: number = ServicesConfiguration.TOASTERDURATION,
        actionText: string = ServicesConfiguration.TOASTERACTIONTEXT
    ) {
      this.message = message;
      this.horizontalTypes = horizontalTypes;
      this.verticalTypes = verticalTypes;
      this.duration = duration;
      this.actionText = actionText;  
    }

}

export const enum ToasterHorizontalTypes {

    START = 'start',
    CENTER = 'center',
    END = 'end',
    LEFT = 'left',
    RIGHT = 'right'

}

export const enum ToasterVertialTypes {

    TOP = 'top',
    BOTTOM = 'bottom'

}