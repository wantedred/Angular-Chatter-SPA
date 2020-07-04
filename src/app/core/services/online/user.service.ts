import { Injectable, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Connection } from '../../http/connection';
import { PacketManager } from '../../packets/packetmanager';
import { RequestAllUsers } from '../../packets/out/impl/requestallusers';
import { ReceiveAllUsers, ReceiveAllUsersProps } from '../../packets/in/impl/receiveallusers';
import { ReceiveUsername, ReceiveUsernameProps } from '../../packets/in/impl/receiveusername';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = null;
  users: User[] = Array<User>();
  blockedUsers: User[] = Array<User>();
  public clickedNewName: Subject<boolean> = new Subject<boolean>();

  /**
   * This boolean is for safety measures on not grabbing users more than once
   */
  private usersAlreadyFetched: boolean = false;

  constructor() {
    this.usersInPublicListener();
    this.listenForNewUser();
  }

  ngOnDestroy() {
    this.usersAlreadyFetched = false;
    
  }

  fetchUsersInPublic() : void {
    if (this.usersAlreadyFetched) {
      return;
    }

    this.usersAlreadyFetched = true;
    
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
