import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/model/category";
import {User} from "../../shared/model/user";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {CategoryService} from "../../shared/services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] | any;
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

  public save(unsavedCategory: Category): void {
    if (unsavedCategory?.id) {
      this.categoryService.update$(unsavedCategory).subscribe((category) => unsavedCategory = category);
    } else {
      this.categoryService.insert$(unsavedCategory).subscribe((category) => unsavedCategory = category)
    }
  }

  private removeFromCategories(category: Category): void{

  }

  public delete(category: Category):void {
    this.categoryService.delete$(category).subscribe(() => this.removeFromCategories(category));
  }
}
