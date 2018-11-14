import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { BzWeektableProvider } from '../../providers/bz-weektable/bz-weektable';
import { PopSelectComponent } from '../../components/pop-select/pop-select';
import { BzWorkWeektableUpdatePage } from '../bz-work-weektable-update/bz-work-weektable-update';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-bz-work-weektable-show',
  templateUrl: 'bz-work-weektable-show.html',
})
export class BzWorkWeektableShowPage {

  onUpdate: (date) => {};
  onDelete: () => {};
  weektable: any = {};
  // 用户
  user: any;
  // 当前用户
  me: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public bzWeektableProvider: BzWeektableProvider,
    public storage:StorageProvider
  ) {
    this.user = this.navParams.get('user');
    this.me = this.storage.me;
    this.weektable = this.navParams.get('weektable');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.getWeektable();
  }

  getWeektable() {
    this.bzWeektableProvider.getWorktable(this.weektable.weektableId).subscribe(
      (data) => {
        this.weektable = data;
      }
    )
  }

  popover() {
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          text: '修改',
          handler: () => {
            this.navCtrl.push(BzWorkWeektableUpdatePage, {
              user: this.user,
              weektable: this.weektable,
              onUpdate: (date) => {
                this.getWeektable();
                this.onUpdate(date);
              }
            });
            popover.dismiss();
          }
        },
        {
          text: '删除',
          handler: () => {
            let alert = this.alertCtrl.create({
              message: '确认删除当前记录吗？',
              buttons: [
                { text: '取消', role: 'cancel' },
                {
                  text: '确认', handler: () => {
                    this.bzWeektableProvider.deleteWeektable(this.weektable.weektableId).subscribe(
                      () => {
                        this.navCtrl.pop();
                        this.onDelete && this.onDelete();
                      }
                    );
                  }
                }
              ]
            });
            alert.present();
            popover.dismiss();
          }
        }
      ]
    }, {
        cssClass: 'mini'
      });
    popover.present({
      ev: event
    });
  }

}
