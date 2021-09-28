import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {User} from "../../shared/model/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user!: User;

  constructor(private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getLoggedUser();
  }

  public logout():void {
    this.authenticationService.logout();
  }
}
