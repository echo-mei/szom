import { Component,OnInit ,Input, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Events, InfiniteScroll } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-daily-me',
  templateUrl: 'daily-me.html',
})
export class DailyMePage {

  page = 0;
  size = 10;
  logDataList: Array<object> = [];
  stlikeList: Array<object> = [];
  stlikeSum:number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public events: Events,
    private storage:StorageProvider
  ) {
    this.events.subscribe('daily:create', this.initLogDailyList.bind(this));
    this.events.subscribe('daily:delete', this.initLogDailyList.bind(this));
    this.getfindSTLike();
    this.initLogDailyList();
  }

  initLogDailyList() {
    this.page = 0;
    this.size = 10;
    this.logDataList = [];
    this.more();
  }

  more(infinite?: InfiniteScroll) {
    this.dailyProvider.getLogDailyList({
      size: this.size,
      page: this.page
    }).subscribe(
      (data) => {
        infinite&&infinite.complete();
        if(data.length) {
          infinite && infinite.enable(true);
          this.page = this.page+1;
          this.logDataList = this.logDataList.concat(data);
        }else {
          infinite && infinite.enable(false);
        }
        this.logDataList = this.logDataList.concat(data);
      }
    );
  }

  getfindSTLike(){
    this.dailyProvider.getfindSTLike(1).subscribe(
      (data) => {
        let that = this;
        this.stlikeList = data;
        this.stlikeList.forEach((val) => {
          that.stlikeSum += val["likeCounts"];
        });
      }
    )
  }

  goDailyShow(daily) {
    this.navCtrl.push('DailyShowPage', {
      daily: daily
    });
  }

  goDailyCreate() {
    this.navCtrl.push('DailyCreatePage');
  }

  goDailySearch(){
    this.navCtrl.push('SearchConditionsPage');
  }

}
