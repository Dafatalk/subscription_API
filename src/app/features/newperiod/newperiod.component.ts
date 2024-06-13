import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Period } from 'src/app/core/models/period';
import { PlanService } from 'src/app/core/services/plan.service';
@Component({
  selector: 'app-newperiod',
  templateUrl: './newperiod.component.html',
  styleUrls: ['./newperiod.component.css']
})
export class NewperiodComponent implements OnInit {
  closeReason: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private planservice:PlanService,
              private dialogRef: MatDialogRef<NewperiodComponent>
  ) {}
  ngOnInit(): void {
  }
  closeDialog(): void {
    this.closeReason = true;
    const updateData = { ...this.data, closeReason: this.closeReason };
    this.dialogRef.close({ success: false, data: updateData });
  }


  createPeriod(name:any , discount:any, months:any){
    if(name != '' && discount != '' && months != ''){
      const newPeriod:Period = {
        name:name,
        discount:discount,
        months:months
      }
      const updateData = {...this.data}
  
      this.planservice.createPeriod(newPeriod).subscribe(
        (response) => {
          this.dialogRef.close({success: true, data:updateData})
          console.log('Respuesta del backend DE CREAR UN PERIODO:', response);
        },
        (error) => {
          this.dialogRef.close({success: false, error: "error al CREAR el PERIODO"})
  
          console.error('Error al enviar el periodo:', error);
        }
      );
    }
    else{
      this.closeReason = false;
      this.dialogRef.close({success: false, error: "fill all the spaces", closeReason:this.closeReason})
      console.log("The new period cannot be null")

    }


  }


}
