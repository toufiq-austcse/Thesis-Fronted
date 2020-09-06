import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ComparsionComponent } from "./comparsion/comparsion.component";
import { AllComponent } from './inappmessage/all/all.component';
import { LoginComponent } from "./login/login.component";
import { NotiAllComponent } from './noti-all/noti-all.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', component: AllComponent},
  {path: 'analytis', component: LoginComponent,
  children:[
    {path: 'datasetcomperison', component: ComparsionComponent},
    {path: 'zilabasedcompersion', component: AnalyticsComponent},
    {path: 'monthbasedcompersion', component: NotiAllComponent},
    {path: 'yearrangecompersion', component: UsersComponent},
  ]},



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
