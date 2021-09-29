import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../shared/model/user";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input()
  public user: User | any;
  @Input()
  public users: User[] | any

  @Output() deleteUser = new EventEmitter<User>();
  @Output() saveUser = new EventEmitter<User>();

  constructor() {
  }

  public save(): void {
    if (this.user.password){
      this.saveUser.emit(this.user);
    }
  }

  public delete(): void {
    this.deleteUser.emit(this.user);
  }
}
