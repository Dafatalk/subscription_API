import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlanService} from 'src/app/core/services/plan.service';
import {Observable} from "rxjs";
import {tokenGetter} from "../../app.module";
import {SubscriptionService} from "../../core/services/subscription.service";
import {TokenService} from "../../core/services/token.service";
import {SubscriptionRequest} from "../../core/models/subscriptionRequest";

export interface Period {
  name: string;
  discount: number;
  months: number;
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  subscriptionRequest: SubscriptionRequest = {
    userId: null,
    planId: null,
    period: null
  };

  planObservables: { [name: string]: Observable<any> } = {};
  activePeriodIndex: number | null = null;

  constructor(
    private planservice: PlanService,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.getPeriod()
    this.mostrar(this.period)
    this.createPlanObservables();
    console.log(tokenGetter())
  }
  selectPlan(plan: any): void {
    this.router.navigate(['/usersub'], { state: { plan: plan, period: this.period } });
  }

  setActivePeriod(period: Period, index: number) {
    this.showLoading = true;
    this.mostrar(period);
    this.period = period
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
        console.error('Error al enviar la suscripción:', error);
      }
    );
  }

  setPeriod(period: any): void {
    this.period = period
  }

  async createSubscription(planId: any, period: any): Promise<void> {

    this.subscriptionRequest.userId = localStorage.getItem("userId");
    this.subscriptionRequest.planId = planId;
    this.subscriptionRequest.period = period.name;

    console.log(this.subscriptionRequest);
    this.subscriptionService.createSubscription(this.subscriptionRequest).subscribe(
      (response) => {
        console.log(response)
      }
    );

    await wait(1000);
    this.router.navigate(['/usersub']);

  }

  protected readonly name = name;

}


