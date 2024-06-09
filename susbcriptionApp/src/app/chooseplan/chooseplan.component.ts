import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/service/plan.service';

@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.css']
})
export class ChooseplanComponent implements OnInit {

  constructor(private planservice:PlanService) { }

  ngOnInit(): void {
  }

  mostrar(){
    this.planservice.getPlan().subscribe(
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
