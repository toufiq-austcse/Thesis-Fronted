import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private encryptSecretKey: string = '10ms-notification-project';
  constructor() { }

  public isLoggedIn(): boolean  {
    let token = this.decryptData(localStorage.getItem('token'));

    // console.log(typeof (userData) === 'undefined');
    if (token) {
      if (token.isLogin === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  public logout(): void {
    localStorage.clear();
  }

  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      //console.log(e);
    }
  }

  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      //console.log(e);
    }
  }
}
