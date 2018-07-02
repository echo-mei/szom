import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ViewController, Events } from 'ionic-angular';
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

  comment: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public dailyProvider: DailyProvider,
    public viewCtrl: ViewController,
    public events: Events
  ) {
    this.daily = this.navParams.get('daily');
    console.log(this.daily);
    this.single = this.navParams.get('single');
  }

  popover(event) {
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          text: '修改',
          handler: () => {
            this.navCtrl.push('DailyUpdatePage',{
              'single': this.single,
              'daily': this.daily
            });
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
                  let dailyId = this.daily.dailyId;
                  this.dailyProvider.deleteDaily(dailyId).subscribe(
                    () => {
                      this.viewCtrl.dismiss();
                      this.events.publish('daily:delete');
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

  goLikeList(){
    this.navCtrl.push("LikeListPage",{liker:this.daily.listStLike});
  }

  sendComment() {
    if(this.comment) {
      this.dailyProvider.commentDaily(this.daily.dynamicId, {
        content: this.comment
      }).subscribe(
        () => {
          this.comment = '';
        }
      );
    }
  }

  sendLike() {
    this.dailyProvider.likeDaily(this.daily.dynamicId).subscribe(
      () => {

      }
    );
  }

}
