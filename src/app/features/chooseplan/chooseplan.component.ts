import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlanService} from 'src/service/plan.service';
import {Observable} from "rxjs";

export interface Period {
  name: string;
  discount: number;
  months: number;
}

@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.css']
})

export class ChooseplanComponent implements OnInit {
  plans: any [] = [];
  periods: any [] = [];
  period: any = this.periods[0]
  showLoading: boolean = true;

  planObservables: { [name: string]: Observable<any> } = {};
  activePeriodIndex: number | null = null;

  constructor(private planservice: PlanService, private router: Router) {
  }

  ngOnInit(): void {
    this.getPeriod()
    this.mostrar(this.period)
    this.createPlanObservables();
  }
  selectPlan(plan: any): void {
    this.router.navigate(['/usersub'], { state: { plan: plan, period: this.period } });
  }

  setActivePeriod(period: Period, index: number) {
    this.showLoading = true;
    this.mostrar(period);
    this.activePeriodIndex = index;
  }

  createPlanObservables() {
    for (let plan of this.plans) {
      this.planObservables[plan.name] = this.planservice.getPlanByName(plan.name);
    }
  }

  mostrar(period: any) {
    if (period != null) {
      console.log(period);
      this.planservice.getPlan(period.name).subscribe(
        (response) => {
          this.plans = response
          this.setPeriod(period)
          this.showLoading = false;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  getPeriod() {
    this.planservice.getPeriod().subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        console.log('Respuesta del backend:', response);
        this.periods = response
        if (this.periods.length > 0) {
          this.setActivePeriod(this.periods[0], 0);
        }
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
      }
    );
  }

  setPeriod(period: any): void {
    this.period = period
  }



  protected readonly name = name;
}


