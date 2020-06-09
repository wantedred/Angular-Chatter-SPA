import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupService } from 'src/app/services/offline/popup.service';

@Component({
  selector: 'app-popup-view',
  templateUrl: './popup-view.component.html',
  styleUrls: ['./popup-view.component.scss']
})
export class PopupViewComponent {

  constructor(public popupService: PopupService) { 
  }

  public actionPressed(index: number, text: string) {
    index === 0 ? this.popupService.leftAction.emit(text) : 
      this.popupService.rightAction.emit(text);
  }

  

}
