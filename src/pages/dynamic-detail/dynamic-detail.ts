import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Footer } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { BASE_URL } from '../../config';
import { UserProvider } from '../../providers/user/user';
import { LikeListPage } from '../like-list/like-list';
import { Keyboard } from '@ionic-native/keyboard';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';

@Component({
  selector: 'page-dynamic-detail',
  templateUrl: 'dynamic-detail.html',
})
export class DynamicDetailPage {

  @ViewChild('footer') footer: Footer;

  // 当前动态
  dynamic: any;
  // 修改后置
  onUpdate: (dynamic) => {};

  // 评论内容
  comment: string = "";
  // 要回复评论的那条评论的id
  commentId: string = '';
  // 评论区显示的提示
  placeholder: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public dynamicProvider: DynamicProvider,
    public events: Events,
    public userProvider: UserProvider,
    public keyboard: Keyboard
  ) {
    this.dynamic = this.navParams.get("dynamic");
    this.onUpdate = this.navParams.get("onUpdate");
    this.hasMeLike();
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

  // ======================= Public Methods ===========================

  // 获取当前动态
  getDynamic() {
    return this.dynamicProvider.getDynamicDetail({ dynamicId: this.dynamic.dynamicId }).do(
      (data) => {
        this.dynamic = data;
        this.hasMeLike();
        this.onUpdate && this.onUpdate(this.dynamic);
      }
    );
  }

  // 获取图片地址
  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  // 判断本人是否点赞
  hasMeLike() {
    let me = this.storage.me;
    this.dynamic.hasMeLike = this.dynamic && this.dynamic.sbLikeList && this.dynamic.sbLikeList.find((user) => {
      return user.userCode == me.userCode;
    }) ? true : false;
  }

  // =========================== Events ==============================

  // 点击点赞人列表
  goLikeList() {
    this.navCtrl.push(LikeListPage, {
      likerList: this.dynamic.sbLikePersonInfoDTO
    });
  }

  // 点赞
  sendLike() {
    this.dynamicProvider.likeDaily({ dynamicId: this.dynamic.dynamicId }).subscribe(
      () => {
        this.getDynamic().subscribe(() => {
          this.dynamic.hasClicked = true;
        });
      }
    );
  }

  // 点击取消点赞
  cancelLike() {
    this.dynamicProvider.cancelLikeDaily({ dynamicId: this.dynamic.dynamicId }).subscribe(
      () => {
        this.getDynamic().subscribe(() => {
          this.dynamic.hasClicked = true;
        });
      }
    );
  }

  // 点击评论
  replyComment(comment) {
    this.commentId = comment.sbCommentId;
    this.placeholder='回复'+comment.commentUserName+':';
  }

  // 点击发送评论
  sendComment() {
    if (this.comment && this.dynamic) {
      this.dynamicProvider.commentDaily({
        dynamicId: this.dynamic.dynamicId,
        sbCommentId: this.commentId,
        content: this.comment
      }).subscribe(
        () => {
          this.comment = '';
          this.placeholder = '';
          this.getDynamic().subscribe();
        }
      );
    }
  }

  // 点击评论人姓名
  onClickCommentName(userCode) {
    if(userCode==this.storage.me.userCode) {
      this.navCtrl.push(MeInfoPage);
    }else {
      this.navCtrl.push(UserInfoPage, {
        user: {userCode: userCode},
        showSelfInfo: true,
        showDaily: true,
        showTags: true,
        followOrCancel: true
      });
    }
  }


}
