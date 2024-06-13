import { Component, OnInit, Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { Plan } from 'src/app/core/models/plan';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanService } from 'src/app/core/services/plan.service';


@Component({
  selector: 'app-newplan',
  templateUrl: './newplan.component.html',
  styleUrls: ['./newplan.component.css']
})

export class NewplanComponent implements OnInit {
  closeReason: boolean = false;



  ngOnInit(): void {

  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private planservice:PlanService,
              private dialogRef: MatDialogRef<NewplanComponent>
  ) {}

  closeDialog(): void {
    this.closeReason = true;
    const updateData = { ...this.data, closeReason: this.closeReason };
    this.dialogRef.close({ success: false, data: updateData });
  }
  createPlan(name:any , price:any, description:any){
    if(name != '' && price != '' && description != ''){
      const newplan:Plan = {
        name:name,
        price:price,
        description:description
      }
      const updateData = {...this.data}
  
      this.planservice.createPlan(newplan).subscribe(
        (response) => {
          this.dialogRef.close({success: true, data:updateData})
          console.log('Respuesta del backend DE CREAR UN PLAN:', response);
        },
        (error) => {
          this.dialogRef.close({success: false, error: "error al crear el plan"})
  
          console.error('Error al enviar la suscripción:', error);
        }
      );
    }
    else{
      this.closeReason = false;
      this.dialogRef.close({success: false, error: "fill all the spaces", closeReason:this.closeReason})
      console.log("The new plan cannot be null")
    }

  }

}
