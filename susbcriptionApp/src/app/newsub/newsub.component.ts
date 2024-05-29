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
  createNewSub(userId:any, planId:any, status:any){
    const startDate = Date.now;
    const endDate = Date.now
    const newsubscription:Subscription = {
      userId:userId,
      planId:planId,
      status:status,
      startDate:startDate,
      endDate:endDate
    }

        this.subscriptionService.createSubscription(newsubscription).subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        console.log('Respuesta del backend:', response);
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
      }
    );

   }
}