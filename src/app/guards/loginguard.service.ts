import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardService implements CanActivate {

  constructor(private loginService: LoginService,private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if(!this.loginService.isLoggedIn()) {
      return true;
    }
    else {
      this._router.navigate(['dashboard']);
      return false;
    }
  }

}
