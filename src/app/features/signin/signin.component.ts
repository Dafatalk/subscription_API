import {Component} from '@angular/core';
import {Person} from 'src/app/core/models/person';
import {User} from 'src/app/core/models/user';
import {userService} from 'src/app/core/services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {

  name: any = null;
  lastName: any = null;
  mobileNumber: any = null;
  documentType: any = null;
  identityDocument: any = null;
  email: any = null;
  username: any = null;
  password: any = null;

  constructor(
    private userservice: userService,
    private router: Router
  ) {

  }

  sigin() {
    const user: User = {
      username: this.username,
      password: this.password
    };

    const person: Person = {
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
        this.router.navigate(['/home'])
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
      }
    );

  }
}
