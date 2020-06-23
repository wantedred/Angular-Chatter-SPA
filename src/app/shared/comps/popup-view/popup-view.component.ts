import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupService, PopupType } from 'src/app/services/offline/popup.service';
import { PoppedProps } from 'src/app/models/popup';

@Component({
  selector: 'app-popup-view',
  templateUrl: './popup-view.component.html',
  styleUrls: ['./popup-view.component.scss']
})
export class PopupViewComponent {

  constructor(public popupService: PopupService) { 
  }

  public actionPressed(action: PopupType, text: string) {
    this.popupService.poppedAction.emit({action, text});
  }  

}
