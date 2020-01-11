import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {NotiDataService} from '../../noti-data.service';
import {NavigationService} from '../../navigation.service';
import {InappmessageService} from '../../inappmessage.service';

@Component({
  selector: 'app-inappmessagemodal',
  templateUrl: './inappmessagemodal.component.html',
  styleUrls: ['./inappmessagemodal.component.css']
})
export class InappmessagemodalComponent implements OnInit {
  isShowSpinner: boolean = false;
  messageData:any;
  messageId:any;

  constructor(private modalService: BsModalService,private route: ActivatedRoute, private notificationDataServie:NotiDataService,public modalRef: BsModalRef,private inappmessageService:InappmessageService,private _router: Router) { }


  ngOnInit() {
    this.messageData = this.inappmessageService.getInAppMessage();
  }

  getSegmentname(aSegmentId:any):any{
    aSegmentId = parseInt(aSegmentId);
    let mySegmentName;

    switch (aSegmentId) {
      case 1:
        mySegmentName = "Class 1";
        break;
      case 2:
        mySegmentName = "Class 2";
        break;
      case 3:
        mySegmentName = "Class 3";
        break;
      case 4:
        mySegmentName = "Class 4";
        break;
      case 5:
        mySegmentName = "Class 5";
        break;
      case 6:
        mySegmentName = "Class 6";
        break;
      case 7:
        mySegmentName = "Class 7";
        break;
      case 8:
        mySegmentName = "JSC";
        break;
      case 9:
        mySegmentName = "SSC";
        break;
      case 10:
        mySegmentName = "HSC";
        break;
      case 11:
        mySegmentName = "Admission";
        break;
      case 0:
        mySegmentName = "All";
        break;

    }
    return mySegmentName;
  }


  sendNotification() {
    this.isShowSpinner = true;
    let messageObj ={
      messageTitle:this.messageData.messageTitle,
      ttlTime:this.messageData.ttlTime,
      imageUrl:this.messageData.imageUrl,
      buttonText:this.messageData.buttonText,
      buttonActivity:this.messageData.buttonActivity,
      version:this.messageData.version,
      isOpenVideoPlayer:this.messageData.isOpenVideoPlayer,
      segmentId:this.messageData.segmentId
    };
    this.notificationDataServie.postInAppMessage(messageObj).subscribe((data)=>{
      this.messageId = data.messageId;

    },(error)=>{
      console.log(error);
    },()=>{
      setTimeout(()=>{
        this.isShowSpinner = false;

        this.modalService.hide(1);
        this._router.navigate(['inappmesssgae/details', this.messageId]);
      },5000);
    });

  }
}
