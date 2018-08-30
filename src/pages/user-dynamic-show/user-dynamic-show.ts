import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';

@Component({
  selector: 'page-user-dynamic-show',
  templateUrl: 'user-dynamic-show.html',
})
export class UserDynamicShowPage {

  dynamic: any;
  comment: any; // 评论

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
    public storage: StorageProvider
  ) {
    this.placeholder = this.originalPlaceholder;
    this.dynamic = this.navParams.get('dynamic');
    this.onUpdate = this.navParams.get('onUpdate');
    this.getDynamic();
  }

  getDynamic(isUpdate?: boolean) {
    this.dynamicProvider.getDynamicDetail({ dynamicId: this.dynamic.dynamicId }).subscribe(
      (dynamic) => {
        this.dynamic = dynamic;
        isUpdate && this.onUpdate && this.onUpdate(dynamic);
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  hasMeLike(): boolean {
    return false;
    // let me = JSON.parse(this.storage.get('user'));
    // return this.dynamic && this.dynamic.soaPersonInfoDTO && this.dynamic.soaPersonInfoDTO.find((user) => {
    //   return user.userCode == me.userCode;
    // }) ? true : false;
  }

  goLikeList() {
    // this.navCtrl.push("LikeListPage", {
    //   likerList: this.dynamic.soaPersonInfoDTO
    // });
  }

  replyComment(commentId, placeholder) {
    this.commentId = commentId;
    this.placeholder = "回复" + placeholder+":";
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
          this.getDynamic(true);
        }
      );
    }
  }

  sendLike() {
    this.dynamicProvider.likeDaily({ dynamicId: this.dynamic.dynamicId }).subscribe(
      () => {
        this.getDynamic(true);
      }
    );
  }

}
