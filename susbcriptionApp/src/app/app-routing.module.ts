import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';
import { NewplanComponent } from './newplan/newplan.component';
import { SiginComponent } from './sigin/sigin.component';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserplanComponent } from './userplan/userplan.component';
import { UsersubComponent } from "./usersub/usersub.component";

const routes: Routes = [
  { path: 'choose', component: ChooseplanComponent },
  { path: 'newPlan', component: NewplanComponent },
  { path: 'sigin', component: SiginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'userplan', component: UserplanComponent },
  { path: 'usersub', component: UsersubComponent },
  { path: '', redirectTo: '/chooseplan', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

