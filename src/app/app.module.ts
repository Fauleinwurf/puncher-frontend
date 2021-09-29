import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EntryListComponent} from './entry-table/entry-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptor} from "../shared/jwt-interceptor";
import {ErrorInterceptor} from "../shared/error-interceptor";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatSelectModule} from "@angular/material/select";
import {DatePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {NavbarComponent} from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {EntryLiComponent} from './entry-table/entry-li/entry-li.component';
import { UserComponent } from './user/user.component';
import { UserCardComponent } from './user/user-card/user-card.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryListComponent,
    LoginComponent,
    NavbarComponent,
    EntryLiComponent,
    UserComponent,
    UserCardComponent,
    CategoryListComponent,
    ProjectListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonToggleModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
