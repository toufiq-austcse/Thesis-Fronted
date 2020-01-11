import { Component, OnInit } from '@angular/core';
import {NotiDataService} from '../../noti-data.service';
import {Chart} from 'chart.js';
import {ActivatedRoute} from '@angular/router';
import {daLocale} from 'ngx-bootstrap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  PieChart:any = [];
  isShowSpinner:boolean = false;
  messageId:any;
  messageDetails:any;

  constructor(private notificationService:NotiDataService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.isShowSpinner = true;
      this.messageId= params["id"];
      this.notificationService.getInAppMessageDetails(this.messageId).subscribe( data => {
        this.messageDetails = data ;
      },(err)=>{
        alert("Not Found");
        this.isShowSpinner = false;
      },()=>{

        this.isShowSpinner = false;
        //pie chart generation
        this.PieChart = new Chart( 'piechart', {
          type: 'pie',
          data: {
            labels: ["Sent", "ButtonClicked","Outside Clicked","Close Button Clicked", "Failed"],
            datasets: [{
              data: [
                this.messageDetails.successCount,
                this.messageDetails.buttonClickedCount,
                this.messageDetails.outsideClickedCount,
                this.messageDetails.closeButtonClicked,
                this.messageDetails.failedCount],
              backgroundColor: ["#46BFBD", "#4894a7","#93a791","#4aa786", "#F7464A"],
              hoverBackgroundColor: ["#5AD3D1", "#4894a7","#93a791","#4aa786", "#F7464A"]
            }]
          },
          options: {
            responsive: true
          }
        });
      });
    });
  }

  getMessageType(isOpenVideoPlayerActivity:boolean): string {
    return isOpenVideoPlayerActivity === true?"Video":"Normal"
  }

  getSegmentName(aSegmentId: number):string{
    switch(aSegmentId){
      case 0:
        return 'All';
        break;
      case 1:
        return 'Class 01';
        break;
      case 2:
        return 'Class 02';
        break;
      case 3:
        return 'Class 03';
        break;
      case 4:
        return 'Class 04';
        break;
      case 5:
        return 'Class 05';
        break;
      case 6:
        return 'Class 06';
        break;
      case 7:
        return 'Class 07';
        break;
      case 8:
        return 'Class 08';
        break;
      case 9:
        return 'SSC';
        break;
      case 10:
        return 'HSC';
        break;
      case 11:
        return 'Admission';
        break;
    }
  }

  getMessageDate(aTime:string):string {
    let arr = aTime.split('T');
    return arr[0];
  }

  getMessageTime(aTime:string):string {
    let arr = aTime.split('T');

    let hour = arr[1].split(':');

    let myTimeStamp = hour[0] + ':' + hour[1];
    return myTimeStamp;
  }




}
