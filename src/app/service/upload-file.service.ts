import { Injectable } from '@angular/core';
// import * as S3 from 'aws-sdk/clients/s3';
(window as any).global = window;
import { S3 } from 'aws-sdk';
import {DeleteObjectRequest} from 'aws-sdk/clients/s3';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  bucket!:S3;
  constructor() {
    this.bucket = new S3(
      {
          accessKeyId: environment.amazon.accessKey,
          secretAccessKey: environment.amazon.secretKey,
          region: 'us-east-2',
          apiVersion: '2012-10-17'
      }
    );
  }

  fileUpload = async (file:File, correlative:number, extension:string) => {
    const contentType = file.type;
    const filename = `${correlative}-${this.randomString()}.${extension}`;
    const params = {
        Bucket: 'consultoriacar',
        Key: filename,
        Body: file,
        ContentType: contentType
    };
    return await this.bucket.upload(params).promise();
  }

  randomString = () => {
    let text = '';
    const patter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdfghijklmnopqrstuvwxyz';
    for (let i = 0; i < 15; i++) {
        text += patter.charAt(Math.floor(Math.random() * patter.length));
    }
    return text;
  }

  deleteFile = async (filename:string) => {
    try {
      const params = {Key: filename, Bucket: 'consultoriacar'};
      const deleteParams = {
        Bucket: 'consultoriacar',
        Delete: { Objects: [{Key:filename}]}
      };
      
      const obj = await this.bucket.headObject(params).promise();
      const policy = await this.bucket.getBucketPolicy();
      const version = await this.bucket.getObject(params);
      this.bucket.deleteObjectTagging
      console.log('++++++++++',{obj, policy, version});
      return await this.bucket.deleteObjects(deleteParams).promise()
      // return await this.bucket.ver
    } catch (error) {
      const e = error as Error;
      console.error(e);
      console.log(`Someting goes wrong ${e.message}`);
      return null;
    }
  }
}
