import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, Events, Refresher, Content, ModalController, LoadingController, TextInput } from 'ionic-angular';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { LikeListPage } from '../like-list/like-list';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { Keyboard } from '@ionic-native/keyboard';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-dynamic-list',
  templateUrl: 'dynamic-list.html',
})

export class DynamicListPage {
  @ViewChild('infinite') infinite: InfiniteScroll;
  @ViewChild(Content) content: Content;
  @ViewChild('commentInput') commentInput:TextInput;
  @Input() type: any;

  isInfinite: number = 1;

  size = 10;
  // 评论框文本输入值
  commentData: string = "";
  // 被评论的那条记录
  dynamic: any;
  // 要回复评论的那条评论
  replyComment: any;
  // 评论类型 1为评论   2为回复评论
  commentType=1;
  // 评论框提示
  placeholder = "";
  // 动态数据列表
  dynamicList: any;
  dynamicListSus: string = "";
  loading: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dynamicProvider: DynamicProvider,
    public events: Events,
    public storage: StorageProvider,
    public modalCtrl: ModalController,
    public keyboard: Keyboard,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController
  ) {
    // this.keyboard.onKeyboardShow().subscribe(
    //   (e) => {
    //     this.commentEle.nativeElement.style.bottom = e.keyboardHeight + 'px';
    //     this.replyCommentEle.nativeElement.style.bottom = e.keyboardHeight + 'px';
    //   }
    // );
    // this.keyboard.onKeyboardHide().subscribe(
    //   (e) => {
    //     this.commentEle.nativeElement.style.bottom = '0px';
    //     this.replyCommentEle.nativeElement.style.bottom = '0px';
    //   }
    // );
  }

  ngOnInit() {
    this.dynamicListSus = this.type + "-dynamicList:change";
    this.events.subscribe(this.dynamicListSus, (dynamic) => {
      this.getDynamic(dynamic);
    });
    // this.initDynamicList();
  }

  goTop() {
    this.content.scrollToTop(500);
    this.load();
  }

  showMoreBtn(ele) {
    return ele.clientHeight === ele.scrollHeight;
  }

  goLikeList(dynamic) {
    this.navCtrl.push(LikeListPage, {
      likerList: dynamic.sbLikePersonInfoDTO
    });
  }

  initDynamicList() {
    this.dynamicList = [];
    this.more();
  }

  getDynamicList(params, type) {
    switch (type) {
      case "attention":
        return this.dynamicProvider.getAttentionDynamicList(params);
      case "unit":
        return this.dynamicProvider.getUnityDnamicList(params);
      case "recommend":
        return this.dynamicProvider.getRecommendDynamicList();
      case "leaderlike":
        return this.dynamicProvider.getLeaderLikeDynamicList(params);
      default:
        return this.dynamicProvider.getAttentionDynamicList(params);
    }
  }


  load(refresher?: Refresher) {
    let params = {
      size: this.size
    };
    if (this.dynamicList.length) {
      params['startTime'] = this.dynamicList[0]['publishTime'];
    }
    this.getDynamicList(params, this.type).subscribe(
      (data) => {
        if (data) {
          if (this.type == 'recommend') {
            this.dynamicList = data;
          } else {
            for (let i = data.length - 1; i >= 0; i--) {
              this.dynamicList.unshift(data[i]);
            }
          }
        }
        refresher && refresher.complete();
      }
    );
  }

  more(infinite?: InfiniteScroll) {
    this.infinite && this.infinite.enable(true);
    let params = {
      size: this.size
    };
    if (this.dynamicList.length) {
      params['endTime'] = this.dynamicList[this.dynamicList.length - 1]['publishTime'];
    }
    if (!infinite) {
      this.loading = this.loadingCtrl.create({
        content: '处理中...',
        // showBackdrop:false,
        cssClass: 'loading-new'
      });
      this.loading.present();
    }
    this.getDynamicList(params, this.type).subscribe(
      (data) => {
        if (!infinite) {
          this.loading.dismiss();
        }
        infinite && infinite.complete();
        if (data.length) {
          infinite && infinite.enable(true);
          this.dynamicList = this.dynamicList.concat(data);
          this.parseDynamicList();
        } else {
          this.isInfinite = data.length;
          infinite && infinite.enable(false);
        }

      }
    );
  }

  parseDynamicList() {
    let me = JSON.parse(this.storage.get('user'));
    this.dynamicList.forEach((item) => {
      item && item.sbLikeList && item.sbLikeList.find((user) => {
        if (user.likeUserName === me.personName) {
          item.hasMeLike = true;
        } else {
          item.hasMeLike = false;
        }
        return user.likeUserName === me.personName;
      });
    });
  }

  getDynamic(dynamic) {
    this.dynamicProvider.getDynamicDetail({ dynamicId: dynamic.dynamicId }).subscribe(
      (data) => {
        for (let i = 0; i < this.dynamicList.length; i++) {
          if (this.dynamicList[i]['dynamicId'] === data.dynamicId) {
            this.dynamicList[i] = data;
            this.parseDynamicList();
            return;
          }
        }
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  sendLike(dynamic) {
    this.dynamicProvider.likeDaily({ dynamicId: dynamic.dynamicId }).subscribe(
      () => {
        // 列表更新
        this.events.publish(this.dynamicListSus, dynamic);
      }
    );
  }

  startComment(dynamic) {
    this.commentType = 1;
    this.dynamic = dynamic;
    this.replyComment = {};
    this.commentData = this.dynamic.commentData?this.dynamic.commentData:"";
    this.placeholder = "";
    this.commentInputShow();
  }
  startReplyComment(dynamic, comment) {
    this.commentType = 2;
    this.dynamic = dynamic;
    this.replyComment = comment;
    this.commentData = this.replyComment.commentData?this.replyComment.commentData:"";
    this.placeholder = "回复" + this.replyComment.commentUserName + ":";
    this.commentInputShow();
  }
  saveComment(str){
    if(this.commentType === 1){
      this.dynamic.commentData = str;
    }else if(this.commentType === 2){
      this.replyComment.commentData = str;
    }
  }
  sendComment() {
    if (this.commentData && this.dynamic.dynamicId) {
      this.dynamicProvider.commentDaily({
        dynamicId: this.dynamic.dynamicId,
        sbCommentId: this.replyComment ? this.replyComment.sbCommentId : "",
        content: this.commentData
      }).subscribe(
        () => {
          // 列表更新
          this.events.publish(this.dynamicListSus, this.dynamic);
          this.commentData = '';
          this.dynamic = {};
          this.replyComment = {};
          this.commentInputHide();
        }
      );
    }
  }

  commentInputShow() {
    // 隐藏tabs栏
    let tabs = document.getElementsByClassName('tabbar').item(0);
    tabs['style'].display = 'none';
    this.commentInput.setFocus();
  }

  commentInputHide() {
    // 显示tabs栏
    let tabs = document.getElementsByClassName('tabbar').item(0);
    tabs['style'].display = 'flex';
    this.commentInput.setBlur();
  }

  goUserInfo(userCode) {
    let user = { userCode: userCode };
    this.commentInputHide();
    if (user.userCode == JSON.parse(this.storage.get('user')).userCode) {
      this.navCtrl.push(MeInfoPage)
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
