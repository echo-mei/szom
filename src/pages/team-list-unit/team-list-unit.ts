import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { UserProvider } from '../../providers/user/user';
import { PersonListTeamPage } from '../person-list-team/person-list-team';

@Component({
  selector: 'page-team-list-unit',
  templateUrl: 'team-list-unit.html',
})
export class TeamListUnitPage {

  // teamlist=[];
  public teamlist: any;
  public personList: any;
  showDetail:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider,
    public userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamListUnitPage');
    // this.teamlist = [
    //   {text:"领导班子"},
    //   {text:"组织一处"},
    //   {text:"组织二处"},
    //   {text:"干部一处"},
    //   {text:"干部二处"},
    //   {text:"干部三处"},
    //   {text:"干部教育培训处"}
    // ];
    let pid = 1;
    this.getTeamList(pid);
    this.personList = 1;
  }
  getTeamList(pid) {
    this.addresslistProvider.getTeamList(pid).subscribe(
      (obj) => {
        this.teamlist = obj;
      }
    )
  }
  getPersonList(uid) {
    this.addresslistProvider.getPersonList(uid).subscribe(
      (obj) => {
        this.personList = obj
        this.navCtrl.push(PersonListTeamPage, {
          personList: this.personList
        });
      }
    );

  }

}
