import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InappmessageService {

  constructor() { }
  private aInAppMessageObject:any;

  setInAppMessage(aObj:any): void{
    this.aInAppMessageObject = aObj;
  }

  getInAppMessage():any{
    return this.aInAppMessageObject;
  }
}
