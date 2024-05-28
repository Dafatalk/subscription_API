import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/models/subscription';
import { SubscriptionService } from 'src/service/subscription.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-newsub',
  templateUrl: './newsub.component.html',
  styleUrls: ['./newsub.component.css']
})
export class NewsubComponent implements OnInit {
  httpResponse:any = null;
  subscription:Subscription = {
    userId : null,
    planId : null,
    status : null,
    startDate : null,
    endDate : null
  }

  ngOnInit(): void {
    
  }
  constructor( private subscriptionService:SubscriptionService) {
    
  }
}