import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Observable } from 'rxjs';

@Injectable()
export class ImageUtilProvider {

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public imagePicker: ImagePicker,
    public base64: Base64,
    public sanitizer: DomSanitizer
  ) {
  }

  goSelectImage(callback, multiple?, options?) {
    let cameraOpt = {
      quality: 50,
      destinationType: 1,
      encodingType: 0,
      mediaType: 0,
      allowEdit: true,
      correctOrientation: true
    };
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择',
      buttons: [
        { text: '拍照', handler: () => {
          this.camera.getPicture(Object.assign({}, cameraOpt, {sourceType: 1})).then(
            img => {
              callback([img]);
            }
          ).catch(
            (err) => {}
          );
        } },
        { text: '从手机相册选择', handler: () => {
          if(multiple) {
            this.imagePicker.getPictures(options).then(
              imgs => {
                callback(imgs);
              }
            ).catch(
              (err) => {}
            );
          }else {
            this.camera.getPicture(Object.assign({}, cameraOpt, {sourceType: 0})).then(
              img => {
                callback([img]);
              }
            ).catch(
              (err) => {}
            );
          }
        } },
        { text: '取消', role: 'cancel' }
      ]
    });
    actionSheet.present();
  }

  getDOMSafeUrl(img) {
    return Observable.fromPromise(this.base64.encodeFile(img)).mergeMap(
      (base64File) => {
        return Observable.create(observer => observer.next(this.sanitizer.bypassSecurityTrustResourceUrl(base64File)));
      }
    );

    // this.base64.encodeFile(img).then((base64File: string) => {
    //   let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
    //   this.imgs.push({
    //     name: 'file',
    //     path: img,
    //     safeUrl: safeUrl
    //   });
    // }, (err) => {})

  }

}
