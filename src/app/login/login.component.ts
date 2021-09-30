import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {catchError, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/model/user";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public role: string = "";
  public error = false;
  public returnUrl = "/entries";
  public mode = 'login';

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  login(): void {
    if (this.mode === 'register') {
      let user = {password : this.password, username: this.username, role: this.role} as User;
      this.userService.insert$(user).subscribe(() => window.location.reload())
    } else {
      this.authenticationService.login(this.username, this.password)
        .pipe(
          tap((response) => {
            if (response) {
              this.router.navigate([this.returnUrl ? this.returnUrl : '/entries']);
            }
          }),
          catchError((err) => {
            this.error = true;
            throw 'error in source. Details: ' + err;
          })
        ).subscribe();
    }

  }

  saveUser($event: User) {

  }
}
