import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardguardService} from './guards/dashboardguard.service';
import {ComparsionComponent} from "./comparsion/comparsion.component";
import { NotiAllComponent } from './noti-all/noti-all.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UsersComponent } from './users/users.component';
import { LoadingComponent } from './loading/loading.component';
import { SenderComponent } from './inappmessage/sender/sender.component';
import { AllComponent } from './inappmessage/all/all.component';
import { DetailsComponent } from './inappmessage/details/details.component';
import {LoginComponent} from "./login/login.component";

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
