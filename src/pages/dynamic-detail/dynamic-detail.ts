import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { BASE_URL } from '../../config';
import { UserProvider } from '../../providers/user/user';
import { LikeListPage } from '../like-list/like-list';

@Component({
  selector: 'page-dynamic-detail',
  templateUrl: 'dynamic-detail.html',
})
export class DynamicDetailPage {
  dynamic: any;
  comment: string = "";
  type: string = '';
  dynamicListSus: string = "";
  dynamicSearchListSus: string = "";
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
    public userProvider: UserProvider
  ) {
    this.type = this.navParams.get("type");
    this.dynamic = this.navParams.get("dynamic");
    this.dynamicListSus = this.type + "-dynamicList:change";
    this.dynamicSearchListSus = this.type + "-dynamicSearchList:change";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DynamicDetailPage');
  }

  goLikeList() {
    this.navCtrl.push(LikeListPage, {
      likerList: this.dynamic.sbLikePersonInfoDTO
    });
  }

  getDynamic() {
    this.dynamicProvider.getDynamicDetail({ dynamicId: this.dynamic.dynamicId }).subscribe(
      (data) => {
        this.dynamic = data;
        // 搜索列表更新
        this.events.publish(this.dynamicSearchListSus, this.dynamic);
        // 列表更新
        this.events.publish(this.dynamicListSus, this.dynamic);
        this.hasMeLike();
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  hasMeLike() {
    let me = JSON.parse(this.storage.get('user'));
    this.dynamic.hasMeLike = this.dynamic && this.dynamic.sbLikeList && this.dynamic.sbLikeList.find((user) => {
      return user.likeUserName == me.personName;
    }) ? true : false;
  }

  sendLike() {
    this.dynamicProvider.likeDaily({ dynamicId: this.dynamic.dynamicId }).subscribe(
      () => {
        this.getDynamic();
      }
    );
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
          this.getDynamic()
        }
      );
    }
  }


}
