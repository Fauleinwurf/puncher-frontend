import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/model/user";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {tap} from "rxjs/operators";
import {Project} from "../../shared/model/project";
import {ProjectService} from "../../shared/services/project.service";
import {forkJoin, Observable} from "rxjs";
import {CategoryService} from "../../shared/services/category.service";
import {Category} from "../../shared/model/category";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public projects: Project[] = [];
  public categories: Category[] = [];
  public loggedInUser: User | any;

  constructor(
    private authenticationService: AuthenticationService,
    private projectService: ProjectService,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    forkJoin([
      this.loadProjects(),
      this.loadCategories()
    ]).subscribe();
    this.loggedInUser = this.authenticationService.getLoggedUser();
  }

  private loadCategories() {
    return this.categoryService.findAll$().pipe(
      tap((categories) => this.categories = categories)
    );
  }

  private loadProjects(): Observable<Project[]> {
    return this.projectService.findAll$().pipe(
      tap((projects) => this.projects = projects)
    );

  }

  public addProject(): void {
    let project = {} as Project;
    project.title = " ";
    this.projects.unshift(project);
  }

  public changeCategory(project: Project, category: Category): void {
    if (project?.category?.id === category.id) {
      return;
    }
    let itemIndex = this.projects.indexOf(project);
    this.projects[itemIndex].category = category;
  }

  public save(projectToSave: Project): void {
    if (projectToSave?.id) {
      this.projectService.update$(projectToSave).subscribe((project) => projectToSave = project);
    } else {
      this.projectService.insert$(projectToSave).pipe(
        tap((project) => {
          projectToSave = project;
          let itemIndex = this.projects.findIndex((project) => project === projectToSave);
          this.projects[itemIndex + 1] = projectToSave;
        })
      ).subscribe()
    }
  }

  private removeFromCategories(projectToRemove: Project): void {
    let itemIndex = this.projects.indexOf(projectToRemove);
    this.projects.splice(itemIndex, 1);
  }

  public delete(project: Project): void {
    this.projectService.delete$(project).subscribe(() => this.removeFromCategories(project));
  }
}
