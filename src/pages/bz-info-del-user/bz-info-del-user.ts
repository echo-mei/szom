import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-bz-info-del-user',
  templateUrl: 'bz-info-del-user.html',
})
export class BzInfoDelUserPage {

  teamName: any;
  me: any;
  personList: any;
  selectPeople: any;
  list = [];
  userCodes: any;
  onUpdate: any;
  selectString: any;
  personKeyList = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bzInfoProvider: BzInfoProvider,
    public userProvider:UserProvider,
  ) {
    this.teamName = this.navParams.get('teamName');
    this.me = this.navParams.get('me');
    this.onUpdate = this.navParams. get('onUpdate');
    this.getBzMember();
  }

  getBzMember() {
    let params = {
      unitId:this.me.orgId
    }
    this.bzInfoProvider.getBzInfoMember(params).subscribe(
      (list) => {
        this.personList = list;
      }
    )
  }

  searchPerson() {
    let params = {};
    if(this.selectString){
      params['keywords'] = this.selectString;
      params['unitId'] = this.me.orgId;
    }else{
      this.personList = [];
      this.getBzMember();
      return
    };
    this.bzInfoProvider.getBzInfoMember(params).subscribe(
      list => {
        this.personList = list;
      }
    )
  }

  onClickSearch() {
    this.searchPerson();
  }

  updateCucumber(user) {
    this.selectPeople = user;
    user.select = !user.select;
    if(this.list.indexOf(user.leaderTeamMemberId) <  0){
      this.list.push(user.leaderTeamMemberId);
    }else{
      this.list.splice(this.list.indexOf(user.leaderTeamMemberId), 1)
    }
    this.userCodes = this.list.join(',');
  }


  delMember() {
    this.bzInfoProvider.delBzMember({leaderTeamMemberIds: this.userCodes}).subscribe(
      res => {
        this.navCtrl.pop();
        this.onUpdate && this.onUpdate();
      }
    );

  }
}
