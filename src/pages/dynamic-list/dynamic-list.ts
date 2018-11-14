import { Component, EventEmitter, ViewChild, Input } from "@angular/core";
import { NavParams, Refresher, InfiniteScroll, App, ModalController, Content } from "ionic-angular";
import { StorageProvider } from "../../providers/storage/storage";
import { Observable } from "rxjs";
import { BASE_URL } from "../../config";
import { UserProvider } from "../../providers/user/user";
import { DynamicProvider } from "../../providers/dynamic/dynamic";
import { LikeListPage } from "../like-list/like-list";
import { MeInfoPage } from "../me-info/me-info";
import { UserInfoPage } from "../user-info/user-info";
import { CommentInputComponent } from "../../components/comment-input/comment-input";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { BzInfoLibShowPage } from "../bz-info-lib-show/bz-info-lib-show";
import { BzInfoPage } from "../bz-info/bz-info";
import { BzUserInfoPage } from "../bz-user-info/bz-user-info";

@Component({
  selector: 'page-dynamic-list',
  templateUrl: 'dynamic-list.html',
})
export class DynamicListPage {

  @ViewChild(Content) content: Content;

  // 是否有refresher
  @Input() hasRefresher: boolean = true;
  // 是否有infinite
  @Input() hasInfinite: boolean = true;
  // 加载列表的promise方法
  @Input() getListPromise: (params) => Observable<any>;
  // onLoad后置事件
  @Input() onLoad: any;
  // eventEmitter-用于外部调用内部方法
  @Input() eventEmitter: EventEmitter<any>;

