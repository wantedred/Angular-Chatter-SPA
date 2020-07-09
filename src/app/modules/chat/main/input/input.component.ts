import { Component, OnInit, ViewChild, ElementRef, ViewRef, Output, Input } from '@angular/core';
import { UserService } from 'src/app/core/services/online/user.service';
import { MessageService } from 'src/app/core/services/online/message.service';
import { ToasterService } from 'src/app/core/services/offline/toaster.service';
import { Toaster } from 'src/app/shared/models/toaster';
import { BasicResponse } from 'src/app/core/http/basicresponse';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(public userService: UserService,
    public messageService: MessageService,
    public toasterService: ToasterService) { }

  @ViewChild('textArea') 
  txtArea: ElementRef;

  ngOnInit(): void {
    this.isMessageSentListener();
  }

  onTextChange() {
    let height: number = +this.txtArea.nativeElement.style.height.split('p')[0] + 60;
    let textHeight: number = this.messageService.textHeight;
    if (+height > 130) {
      return;
    }
    
    if (textHeight != height) {
      this.messageService.textHeight = height;
       this.messageService.scrollMessages$.next(true);
    }
  }

  stopNewLine(event) {
    event.preventDefault();
  }

  prepareMessageSend() {
    let textMessage : string = this.txtArea.nativeElement.value.trim();
    if (!this.userService.user) {
      this.toasterService.issueToast(new Toaster("You must supply a display name before sending messages."));
      return;
    }

    if (textMessage.length <= 0) {
      this.toasterService.issueToast(new Toaster("Message can't be empty"));
      return;
    }

    this.messageService.sendMessage(textMessage);
  }

  isMessageSentListener(): void {
    this.messageService._sentMessage.subscribe(
      (response: BasicResponse) => {
        if (response.success) {
          this.messageService.scrollMessages$.next(true);
          this.clearText();
        }
      }
    )
  }

  clearText() {
    this.txtArea.nativeElement.value = '';
  }

}
