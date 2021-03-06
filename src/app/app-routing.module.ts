import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {EntryListComponent} from "./entry-table/entry-list.component";
import {AuthGuard} from "../shared/auth-guard";
import {UserComponent} from "./user/user.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {ProjectListComponent} from "./project-list/project-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'entries', pathMatch: 'full'},
  {path: 'users', component: UserComponent,canActivate: [AuthGuard]},
  {path: 'entries', component: EntryListComponent, canActivate: [AuthGuard]},
  {path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard]},
  {path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},


  {path: '**', redirectTo: 'entries'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
