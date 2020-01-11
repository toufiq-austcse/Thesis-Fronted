import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotiDataService {
  private baseUrl: string = 'http://18.136.65.48/api/prod';
  //private baseUrl: string = 'http://18.136.65.48/api/dev';
 // private baseUrl: string = 'http://localhost:3000/api/prod';
  private lmsBaseUrl: String = 'http://lms.10minuteschool.com/api/v3';

  constructor(private http: HttpClient) {
  }

  //Http Header
  getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM0NWMzNjA0ZDUxMDEwYzFmYzkzNmI5NmY1MWU5OGRlNDg0YTk3NDFkNzEwZDIzNTVhYTE4MzkwMTMzYzJkM2JiOWQyOGI0ZjAwZTEzOGQzIn0.eyJhdWQiOiIzIiwianRpIjoiMzQ1YzM2MDRkNTEwMTBjMWZjOTM2Yjk2ZjUxZTk4ZGU0ODRhOTc0MWQ3MTBkMjM1NWFhMTgzOTAxMzNjMmQzYmI5ZDI4YjRmMDBlMTM4ZDMiLCJpYXQiOjE1MzE3NzM0MzksIm5iZiI6MTUzMTc3MzQzOSwiZXhwIjoxNTYzMzA5NDM5LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.TIQU5af969_6yP6BNhaBxalOIefRmQNaQzcGx5fLo4Q_Mp__343B-dokZ26wWftoUYQakaGcs0wfvxf9xW14SK9awPNiQ9TbiEQpB2El3Hn2OvSJSxA1R5QQpoy4O5TDMuRkZdiMAO4Zc8Ply2DFJLFd3HLCulHjUtDyT0n_aPbbQoqyVcgfTjDCx5WNeeOjt9YSV3C2TBLltZ7WXRh-XAwff7aFnP2JsYAePdWYvb_7zIwLkezDZV_97Gn4jZPBbQ6IRXOW8zmlVUBhkr3REiJD2JKKyvUhES5WTdSidprzD55qcsFKnHvFBybZ9OKfb8UIodaDCx77U5QIxvOGLYywZuHpZKkjN839MoxBRK9euX0nqEeCekIUynylOJF0QmPepW6Itx0SBWtYj05OAAzovQm-oQ3Vpr2JvMtuk_p4BTiuvVkwpCL6Rv8Nfc92cyvfY_d_sr6pYnMMmu7YQNprtYJLgUy2Buc8mK2nWo78iDhM0MNp2O09GthPbZnIUBVNfxcV61d16FFiTDr-yugjuWiU60cj3bxict5shyaLiNikTQikU5qi8NUuQVpKanOTxb86i5dYHKnRqWP8w45vBlmx2jZopfp3m5HXp_JKlxt-CjY9yHny-zq8olKtHMMEA7tKrN_4xz4noT4nwacINJlEiwP8JhHos6QrcgQ",
      'PublicKey': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjMzhhOTA4Nzc4ODhlOTViZTNmYjczNzE1NmVkMWM2MmMwYTBhMjlmNDUwYmJjZmY5ZGNjOGY1MGExYTg4YWZjYjU0MTdlNTI5YzdhZGNkIn0.eyJhdWQiOiIzIiwianRpIjoiZWMzOGE5MDg3Nzg4OGU5NWJlM2ZiNzM3MTU2ZWQxYzYyYzBhMGEyOWY0NTBiYmNmZjlkY2M4ZjUwYTFhODhhZmNiNTQxN2U1MjljN2FkY2QiLCJpYXQiOjE1NDM0Nzg3NTcsIm5iZiI6MTU0MzQ3ODc1NywiZXhwIjoxNTc1MDE0NzU3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.BTBFq-5QhNkskRpp_AK1zrGAz_gbzsawBWyuw3K2RQY7ck7a4JnMH7jX8csaG29eS8dmJSmVko_swEoCl8W1Ucc4Hiy25vMtN8n7eyeeesxGJcDgUtXZp6KZWCRIG_-pp098RZwNan2NZvgzx3DKzgXEIqTCvvAzAO6jQGhVlTe8qSW972meuLTrg2upG3VLRVtRdGLiXXfaoQBv_fdTafz_3jVlulxN7UY9B1TnsBFfywt9QcNgvYYBhRUQeP9aTyQmH_1h7itk4ETcX_o8ZvqNhU8MyJt4gr4eKUzPccGpWSsLFFNa0E-1MvxMZK7Vr0__l-843kzcJOQWAjxysh6aaVXkxs-MghvkBlppsnD3TA1fl-SCdlvixXRVpaHv7Qn0wtoNfxTIgpR2hPp54nGRl3qB2aefQp6JQbjiXqGbcO4RQEyAZbJR_n8HsIJhm3LwEs_QSEmNVbBMNHuGU2JW5_TpBjfcmzbxp-4kTH8Xh5Cnu0kCPlg4t0F2K94t_IDvu9i2VxjVMhCya60QwVxJYygNnn7YaeVuIcQ35IkQ1xzFCVuKzBJPoJnR-WT-AdmF0DsgMQ6hzis62ohRDJbl8hhYp4BAL84rEZdgjecyACz9qPe3zdb7oL99tDC2Qg932az2atv4lfV4rI5duYdiXOz4O6a6YBUTDt9Qm10'
    });
    return headers;
  }

  //segments will be fetch
  getSegments() {
    return this.http.get(this.lmsBaseUrl + '/segmentscourses', {
      headers: this.getHeaders()
    });
  }

  //courses will fetch by segment id
  getCourses(segment) {
    return this.http.get(this.lmsBaseUrl + '/courses/' + segment, {
      headers: this.getHeaders()
    });
  }

