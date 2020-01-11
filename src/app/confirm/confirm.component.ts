import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {NotiDataService} from "../noti-data.service";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public modalRef;
  constructor(private amodalRef: BsModalRef,private modalService:BsModalService,private notificationDataService:NotiDataService) {
    this.modalRef = amodalRef;
  }

  ngOnInit() {

  }

  deleteNotification() {
    let data = this.modalService.config.initialState;
    this.notificationDataService.deleteScheduleNotification(data["notificationId"]).subscribe(data=>{
      if(data.message === 'Deleted'){
        location.reload();
      }
    },(err)=>{
      alert("Error!");
      console.log(err);
    })
  }
}
