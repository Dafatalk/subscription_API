import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { userService } from 'src/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;


  ngOnInit(): void {
    
  }
  constructor( private userservice:userService) {
    
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
        localStorage.setItem('jwtToken', response.token);
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
      } 
    );
  }
  
}
