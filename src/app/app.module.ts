import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiginComponent } from './sigin/sigin.component';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { NewplanComponent } from './newplan/newplan.component';
import { Routes } from '@angular/router';
import { FormsModule} from "@angular/forms";
import { AppHttpInterceptor } from './http.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';
import { UserplanComponent } from './userplan/userplan.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { EditPeriodComponent } from './edit-period/edit-period.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersubComponent } from './usersub/usersub.component';
import { HeaderbarComponent } from './util/headerbar/headerbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const appRoutes: Routes=[
  {path: 'sigin', component: SiginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'subs', component: SubscriptionComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    SiginComponent,
    LoginComponent,
    SubscriptionComponent,
    NewplanComponent,
    ChooseplanComponent,
    UserplanComponent,
    EditPlanComponent,
    EditPeriodComponent,
    ChooseplanComponent,
    UsersubComponent,
    HeaderbarComponent
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
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
