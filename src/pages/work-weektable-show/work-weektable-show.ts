import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { WorkProvider } from '../../providers/work/work';
import { WorkWeektableUpdatePage } from '../work-weektable-update/work-weektable-update';
import { WorkWeektableCreatePage } from '../work-weektable-create/work-weektable-create';
import { PopSelectComponent } from '../../components/pop-select/pop-select';

/**
 * Generated class for the WorkWeektableShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-work-weektable-show',
  templateUrl: 'work-weektable-show.html',
})
export class WorkWeektableShowPage {

  weektable: any;
  onUpdate: () => {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController) {
    this.weektable = this.navParams.get("weektable");
    this.onUpdate = this.navParams.get('onUpdate');
    this.getWeektable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkWeektableShowPage');
  }

  getWeektable(){
    this.workProvider.getWork(this.weektable.weektableId).subscribe(
      (data) => {
        this.weektable = data;
      }
    )
  }

  onUpdateNew(){
    this.onUpdate && this.onUpdate();
    this.getWeektable();
  }

  popover() {
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          text: '修改',
          handler: () => {
            this.navCtrl.push(WorkWeektableUpdatePage,{
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
                {text: '取消', role: 'cancel'},
                {text: '确认', handler: () => {
                  this.workProvider.deleteWeektable(this.weektable.weektableId).subscribe(
                    () => {
                      this.navCtrl.pop();
                      this.onUpdate && this.onUpdate();
                    }
                  );
                }}
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
