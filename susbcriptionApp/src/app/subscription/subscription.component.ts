import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/service/plan.service';
import { SubscriptionService } from 'src/service/subscription.service';
import { userService } from 'src/service/user.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
subscriptions: any[] = [];
plans: any[] = [];

  constructor( private subscriptionService:SubscriptionService, private planService:PlanService) { }
  public rowVisibility: boolean[] = new Array(this.subscriptions.length).fill(false);
  collapsedNav = false;
  activableTab: String ='subscription';
  collapse(): void {
    this.collapsedNav = !this.collapsedNav; 
  }
  displayTab(): string {

    return 'users'; 
  }
  changeTab(tab:String){
    this.activableTab = tab;
    this.collapsedNav = false;
 /*   if(this.activableTab == 'plan'){
      this.getPlans();
    }
    if(this.activableTab = 'subscription'){
      this.getSubscritions();
    }*/
  }

  ngOnInit(): void {
this.getSubscritions();
this.getPlans();
  }
  getSubscritions(){
    
    this.subscriptionService.getsubscription().subscribe(
      (response) => {
        console.log('Respuesta del backend:', response);
        this.subscriptions = response

      },
      (error) => {
        console.error('Error al enviar la suscripción:', error);
      }
    );
  }

  getPlans(){
    
    this.planService.getPlan().subscribe(
      (response) => {
        console.log('Respuesta del backend:', response);
        this.plans = response

      },
      (error) => {
        console.error('Error al enviar la suscripción:', error);
      }
    );
  }

}
