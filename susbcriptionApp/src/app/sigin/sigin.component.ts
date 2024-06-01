import { Component } from '@angular/core';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent {
  name: string = '';
  lastName: string = '';
  mobileNumber: string = '';
  documentType: string = '';
  identityDocument: string = '';
  email: string = '';

  sigin() {
    // Aquí puedes manejar la lógica de registro
    console.log(this.name, this.lastName, this.mobileNumber, this.documentType, this.identityDocument, this.email);
  }
}

