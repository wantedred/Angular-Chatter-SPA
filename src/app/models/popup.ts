export class Popup {
    
    public showCard: boolean;
    public popTitle : string;
    public inputLabelText: string;
    public inputPlaceholderText: string;
    public leftActionText: string;
    public rightActionText: string;

    constructor(popTitle: string, inputLabelText: string, inputPlaceholderText : string,
        leftActionText: string = "", rightActionText: string = "") {
        this.popTitle = popTitle;
        this.inputLabelText = inputLabelText;
        this.inputPlaceholderText = inputPlaceholderText;
        this.leftActionText = leftActionText;
        this.rightActionText = rightActionText;
    }
}