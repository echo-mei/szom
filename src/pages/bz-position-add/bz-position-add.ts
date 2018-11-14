import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopSelectComponent } from '../../components/pop-select/pop-select';
import { DicProvider } from '../../providers/dic/dic';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';

@Component({
  selector: 'page-bz-position-add',
  templateUrl: 'bz-position-add.html',
})
export class BzPositionAddPage {
  weaveType: object = [
    {
      name: 'col1',
      options: [
        
      ]
    }
  ];
  moneySource: object = [
    {
      name: 'col1',
      options: [
        
      ]
    }
  ];

  dutyAttribute: any;
  dutyLevel: any;
  num: any;
  user: any;
  onUpdate: any;
  canCreate: boolean=false;
  showMore: boolean=true;
  item: any;
  yesOrNo: boolean=true;
  canUpdateNum: boolean=true;
  title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dicProvider: DicProvider,
    public bzInfoProvider: BzInfoProvider,
    public popoverCtrl: PopoverController
  ) {
    this.canCreate = this.navParams.get('canCreate');
    this.showMore = this.navParams.get('showMore');
    this.user = this.navParams.get('user');
    this.onUpdate = this.navParams.get('onUpdate');
    this.item = this.navParams.get('position');
    this.title = this.navParams.get('title');
    this.yesOrNo = this.showMore;
    this.canUpdateNum = this.showMore;
    console.log(this.item, 'this.iteem')
    console.log(this.user, 'this.user');
    console.log(this.showMore)
    this.getAttr();
    this.getRank();
  }

  getAttr() {
    this.dicProvider.getDicItemList({dicTypeCode: 'JDRS0014'}).subscribe(
      (list) => {
        console.log(list);
        list.forEach((item, index, list)=>{
          let obj = {
            text: item.dicItemName,
            value: item.dicItemCode
          };
          this.weaveType[0].options.push(obj);
          if(this.showMore && (this.item.dutyAttribute == item.dicItemName)){
            this.dutyAttribute = item.dicItemCode;
            this.num = this.item.verifiedNum;
          }
        })
      }
    );
  }
  getRank() {
    this.dicProvider.getDicItemList({dicTypeCode: 'JDRS0006'}).subscribe(
      (list) => {
        console.log(list);
        list.forEach((item, index, list)=>{
          let obj = {
            text: item.dicItemName,
            value: item.dicItemCode
          };
          this.moneySource[0].options.push(obj);
          if(this.showMore && (this.item.dutyLevel == item.dicItemName)){
            this.dutyLevel = item.dicItemCode;
          }
        })
      }
    );
  }


  popover(event){
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          // icon: 'md-gongzuorizhi',
          text: '修改',
          handler: () => {
            this.canCreate = true;
            this.canUpdateNum = false;
            this.title = '修改班子职数';
            popover.dismiss();
          }
        },
        {
          // icon: 'md-gongzuorizhi',
          text: '删除',
          handler: () => {
            this.bzInfoProvider.delPosition({leaderId: this.item.leaderId}).subscribe(
              (data)=>{
                console.log(data)
                this.navCtrl.pop();
                this.onUpdate();
              }
            )
            popover.dismiss();
          }
        },
      ]
    }, {
        cssClass: 'mini'
      });
    popover.present({
      ev: event
    });
  }
  
  saveData() {

    if(this.showMore){
      let params = {
        leaderId: this.item.leaderId,
        unitId: this.user.orgId,
        dutyLevel: this.dutyLevel,
        dutyAttribute: this.dutyAttribute,
        verifiedNum: this.num
      }
      console.log(params, 'else')
      this.bzInfoProvider.updatePosition(params).subscribe(
        (data) => {
          this.canCreate = false;
          this.navCtrl.pop();
          console.log(data, 123);
          this.onUpdate();
        }
      )
    }else{
      this.canCreate = false;
      let params = {
        unitId: this.user.orgId,
        dutyLevel: this.dutyLevel,
        dutyAttribute: this.dutyAttribute,
        verifiedNum: this.num
      }
      console.log(params, 'else')
      this.bzInfoProvider.addBzPosition(params).subscribe(
        (data) => {
          this.canCreate = false;
          this.navCtrl.pop();
          console.log(data, 123);
          this.onUpdate();
        }
      )
    }

    
    // this.navCtrl.pop();
  }
  
}
