import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Popup, PoppedProps } from 'src/app/shared/models/popup';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  public showCard: boolean;

  public popup: Popup;

  public poppedAction = new EventEmitter<PoppedProps>(true);

  showPopup(popup: Popup): Observable<PoppedProps> {
    if (!popup.popTitle || !popup.inputLabelText || !popup.inputPlaceholderText) {
      return;
    }

    if (popup.actions.length < 1) {
      return;
    }

    this.popup = popup;
    this.showCard = true;
    return this.poppedAction;
  }

  clearPopup() {
    this.popup = null;
    this.showCard = false;
  }

}

export enum PopupType {
  SAVE = "Save",
  CANCEL = "Cancel"
}
