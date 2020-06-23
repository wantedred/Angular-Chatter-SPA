import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { ReceiveAllUsers, ReceiveAllUsersProps } from 'src/app/packets/in/impl/receiveallusers';
import { Connection } from 'src/app/connection';
import { PacketManager } from 'src/app/packets/packetmanager';
import { RequestAllUsers } from 'src/app/packets/out/impl/requestallusers';
import { ReceiveUsername, ReceiveUsernameProps } from 'src/app/packets/in/impl/receiveusername';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = null;
  users: User[] = Array<User>();

  constructor() {
    this.usersInPublicListener();
    this.listenForNewUser();
  }

  fetchUsersInPublic() : void {
    if (this.users.length > 0) {
      return;
    }

    if (!Connection.connectionIsEstablished) {
      Connection.connectionEstablishedEmitter.subscribe(async success => {
        if (success) {
          PacketManager.sendPacket(new RequestAllUsers());
        }
      })
    } else {
      PacketManager.sendPacket(new RequestAllUsers());
    }
  }

  private usersInPublicListener() : void {
    ReceiveAllUsers.emitter.subscribe((data: ReceiveAllUsersProps) => {
      if (data.users == null || undefined) {
        return;
      }
      
      data.users.forEach((element: User) => {
        this.users.push(element);
      });
    });
  }

  private listenForNewUser() : void {
    ReceiveUsername.emitter.subscribe((data: ReceiveUsernameProps) => {
      if (data.removeUser) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].username === data.newUsername) {
            this.users.splice(i, 1);
          }
        }
      } else {
        this.users.push(new User(null, data.newUsername));
      }
    });
  }

}
