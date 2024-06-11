import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/service/plan.service';
import { SubscriptionService } from 'src/service/subscription.service';
import { userService } from 'src/service/user.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Period } from 'src/models/period';
import { Subscription } from 'src/models/subscription';
import { Plan } from 'src/models/plan';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, AfterViewInit  {
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
  changeTab(tab:String){
    this.activableTab = tab;
    this.collapsedNav = false;
    this.updateTableData();
  }

  constructor(
    private subscriptionService:SubscriptionService,
    private planService:PlanService,
    private _liveAnnouncer: LiveAnnouncer
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
          this.displayedColumns = ['namePlan', 'price', 'description'];
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
          this.displayedColumns = ['name', 'discount', 'month'];
        }
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
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
        this.displayedColumns = ['nameplan', 'price', 'description'];
        break;
      case 'period':
        this.periodDataSource.data = this.periods;
        this.displayedColumns = ['name', 'discount', 'month'];
        break;
    }
  }

}
