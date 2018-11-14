import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { MessageInfoShowPage } from '../message-info-show/message-info-show';

@Component({
  selector: 'page-message-info',
  templateUrl: 'message-info.html',
})
export class MessageInfoPage {

  list = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheet: ActionSheetController,
    public alertCtrl: AlertController
  ) {
    this.testData();
  }

  clearAll() {
    const actionSheet = this.actionSheet.create({
      title: '清空所有消息',
      buttons: [
        {
          text: '确定',
          role: 'destructive',
          handler: () => {
            // let alert = this.alertCtrl.create({
            //   message: `清空将删除您所有的消息，确认吗？`,
            //   buttons: [
            //     {
            //       text: '取消',
            //       role: 'cancel'
            //     },
            //     {
            //       text: '确认',
            //       handler: () => {
            //         this.list = [];
            //       }
            //     }
            //   ]
            // });
            // alert.present();
            this.list = [];
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    actionSheet.present();
  }

  goDetail(item) {
    this.navCtrl.push(MessageInfoShowPage);
  }

  testData() {
    let boolComment;
    for(var i=0; i<10; i++){
      i%2 == 0 ? boolComment=true:boolComment=false;
      let obj = {
        name: `吴彦祖${i+1}号`,
        comment: '这篇感想很不错， 很有学习的价值， 让我实在是忍不住的点了一个赞， 非常的赞， 国服第一赞',
        isComment: boolComment,
        hasImg: boolComment
      }
      this.list.push(obj);
    }
  }

}
