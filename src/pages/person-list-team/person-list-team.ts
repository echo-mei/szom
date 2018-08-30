import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { UserProvider } from '../../providers/user/user';
import { UserInfoPage } from '../user-info/user-info';

@Component({
  selector: 'page-person-list-team',
  templateUrl: 'person-list-team.html',
})
export class PersonListTeamPage {

  // personList=[];
  public personList: any;
  public personInfo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider,
    public userProvider: UserProvider
  ) {
    this.personList = navParams.get('personList')
  }

  goUserInfo(pid) {
    this.addresslistProvider.getPersonInfo(pid).subscribe(
      (obj) => {
        this.personInfo = obj
        this.navCtrl.push(UserInfoPage, {
          personInfo: this.personInfo
        });
      }
    )

  }

}
