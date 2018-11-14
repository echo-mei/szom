import { Injectable } from '@angular/core';
import { ModalController, Modal } from 'ionic-angular';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';

@Injectable()
export class BetweenDatePickerProvider {

  modal: Modal;

  constructor(
    public modalCtrl: ModalController
  ) {
  }

  open(data?: {afterSure?}) {
    this.modal = this.modalCtrl.create(BetweenDatePickerComponent, data);
    this.modal.present();
  }

  close() {

  }

}
