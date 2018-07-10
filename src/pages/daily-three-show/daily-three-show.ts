import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ViewController, Events } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';

@IonicPage()
@Component({
  selector: 'page-daily-three-show',
  templateUrl: 'daily-three-show.html',
})
export class DailyThreeShowPage {

  dailyThree: any;
  comment: any; // 评论
  //回复评论的那条评论的ID
  commentId: string = '';
  //评论区初始提示
  originalPlaceholder = '鼓励一下，让团队更凝聚';
  //评论区提示显示
  placeholder: string;
  //评价对象类型:1、个人每日工作日志;2、每周一励;3、每季三励;4、每年十励;5、班子每日工作日志;6、评价业务信息
  commentObjectType = 3;

  onUpdate: () => {};
  onDelete: () => {};

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
    this.dailyThree = this.navParams.get('dailyThree');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.getDaily();
  }

  getDaily(isUpdate?: boolean) {
    this.dailyProvider.getDailyThree(this.dailyThree.quarterlyId).subscribe(
      (daily) => {
        this.dailyThree = daily;
        isUpdate && this.onUpdate && this.onUpdate();
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  hasMeLike(): boolean {
    let me = JSON.parse(this.storage.get('user'));
    return this.dailyThree && this.dailyThree.listStLike && this.dailyThree.listStLike.find((user) => {
      return user.operator == me.userCode;
    }) ? true : false;
  }

  popover(event) {
    const popover = this.popoverCtrl.create('PopSelectComponent', {
      buttons: [
        // {
        //   text: '修改',
        //   handler: () => {
        //     this.navCtrl.push('DailyThreeUpdatePage', {
        //       dailyThree: this.dailyThree,
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
                    this.dailyProvider.deleteDailyThree(this.dailyThree.quarterlyId).subscribe(
                      () => {
                        this.navCtrl.pop();
                        this.onDelete();
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
      likerList: this.dailyThree.soaUnitAndAttentionDTO
    });
  }

  replyComment(commentId, placeholder) {
    this.commentId = commentId;
    this.placeholder = "回复" + placeholder;
    this.commentObjectType = 6;
  }

  sendComment() {
    if (this.comment) {
      this.dailyProvider.commentDaily({
        commentObjectId: this.dailyThree.quarterlyId,
        commentObjectType: this.commentObjectType,
        stCommentId: this.commentId,
        content: this.comment
      }).subscribe(
        () => {
          this.comment = '';
          this.placeholder = this.originalPlaceholder;
          this.commentObjectType = 3;
          this.getDaily(true);
        }
      );
    }
  }

  sendLike() {
    this.dailyProvider.likeDaily({
      commentObjectId: this.dailyThree.quarterlyId,
      commentObjectType: 3
    }).subscribe(
      () => {
        this.getDaily(true);
      }
    );
  }

}
