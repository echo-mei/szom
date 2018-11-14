import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopSelectComponent } from '../../components/pop-select/pop-select';
import { DicProvider } from '../../providers/dic/dic';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';

@Component({
  selector: 'page-bz-weave-add',
  templateUrl: 'bz-weave-add.html',
})
export class BzWeaveAddPage {
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
  budgetFromCode: any;
  hcCode: any;
  num: any;
  canCreate: boolean=false;
  showMore: boolean=true;
  user: any;
  onUpdate: any;
  item: any;
  yesOrNo: boolean=true;
  canUpdateNum: boolean=true;
  title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public bzInfoProvider: BzInfoProvider,
    public dicProvider: DicProvider
  ) {
    this.user = this.navParams.get('user');
    this.canCreate = this.navParams.get('canCreate');
    this.showMore = this.navParams.get('showMore');
    this.onUpdate = this.navParams.get('onUpdate');
    this.item = this.navParams.get('item');
    this.title = this.navParams.get('title');
    this.yesOrNo = this.showMore;
    this.canUpdateNum = this.showMore;
    this.getType();
    this.getMoney();
  }


  getType() {
    this.dicProvider.getDicItemList({dicTypeCode: 'JDRS0102'}).subscribe(
      (list) => {
        list.forEach((item, index, list)=>{
          let obj = {
            text: item.dicItemName,
            value: item.orderNo
          };
          this.weaveType[0].options.push(obj);
          if(this.showMore && (this.item.hcCode == item.dicItemName)){
            this.hcCode = item.orderNo;
            this.num = this.item.verifiedNum;
          }
        })
      }
    );
  }
  getMoney() {
    this.dicProvider.getDicItemList({dicTypeCode: 'JDRS0103'}).subscribe(
      (list) => {
        list.forEach((item, index, list)=>{
          let obj = {
            text: item.dicItemName,
            value: item.orderNo
          };
          this.moneySource[0].options.push(obj);
          if(this.showMore && (this.item.budgetFromCode == item.dicItemName)){
            this.budgetFromCode = item.orderNo;
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
            this.title = "修改班子编制";
            popover.dismiss();
          }
        },
        {
          // icon: 'md-gongzuorizhi',
          text: '删除',
          handler: () => {
            this.bzInfoProvider.delWeave({hcId: this.item.hcId}).subscribe(
              (data)=>{
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
        hcId: this.item.hcId,
        unitId: this.item.unitId,
        hcCode: this.hcCode,
        budgetFromCode: this.budgetFromCode,
        verifiedNum: this.num
      }
      this.bzInfoProvider.updateWeave(params).subscribe(
        (data) => {
          this.canCreate = false;
          this.navCtrl.pop();
          this.onUpdate();
        }
      )
    }else{
      let params = {
        unitId: this.user.orgId,
        hcCode: this.hcCode,
        budgetFromCode: this.budgetFromCode,
        verifiedNum: this.num
      }
      this.bzInfoProvider.addBzWeave(params).subscribe(
        (data) => {
          this.canCreate = false;
          this.navCtrl.pop();
          this.onUpdate();
        }
      )
    }
  }
}
