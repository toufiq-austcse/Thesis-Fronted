import { Component, OnInit } from '@angular/core';
import {NotiDataService} from '../../noti-data.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NgForm} from '@angular/forms';

import {InappmessageService} from '../../inappmessage.service';
import {InappmessagemodalComponent} from '../inappmessagemodal/inappmessagemodal.component';
import {FileuploadService} from '../../fileupload.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  segements: any;
  courses: any;
  chapters: any;
  videos: any;

  messageType: number = -1;
  isAnySegmentSelect: boolean = false;
  isSegmentSelectForVideo: boolean = false;
  isCourseSelected: boolean = false;

  selectedSegment: string;
  selectedSegmenttitle: string;
  selectedCourse: string;
  selectedCourseTitle: string;
  selectedChapter: string;
  selectedVideo: string;
  selectedVideoImageThumb: string;

  isSpecificClass: boolean = false;
  isEngagement: boolean = false;
  isEveryOne: boolean = false;

  isNoImage: boolean = false;
  isImageAutoRetrive: boolean = false;
  isImageUpload: boolean = false;

  appVersions:any =[];
  selectedVersion:any ="ALL";

  videoId:string;
  btntext: string = "";
  selectedActivity: any = "HOME";
  messgaeTitle: string ="";

  isShowSpinner: boolean = false;
  fileToUpload: File = null;
  constructor(private notificationService: NotiDataService,
              private modalService: BsModalService,
              private inappmessageService: InappmessageService,
              private afileUploadService:FileuploadService) {

  }

  ngOnInit() {
    this.notificationService.getAllVersion().subscribe((data)=>{
      this.appVersions.push({
        value:"ALL",
        text:"ALL"
      });

      let checkversion = [null,'v1.0.0','v3.0.4','beta-2.3.2','beta-2.3.3'];
      for(let i=0;i<data.version.length;i++){
        if(checkversion.includes(data.version[i]) ){

        }
        else{
          this.appVersions.push({
            value:data.version[i],
            text:data.version[i]
          });
        }
      }

    },(error)=>{
      console.log(error);
    },()=>{
      // console.log(this.appVersions);
    });

  }

  onEngagement() {
    this.isEngagement = true;
    this.isSpecificClass = true;
    this.isEveryOne = true;
  }

  onSpecificClass() {
    this.isEngagement = false;
    this.isSpecificClass = true;
    this.isEveryOne = false;
    this.notificationService.getSegments().subscribe(data => {

      this.segements = data;
    });

  }

  onEveryone() {
    this.isEngagement = false;
    this.isSpecificClass = false;
    this.isEveryOne = true;
  }

  onImgUpload() {
    this.isNoImage = false;
    this.isImageAutoRetrive = false;
    this.isImageUpload = true;
  }

  onNoImage() {
    this.imgUrl =="";
    this.isNoImage = true;
    this.isImageAutoRetrive = false;
    this.isImageUpload = false;
  }

  onImageAutoRetrive() {
    this.isNoImage = false;
    this.imgUrl =="";
    this.isImageAutoRetrive = true;
    this.isImageUpload = false;
  }


  createNotification(notificationForm: NgForm): void {
    if(notificationForm.value.targetAudience){
      if(notificationForm.value.ttl){
        if(notificationForm.value.targetAudience === 'Everyone'){
          let messageObj = {
            messageTitle:this.messgaeTitle.toString(),
            segmentId:0,
            imageUrl:this.imgUrl.toString(),
            buttonText:this.btntext.toString(),
            buttonActivity:this.getAndroidActivity(notificationForm.value).toString(),
            version: notificationForm.value.version.toString(),
            isOpenVideoPlayer: notificationForm.value.activity === 'VIDEO',
            activityOpen:notificationForm.value.activity,
            ttlTime:parseInt(notificationForm.value.ttl)
          };
          this.inappmessageService.setInAppMessage(messageObj);

          this.openModal();
        }
        else if(notificationForm.value.targetAudience === 'SpecificClass'){
          let messageObj = {
            messageTitle:this.messgaeTitle.toString(),
            segmentId:notificationForm.value.segmentid,
            imageUrl:this.imgUrl.toString(),
            buttonText:this.btntext.toString(),
            buttonActivity:this.getAndroidActivity(notificationForm.value).toString(),
            version: notificationForm.value.version.toString(),
            isOpenVideoPlayer: notificationForm.value.activity === 'VIDEO',
            activityOpen:notificationForm.value.activity,
            ttlTime:parseInt(notificationForm.value.ttl)
          };
          this.inappmessageService.setInAppMessage(messageObj);

          this.openModal();
        }
      }

      else{
        alert("Please Select TTL time");
      }

    }
    else{
      alert("Please Select Target Audience")
    }
  }

  onChangeMessageType(value: any): void {
    this.messageType = parseInt(value);

    this.notificationService.getSegments().subscribe(data => {

      this.segements = data;
    });

  }

  onSegmentSelect(value: any): void {

    this.isAnySegmentSelect = true;
    this.selectedSegment = value;
  }

  onSegmentSelectForVideo(value: number): void {
    value = value-1;

    this.selectedSegment = this.segements[value].id;
    this.selectedSegmenttitle = this.segements[value].name;


    this.isSegmentSelectForVideo = true;
    this.notificationService.getCourses(this.selectedSegment).subscribe(data => {

      this.courses = data[0].courses;



    });
  }

  onCourseSelect(value: any): void {

    this.selectedCourse = this.courses[value].id;
    this.selectedCourseTitle = this.courses[value].title;

    this.isCourseSelected = true;
    this.notificationService.getChapters(this.selectedCourse).subscribe(data => {
      this.chapters = data;



    });
  }

  onChapterSelect(value: any): void {
    this.selectedChapter = value;
    for (let chapter in this.chapters) {
      if (this.chapters[chapter].id == value) {
        this.videos = this.chapters[chapter].video;

      }


    }

  }

  onVideoSelect(value: any): void {

    this.selectedVideo = this.videos[value].id;
    this.selectedVideoImageThumb = this.videos[value].thumb;
  }

  getAndroidActivity(formValue:any):string{
    let androidActivity;
    switch (formValue.activity) {
      case 'HOME':
        androidActivity = 'com.a10minuteschool.tenminuteschool.HomeActivity';
        break;
      case "VIDEO":
        androidActivity = formValue.videoid
        break;

    }
    return androidActivity;
  }

  //dealing with modal

  modalRef: BsModalRef;
  imgUrl: string ="";
  imgStatus: any;
  weblink: any;
  courseId: any;
  chapterid: any;
  videoid: any;
  ttl: any;
  targetAudience: any;
  segmentid: any;

  notBody: any;


  openModal() {
    this.modalRef = this.modalService.show(InappmessagemodalComponent, {
      initialState: {
      }
    });
  }

  handleFileInput(files: FileList) {
    console.log(files);
    let imageData:any ;
    this.fileToUpload = files.item(0);

    if(this.fileToUpload !== null){
      this.isShowSpinner = true;
      this.afileUploadService.postImageForInApp(this.fileToUpload).subscribe(data=>{
        imageData = data;
      },(error)=>{
        this.isShowSpinner = false;
        console.log(error);
        alert("Image Upload error");
      },()=>{
        this.isShowSpinner = false;
        this.imgUrl = imageData.Location;

      })
    }
    else{
      console.log("Please Upload a image")
    }

  }
}
