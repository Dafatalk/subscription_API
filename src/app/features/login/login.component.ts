import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { userService } from 'src/app/core/services/user.service';
import {TokenService} from "../../core/services/token.service";
import {SubscriptionService} from "../../core/services/subscription.service";
import {map, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any = null;
  password: any = null;
  isAdmin: boolean = false;
  userSubscriptions: Subscription[] = [];

  constructor(
    private userservice: userService,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {}

  login(username: any, password: any) {
    const newUser = {
      username: username,
      password: password
    };

    this.userservice.login(newUser).pipe(
      switchMap((response) => {
        this.tokenService.setToken(response.token);
        this.tokenService.setUserId(response.myUserId);
        this.isAdmin = response.isAdmin;

        return this.getSubscriptions();
      })
    ).subscribe(
      (subscriptionsLength) => {
        if (this.isAdmin) {
          this.router.navigate(['/subscription']);
        } else {
          console.log("Suscripciones encontradas: ", subscriptionsLength);
          if (subscriptionsLength > 0) {
            this.router.navigate(['/usersub']);
          } else {
            this.router.navigate(['/choose']);
          }
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }

  getSubscriptions() {
    const userId = localStorage.getItem("userId");
    return this.subscriptionService.getUserSubscription(userId).pipe(
      map(response => {
        this.userSubscriptions = response;
        return response.length;
      })
    );
  }
}
