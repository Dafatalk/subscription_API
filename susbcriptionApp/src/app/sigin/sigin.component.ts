import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  lastName: string = '';
  mobileNumber: string = '';
  documentType: string = '';
  identityDocument: string = '';
  email: string = '';

  register() {
    // Aquí puedes manejar la lógica de registro
    console.log(this.name, this.lastName, this.mobileNumber, this.documentType, this.identityDocument, this.email);
  }
}

