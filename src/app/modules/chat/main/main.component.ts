import { Component, OnInit } from '@angular/core';
import { PopupService, PopupType } from 'src/app/core/services/offline/popup.service';
import { UserService } from 'src/app/core/services/online/user.service';
import { ToasterService } from 'src/app/core/services/offline/toaster.service';
import { Popup, PoppedProps } from 'src/app/shared/models/popup';
import { BasicResponse } from 'src/app/core/http/basicresponse';
import { PacketManager } from 'src/app/core/packets/packetmanager';
import { SendUsernameOut } from 'src/app/core/packets/out/impl/sendusername';
import { User } from 'src/app/shared/models/user';
import { Toaster } from 'src/app/shared/models/toaster';
import { Connection } from 'src/app/core/http/connection';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private popupService: PopupService,
    public userService: UserService,
    public toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.promptDisplayName();

    Connection.hubConnection.onreconnected((connectionId) => {
      if (this.userService.user === null) {
        return;
      }

      PacketManager.sendPacket(new SendUsernameOut(this.userService.user.username, this.userService.user.Id))
        .then((response: BasicResponse) =>{
          if (response.success) {
            this.userService.user.Id = connectionId;
            console.log('got reconneted and updated userid');
          }
        });
     });
  }



  public promptDisplayName() {
    if (this.userService.user) {
      return;
    }

    this.popupService.showPopup(new Popup(
      "Choose your display name",
      "Display Name",
      "display name",
      [
        PopupType.SAVE,
        PopupType.CANCEL
      ]
      )).subscribe(async (popped: PoppedProps) => {
      if (popped.action === PopupType.SAVE) {
        let username : string = popped.text;
          if (username.length < 2 || username.length > 12) {
          console.log('username must be three to twelve characters long');
          return;
        }

        let status: BasicResponse = await PacketManager.sendPacket(new SendUsernameOut(username));
        if (!status.success) {
          //TODO: throw an error in the username form
          console.log('username is taken');
          return;
        }

        this.userService.user = new User('', username);
        this.popupService.clearPopup();
      }

      if (popped.action === PopupType.CANCEL) {
        this.popupService.clearPopup();
        this.toasterService.issueToast(new Toaster("You can't send messages, until you supply an username"));
      }
    });
  }
}
