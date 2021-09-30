import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../shared/model/user";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input()
  public user!: User;
  @Input()
  public users: User[] = [];

  @Output() deleteUser = new EventEmitter<User>();
  @Output() saveUser = new EventEmitter<User>();

  constructor() {
  }

  public save(): void {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$');
    if (regex.test(this.user.password)){
      this.saveUser.emit(this.user);
    }
  }

  public delete(): void {
    this.deleteUser.emit(this.user);
  }
}
