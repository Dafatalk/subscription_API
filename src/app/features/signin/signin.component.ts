import { Component } from '@angular/core';
import { Person } from 'src/models/person';
import { User } from 'src/models/user';
import { userService } from 'src/service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  name: string = '';
  lastName: string = '';
  mobileNumber: string = '';
  documentType: string = '';
  identityDocument: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  constructor( private userservice:userService) {

  }
  sigin() {
    const user:User = {
      username: this.username,
      password: this.password
    };

    const person:Person = {
      name: this.name,
      lastName: this.lastName,
      mobileNumber: this.mobileNumber,
      documentType: this.documentType,
      identityDocument: this.identityDocument,
      email: this.email
    };

    const userAndPerson = {
      user,
      person
    };
    this.userservice.register(userAndPerson).subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        console.log('Respuesta del backend:', response);
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
      }
    );

  }
}
