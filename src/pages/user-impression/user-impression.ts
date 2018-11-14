import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ImpressionProvider } from '../../providers/impression/impression';
import { UserImpressionCreatePage } from '../user-impression-create/user-impression-create';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-user-impression',
  templateUrl: 'user-impression.html',
})
export class UserImpressionPage {

  // 用户
  @Input() user: any = {};
  // 当前用户
  me:any;

  tagList: any[] = [];
  startDate: string;
  endDate: string;

  onUpdate: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public impressionProvider: ImpressionProvider,
    public modalCtrl: ModalController,
    public dateUtil: DateUtilProvider,
    public storage:StorageProvider,
    public statusBar: StatusBar
  ) {
    this.me = this.storage.me;
  }

  ngOnInit() {
    Object.assign(this, this.navParams.data);
    this.getImpressionList();
  }

  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewWillLeave() {
    this.statusBar.styleDefault();
  }

  getImpressionList() {
    let params = {
      tagOwner: this.user.userCode,
    };
    if(this.startDate) {
      params['startDate'] = this.startDate;
    }
    if(this.endDate) {
      params['endDate'] = this.endDate;
    }
    this.impressionProvider.statistics(params).subscribe(
      (list) => {
        this.tagList = list;
        this.onUpdate && this.onUpdate();
      }
    );
  }

  goAddImpressionCreate() {
    this.navCtrl.push(UserImpressionCreatePage, {
      user: this.user,
      onCreate: this.getImpressionList.bind(this)
    });
  }

  // 选择时间跨度
  goSelectDate() {
    this.modalCtrl.create(BetweenDatePickerComponent, {
      afterSure: (start, end) => {
        this.startDate = this.dateUtil.format(start, 'yyyy-MM-dd');
        this.endDate = this.dateUtil.format(end, 'yyyy-MM-dd');
        this.getImpressionList();
      }
    }).present();
  }

}
