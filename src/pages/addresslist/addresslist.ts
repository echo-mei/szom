import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';


@IonicPage()
@Component({
  selector: 'page-addresslist',
  templateUrl: 'addresslist.html',
})
export class AddresslistPage {

  friendList: Array<object> = [{
    name: 'haha',
    group:'1'
  }];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public AddresslistProvider: AddresslistProvider) {
      this.getFriendList();
  }
  ionViewDidLoad() {
    
  }

  goAddresslistNew() {
    this.navCtrl.push('AddresslistNewPage');
  }

  goAddresslistOther() {
    this.navCtrl.push('AddresslistOtherPage');
  }

  goTeamlistUnit() {
    this.navCtrl.push('TeamListUnitPage');
  }

  goSearch() {
    this.navCtrl.push('AddresslistSearchPage');
  }

  getFriendList() {
    this.AddresslistProvider.getFriendsList(1).subscribe(
      (data) => {
        this.friendList = data;
        console.log(this.friendList);
      }
    );
  }

}
