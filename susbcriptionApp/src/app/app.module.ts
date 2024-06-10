import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiginComponent } from './sigin/sigin.component';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { NewsubComponent } from './newsub/newsub.component';
import { Routes } from '@angular/router';
import { FormsModule} from "@angular/forms";
import { AppHttpInterceptor } from './http.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const appRoutes: Routes=[
  {path: 'sigin', component: SiginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'subs', component: SubscriptionComponent},
  {path: 'new', component: NewsubComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    SiginComponent,
    LoginComponent,
    SubscriptionComponent,
    NewsubComponent,
    ChooseplanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080', 'localhost:4200'], // Agrega los dominios permitidos para las solicitudes
        disallowedRoutes: ['http://example.com/examplebadroute/'], // Rutas que no deben incluir el token
      },
    }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
