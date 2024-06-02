import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChooseplanComponent } from '../../susbcriptionApp/src/app/chooseplan/chooseplan.component';
import { UserplanComponent } from '../../susbcriptionApp/src/app/userplan/userplan.component';

@NgModule({
  declarations: [
    AppComponent,
    ChooseplanComponent,
    UserplanComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
