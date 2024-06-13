import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { userService } from 'src/app/core/services/user.service';
import {TokenService} from "../../core/services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  errorReason: any;

  mostrarMensajeError: boolean = false;
  username: any = null;
  password: any = null;
  rememberMe: boolean = false;


  ngOnInit(): void {

  }
  constructor(
    private userservice:userService,
    private router:Router,
    private tokenService: TokenService) {

  }

  login(username:any, password:any) {
    const newUser:User ={
      username:username,
      password:password
    }
    this.userservice.login(newUser).subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        console.log('Respuesta del backend:', response);
        this.tokenService.setToken(response.token);
        this.tokenService.setUserId(response.myUserId);
        // localStorage.setItem('jwtToken', response.token);
        if(response.isAdmin){
          this.router.navigate(['/subscription'])
        }
        else{
          this.router.navigate(['/choose'])

        }
      },
      (error) => {
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

}
