import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/service/plan.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.css']
})
export class ChooseplanComponent implements OnInit {
  plans: any [] = [];
  periods: any [] = [];
  monthly: any
  planObservables: { [name: string]: Observable<any> } = {};

  constructor(private planservice:PlanService) { }

  ngOnInit(): void {
    this.mostrar()
    this.getPeriod()
    this.createPlanObservables();
  }
  createPlanObservables() {
    for (let plan of this.plans) {
      this.planObservables[plan.name] = this.planservice.getPlanByName(plan.name);
    }
  }

  mostrar(){
    this.planservice.getPlan('annual').subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        console.log('Respuesta del backend:', response);
        this.plans = response
        this.planservice.getPlanByName('Premium').subscribe(
          (response1) => {
            // Manejar la respuesta del backend (éxito, error, etc.)
            console.log('Respuesta del backend:', response1);
            this.plans = this.plans.map((plan: any) =>({
              ...plan,
              priceMonth: response1.price
            }))
            console.log(this.plans)
          },
          (error) => {
            // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
            console.error('23Error al enviar la suscripción:', error);
          }
        );
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('23Error al enviar la suscripción:', error);
      }
    );
  }

  getPlanByName(name:any): any{
    this.planservice.getPlanByName(name).subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        console.log('Respuesta del backend:', response);
        return response.price
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('23Error al enviar la suscripción:', error);
      }
    );

  }

  getPeriod(){
    this.planservice.getPeriod().subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        console.log('Respuesta del backend:', response);
        this.periods = response
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
      }
    );
  }

  protected readonly name = name;
}


