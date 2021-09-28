import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public error: boolean | undefined;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authenticationService.login(this.username, this.password)
      .pipe(
        tap((response) => {
          if (response){
            this.router.navigate([''])
          }
        })
  ).subscribe();
    this.error = true;
  }
}
