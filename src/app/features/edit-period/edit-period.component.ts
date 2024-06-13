import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanService } from 'src/app/core/services/plan.service';

@Component({
  selector: 'app-edit-period',
  templateUrl: './edit-period.component.html',
  styleUrls: ['./edit-period.component.css']
})
export class EditPeriodComponent implements OnInit {
  closeReason: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private planservice:PlanService,
              private dialogRef: MatDialogRef<EditPeriodComponent>
  ) {}
  ngOnInit(): void {
  }
  closeDialog(): void {
    this.closeReason = true;
    const updateData = { ...this.data, closeReason: this.closeReason };
    this.dialogRef.close({ success: false, data: updateData });
  }
  editPeriod(id:any ,name:any , discount:any, months:any){

    const newPeriod:any = {
      id:id,
      name:name,
      discount:discount,
      months:months
    }
    const updateData = {...this.data}

    this.planservice.editPeriod(newPeriod).subscribe(
      (response) => {
        this.dialogRef.close({success: true, data:updateData})
        console.log('Respuesta del backend DE EDITAR UN PERIODO:', response);
      },
      (error) => {
        this.dialogRef.close({success: false, error: "error al EDITAR el PERIODO"})

        console.error('Error al enviar la periodo:', error);
      }
    );
  }


}
