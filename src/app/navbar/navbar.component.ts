import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sendShow: boolean = true;
  isShowSidebar = true;

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.isShowSidebar = true;
    }
  }


  showLi(e) {
    e.nextSibling.classList.toggle('show');
  }

  logout() {
    this.loginService.logout();
    location.reload();
  }
}
