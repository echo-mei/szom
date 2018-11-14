import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import * as Sortable  from 'sortablejs';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-bz-info-sort-user',
  templateUrl: 'bz-info-sort-user.html',
})
export class BzInfoSortUserPage {

  teamName: any;
  personList: any;
  choosePeosonId: any;
  onSortUpdate: any;
  requestList = [];
  isSort: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public bzProvider: BzInfoProvider,
    public storage: StorageProvider
  ) {
    this.teamName = this.navParams.get('teamName');
    this.onSortUpdate = this.navParams.get('onSortUpdate');
    this.getBzMember();
  }

  getBzMember() {
    let params = {
      unitId: this.storage.me.orgId
    }
    this.bzProvider.getBzInfoMember(params).subscribe(
      (list) => {
        let sum = 0;
        this.personList = list;
        this.personList.forEach((item, index, list)=>{
          item['orderNo'] = index;
        })
      }
    )
  }
  // =================== Public Methods =====================
  // 排序操作
  ngOnInit() {    
    let me = this;
    Sortable.create(document.getElementById('dragList'), {
      handle: ".drag",
      onChoose: function(event){
        me.choosePeosonId = me.personList[event.oldIndex];
      },
      onStart:function(event){
      },
      onUpdate:function(event) {
        if(event.oldIndex < event.newIndex){
          let startNum = me.personList[event.oldIndex];
          for(var i=event.oldIndex; i<=event.newIndex; i++){
            i<event.newIndex ? me.personList[i] = me.personList[i+1]:me.personList[i] = startNum;
            
          }
        }else{
          let startNum = me.personList[event.oldIndex];
          for(var i=event.oldIndex; i>=event.newIndex; i--){
            i > event.newIndex ? me.personList[i] = me.personList[i-1]:me.personList[i] = startNum;
            
          }
        }
        me.isSort = false;
      },
      onEnd:function(event){
        
      }
    });
  }

  sendSortReq() {
    
    this.personList.forEach((item, index, list)=>{
      item['orderNo'] = index;
    })
    this.bzProvider.bzSort(this.personList).subscribe(
      req => {
        this.onSortUpdate && this.onSortUpdate();
      }
    )
    this.navCtrl.pop();
  }
  

}
