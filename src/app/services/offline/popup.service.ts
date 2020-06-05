import { Injectable, EventEmitter, Output } from '@angular/core';
import { Popup } from 'src/app/models/popup';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  public showCard: boolean;

  public popup: Popup;

  @Output() 
  public rightAction = new EventEmitter<boolean>();

  @Output() 
  public leftAction = new EventEmitter<boolean>();

  showPopup(popup: Popup) {
    if (!popup.popTitle || !popup.inputLabelText || !popup.inputPlaceholderText) {
      return;
    }

    if (!popup.leftActionText && !popup.rightActionText) {
      return;
    }

    this.popup = popup;
    this.showCard = true;
  }

}
