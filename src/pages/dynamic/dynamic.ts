import { Component, EventEmitter, ViewChild, Input } from "@angular/core";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { UserProvider } from "../../providers/user/user";
import { StorageProvider } from "../../providers/storage/storage";
import { DynamicProvider } from "../../providers/dynamic/dynamic";
import { MenuProvider } from "../../providers/menu/menu";
import { ModalController, Slides, NavParams } from "ionic-angular";
import { DailyMeCreatePage } from "../daily-me-create/daily-me-create";
import { DynamicSearchPage } from "../dynamic-search/dynamic-search";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'page-dynamic',
  templateUrl: 'dynamic.html',
})
export class DynamicPage {

  // eventEmitter-用于外部调用内部方法
  @Input() eve: EventEmitter<any>;

  @ViewChild('slides') slides: Slides;

  tabIndex: number = 0;

  tabs: any[] = [
    {
      hasInit: false,
      hasRefresher: true,
      hasInfinite: true,
      getListPromise: this.dynamicProvider.getAttentionDynamicList.bind(this.dynamicProvider),
      onLoad: () => {
        this.storage.newDynamicAttention = null;
      },
      eventEmitter: new EventEmitter()
    },
    {
      hasInit: false,
      hasRefresher: true,
      hasInfinite: true,
      getListPromise: this.dynamicProvider.getUnityDnamicList.bind(this.dynamicProvider),
      onLoad: () => {
        this.storage.newDynamicUnit = null;
      },
      eventEmitter: new EventEmitter()
    },
    {
      hasInit: false,
      hasRefresher: false,
      hasInfinite: false,
      getListPromise: this.dynamicProvider.getRecommendDynamicList.bind(this.dynamicProvider),
      eventEmitter: new EventEmitter()
    },
    {
      hasInit: false,
      hasRefresher: true,
      hasInfinite: true,
      getListPromise: this.dynamicProvider.getLeaderLikeDynamicList.bind(this.dynamicProvider),
      onLoad: () => {
        this.storage.newDynamicLeader = null;
      },
      eventEmitter: new EventEmitter()
    }
  ];
  // 搜索页缓存数据
  searchStorage: any;

  constructor(
    public domSanitizer: DomSanitizer,
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public dynamicProvider: DynamicProvider,
    public menuProvider: MenuProvider,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
  }

  ngOnInit() {
    Object.assign(this, this.navParams.data);
    this.eve.subscribe((event) => {
      if(event.name=='load') {  // 加载事件
        this.tabs[this.tabIndex].eventEmitter.emit({name: this.tabIndex == 2 ? 'refresh' : 'load'});
      }
    });
  }

  // =================== Public Methods =====================

  // 计算tab头部底线位置
  styleEffect() {
    return this.domSanitizer.bypassSecurityTrustStyle(`left: ${this.tabIndex/4*100}%;`);
  }

  // ==================== Events =======================

  // 点击title
  onClickTop() {
    this.tabs[this.tabIndex].eventEmitter.emit({name: 'load'});
  }

  // 点击搜索
  onClickSearch() {
    let params = {
      ...this.searchStorage,
      onUpdate: (dynamic) => {
        this.tabs[this.tabIndex].eventEmitter.emit({name: 'update', value: { dynamic: dynamic }});
      },
      getListPromise: this.tabs[this.tabIndex].getListPromise.bind(this)
    };
    let searchModal = this.modalCtrl.create(DynamicSearchPage, params);
    searchModal.onDidDismiss(data => {
      if (data) {
        this.searchStorage = data;
      }
    });
    searchModal.present();
  }

  // 点击新建
  onClikeCreate() {
    this.navCtrl.push(DailyMeCreatePage, {
      onCreate: () => {
        this.tabs[0].eventEmitter.emit({name: 'load'});
      }
    });
  }

  // 点击tab按钮
  selectTab(index) {
    this.tabIndex = index;
    this.slides.slideTo(index);
    if(index==0 && !this.storage.newDynamicAttention) return;
    if(index==1 && !this.storage.newDynamicUnit) return;
    if(index==2) return;
    if(index==3 && !this.storage.newDynamicLeader) return;
    !this.tabs[this.tabIndex].hasInit && this.tabs[this.tabIndex].eventEmitter.emit({name: 'load'});
    this.tabs[index].hasInit = true;
  }

  // 左右滑动后置
  onSlideChanged() {
    this.tabIndex = this.slides.getActiveIndex() > 3 ? 3 : this.slides.getActiveIndex();
    !this.tabs[this.tabIndex].hasInit && this.tabs[this.tabIndex].eventEmitter.emit({name: 'load'});
    this.tabs[this.tabIndex].hasInit = true;
  }

}
