import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanService } from 'src/app/core/services/plan.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { MatDialog } from '@angular/material/dialog';
import {AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Period } from 'src/app/core/models/period';
import { Subscription } from 'src/app/core/models/subscription';
import { Plan } from 'src/app/core/models/plan';
import { EditPlanComponent } from '../edit-plan/edit-plan.component';
import { EditPeriodComponent } from '../edit-period/edit-period.component';
import { NewperiodComponent } from '../newperiod/newperiod.component';
import { NewplanComponent } from '../newplan/newplan.component';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, AfterViewInit  {

  /**mensajes emergentes */
  elementoAEliminar: any;
  elementoAEditar : any;
  mostrarMensajeExito: boolean = false;
  mostrarMensajeError: boolean = false;
  mostrarMensajeExitoEdit: boolean = false;
  mostrarMensajeErrorEdit: boolean = false;
  /** matricez que se usan para guardar los datos del endpoint */
  subscriptions: Subscription[] = [];
  plans: Plan[] = [];
  periods: Period [] = [];
  /**variables que uso para la tabla buena */
  subscriptionDataSource = new MatTableDataSource ();
  plansDataSource = new MatTableDataSource ();
  periodDataSource = new MatTableDataSource ();

  displayedColumns: string[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  /** configuración de la barra de navegación */


  collapsedNav = false;
  activableTab: String ='subscription';
  collapse(): void {
    this.collapsedNav = !this.collapsedNav;
  }
  NoButton(){
    const btnCrear = document.getElementById('btnCrear');

    if(this.activableTab == "subscription" && btnCrear){
      btnCrear.style.display = 'none';

    }
    if(btnCrear && this.activableTab != 'subscription'){
      btnCrear.style.display = 'flex';

    }
  }
  changeTab(tab: String): void {
    this.activableTab = tab;
    this.updateTableData();
    const sub = document.getElementById('subsli');
    const plan = document.getElementById('planli');
    const period = document.getElementById('periodli');
    this.NoButton()


    if (sub && plan && period) {
      // Reiniciar el color de todas las pestañas
      sub.style.color = '#ffffff';
      plan.style.color = '#ffffff';
      period.style.color = '#ffffff';

      // Establecer el color azul para la pestaña activa
      if (tab === 'subscription') {
        sub.style.color = '#18A7E1';
      } else if (tab === 'plan') {
        plan.style.color = '#18A7E1';
      } else if (tab === 'period') {
        period.style.color = '#18A7E1';
      }
    }
  }


  constructor(
    private subscriptionService:SubscriptionService,
    private planService:PlanService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.getSubscritions();
    this.getPlans();
    this.getPeriod();
    this.updateTableData();
    this.NoButton()
  }


  /**funciones que traen los datos de los endpoints y los almacenan */

  getSubscritions(){

    this.subscriptionService.getsubscription().subscribe(

      (response) => {
        this.subscriptions = response
        if (this.activableTab === 'subscription') {
          this.subscriptionDataSource.data = this.subscriptions;
          this.displayedColumns = ['name', 'planName', 'startDate', 'endDate', 'period', 'status'];

        }

      },
      (error) => {
        console.error('Error al enviar la suscripción:', error);
      }
    );
  }
  getPlans(){

    this.planService.getPlan('monthly').subscribe(
      (response) => {
        this.plans = response
        console.log("QUE ME ESTA DANDO ERROR",response)
        if (this.activableTab === 'plan') {
          this.plansDataSource.data = this.plans;
          this.displayedColumns = ['name', 'price', 'description', 'edit', 'delet'];

        }
      },
      (error) => {
        console.error('Error al enviar la suscripción:', error);
      }
    );
  }
  getPeriod(){
    this.planService.getPeriod().subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        this.periods = response
        if (this.activableTab === 'period') {
          this.periodDataSource.data = this.periods;
          this.displayedColumns = ['name', 'discount', 'month', 'edit', 'delet'];
        }
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
      }
    );
  }
  /**funciones que editan y eliminan */
  deletPlan(id:any, name:any){
    this.planService.deletPlan(id).subscribe(
      (response) => {
        console.log("CUANDO SE ELIMINA UN PLAN:",response)
        this.elementoAEliminar = name;
        this.mostrarMensajeExito = true;
        this.getPlans();
        // Ocultar mensaje después de un tiempo
        setTimeout(() => {
          this.mostrarMensajeExito = false;
        }, 5000); // 5000 ms = 5 segu

      },
      (error) => {
        this.getPlans();

        console.error('Error al eliminar el plan:', error);
        this.mostrarMensajeError = true;
        this.elementoAEliminar = "This plan cannot be deleted because there are active subscriptions that depend on it.";
        setTimeout(() => {
          this.mostrarMensajeError = false;
        }, 5000); // 5000 ms = 5 segundos
      }
    );
  }
  deletPeriod(id:any, name:any){
    this.planService.deletPeriod(id).subscribe(

      (response) => {
        console.log("CUANDO SE ELIMINA UN PERIOD:",response)

        this.elementoAEliminar = ( "Period '" + name + "' has been deleted");

        this.mostrarMensajeExito = true;
        this.getPeriod();
        setTimeout(() => {
          this.mostrarMensajeExito = false;
        }, 5000); // 5000 ms = 5 segu

      },
      (error) => {
        this.getPeriod();
        console.error('Error al enviar la suscripción:', error);
        this.mostrarMensajeError = true;
        this.elementoAEliminar = error.error;
        setTimeout(() => {
          this.mostrarMensajeError = false;
        }, 5000); // 5000 ms = 5 segundos
      }
    );
  }

  /* TABLAS DE MATERIAL */






  ngAfterViewInit() {
    this.subscriptionDataSource.sort = this.sort;
    this.plansDataSource.sort = this.sort;
    this.periodDataSource.sort = this.sort;


  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  updateTableData(): void {
    switch (this.activableTab) {
      case 'subscription':
        this.subscriptionDataSource.data = this.subscriptions;
        this.displayedColumns = [ 'name', 'planName', 'startDate', 'endDate', 'period', 'status'];
        break;
      case 'plan':
        this.plansDataSource.data = this.plans;
        this.displayedColumns = ['name', 'price', 'description', 'edit', 'delet'];
        break;
      case 'period':
        this.periodDataSource.data = this.periods;
        this.displayedColumns = ['name', 'discount', 'month', 'edit', 'delet'];
        break;
    }
  }
  /**TABLAS EMERGENTE */
  editPlan(element: Plan): void {
    const dialogRef = this.dialog.open(EditPlanComponent, {
      width: '30%',
      height: '90%',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPlans();
      if(result.data.closeReason  ){
        console.log("closed correctly")
      }
      else if (result.success) {
        console.log("LO DEL CLOSEEE" ,result.data.closeReason)
        this.elementoAEditar = result.data.name
        this.mostrarMensajeExitoEdit = true;
        result.data.closeReason = false;
        this.getPlans();
        setTimeout(() => {
          this.mostrarMensajeExitoEdit = false;
        }, 5000); // 5000 ms = 5 segu

      } else {
        // Manejar el caso de error
        this.getPlans();

        console.error('Ocurrió un error:', result.error);
        this.elementoAEditar = result.error
        this.mostrarMensajeErrorEdit = true;
        result.data.closeReason = false;
        setTimeout(() => {
          this.mostrarMensajeErrorEdit = false;

        }, 5000); // 5000 ms = 5 segu
      }
    }, error => {
      this.elementoAEditar = error
      this.getPlans();

      setTimeout(() => {
        this.mostrarMensajeError = true;
      }, 5000); // 5000 ms = 5 segu
      console.error('Ocurrió un error al cerrar el diálogo:', error);
    });
  }

  editPeriod(element: Period): void {
    const dialogRef = this.dialog.open(EditPeriodComponent, {
      width: '30%',
      height: '90%',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.data.closeReason){
        console.log("closed correctly")
      }


      else if (result.success) {
        this.elementoAEditar = result.data.name
        this.mostrarMensajeExitoEdit = true;
        result.data.closeReason = false;
        this.getPeriod();
        setTimeout(() => {
          this.mostrarMensajeExitoEdit = false;
        }, 5000); // 5000 ms = 5 segu


      } else {
        // Manejar el caso de error
        this.elementoAEditar = result.error
        this.mostrarMensajeErrorEdit = true;
        result.data.closeReason = false;
        this.getPeriod();
        setTimeout(() => {
          this.mostrarMensajeErrorEdit = false;

        }, 5000); // 5000 ms = 5 segu
      }
    }, error => {
      this.elementoAEditar = error
      this.getPeriod();
      setTimeout(() => {
        this.mostrarMensajeError = true;
      }, 5000); // 5000 ms = 5 segu
      console.error('Ocurrió un error al cerrar el diálogo:', error);
    });
  }
  createPeriod(): void {
    const dialogRef = this.dialog.open(NewperiodComponent, {
      width: '30%',
      height: '90%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPeriod();
      if(result.data.closeReason){
        console.log("closed correctly")
      }


      else if (result.success) {
        this.elementoAEditar = result.data.name
        this.mostrarMensajeExitoEdit = true;
        result.data.closeReason = false;
        setTimeout(() => {
          this.mostrarMensajeExitoEdit = false;
        }, 5000); // 5000 ms = 5 segu


      } else {
        // Manejar el caso de error
        this.elementoAEditar = result.error
        this.mostrarMensajeErrorEdit = true;
        result.data.closeReason = false;
        this.getPeriod();
        setTimeout(() => {
          this.mostrarMensajeErrorEdit = false;

        }, 5000); // 5000 ms = 5 segu
      }
    }, error => {
      this.elementoAEditar = error
      this.getPeriod();
      setTimeout(() => {
        this.mostrarMensajeError = true;
      }, 5000); // 5000 ms = 5 segu
      console.error('Ocurrió un error al cerrar el diálogo:', error);
    });
  }
  createPlan(): void {
    const dialogRef = this.dialog.open(NewplanComponent, {
      width: '30%',
      height: '90%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPlans();

      if(result.data.closeReason){
        console.log("closed correctly")
      }


      else if (result.success) {
        console.log(result)
        this.elementoAEditar = result.data.name
        this.mostrarMensajeExitoEdit = true;
        result.data.closeReason = false;
        setTimeout(() => {
          this.mostrarMensajeExitoEdit = false;
        }, 5000); // 5000 ms = 5 segu


      } else {
        // Manejar el caso de error
        this.elementoAEditar = result.error
        this.mostrarMensajeErrorEdit = true;
        result.data.closeReason = false;
        setTimeout(() => {
          this.mostrarMensajeErrorEdit = false;

        }, 5000); // 5000 ms = 5 segu
      }
    }, error => {
      this.elementoAEditar = error
      setTimeout(() => {
        this.mostrarMensajeError = true;
      }, 5000); // 5000 ms = 5 segu
      console.error('Ocurrió un error al cerrar el diálogo:', error);
    });
  }

  createany(){

    if(this.activableTab == 'plan'){
      this.createPlan()
    }
    if(this.activableTab == 'period'){
      this.createPeriod()
    }
  }
}
