import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/model/user";
import {UserService} from "../../shared/services/user.service";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: User[] = [];
  public loggedInUser = this.authenticationService.getLoggedUser();

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
  }


  ngOnInit(): void {
    if (this.loggedInUser.role === 'admin'){
      this.loadUsers();
    }
  }

  public addUser(): void {
    this.users.unshift({} as User);
  }

  public saveUser(userToSave: User):void {
    if (userToSave?.id) {
      this.userService.update$(userToSave).subscribe((user) => userToSave = user);
    } else {
      this.userService.insert$(userToSave).pipe(
        tap((user) =>  {
          userToSave = user;
          let itemIndex = this.users.findIndex(user => user === userToSave);
          this.users[itemIndex + 1] = userToSave;
        })
      ).subscribe();
    }
    this.logoutIfLoggedInUserEqualsUser(userToSave);
  }

  public deleteUser(userToRemove: User):void {
    if (this.loggedInUser.role === 'admin') {
      let itemIndex = this.users.indexOf(userToRemove);
      this.users.splice(itemIndex, 1);
    }
    this.userService.delete$(userToRemove).subscribe();
    this.logoutIfLoggedInUserEqualsUser(userToRemove);
  }

  private logoutIfLoggedInUserEqualsUser(user: User): void{
    if (user.id === this.loggedInUser.id) {
      this.authenticationService.logout();
    }
  }

  private loadUsers():void {
    this.userService.findAll$().pipe(
      tap((users) => {
        this.users = users;
        let itemIndex = this.users.indexOf(this.loggedInUser);
        this.users.splice(itemIndex,1);
      })
    ).subscribe();
  }
}
