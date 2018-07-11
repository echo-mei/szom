import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Events, TextInput } from 'ionic-angular';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';


@IonicPage()
@Component({
  selector: 'page-dynamic-list',
  templateUrl: 'dynamic-list.html',
})

export class DynamicListPage {
  @ViewChild('infinite') infinite: InfiniteScroll;
  // @ViewChild('content') content;
  @ViewChild('comment') commentEle:any;
  @Input() type: any;

  showAllFlag: boolean = true;
  showMore: boolean = true;

  dataOverFlag = false;
  likeFlag = false;
  size = 10;
  comment: any;
  // 被评论的那条记录
  dynamic: any;
  // 要回复评论的那条评论的id
  commentId: string = '';
  // 评论区显示的提示
  placeholder: string = "";
  dynamicList:any;
  dynamicListSus: string = "";


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dynamicProvider: DynamicProvider,
    public events: Events,
    public storage: StorageProvider
  ) {
  }

  ngOnInit() {
    this.dynamicListSus = this.type + "-dynamicList:change";
    this.events.subscribe(this.dynamicListSus, (dynamic) => {
      console.log(this.dynamicListSus + "订阅成功");
      this.getDynamic(dynamic);
    })
    this.initDynamicList();
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {
  }

  // showMoreBtn(contentDiv) {
  //   const style = window.getComputedStyle(contentDiv, null);
  //   const height = parseInt(style.height, 10);
  //   const lineHeight = parseInt(style.lineHeight, 10);
  //   console.log(contentDiv, height, lineHeight)
  //   if (height / lineHeight > 3) { //若行高大于1行，则显示阅读全文
  //     this.showMore = true;
  //   } else {
  //     this.showMore = false;
  //   }
  //   return false;
  // }

  showMoreBtn(content: TextInput) {
    // console.log(content.getElementRef().nativeElement)
    // console.log(content);
    return false;
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


  load() {
    let params = {
      size: this.size
    };
    if (this.dynamicList.length) {
      params['startTime'] = this.dynamicList[0]['publishTime'];
    }
    this.getDynamicList(params, this.type).subscribe(
      (data) => {
        if (data) {
          for (let i = data.length - 1; i >= 0; i--) {
            this.dynamicList.unshift(data[i]);
          }
        }
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
    this.getDynamicList(params, this.type).subscribe(
      (data) => {
        infinite && infinite.complete();
        if (data.length) {
          infinite && infinite.enable(true);
          this.dynamicList = this.dynamicList.concat(data);
        } else {
          infinite && infinite.enable(false);
        }
      }
    );
  }

  getDynamic(dynamic) {
    this.dynamicProvider.getDynamicDetail({ dynamicId: dynamic.dynamicId }).subscribe(
      (data) => {
        for (let i = 0; i < this.dynamicList.length; i++) {
          if (this.dynamicList[i]['dynamicId'] === data.dynamicId) {
            var obj = JSON.parse(JSON.stringify(data));
            this.dynamicList[i] = obj;
            return;
          }
        }
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  hasMeLike(dynamic): boolean {
    let me = JSON.parse(this.storage.get('user'));
    return dynamic && dynamic.sbLikeList && dynamic.sbLikeList.find((user) => {
      return user.likeUserName == me.personName;
    }) ? true : false;
  }

  sendLike(dynamic) {
    this.dynamicProvider.likeDaily({ dynamicId: dynamic.dynamicId }).subscribe(
      () => {
        // 列表更新
        this.events.publish(this.dynamicListSus, dynamic);
      }
    );
  }

  startComment(dynamic, commentId?, placeholder?) {
    this.dynamic = dynamic;
    this.commentId = commentId;
    if (placeholder) {
      this.placeholder = "回复" + placeholder + " :";
    } else {
      this.placeholder = "";
    }
    this.commentInputShow();
  }
  sendComment() {
    if (this.comment && this.dynamic.dynamicId) {
      this.dynamicProvider.commentDaily({
        dynamicId: this.dynamic.dynamicId,
        sbCommentId: this.commentId,
        content: this.comment
      }).subscribe(
        () => {
          // 列表更新
          this.events.publish(this.dynamicListSus, this.dynamic);
          this.comment = '';
          this.dynamic = {};
          this.commentId = '';
          this.commentInputHide();
        }
      );
    }
  }

  commentInputShow() {
    // 隐藏tabs栏
    let tabs = document.getElementsByClassName('tabbar').item(0);
    tabs['style'].display = 'none';
    let footer = document.getElementsByClassName('publish-comment').item(0);
    footer['style'].display = 'block';
    let textareaObject = document.getElementById('commentInput').getElementsByTagName('textarea').item(0);
    textareaObject.focus();
  }

  commentInputHide() {
    console.log(this.commentEle)
    // 显示tabs栏
    let tabs = document.getElementsByClassName('tabbar').item(0);
    tabs['style'].display = 'flex';
    let footer = document.getElementsByClassName('publish-comment').item(0);
    footer['style'].display = 'none';
  }

}
