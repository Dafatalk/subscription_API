import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseplanComponent } from './features/chooseplan/chooseplan.component';
import { NewplanComponent } from './features/newplan/newplan.component';
import { SigninComponent } from './features/signin/signin.component';
import { LoginComponent } from './features/login/login.component';
import { SubscriptionComponent } from './features/subscription/subscription.component';
import { UserplanComponent } from './features/userplan/userplan.component';
import { UsersubComponent } from "./features/usersub/usersub.component";
import {HomeComponent} from "./features/home/home.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'choose', component: ChooseplanComponent },
  { path: 'newPlan', component: NewplanComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'login', component: LoginComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'userplan', component: UserplanComponent },
  { path: 'usersub', component: UsersubComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

