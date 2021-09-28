import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../shared/model/user";
import {Category} from "../../../shared/model/category";
import {UserService} from "../../../shared/services/user.service";
import {AuthenticationService} from "../../../shared/services/authentication.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input()
  public user: User | any;
  @Input()
  public users: User[] | any
  @Input()
  public loggedInUser!: User

  @Output() deleteUser = new EventEmitter<User>();

  public isAdmin: any;

  constructor(private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.isAdmin = this.loggedInUser.role === 'admin';
  }

  public save(): void {
    console.log(this.user)
    if (this.user.id) {
      this.userService.update$(this.user).subscribe((user) => this.user = user);
    } else {
      this.userService.insert$(this.user).subscribe((user) => this.user = user);
    }
  }

  public delete(): void {
    this.userService.delete$(this.user).subscribe(() => this.deleteUser.emit(this.user));
  }
}
