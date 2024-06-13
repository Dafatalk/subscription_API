import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Period } from 'src/models/period';
import { PlanService } from 'src/service/plan.service';
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


}
