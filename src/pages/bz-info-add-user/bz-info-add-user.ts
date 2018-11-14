import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { StorageProvider } from '../../providers/storage/storage';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { UserProvider } from '../../providers/user/user';
import { BzInfoPage } from '../bz-info/bz-info';

@Component({
  selector: 'page-bz-info-add-user',
  templateUrl: 'bz-info-add-user.html',
})
export class BzInfoAddUserPage {

  teamName: any;
  isShowList: boolean=false;
  mylist = [];
  boolShow = {};
  me: any;
  unitList = [];
  personKeyList = [];
  personList = [];
  showSearch: boolean;
  userCodes: string;
  tempUC = [];
  list = [];
  selectPeople: any;
  selectString: any;
  onAdd: any;
  isAdd = {};
  index:any;
  indexList = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider,
    public bzInfoProvider: BzInfoProvider,
    public storageProvider: StorageProvider,
    public userProvider: UserProvider,
    public events: Events
  ) {
    this.me = this.navParams.get('me');
    this.teamName = this.navParams.get('teamName');
    this.showSearch = this.navParams.get('showSearch');
    this.onAdd = this.navParams. get('onAdd');
    this.getUnit();
    this.getPerson();
  }

  getUnit():any {
    let organizationId;
    this.me.userCode == this.storageProvider.me.userCode ? organizationId = this.me.orgId : organizationId = this.me.organizationId;

    this.bzInfoProvider.getChildOrgList({orgId: organizationId}).subscribe(
      (list) => {
        this.unitList = list;
      }
    );
  }

  getPerson(): any {
    let organizationId;
    this.me.userCode == JSON.parse(this.storageProvider.get('me')).userCode ? organizationId = this.me.orgId : organizationId = this.me.organizationId;
    this.bzInfoProvider.getUnitPeople({
      organizationId: organizationId,
    }).subscribe(
      (list) => {
        for(let key in list) {
          this.personKeyList.push(key);
          this.personList.push(list[key]);
        }
      }
    );
  }

  goNextUnit(item){
    this.navCtrl.push(BzInfoAddUserPage, {
      me: item,
      teamName: item.orgName,
      showSearch: false,
      onAdd: this.onAdd.bind(this)
    })
  }

  searchPerson() {
    let params = {};
    if(this.selectString){
      params['keywords'] = this.selectString;
    }else{
      this.personKeyList = [];
      this.personList = [];
      this.getPerson();
      // params['keywords'] = '';
      return
    };
    this.bzInfoProvider.addSearchMember(params).subscribe(
      list => {
        this.personKeyList = [];
        this.personList = [];
        for(let key in list) {
          this.personKeyList.push(key);
          this.personList.push(list[key]);
        }
      }
    )
  }

  searchUnit(){
    let params = {};
    if(this.selectString){
      params['keyWords'] = this.selectString;
    }else{
      this.getUnit();
      // params['keyWords'] = '';
      return;
    };
    this.bzInfoProvider.unitSearchMember(params).subscribe(
      list => {
        this.unitList = list;
      }
    )
  }
  onClickSearch(){
    this.searchUnit();
    this.searchPerson();
  }

  goUserInfo(user){
    if(user.userCode==this.storageProvider.me.userCode) {
      this.navCtrl.push(MeInfoPage);
    }else {
      this.navCtrl.push(UserInfoPage, {
        user: user,
        followOrCancel: true,
        showSelfInfo: true,
        showDaily: true,
        showTags: true
      });
    }
  }



  updateCucumber(user) {
    this.selectPeople = user;
    user.select = !user.select;

    if(this.list.indexOf(user.userCode) <  0){
      this.list.push(user.userCode);
    }else{
      this.list.splice(this.list.indexOf(user.userCode), 1)
    }
    this.userCodes = this.list.join(',');
  }

  addMember() {

    this.list = [];

    this.bzInfoProvider.addBzMember({unitId: this.selectPeople.unitId,userCode: this.userCodes}).subscribe(
      res => {
        this.selectString = '';
        this.onAdd && this.onAdd();
        this.personKeyList = [];
        this.personList = [];
        this.getPerson();
        this.getUnit();
      }
    );
  }

}
