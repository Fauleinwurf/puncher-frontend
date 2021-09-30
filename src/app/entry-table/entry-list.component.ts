import {Component, OnInit} from '@angular/core';
import {Entry} from "../../shared/model/entry";
import {EntryService} from "../../shared/services/entry.service";
import {tap} from "rxjs/operators";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {CategoryService} from "../../shared/services/category.service";
import {Category} from "../../shared/model/category";
import {forkJoin, Observable} from "rxjs";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/model/user";
import {ProjectService} from "../../shared/services/project.service";

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  public loggedInUser: any;
  public categories: any;
  public users: any;
  public entries: Entry[] = [];

  constructor(private entryService: EntryService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private projectService: ProjectService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    forkJoin([
      this.getCategories(),
      this.getEntries(),
      this.getUsers()
    ]).subscribe()

    this.loggedInUser = this.authenticationService.getLoggedUser();
  }

  private getCategories(): Observable<Category[]> {
    return this.categoryService.findAll$().pipe(
      tap((categories) => this.categories = categories)
    );
  }

  private getEntries(): Observable<Entry[]> {
    return this.entryService.findAll$().pipe(
      tap((entries) => this.entries = entries)
    );
  }

  private getUsers(): Observable<User[]> {
    return this.userService.findAll$().pipe(
      tap((users) => this.users = users)
    );
  }

  public addEntry():void {
    this.entries.unshift({} as Entry);
  }

  public saveEntry(entryToSave: Entry) {
    if (entryToSave?.id) {
      this.entryService.update$(entryToSave).subscribe((entry) => entryToSave = entry);
    } else {
      entryToSave.project.id = 1;
      this.entryService.insert$(entryToSave).pipe(
        tap((entry) => {
          entryToSave = entry;
          let itemIndex = this.entries.findIndex(entry => entry === entryToSave);
          this.entries[itemIndex + 1] = entryToSave;
        })
      ).subscribe()
      }
  }

  public deleteEntry(entry: Entry): void {
    if (entry.id) {
      this.entryService.delete$(entry).subscribe();
    }
    let itemIndex = this.entries.indexOf(entry);
    this.entries.splice(itemIndex, 1);
  }
}
