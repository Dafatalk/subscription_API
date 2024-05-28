import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiginComponent } from './sigin/sigin.component';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { NewsubComponent } from './newsub/newsub.component';
import { Routes } from '@angular/router';

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
    NewsubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
