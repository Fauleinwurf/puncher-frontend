import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entry} from "../../../shared/model/entry";
import {Category} from "../../../shared/model/category";
import {User} from "../../../shared/model/user";
import {EntryService} from "../../../shared/services/entry.service";
import {DatePipe} from "@angular/common";
import {FormControl} from "@angular/forms";
import {Project} from "../../../shared/model/project";
import {CategoryService} from "../../../shared/services/category.service";

@Component({
  selector: 'app-entry-li',
  templateUrl: './entry-li.component.html',
  styleUrls: ['./entry-li.component.css']
})
export class EntryLiComponent implements OnInit {
  @Input()
  public entry!: Entry;
  @Input()
  public categories!: Category[];
  @Input()
  public users!: User[];
  @Input()
  public loggedInUser!: User;

  @Output() deleteEntry = new EventEmitter<Entry>();
  @Output() saveEntry = new EventEmitter<Entry>();

  public chekIn: any;
  public chekOut: any;
  public chekInTime: any;
  public chekOutTime: any;
  public isAdmin: any;
  public isOperationInProgress = false;
  public projectsOfCategory: Project[] = [];

  constructor(private categoryService: CategoryService,
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

    this.updateProjectsOfCategory(this.entry?.project?.category);
  }

  public save(): void {
    let checkInString = this.datepipe.transform(this.chekIn.value, 'yyyy-MM-dd') + 'T' + this.chekInTime;
    this.entry.checkIn = new Date(checkInString);

    let checkOutString = this.datepipe.transform(this.chekOut.value, 'yyyy-MM-dd') + 'T' + this.chekOutTime;
    this.entry.checkOut = new Date();

    //Removing unnecessary attribute before save
    this.entry.user.password = "";

    this.saveEntry.emit(this.entry);
  }

  public changeCategory(category: Category): void {
    this.isOperationInProgress = true;
    if (this.entry?.project?.category?.id === category.id) {
      return;
    }
    this.entry.project = {} as  Project;
    this.entry.project.category = category;
    this.updateProjectsOfCategory(category);

    this.isOperationInProgress = false;
  }

  private updateProjectsOfCategory(category: Category): void {
    if (!category?.id){
      return;
    }
    this.categoryService.findProjectsByCategory(category.id).subscribe((projects) => {
      this.projectsOfCategory = projects;
    });
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
    this.deleteEntry.emit(this.entry);
  }

  public changeProject(project: Project): void {
    this.isOperationInProgress = true;
    if (this.entry?.project?.id === project.id) {
      return;
    }
    this.entry.project = project;

    this.isOperationInProgress = false;
  }
}
