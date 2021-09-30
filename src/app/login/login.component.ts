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
  public returnUrl = "/entries";

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  login(): void {
    this.authenticationService.login(this.username, this.password)
      .pipe(
        tap((response) => {
          if (response){
            this.router.navigate([this.returnUrl ? this.returnUrl: '/entries']);
          }
        })
  ).subscribe();
    this.error = true;
  }
}
