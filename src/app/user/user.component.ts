import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/model/user";
import {UserService} from "../../shared/services/user.service";
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: User[] = [];
  public loggedInUser: User | any;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
  }


  ngOnInit(): void {
    this.userService.findAll$().subscribe((users) => this.users = users);
    this.loggedInUser = this.authenticationService.getLoggedUser();
    let tempUser = this.users.find(user => user.id === this.loggedInUser.id);
    if (tempUser) {
      const loggedInUserIndex: number = this.users?.indexOf(tempUser);
      if (loggedInUserIndex !== -1) {
        console.log(loggedInUserIndex);
        this.users?.splice(loggedInUserIndex, 1);
      }
    }
  }


}
