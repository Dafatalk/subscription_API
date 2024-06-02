import { Component, OnInit, Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/models/plan';
import { PlanService } from 'src/service/plan.service';
@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
      const input = event.target as HTMLInputElement;
      const value = input.value;

      // Elimina cualquier carácter que no sea un número
      input.value = value.replace(/[^0-9]/g, '');
  }
}

@Component({
  selector: 'app-newsub',
  templateUrl: './newsub.component.html',
  styleUrls: ['./newsub.component.css']
})

export class NewsubComponent implements OnInit {
  httpResponse:any = null;



  ngOnInit(): void {
    
  }
    constructor( private planservice:PlanService) {
      
    }
  createNewPlan(name:any, price:any, period:any, description:any ){
    console.log(name, price, period, description)

    const newplan:Plan = {
      name:name,
      price:price,
      period:period,
      description:description
    }
    

        this.planservice.createPlan(newplan).subscribe(
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