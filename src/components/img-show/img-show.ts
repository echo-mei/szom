import { Component, Input } from '@angular/core';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { GalleryModal } from 'ionic-gallery-modal';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the ImgShowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'img-show',
  templateUrl: 'img-show.html'
})
export class ImgShowComponent {
  @Input() uploadFileDetailDTOList:any;

  constructor(public storage: StorageProvider,public modalCtrl: ModalController) {
  }

  ngOnInit() {
  }


  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  viewImages(index) {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.uploadFileDetailDTOList.map((img) => {
        return {
          url: this.getImageUrl(img)
        };
      }),
      initialSlide: index,
    });
    modal.present().then(() => {
      modal.overlay['_ionCntRef'].nativeElement.addEventListener("click", function () {
        modal.dismiss();
      });
    });
  }

}