//get all notification
  getAllNotification(): any {
    return this.http.get(this.baseUrl + '/notification/get/all', {
      headers: this.getHeaders()
    });
  }

  getANotification(notificationId: string): any {
    return this.http.get(this.baseUrl + '/notification/get/a/notification/details/' + notificationId, {
      headers: this.getHeaders()
    });
  }

  getUsersInfo(page, limit) {
    return this.http.get(this.baseUrl + '/user/get/all/users', {
      headers: this.getHeaders(),
      params: {
        page: page,
        limit: limit
      }
    });
  }

  postNotification(aNotificationObj: any): any {

    return this.http.post(this.baseUrl + '/notification/send/to/device', aNotificationObj, {
        headers: this.getHeaders()
      }
    );
  }

  //chapter will fetch with all videos
  getChapters(course_id) {
    return this.http.get(this.lmsBaseUrl + '/get/chapter/by/' + course_id, {
      headers: this.getHeaders()
    });
  }


  postWebLinkNotification(anObj: any): any {
    //Notification type
    //0->Video
    //3->WebLink
    return this.http.post(this.baseUrl + '/notification/send/to/device', anObj);
  }


  getNotificationDetails(aNotificationid: any): any {
    return this.http.get(this.baseUrl + '/get/notification/details?notificationId=' + aNotificationid);
  }

  getAllVersion(): any {
    return this.http.get(this.baseUrl + '/user/get/all/version', {
      headers: this.getHeaders()
    });
  }

  getAllInAppMessageing(): any {
    return this.http.get(this.baseUrl + '/inappmessage/get/all', {
      headers: this.getHeaders()
    });
  }

  getInAppMessageDetails(aMessageId): any {
    return this.http.get(this.baseUrl + '/inappmessage/get/a/inappmessage/details/' + aMessageId, {
      headers: this.getHeaders()
    });
  }

  postInAppMessage(aMessageObj: any): any {
    return this.http.post(this.baseUrl + '/inappmessage/send/in/app/message', aMessageObj, {
        headers: this.getHeaders()
      }
    );
  }
  getAdmissionChapterAndVideos(couseId:any):any{
    return this.http.get(this.lmsBaseUrl + '/video/by/'+couseId, {
      headers: this.getHeaders()
    });
  }

  postScheduleNotification(aNotificationObj: any):any{
    return this.http.post(this.baseUrl+"/schedulenotification/create",aNotificationObj, {
      headers: this.getHeaders()
    });
  }

  deleteScheduleNotification(notificationId:any):any{
    return this.http.delete(this.baseUrl+"/delete/schedulenotification/"+notificationId, {
      headers: this.getHeaders()
    });
  }

  getAllScheduleNotification():any{
    return this.http.get(this.baseUrl+"/get/all/schedulenotification/", {
      headers: this.getHeaders()
    });
  }
  getVideoDetails(videoId:any):any{
    return this.http.get(this.lmsBaseUrl + '/video/'+videoId, {
      headers: this.getHeaders()
    });
  }

  getScheduleNotification(notificationId:any):any{
    return this.http.get(this.baseUrl + '/schedulenotification/' + notificationId, {
      headers: this.getHeaders()
    });
  }

  getPaginatedNotification(page,limit):any{
    return this.http.get(this.baseUrl + '/notification/paginate/get/all', {
      headers: this.getHeaders(),
      params: {
        page: page,
        limit: limit
      }
    });
  }
}
