import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entry} from "../../../shared/model/entry";
import {Category} from "../../../shared/model/category";
import {User} from "../../../shared/model/user";
import {EntryService} from "../../../shared/services/entry.service";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-entry-li',
  templateUrl: './entry-li.component.html',
  styleUrls: ['./entry-li.component.css']
})
export class EntryLiComponent implements OnInit {
  @Input()
  public entry!: Entry;
  @Input()
  public categories!: Category[]
  @Input()
  public users!: User[]
  @Input()
  public loggedInUser!: User

  @Output() deleteEntry = new EventEmitter<Entry>();

  public chekIn: any;
  public chekOut: any;
  public chekInTime: any;
  public chekOutTime: any;
  public isAdmin: any;
  public isOperationInProgress = false;

  constructor(private entryService: EntryService,
              public datepipe: DatePipe
  ) {
  }

  public ngOnInit(): void {
    if (!this.entry?.id) {
      this.entry.user = this.loggedInUser;
    }

    this.chekIn = new FormControl(this.entry?.checkIn);
    this.chekOut = new FormControl(this.entry?.checkOut);

    this.chekInTime = this.datepipe.transform(this.entry?.checkIn, 'HH:mm:ss');
    this.chekOutTime = this.datepipe.transform(this.entry?.checkOut, 'HH:mm:ss');

    this.isAdmin = this.loggedInUser.role === 'admin';
  }

  public save(): void {
    let checkInString = this.datepipe.transform(this.chekIn.value, 'yyyy-MM-dd') + 'T' + this.chekInTime;
    console.log(checkInString)
    this.entry.checkIn = new Date(checkInString);

    let checkOutString = this.datepipe.transform(this.chekOut.value, 'yyyy-MM-dd') + 'T' + this.chekOutTime;
    console.log(checkInString)
    this.entry.checkOut = new Date(checkOutString);
    if (this.entry?.id) {
      this.entryService.update$(this.entry).subscribe((entry) => this.entry = entry);
    } else {
      this.entryService.insert$(this.entry).subscribe((entry) => this.entry = entry)
    }
  }

  public changeCategory(category: Category): void {
    this.isOperationInProgress = true;
    if (this.entry?.category?.id === category.id) {
      return;
    }
    this.entry.category = category;

    this.isOperationInProgress = false;
  }

  public changeUser(user: User): void {
    this.isOperationInProgress = true;
    if (this.entry?.user?.id === user.id) {
      return;
    }
    this.entry.user = user;

    this.isOperationInProgress = false;
  }

  public delete(): void {
    if (!this.entry.id) {
      this.deleteEntry.emit(this.entry);
    }
    this.entryService.delete$(this.entry).subscribe(() => this.deleteEntry.emit(this.entry));
  }
}
