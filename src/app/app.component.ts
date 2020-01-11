import { Component } from '@angular/core';
import { LoginService } from './login.service';
import {Router} from "@angular/router";
import {NavigationService} from "./navigation.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showContentClass: boolean = false;
  isShowSideBar:boolean = true;
  constructor(private router:Router,private navigationService:NavigationService) { }

  ngOnInit() {
    if(this.router.url === '/'){
      this.isShowSideBar = this.navigationService.isShowNavbar;
    }
  }

}
