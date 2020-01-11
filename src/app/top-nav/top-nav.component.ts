import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  isShowSidebar: boolean = false;
  constructor(public loginService: LoginService) { }

  ngOnInit() {
    if (this.loginService.isLoggedIn()){
      this.isShowSidebar = true;
    }
  }

  logout() {
    this.loginService.logout();
    location.reload();
  }

}
