import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  private fileUploadBaseUrl = 'http://18.136.65.48/api/dev';

  constructor(private http: HttpClient) {
  }

  private getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'image/jpeg',
    });
    return headers;
  }

  postImageForPush(fileToUpload: File): any {
    const endpoint = this.fileUploadBaseUrl + "/imageuploader/push/upload/image";
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, {headers: this.getHeaders()})
  }

  postImageForInApp(fileToUpload: File): any {
    const endpoint = this.fileUploadBaseUrl + "/imageuploader/inappmessage/upload/image";
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, {headers: this.getHeaders()})
  }

  putFile(file: any) {
    console.log(file);
    return this.http.put('https://cors-anywhere.herokuapp.com/https://lms10.s3.ap-southeast-1.amazonaws.com/videos/academic/sadi/sadi.jepg?AWSAccessKeyId=AKIAZXBMXPCNWRRD6PWC&Content-Type=image%2Fjpeg&Expires=1578307203&Signature=%2F5mB%2B5KDDW4OZ7dyt6PTKW7gw0U%3D&x-amz-acl=public-read',
      {
        data: file,
      },
      {
        headers: {
          'Content-Type': "image/jpeg",
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    );
  }
}
