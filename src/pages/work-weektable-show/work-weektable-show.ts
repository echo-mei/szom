import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { WorkProvider } from '../../providers/work/work';
import { WorkWeektableUpdatePage } from '../work-weektable-update/work-weektable-update';
import { PopSelectComponent } from '../../components/pop-select/pop-select';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-work-weektable-show',
  templateUrl: 'work-weektable-show.html',
})
export class WorkWeektableShowPage {

  // 用户
  user: any;
  // 当前用户
  me: any;
  // 工作周表数据
  weektable: any;

  onUpdate: (date:Date) => {};
  onDelete: () => {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider,
    public popoverCtrl: PopoverController,
    public storage: StorageProvider,
    public alertCtrl: AlertController) {
    this.user = this.navParams.get('user');
    this.me = this.storage.me;
    this.weektable = this.navParams.get("weektable");
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.getWeektable();
  }

  getWeektable() {
    this.workProvider.getWork(this.weektable.weektableId).subscribe(
      (data) => {
        this.weektable = data;
      }
    )
  }

  onUpdateNew(date:Date) {
    this.getWeektable();
    this.onUpdate && this.onUpdate(date);
  }

  canShow() {
    return this.user.userCode === this.me.userCode;
  }

  popover() {
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          text: '修改',
          handler: () => {
            this.navCtrl.push(WorkWeektableUpdatePage, {
              weektable: this.weektable,
              onUpdate: this.onUpdateNew.bind(this)
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
                    this.workProvider.deleteWeektable(this.weektable.weektableId).subscribe(
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
