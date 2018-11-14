import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Content } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HeavyFocusProvider } from '../../providers/heavy-focus/heavy-focus';
import { LeaderInfoPage } from '../leader-info/leader-info';
import { BzInfoLibShowPage } from '../bz-info-lib-show/bz-info-lib-show';
import { HeavyFocusAddPage } from '../heavy-focus-add/heavy-focus-add';


@Component({
  selector: 'page-heavy-focus',
  templateUrl: 'heavy-focus.html',
})
export class HeavyFocusPage {
  @ViewChild('content') content: Content;

  // 重点关注列表
  heavyFcocusKeyList: Array<Object> = [];
  heavyFcocusValueList: Array<Object> = [];
  // 搜索关键字
  selectString: String = "";
  // 右侧字母导航
  groups = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public heavyFocusProvider: HeavyFocusProvider,
    public userProvider: UserProvider,
    public toastCtrl: ToastController) {
    this.getHeavyFocusPersonList();
    this.getGroup();
  }


  // ============================ Public Methods ==================================
  // 获取重点关注列表
  getHeavyFocusPersonList(params?) {
    this.heavyFocusProvider.getHeavyFocusPersonList(params).subscribe((list) => {
      this.heavyFcocusKeyList = [];
      this.heavyFcocusValueList = [];
      for (let key in list) {
        this.heavyFcocusKeyList.push(key);
        this.heavyFcocusValueList.push(list[key]);
      }
    });
  }

  // 字母导航初始化
  getGroup() {
    for (var i = 0; i < 26; i++) {
      this.groups.push(String.fromCharCode((65 + i)));
    }
  }

  // ============================ Events ==========================================
  // 点击人员跳转对应信息页面:干部信息页面或班子信息页面
  onClickUser(user) {
    if (user.userType === "01") {//干部信息
      this.navCtrl.push(LeaderInfoPage, {
        user: user,
        onEmpFollow: this.getHeavyFocusPersonList.bind(this),
        onUnEmpFollow: this.getHeavyFocusPersonList.bind(this)
      });
    } else if (user.userType === "02") {//班子信息
      this.navCtrl.push(BzInfoLibShowPage, {
        user: user,
        empFollowOrCancel:true,
        onEmpFollow: this.getHeavyFocusPersonList.bind(this),
        onUnEmpFollow: this.getHeavyFocusPersonList.bind(this)
      });
    }
  }

  // 点击添加
  onClickAdd(){
    this.navCtrl.push(HeavyFocusAddPage,{
      onEmpFollow: this.getHeavyFocusPersonList.bind(this),
      onUnEmpFollow: this.getHeavyFocusPersonList.bind(this)
    })
  }

  // 搜索
  ionInputSearch() {
    let params = {
      keyWords:this.selectString
    }
    this.getHeavyFocusPersonList(params);
  }

  onClickGroup(id) {
    this.toastCtrl.create({
      cssClass: 'mini',
      message: id,
      position: 'middle',
      duration: 500
    }).present();
    if (document.getElementById(id)) {
      this.content.scrollTo(0,document.getElementById(id).offsetTop,20);
    }
  }
}
