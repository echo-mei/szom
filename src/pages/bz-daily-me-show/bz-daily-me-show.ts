import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, ViewController, Events, Footer } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { Keyboard } from '@ionic-native/keyboard';
import { LikeListPage } from '../like-list/like-list';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { BzDailyProvider } from '../../providers/bz-daily/bz-daily';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { BzInfoPage } from '../bz-info/bz-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';

@Component({
  selector: 'page-bz-daily-me-show',
  templateUrl: 'bz-daily-me-show.html',
})
export class BzDailyMeShowPage {

  @ViewChild('footer') footer: Footer;

  daily: any;


  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};

  // 用户
  user: any;
  // 当前用户
  me: any;
  // 评论文字
  comment: string = "";
  maxLength = 98;
  //回复评论的那条评论的ID
  commentId: string = '';
  //评论区初始提示
  originalPlaceholder = '鼓励一下，让团队更凝聚';
  //评论区提示显示
  placeholder: string;
  //评价对象类型:1、个人每日工作日志;2、每周一励;3、每季三励;4、每年十励;5、班子每日工作日志;6、评价业务信息
  commentObjectType = 5;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public dailyProvider: DailyProvider,
    public bzDailyProvider: BzDailyProvider,
    public viewCtrl: ViewController,
    public events: Events,
    public storage: StorageProvider,
    public keyboard: Keyboard,
    public emojiProvider: EmojiProvider
  ) {
    this.placeholder = this.originalPlaceholder;
    this.user = this.navParams.get('user');
    this.me = this.storage.me;
    this.placeholder = this.originalPlaceholder;
    this.daily = this.navParams.get('daily');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.getDaily().subscribe();
    this.keyboard.onKeyboardShow().subscribe(
      (e) => {
        this.footer['nativeElement'].style.bottom = e.keyboardHeight + 'px';
      }
    );
    this.keyboard.onKeyboardHide().subscribe(
      (e) => {
        this.footer['nativeElement'].style.bottom = '0px';
      }
    );
  }

  getDaily(isUpdate?: boolean) {
    return this.bzDailyProvider.getDaily(this.daily.dailyTeamId).do(
      (daily) => {
        this.daily = daily;
        isUpdate && this.onUpdate && this.onUpdate(daily);
        this.hasMeLike();
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  hasMeLike() {
    let me = this.storage.me;
    this.daily.hasMeLike = this.daily && this.daily.listStLike && this.daily.listStLike.find((user) => {
      return user.operator == me.userCode;
    }) ? true : false;
  }

  popover(event) {
    let alert = this.alertCtrl.create({
      message: '删除后，当前工作日志对应的点赞及评论将一并删除，确认删除吗？',
      buttons: [
        { text: '取消', role: 'cancel' },
        {
          text: '确认', handler: () => {
            this.bzDailyProvider.deleteDaily(this.daily.dailyTeamId).subscribe(
              () => {
                this.navCtrl.pop();
                this.onDelete && this.onDelete(this.daily.dailyTeamId);
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  goLikeList() {
    this.navCtrl.push(LikeListPage, {
      likerList: this.daily.soaUnitAndAttentionDTO
    });
  }

  replyComment(commentId, placeholder) {
    this.commentId = commentId;
    this.placeholder = "回复" + placeholder + ":";
    this.commentObjectType = 6;
  }

  sendComment() {
    if (this.comment) {
      this.dailyProvider.commentDaily({
        commentObjectId: this.daily.dailyTeamId,
        commentObjectType: 5,
        stCommentId: this.commentId,
        content: this.comment
      }).subscribe(
        () => {
          this.comment = '';
          this.placeholder = this.originalPlaceholder;
          this.commentObjectType = 5;
          this.commentId = undefined;
          this.getDaily(true).subscribe();
        }
      );
    }
  }

  sendLike() {
    this.dailyProvider.likeDaily({
      commentObjectId: this.daily.dailyTeamId,
      commentObjectType: 5
    }).subscribe(
      () => {
        this.getDaily(true).subscribe(() => {
          this.daily.hasClicked = true;
        });
      }
    );
  }

  // 点击取消点赞
  onClickCancelLikeIcon() {
    this.dailyProvider.cancelLikeDaily({
      ObjectId: this.daily.dailyTeamId,
      ObjectType: 5
    }).subscribe(
      () => {
        this.getDaily(true).subscribe(() => {
          this.daily.hasClicked = true;
        });
      }
    );
  }

  // 点击评论人姓名
  onClickCommentName(userCode, userType) {
    let user = {
      userCode: userCode,
      userType: userType
    };
    if (user.userType === "02") {//班子信息
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(BzInfoPage);
      } else {
        this.navCtrl.push(BzUserInfoPage, {
          user: user,
          followOrCancel: true
        });
      }
    } else {
      if (userCode == this.storage.me.userCode) {
        this.navCtrl.push(MeInfoPage);
      } else {
        this.navCtrl.push(UserInfoPage, {
          user: { userCode: userCode },
          showSelfInfo: true,
          showDaily: true,
          showTags: true,
          followOrCancel: true
        });
      }
    }
  }
}
