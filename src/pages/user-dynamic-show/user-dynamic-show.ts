import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { LikeListPage } from '../like-list/like-list';
import { Footer } from 'ionic-angular/navigation/nav-interfaces';
import { Keyboard } from '@ionic-native/keyboard';
import { BzInfoPage } from '../bz-info/bz-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';

@Component({
  selector: 'page-user-dynamic-show',
  templateUrl: 'user-dynamic-show.html',
})
export class UserDynamicShowPage {

  @ViewChild('footer') footer: Footer;

  // 当前用户
  me: any;
  dynamic: any;
  comment: String = ""; // 评论
  // 评论最多字数
  maxLength = 98;

  onUpdate: (dynamic) => {};

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
    public dynamicProvider: DynamicProvider,
    public storage: StorageProvider,
    public keyboard: Keyboard
  ) {
    this.placeholder = this.originalPlaceholder;
    this.me = this.storage.me;
    this.dynamic = this.navParams.get('dynamic');
    this.onUpdate = this.navParams.get('onUpdate');
    this.getDynamic().subscribe();
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

  getDynamic(isUpdate?: boolean) {
    return this.dynamicProvider.getDynamicDetail({ dynamicId: this.dynamic.dynamicId }).do(
      (dynamic) => {
        this.dynamic = dynamic;
        isUpdate && this.onUpdate && this.onUpdate(dynamic);
        this.hasMeLike();
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  hasMeLike() {
    this.dynamic.hasMeLike = this.dynamic && this.dynamic.sbLikeList && this.dynamic.sbLikeList.find((user) => {
      return user.userCode == this.me.userCode;
    }) ? true : false;
  }

  goLikeList() {
    this.navCtrl.push(LikeListPage, {
      likerList: this.dynamic.sbLikePersonInfoDTO
    });
  }

  replyComment(commentId, placeholder) {
    this.commentId = commentId;
    this.placeholder = "回复" + placeholder + ":";
    this.commentObjectType = 6;
  }

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
          this.getDynamic(true).subscribe();
        }
      );
    }
  }

  sendLike() {
    this.dynamicProvider.likeDaily({ dynamicId: this.dynamic.dynamicId }).subscribe(
      () => {
        this.getDynamic(true).subscribe(() => {
          this.dynamic.hasClicked = true;
        });
      }
    );
  }

  // 点击取消点赞
  onClickCancelLikeIcon() {
    this.dynamicProvider.cancelLikeDaily({ dynamicId: this.dynamic.dynamicId }).subscribe(
      () => {
        this.getDynamic(true).subscribe(() => {
          this.dynamic.hasClicked = true;
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
