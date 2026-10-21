import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  title = new BehaviorSubject('');
  profileData = new BehaviorSubject('');
  sideBar = new BehaviorSubject('');
  modules= new BehaviorSubject('');

  setTitle(title: string) {
    this.title.next(title);
  }
  setProfileData(profileData :any) {
    this.profileData.next(profileData);
  }

  setSideBar(sideBar:any) {
    this.sideBar.next(sideBar);
  }

  setSubAdmin(modules:any){
    this.modules.next(modules)
  }

  imagePath(key): string {
    
    if (!key){
      return '';
    }
   else{
    AWS.config.update({
         accessKeyId: environment.accessKeyId, 
         secretAccessKey: environment.secretAccessKey,
         region: 'us-east-1'
         });
    const urlParts = key.split('/');
    const objectKey = urlParts[urlParts.length - 1];
    const s3 = new AWS.S3();
    const myBucket = environment.bucketName;
    const url = s3.getSignedUrl('getObject', {
      Bucket: myBucket,
      Key: 'image/' + objectKey,
    });
    return url;
   }
  }

  csvPath(key): string {
    
    if (!key){
      return '';
    }
   else{
    AWS.config.update({
         accessKeyId: environment.accessKeyId, 
         secretAccessKey: environment.secretAccessKey,
         region: 'us-east-1'
         });
    const urlParts = key.split('/');
    const objectKey = urlParts[urlParts.length - 1];
    const s3 = new AWS.S3();
    const myBucket = environment.bucketName;
    const url = s3.getSignedUrl('getObject', {
      Bucket: myBucket,
      Key: 'csv/' + objectKey,
    });
    return url;
   }
  }
    
}