  // 每页显示条数
  size = 10;
  // 动态数据列表
  dynamicList: Array<object> = [];
  // 是否正在加载数据
  isLoading: boolean = true;
  // 是否还有更多数据
  hasMore: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public userProvider: UserProvider,
    public dynamicProvider: DynamicProvider,
    public app: App,
    public modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    Object.assign(this, this.navParams.data);
    this.eventEmitter.subscribe((event) => {
      if (event.name == 'load') {  // 加载最新事件
        this.content.scrollToTop(500);
        this.isLoading = true;
        this.load().subscribe(() => { });
      } else if (event.name == 'refresh') { // 刷新事件
        this.content.scrollToTop(500);
        this.isLoading = true;
        this.resetList();
      } else if (event.name == 'update') { // 更新事件
        this.updateDynamic(event.value.dynamic).subscribe();
      } else if (event.name == 'disableRefresher') {  // 禁用refresher
        this.hasRefresher = false;
      } else if (event.name == 'enableRefresher') {  // 启用refresher
        this.hasRefresher = true;
      }
    });
  }

  // =====================  Public Methods ======================

  // 获取列表数据
  getList(params?) {
    params = {
      size: this.size,
      ...params
    };
    return this.getListPromise(params).mergeMap(
      list => {
        list.length && this.parseData(list);
        return Observable.create(observer => observer.next(list));
      }
    ).do(
      (list: any[]) => {
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  // 重置动态列表
  resetList() {
    this.dynamicList = [];
    this.isLoading = true;
    this.getList().subscribe((list: any[]) => {
      this.hasMore = list.length ? true : false;
      this.dynamicList = list;
      this.onLoad && this.onLoad();
    });
  }

  // 加载最新
  load() {
    let params = {};
    this.dynamicList.length && (params['startTime'] = this.dynamicList[0]['publishTime']);
    return this.getList(params).do(
      (list: any[]) => {
        if (list && list.length) {
          for (let i = list.length - 1; i >= 0; i--) {
            this.dynamicList.unshift(list[i]);
          }
        }
        this.onLoad && this.onLoad();
      }
    );
  }

  // 判断列表数据每条数据当前用户是否点赞
  parseData(data: any) {
    let me = this.storage.me;
    const parse = function (item) {
      item["hasMeLike"] = false;
      item && item["sbLikeList"] && item["sbLikeList"].find((user) => {
        if (user.likeUserName === me.personName) {
          item["hasMeLike"] = true;
        } else {
          item["hasMeLike"] = false;
        }
        return user.likeUserName === me.personName;
      });
    }
    if (data instanceof Array) {
      data.forEach((item) => {
        parse(item);
      });
    } else {
      parse(data);
    }
  }

  // 更新动态列表对应的某一条动态，可传入attrs仅更新对应属性
  updateDynamic(dynamic, ...attrs) {
    return this.dynamicProvider.getDynamicDetail({ dynamicId: dynamic.dynamicId }).do(
      (data) => {
        for (let i = 0; i < this.dynamicList.length; i++) {
          if (this.dynamicList[i]['dynamicId'] === data.dynamicId) {
            attrs.length ? attrs.forEach((attr) => {
              this.dynamicList[i][attr] = data[attr];
            }) : this.dynamicList[i] = data;
            this.parseData(this.dynamicList[i]);
            return;
          }
        }
      }
    );
  }

  // 激活点赞图标
  activeLikeIcon(dynamic) {
    this.dynamicList.find((item) => {
      if (item['dynamicId'] === dynamic.dynamicId) {
        item['hasClicked'] = true;
      }
      return item['dynamicId'] === dynamic.dynamicId;
    });
  }

  // 获取图片地址
  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  // 动态文本是否显示更多判断
  showMoreBtn(ele) {
    return ele.clientHeight === ele.scrollHeight;
  }

  // 获取头像
  getHeadImageUrl(personId) {
    return this.userProvider.getHeadImageUrl(personId);
  }

  // =====================  Events ======================

  // 拉动refresher事件
  loadDynamicList(refresher?: Refresher) {
    this.load().subscribe(
      list => {
        refresher.complete();
      },
      err => {
        refresher.complete();
      }
    );
  }

  // 往下滚动
  moreDynamicList(infinite: InfiniteScroll) {
    this.isLoading = false;
    let params = {
      endTime: this.dynamicList[this.dynamicList.length - 1]['publishTime']
    };
    this.getList(params).subscribe(
      (list: any[]) => {
        this.hasMore = list.length ? true : false;
        list && (this.dynamicList = this.dynamicList.concat(list));
        infinite.complete();
      },
      err => {
        infinite.complete();
      }
    );
  }

  // 去到点赞列表
  onClickLikeList(dynamic) {
    this.navCtrl.push(LikeListPage, {
      likerList: dynamic.sbLikePersonInfoDTO
    });
  }

  // 点击点赞图标
  onClickLikeIcon(dynamic) {
    this.dynamicProvider.likeDaily({ dynamicId: dynamic.dynamicId }).subscribe(
      () => {
        this.updateDynamic(dynamic, 'sbLikeList', 'sbLikePersonInfoDTO').subscribe((dy) => {
          this.activeLikeIcon(dynamic);
        });
      }
    );
  }

  // 点击取消点赞
  onClickCancelLikeIcon(dynamic) {
    this.dynamicProvider.cancelLikeDaily({ dynamicId: dynamic.dynamicId }).subscribe(
      () => {
        this.updateDynamic(dynamic, 'sbLikeList', 'sbLikePersonInfoDTO').subscribe((dy) => {
          this.activeLikeIcon(dynamic);
        });
      }
    );
  }

  // 点击评论图标
  onClickCommentIcon(dynamic) {
    let commentModal = this.modalCtrl.create(CommentInputComponent, {
      commentData: dynamic.commentData ? dynamic.commentData : '',
      placeholder: '',
      onSend: (commentData) => {
        this.dynamicProvider.commentDaily({
          dynamicId: dynamic.dynamicId,
          content: commentData
        }).subscribe(
          () => {
            this.updateDynamic(dynamic, 'sbCommentList').subscribe();
          }
        );
      }
    });
    commentModal.onDidDismiss(data => {
      if (data) {
        dynamic.commentData = data.commentData;
      }
    });
    commentModal.present();
  }

  // 点击评论回复评论
  onClickComment(dynamic, comment) {
    let commentModal = this.modalCtrl.create(CommentInputComponent, {
      commentData: comment.commentData ? comment.commentData : '',
      placeholder: `回复${comment.commentUserName}:`,
      onSend: (commentData) => {
        this.dynamicProvider.commentDaily({
          dynamicId: dynamic.dynamicId,
          sbCommentId: comment.sbCommentId,
          content: commentData
        }).subscribe(
          () => {
            this.updateDynamic(dynamic, 'sbCommentList').subscribe();
          }
        );
      }
    });
    commentModal.onDidDismiss(data => {
      if (data) {
        comment.commentData = data.commentData;
      }
    });
    commentModal.present();
  }

  // 点击用户
  onClickUser(userCode, userType) {
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
      if (user.userCode == this.storage.me.userCode) {
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

}

