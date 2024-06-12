import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/service/plan.service';
import { SubscriptionService } from 'src/service/subscription.service';
import { MatDialog } from '@angular/material/dialog';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Period } from 'src/models/period';
import { Subscription } from 'src/models/subscription';
import { Plan } from 'src/models/plan';
import { EditPlanComponent } from '../edit-plan/edit-plan.component';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  changeTab(tab: String): void {
    this.activableTab = tab;
    this.collapsedNav = false;
    this.updateTableData();
    const sub = document.getElementById('subsli');
    const plan = document.getElementById('planli');
    const period = document.getElementById('periodli');

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
  }


  /**funciones que traen los datos de los endpoints y los almacenan */

  getSubscritions(){

    this.subscriptionService.getsubscription().subscribe(

      (response) => {
        console.log('Respuesta del backend:', response);
        this.subscriptions = response
        if (this.activableTab === 'subscription') {
          this.subscriptionDataSource.data = this.subscriptions;
          this.displayedColumns = ['name', 'planName', 'startDate', 'endDate', 'period', 'status'];
          console.log("estamos AQUI y sí entró", this.subscriptionDataSource)

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
        console.log('Respuesta del backend:', response);
        this.plans = response
        if (this.activableTab === 'plan') {
          this.plansDataSource.data = this.plans;
          this.displayedColumns = ['name', 'price', 'description', 'edit', 'delet'];
          console.log("estamos AQUI y sí entró", this.plansDataSource)

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
        console.log('Respuesta del backend de los periodos:', response);
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
        this.elementoAEliminar = name;
        console.log(response)
        this.mostrarMensajeExito = true;
        this.getPlans
        // Ocultar mensaje después de un tiempo
        setTimeout(() => {
          this.mostrarMensajeExito = false;
        }, 5000); // 5000 ms = 5 segu

      },
      (error) => {
        console.error('Error al enviar la suscripción:', error);
        this.mostrarMensajeError = true;
        this.elementoAEliminar = error.error.error;
        setTimeout(() => {
          this.mostrarMensajeError = false;
        }, 5000); // 5000 ms = 5 segundos
      }
    );
  }
  deletPeriod(id:any, name:any){
    this.planService.deletPeriod(id).subscribe(

      (response) => {
        console.log("LO QUE ESTAMOS BUSCANDO DEL PERIOD" ,response)
        this.elementoAEliminar = ( "Period '" + name + "' has been deleted");

        this.mostrarMensajeExito = true;
        this.getPeriod()
        // Ocultar mensaje después de un tiempo
        setTimeout(() => {
          this.mostrarMensajeExito = false;
        }, 5000); // 5000 ms = 5 segu

      },
      (error) => {
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
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAA", dialogRef)

      if (result.success) {
        console.log('El plan fue editado con éxito', result.data);
        setTimeout(() => {
          this.elementoAEditar = result.data
          this.mostrarMensajeExitoEdit = true;
        }, 5000); // 5000 ms = 5 segu

      } else {
        // Manejar el caso de error
        console.error('Ocurrió un error:', result.error);
        setTimeout(() => {
          this.elementoAEditar = result.error
          this.mostrarMensajeErrorEdit = true;

        }, 5000); // 5000 ms = 5 segu
      }
    }, error => {
      // Manejo de cualquier otro error
      setTimeout(() => {
        this.elementoAEditar = error
        this.mostrarMensajeError = true;
      }, 5000); // 5000 ms = 5 segu
      console.error('Ocurrió un error al cerrar el diálogo:', error);
    });
  }

}
