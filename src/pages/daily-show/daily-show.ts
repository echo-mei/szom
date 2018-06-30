import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ViewController } from 'ionic-angular';
import { PopSelectComponent } from '../../components/pop-select/pop-select';
import { DailyProvider } from '../../providers/daily/daily';

@IonicPage()
@Component({
  selector: 'page-daily-show',
  templateUrl: 'daily-show.html',
})
export class DailyShowPage {
  single:boolean = false;

  daily:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public dailyProvider: DailyProvider,
    public viewCtrl: ViewController
  ) {
    this.single = this.navParams.get('single');
    this.getDaily();
  }

  popover(event) {
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          text: '修改',
          handler: () => {
            this.navCtrl.push('DailyUpdatePage',{ 'single': this.single, 'title': this.daily.title, 'content':this.daily.content});
            popover.dismiss();
          }
        },
        {
          text: '删除',
          handler: () => {
            let alert = this.alertCtrl.create({
              message: '确认删除？',
              buttons: [
                {text: '取消', role: 'cancel'},
                {text: '确认', handler: () => {
                  this.dailyProvider.deleteDaily(1).subscribe(
                    () => {
                      this.viewCtrl.dismiss();
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

  getDaily() {
    let dailyId = 1;
    this.dailyProvider.getDaily(dailyId).subscribe(
      (data) => {
        this.daily = data;
      }
    );
  }

  goLikeList(){
    this.navCtrl.push("LikeListPage",{liker:this.daily.listStLike});
  }

}
