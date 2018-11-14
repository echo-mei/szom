import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, ViewController, Events, Footer, TextInput } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { Keyboard } from '@ionic-native/keyboard';
import { LikeListPage } from '../like-list/like-list';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { UserInfoPage } from '../user-info/user-info';
import { MeInfoPage } from '../me-info/me-info';
import { BzInfoPage } from '../bz-info/bz-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';

@Component({
  selector: 'page-daily-me-show',
  templateUrl: 'daily-me-show.html',
})
export class DailyMeShowPage {

  @ViewChild('footer') footer: Footer;
  @ViewChild('commentTextarea') commentTextarea: TextInput;

  // 用户
  user: any;
  // 当前用户
  me: any;
  daily: any;
  dailyTemp: any;
  comment: string = ""; // 评论
  // 最多评论字数
  maxLength: number = 98;
  //回复评论的那条评论的ID
  commentId: string = '';
  //评论区初始提示
  originalPlaceholder = '鼓励一下，让团队更凝聚';
  //评论区提示显示
  placeholder: string;
  //评价对象类型:1、个人每日工作日志;2、每周一励;3、每季三励;4、每年十励;5、班子每日工作日志;6、评价业务信息
  commentObjectType = 1;


  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public dailyProvider: DailyProvider,
    public viewCtrl: ViewController,
    public events: Events,
    public storage: StorageProvider,
    public keyboard: Keyboard,
    public emojiProvider: EmojiProvider
  ) {
    this.placeholder = this.originalPlaceholder;
    this.user = this.navParams.get('user');
    this.me = this.storage.me;
    this.dailyTemp = this.navParams.get('daily');
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
    return this.dailyProvider.getDaily(this.dailyTemp.dailyId).do(
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
    this.daily.hasMeLike = this.daily && this.daily.listStLike && this.daily.listStLike.find((user) => {
      return user.operator == this.me.userCode;
    }) ? true : false;
  }

  canDelete() {
    return this.daily.isShowDelete && this.me.userCode === this.user.userCode;
  }

  popover(event) {
    let alert = this.alertCtrl.create({
      message: '删除后，当前工作日志对应的点赞及评论将一并删除，确认删除吗？',
      buttons: [
        { text: '取消', role: 'cancel' },
        {
          text: '确定', handler: () => {
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
    this.commentTextarea.setFocus();
  }

  sendComment() {
    if (this.comment) {
      this.dailyProvider.commentDaily({
        commentObjectId: this.daily.dailyId,
        commentObjectType: 1,
        stCommentId: this.commentId,
        content: this.comment
      }).subscribe(
        () => {
          this.comment = '';
          this.placeholder = this.originalPlaceholder;
          this.commentObjectType = 1;
          this.commentId = undefined;
          this.commentTextarea.getNativeElement().getElementsByTagName('textarea')[0].style.height = 'auto';
          this.getDaily(true).subscribe();
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
        this.getDaily(true).subscribe(() => {
          this.daily.hasClicked = true;
        });
      }
    );
  }

  // 点击取消点赞
  onClickCancelLikeIcon() {
    this.dailyProvider.cancelLikeDaily({
      ObjectId: this.daily.dailyId,
      ObjectType: 1
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
          user: user,
          showSelfInfo: true,
          showDaily: true,
          showTags: true,
          followOrCancel: true
        });
      }
    }
  }
}
