import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plan } from 'src/models/plan';
import { PlanService } from 'src/service/plan.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private planservice:PlanService,
  private dialogRef: MatDialogRef<EditPlanComponent>
) {}

  ngOnInit(): void {
  }

  editPlan(id:any ,name:any , price:any, description:any){

    const newplan:any = {
      id:id,
      name:name,
      price:price,  
      description:description
    }
    const updateData = {...this.data}

        this.planservice.editPlan(newplan).subscribe(
      (response) => {
        this.dialogRef.close({success: true, data:updateData})
        console.log('Respuesta del backend:', response);
      },
      (error) => {
        this.dialogRef.close({success: false, error: "error al editar el plan"})

        console.error('Error al enviar la suscripción:', error);
      }
    );
  }
}
