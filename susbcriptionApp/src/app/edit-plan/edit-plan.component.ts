import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Plan } from 'src/models/plan';
import { PlanService } from 'src/service/plan.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private planservice:PlanService) {}

  ngOnInit(): void {
  }

  editPlan(name:any , price:any, description:any){

    const newplan:Plan = {
      name:name,
      price:price,
      description:description
    }
    

        this.planservice.editPlan(newplan).subscribe(
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
