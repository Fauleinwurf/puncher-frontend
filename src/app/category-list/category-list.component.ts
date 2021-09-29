import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/model/category";
import {User} from "../../shared/model/user";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {CategoryService} from "../../shared/services/category.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  public loggedInUser: User | any;

  constructor(
    private authenticationService: AuthenticationService,
    private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.findAll$().subscribe((categories) => this.categories = categories);
    this.loggedInUser = this.authenticationService.getLoggedUser();
  }

  public addCategory(): void {
    this.categories.unshift({} as Category);
  }

  public save(categoryToSave: Category): void {
    if (categoryToSave?.id) {
      this.categoryService.update$(categoryToSave).subscribe((category) => categoryToSave = category);
    } else {
      this.categoryService.insert$(categoryToSave).pipe(
        tap( (category) =>{
          categoryToSave = category;
          let itemIndex = this.categories.findIndex((category) => category === categoryToSave);
          this.categories[itemIndex + 1] = categoryToSave;
        })
      ).subscribe()
    }
  }

  private removeFromCategories(categoryToRemove: Category): void{
    let itemIndex = this.categories.indexOf(categoryToRemove);
    this.categories.splice(itemIndex,1);
  }

  public delete(category: Category):void {
    this.categoryService.delete$(category).subscribe(() => this.removeFromCategories(category));
  }
}
