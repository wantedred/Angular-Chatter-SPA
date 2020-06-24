import { PopupType } from 'src/app/core/services/offline/popup.service';

export class Popup {
    
    public showCard: boolean;
    public popTitle : string;
    public inputLabelText: string;
    public inputPlaceholderText: string;
    public actions: PopupType[];

    constructor(popTitle: string, inputLabelText: string, 
        inputPlaceholderText : string, actions: PopupType[]) {
        this.popTitle = popTitle;
        this.inputLabelText = inputLabelText;
        this.inputPlaceholderText = inputPlaceholderText;
        this.actions = actions;
    }
}

export interface PoppedProps {
    action: PopupType;
    text: string;
}