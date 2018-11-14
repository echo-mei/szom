import { Component, Input } from '@angular/core';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { GalleryModal } from 'ionic-gallery-modal';
import { ModalController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { PhotoLibrary, AlbumItem } from '@ionic-native/photo-library';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'img-show',
  templateUrl: 'img-show.html'
})
export class ImgShowComponent {
  @Input() uploadFileDetailDTOList:any;

  constructor(
    public storage: StorageProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public photoLibrary: PhotoLibrary,
    public domSanitizer: DomSanitizer,
    public toastCtrl: ToastController
  ) {
  }

  ngOnInit() {
    this.uploadFileDetailDTOList && this.uploadFileDetailDTOList.forEach((img) => {
      let url = `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
      img.style = `background-image: url(${url})`;
      let image = new Image();
      image.src = url;
      image.onerror = function(e) {
        img.style = 'background-image: url(assets/imgs/default-img@3x.png)';
      }
    });
  }

  generateBackground(img) {
    return this.domSanitizer.bypassSecurityTrustStyle(img.style);
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  viewImages(index) {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.uploadFileDetailDTOList.map((img) => {
        return {
          url: this.getImageUrl(img)
        };
      }),
      initialSlide: index
    });
    modal.present().then(() => {
      modal.overlay['_ionCntRef'].nativeElement.querySelector('ion-slides').addEventListener("click", function () {
        modal.dismiss();
      });
      let timeOutEvent;
      modal.overlay['_ionCntRef'].nativeElement.querySelectorAll('ion-slide').forEach((slide, index) => {
        slide.ontouchstart = () => {
          timeOutEvent = setTimeout(() => {
            this.actionSheetCtrl.create({
              buttons: [
                {
                  text: '保存图片', handler: () => {
                    this.photoLibrary.requestAuthorization({read: true, write: true}).then(() => {
                      this.photoLibrary.saveImage(modal.overlay['_ionCntRef'].nativeElement.querySelectorAll('img')[index].src+'&ext=.jpg', 'jade').then(()=>{
                        this.toastCtrl.create({
                          cssClass: 'mini',
                          message: '保存成功',
                          position: 'middle',
                          duration: 2000
                        }).present();
                      }).catch(err => {
                        this.toastCtrl.create({
                          cssClass: 'mini',
                          message: '保存失败',
                          position: 'middle',
                          duration: 2000
                        }).present();
                      });
                    }).catch(err => {
                      this.toastCtrl.create({
                        cssClass: 'mini',
                        message: '获取权限失败',
                        position: 'middle',
                        duration: 2000
                      }).present();
                    });
                  }
                },
                { text: '取消', role: 'cancel',cssClass: 'color: #000',}
              ]
            }).present();
          }, 200);
        }
        slide.ontouchmove = function() {
          clearTimeout(timeOutEvent);
        }
        slide.ontouchend = function() {
          clearTimeout(timeOutEvent);
        }
      });
    });
  }

}
