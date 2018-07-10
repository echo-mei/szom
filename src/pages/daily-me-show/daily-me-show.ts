import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ViewController, Events } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';

@IonicPage()
@Component({
  selector: 'page-daily-me-show',
  templateUrl: 'daily-me-show.html',
})
export class DailyMeShowPage {

  daily: any;
  comment: any; // 评论

  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};


  //回复评论的那条评论的ID
  commentId: string = '';
  //评论区初始提示
  originalPlaceholder = '鼓励一下，让团队更凝聚';
  //评论区提示显示
  placeholder: string;
  //评价对象类型:1、个人每日工作日志;2、每周一励;3、每季三励;4、每年十励;5、班子每日工作日志;6、评价业务信息
  commentObjectType = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public dailyProvider: DailyProvider,
    public viewCtrl: ViewController,
    public events: Events,
    public storage: StorageProvider
  ) {
    this.placeholder = this.originalPlaceholder;
    this.daily = this.navParams.get('daily');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    // this.getDaily();
  }

  getDaily(isUpdate?: boolean) {
    this.dailyProvider.getDaily(this.daily.dailyId).subscribe(
      (daily) => {
        this.daily = daily;
        isUpdate && this.onUpdate && this.onUpdate(daily);
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  hasMeLike(): boolean {
    let me = JSON.parse(this.storage.get('user'));
    return this.daily && this.daily.listStLike && this.daily.listStLike.find((user) => {
      return user.operator == me.userCode;
    }) ? true : false;
  }

  popover(event) {
    const popover = this.popoverCtrl.create('PopSelectComponent', {
      buttons: [
        // {
        //   text: '修改',
        //   handler: () => {
        //     this.navCtrl.push('DailyMeUpdatePage', {
        //       daily: this.daily,
        //       onUpdate: this.getDaily.bind(this, true)
        //     });
        //     popover.dismiss();
        //   }
        // },
        {
          text: '删除',
          handler: () => {
            let alert = this.alertCtrl.create({
              message: '确认删除？',
              buttons: [
                { text: '取消', role: 'cancel' },
                {
                  text: '确认', handler: () => {
                    this.dailyProvider.deleteDaily(this.daily.dailyId).subscribe(
                      () => {
                        this.navCtrl.pop();
                        this.onDelete && this.onDelete(this.daily.dailyId);
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

  goLikeList() {
    this.navCtrl.push("LikeListPage", {
      likerList: this.daily.soaUnitAndAttentionDTO
    });
  }

  replyComment(commentId, placeholder) {
    this.commentId = commentId;
    this.placeholder = "回复" + placeholder+":";
    this.commentObjectType = 6;
  }

  sendComment() {
    if (this.comment) {
      this.dailyProvider.commentDaily({
        commentObjectId: this.daily.dailyId,
        commentObjectType: this.commentObjectType,
        stCommentId: this.commentId,
        content: this.comment
      }).subscribe(
        () => {
          this.comment = '';
          this.placeholder = this.originalPlaceholder;
          this.commentObjectType = 1;
          this.getDaily(true);
        }
      );
    }
  }

  sendLike() {
    this.dailyProvider.likeDaily({
      commentObjectId: this.daily.dailyId,
      commentObjectType: 1
    }).subscribe(
      () => {
        this.getDaily(true);
      }
    );
  }

}
