import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';
import { NewsubComponent } from './newsub/newsub.component';
import { SiginComponent } from './sigin/sigin.component';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserplanComponent } from './userplan/userplan.component';

const routes: Routes = [
  { path: 'choose', component: ChooseplanComponent },
  { path: 'newPlan', component: NewsubComponent },
  { path: 'sigin', component: SiginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'userplan', component: UserplanComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }

