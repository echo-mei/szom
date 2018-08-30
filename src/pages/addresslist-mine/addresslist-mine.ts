import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';

@Component({
  selector: 'page-addresslist-mine',
  templateUrl: 'addresslist-mine.html',
})
export class AddresslistMinePage {

  friendKeyList: any = [];
  friendValueList: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider
  ) {
    this.getFriendList();
  }

  getFriendList() {
    this.addresslistProvider.getMyFriendsList().subscribe(
      (data) => {
        for(let key in data) {
          this.friendKeyList.push(key);
          this.friendValueList.push(data[key]);
        }
      }
    );
  }

}