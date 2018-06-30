import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
import { PopSelectComponent } from '../../components/pop-select/pop-select';

@IonicPage()
@Component({
  selector: 'page-dynamic',
  templateUrl: 'dynamic.html',
})
export class DynamicPage {

  type = '1';

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController
  ) {
  }

  goDynamicSearch() {
    this.navCtrl.push('DynamicSearchPage');
  }

  goDynamicCreate(){
    this.navCtrl.push('DailyCreatePage');
  }

  popover(event) {
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          text: '工作日志',
          handler: () => {
            this.navCtrl.push('DailyMePage');
            popover.dismiss();
          }
        },
        {
          text: '每周一励',
          handler: () => {
            this.navCtrl.push('DailyOnePage',{ 'single': true });
            popover.dismiss();
          }
        },
        {
          text: '每季三励',
          handler: () => {
            this.navCtrl.push('DailyThreePage',{ 'single': true });
            popover.dismiss();
          }
        },
        {
          text: '每年十励',
          handler: () => {
            this.navCtrl.push('DailyThePage',{ 'single': true });
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