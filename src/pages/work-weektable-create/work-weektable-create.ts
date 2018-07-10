import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WorkWeektableCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-weektable-create',
  templateUrl: 'work-weektable-create.html',
})
export class WorkWeektableCreatePage {

  timeSelect: boolean = false;
  memberSelect: boolean = false;
  typeSelect :boolean = false;

  time:string = '全天';
  storageTime:string = '全天';
  member: string = '王境泽';
  storageMember:string = '王境泽';
  type: string = '真香';
  storageType:string = '真香';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkWeektableCreatePage');
  }
  
  selectTime(){
    this.timeSelect = true;
  }
  checkedTime(time){
    this.storageTime = time; 
  }

  selectMembers(){
    this.memberSelect = true;
  }
  checkedMember(member){
    this.storageMember = member;
  }

  selectType(){
    this.typeSelect = true;
  }
  checkedType(type){
    this.storageType = type;
  }

  clockPop(){
    this.timeSelect = false;
    this.memberSelect = false;
    this.typeSelect = false;
  }
  
  determine(){
    this.time = this.storageTime;
    this.member = this.storageMember;
    this.type = this.storageType;
    this.timeSelect = false;
    this.memberSelect = false;
    this.typeSelect = false;
  }

  saveWorkTable(){
    this.navCtrl.pop();
  }

  goTypeCustom(){
    this.navCtrl.push('TypeCustomPage');
  }
}
