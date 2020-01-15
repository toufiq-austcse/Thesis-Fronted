import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotiAllComponent } from './noti-all/noti-all.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UsersComponent } from './users/users.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ChartsModule } from 'ng2-charts';
import { SpinnerComponent } from './spinner/spinner.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import {LoginguardService} from './guards/loginguard.service';
import {DashboardguardService} from './guards/dashboardguard.service';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SenderComponent } from './inappmessage/sender/sender.component';
import { AllComponent } from './inappmessage/all/all.component';
import { DetailsComponent } from './inappmessage/details/details.component';
import { InappmessagemodalComponent } from './inappmessage/inappmessagemodal/inappmessagemodal.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ConfirmComponent } from './confirm/confirm.component';
import { ComparsionComponent } from './comparsion/comparsion.component';
import { LoadingComponent } from './loading/loading.component';
import {A11yModule} from "@angular/cdk/a11y";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    NotiAllComponent,
    AnalyticsComponent,
    UsersComponent,
    ConfirmComponent,
    SpinnerComponent,
    LoginComponent,
    TopNavComponent,
    SenderComponent,
    AllComponent,
    DetailsComponent,
    InappmessagemodalComponent,
    ConfirmComponent,
    ComparsionComponent,
    LoadingComponent,

  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    ChartsModule,
    OwlDateTimeModule,
    BrowserAnimationsModule,
    OwlNativeDateTimeModule,
    A11yModule,
  ],
  providers: [LoginguardService,DashboardguardService],
  bootstrap: [AppComponent],
  entryComponents: [ InappmessagemodalComponent,ConfirmComponent ]
})
export class AppModule { }
