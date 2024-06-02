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
  status: string = '';
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
  createNewSub( ){
    const startDate = "2024-03-28T06:28:50.833";
    const endDate = "2024-03-28T06:28:50.833";
    const userId="8d82a7dd-dc11-4562-8ef9-bd888213550e";
    const planId = "2aee5629-fd12-4d4c-81ec-8c82e783960c";  

    const newsubscription:Subscription = {
      userId:userId,
      planId:planId,
      status:this.status,
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