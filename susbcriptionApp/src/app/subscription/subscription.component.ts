import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/service/subscription.service';
import { userService } from 'src/service/user.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
subscriptions: any[] = [];
  constructor( private subscriptionService:SubscriptionService, private userService:userService) { }
  infoVisible = false;
  public rowVisibility: boolean[] = new Array(this.subscriptions.length).fill(false);


  toggleInfo(): void {
    this.infoVisible = !this.infoVisible;
  }

  getUserAndPerson(id:any){
        
    this.userService.getOnePerson(id).subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        console.log('Respuesta del backend:', response);
        this.userService.getOneUser(response.id).subscribe(
          (responseUser) => {
            // Manejar la respuesta del backend (éxito, error, etc.)
            console.log('Respuesta del backend:', responseUser);
    
          },
          (error) => {
            // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
            console.error('Error al traer al usuario:', error);
          }
        );
      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar a la persona:', error);
      }
    );
  }
  
  ngOnInit(): void {
this.getSubscritions();
  }
  getSubscritions(){
    
    this.subscriptionService.getsubscription("8d82a7dd-dc11-4562-8ef9-bd888213550e").subscribe(
      (response) => {
        // Manejar la respuesta del backend (éxito, error, etc.)
        console.log('Respuesta del backend:', response);
        this.subscriptions = response.map((suscripcion: any) => ({
          ...suscripcion,
          infoinvisible: false // Agrega el atributo infoinvisible con valor false
        }))
        console.log(this.subscriptions)

      },
      (error) => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al enviar la suscripción:', error);
      }
    );
  }

}
