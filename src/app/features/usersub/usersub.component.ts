import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SubscriptionService} from "../../core/services/subscription.service";
import {TokenService} from "../../core/services/token.service";
import {PlanService} from "../../core/services/plan.service";
import {PeriodService} from "../../core/services/period.service";

@Component({
  selector: 'app-usersub',
  templateUrl: './usersub.component.html',
  styleUrls: ['./usersub.component.css']
})

export class UsersubComponent implements OnInit {

  // endDate
  //   :
  //   "2024-07-13T13:19:51.5801909"
  // id
  //   :
  //   "0bbbbde9-ea25-439e-a7b6-c37d66bc290a"
  // periodId
  //   :
  //   "d45a7a07-0b18-4b55-95da-14ee9da8cdb3"
  // planId
  //   :
  //   "e0dbff22-4aa0-44c4-acc8-876b41efbf1a"
  // startDate
  //   :
  //   "2024-06-13T13:19:51.5801909"
  // status
  //   :
  //   "Active"
  // userId
  //   :
  //   "fa9b945b-7912-4a48-859f-b26626cb15a4"

  plan: any;
  period: any;
  subscription: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private planService: PlanService,
    private periodService: PeriodService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getSubscription()
  }

  getSubscription(): void {

    this.subscriptionService.getUserSubscription(localStorage.getItem("userId")).subscribe(
      (response) => {
        this.subscription = response[0];
        this.getPlan(response[0].planId)
        this.getPeriod(response[0].periodId)
        console.log(this.subscription);
      }
    )
  }

  getPlan(planId: any) {
    this.planService.getPlanById(planId).subscribe((response) => {
      this.plan = response;
    })
  }

  getPeriod(periodId: any) {
    this.periodService.getPeriodById(periodId).subscribe((response) => {
      this.period = response;
    })
  }

  goBack(): void {
    this.router.navigate(['/choose']);
  }

  getAmount(): any {
    return this.getDiscountedPrice() * this.period.months;
  }

  getDiscountedPrice(): any {
    return this.plan.price - (this.plan.price * (this.period.discount / 100));
  }

  cancelSubscription(subscriptionId: any): any {
    this.subscriptionService.deleteSubscription(subscriptionId);
    this.goBack()
  }

}
