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
  errorReason: any;
  mostrarMensajeError: boolean = false;
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
        this.errorReason = 'incorrect user or password'
        this.mostrarMensajeError = true
        setTimeout(() => {
          this.mostrarMensajeError = false;
        }, 5000); // 5000 ms = 5 segu
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
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
