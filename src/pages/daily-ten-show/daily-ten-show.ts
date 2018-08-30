import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, ViewController, Events, Footer } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { PopSelectComponent } from '../../components/pop-select/pop-select';
import { Keyboard } from '@ionic-native/keyboard';
import { LikeListPage } from '../like-list/like-list';

@Component({
  selector: 'page-daily-ten-show',
  templateUrl: 'daily-ten-show.html',
})
export class DailyTenShowPage {

  @ViewChild('footer') footer: Footer;

  dailyTen:any;
  dailyTemp:any;
  comment: any; // 评论
  //回复评论的那条评论的ID
  commentId:string='';
  //评论区初始提示
  originalPlaceholder = '鼓励一下，让团队更凝聚';
  //评论区提示显示
  placeholder: string;
  //评价对象类型:1、个人每日工作日志;2、每周一励;3、每季三励;4、每年十励;5、班子每日工作日志;6、评价业务信息
  commentObjectType = 4;
  count:any;
  onUpdate: () => {};
  onDelete: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public dailyProvider: DailyProvider,
    public viewCtrl: ViewController,
    public events: Events,
    public storage: StorageProvider,
    public keyboard: Keyboard
  ) {
    this.dailyTemp = this.navParams.get('dailyTen');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.count = this.navParams.get('count');
    this.getDaily();
    this.keyboard.onKeyboardShow().subscribe(
      (e) => {
        this.footer['nativeElement'].style.bottom = e.keyboardHeight+'px';
      }
    );
    this.keyboard.onKeyboardHide().subscribe(
      (e) => {
        this.footer['nativeElement'].style.bottom = '0px';
      }
    );
  }

  getDaily(isUpdate?: boolean) {
    this.dailyProvider.getDailyTen(this.dailyTemp.yearlyId).subscribe(
      (daily) => {
        this.dailyTen = daily;
        isUpdate && this.onUpdate && this.onUpdate();
        this.hasMeLike();
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  hasMeLike() {
    let me = JSON.parse(this.storage.get('user'));
    this.dailyTen.hasMeLike = this.dailyTen && this.dailyTen.listStLike && this.dailyTen.listStLike.find((user) => {
      return user.operator == me.userCode;
    }) ? true : false;
  }

  popover(event) {
    let alert = this.alertCtrl.create({
      message: '当前每年十励对应的点赞及评论将一并删除，请确认是否删除？',
      buttons: [
        {text: '取消', role: 'cancel'},
        {text: '确认', handler: () => {
          this.dailyProvider.deleteDailyTen(this.dailyTen.yearlyId).subscribe(
            () => {
              this.navCtrl.pop();
              this.onDelete();
            }
          );
        }}
      ]
    });
    alert.present();
  }

  goLikeList(){
    this.navCtrl.push(LikeListPage,{
      likerList: this.dailyTen.soaUnitAndAttentionDTO
    });
  }

  replyComment(commentId, placeholder) {
    this.commentId = commentId;
    this.placeholder = "回复" + placeholder;
    this.commentObjectType = 6;
  }

  sendComment() {
    if (this.comment) {
      this.dailyProvider.commentDaily({
        commentObjectId: this.dailyTen.yearlyId,
        commentObjectType: this.commentObjectType,
        stCommentId: this.commentId,
        content: this.comment
      }).subscribe(
        () => {
          this.comment = '';
          this.placeholder = this.originalPlaceholder;
          this.commentObjectType = 4;
          this.commentId = undefined;
          this.getDaily(true);
        }
      );
    }
  }

  sendLike() {
    this.dailyProvider.likeDaily({
      commentObjectId: this.dailyTen.yearlyId,
      commentObjectType: 4
    }).subscribe(
      () => {
        this.getDaily(true);
      }
    );
  }

}
