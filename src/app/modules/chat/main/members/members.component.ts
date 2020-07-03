import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/online/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.fetchUsersInPublic();
  }

  public blockUser(user: User): void {
    let users: Array<User> = this.userService.blockedUsers;
    if (this.isUserBlocked(user)) {
      users.splice(users.indexOf(user), 1);
    } else {
      users.push(user);
    }

    this.userService.blockedUsers = users;
  }

  public isUserBlocked(user: User): boolean {
    return this.userService.blockedUsers.includes(user);
  }

  public isCurrentUser(user: User): boolean {
    if (this.userService.user === null) {
      return false;
    }

    return this.userService.user.username === user.username;
  }

}
