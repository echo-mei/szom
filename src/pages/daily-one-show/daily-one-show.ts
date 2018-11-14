import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, ViewController, Events, Footer, TextInput } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { Keyboard } from '@ionic-native/keyboard';
import { LikeListPage } from '../like-list/like-list';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { BzInfoPage } from '../bz-info/bz-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';

@Component({
  selector: 'page-daily-one-show',
  templateUrl: 'daily-one-show.html',
})
export class DailyOneShowPage {

  @ViewChild('footer') footer: Footer;
  @ViewChild('commentTextarea') commentTextarea: TextInput;

  dailyOne: any;
  dailyTemp: any;
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
  commentObjectType = 2;
  count: any;

  onDelete: (dailyId) => {};
  onUpdate: (dailyId) => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public dailyProvider: DailyProvider,
    public viewCtrl: ViewController,
    public events: Events,
    public storage: StorageProvider,
    public keyboard: Keyboard
  ) {
    this.placeholder = this.originalPlaceholder;
    this.me = this.storage.me;
    this.user = this.navParams.get('user');
    this.dailyTemp = this.navParams.get('dailyOne');
    this.onDelete = this.navParams.get('onDelete');
    this.onUpdate = this.navParams.get('onUpdate');
    this.count = this.navParams.get('count');
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
    return this.dailyProvider.getDailyOne(this.dailyTemp.weeklyId).do(
      (daily) => {
        this.dailyOne = daily;
        isUpdate && this.onUpdate && this.onUpdate(this.dailyOne.weeklyId);
        this.hasMeLike();
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  hasMeLike() {
    this.dailyOne.hasMeLike = this.dailyOne && this.dailyOne.listStLike && this.dailyOne.listStLike.find((user) => {
      return user.operator == this.me.userCode;
    }) ? true : false;
  }

  canDelete() {
    return this.dailyOne.isShowDelete && this.me.userCode === this.user.userCode;
  }

  popover() {
    let alert = this.alertCtrl.create({
      message: '当前每周一励对应的点赞及评论将一并删除，请确认是否删除？',
      buttons: [
        { text: '取消', role: 'cancel' },
        {
          text: '确定', handler: () => {
            this.dailyProvider.deleteDailyOne(this.dailyOne.weeklyId).subscribe(
              () => {
                this.navCtrl.pop();
                this.onDelete && this.onDelete(this.dailyOne.weeklyId);
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
      likerList: this.dailyOne.soaUnitAndAttentionDTO
    });
  }

  replyComment(commentId, placeholder) {
    this.commentId = commentId;
    this.placeholder = "回复" + placeholder;
    this.commentObjectType = 6;
    this.commentTextarea.setFocus();
  }

  sendComment() {
    if (this.comment) {
      this.dailyProvider.commentDaily({
        commentObjectId: this.dailyOne.weeklyId,
        commentObjectType: 2,
        stCommentId: this.commentId,
        content: this.comment
      }).subscribe(
        () => {
          this.comment = '';
          this.placeholder = this.originalPlaceholder;
          this.commentObjectType = 2;
          this.commentId = undefined;
          this.commentTextarea.getNativeElement().getElementsByTagName('textarea')[0].style.height = 'auto';
          this.getDaily(true).subscribe();
        }
      );
    }
  }

  sendLike() {
    this.dailyProvider.likeDaily({
      commentObjectId: this.dailyOne.weeklyId,
      commentObjectType: 2
    }).subscribe(
      () => {
        this.getDaily(true).subscribe(() => {
          this.dailyOne.hasClicked = true;
        });
      }
    );
  }

  // 点击取消点赞
  onClickCancelLikeIcon() {
    this.dailyProvider.cancelLikeDaily({
      ObjectId: this.dailyOne.weeklyId,
      ObjectType: 2
    }).subscribe(
      () => {
        this.getDaily(true).subscribe(() => {
          this.dailyOne.hasClicked = true;
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
