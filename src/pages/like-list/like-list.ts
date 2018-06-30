import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the LikeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-like-list',
  templateUrl: 'like-list.html',
})
export class LikeListPage {

  likerList:object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.likerList = this.navParams.get("liker");
    console.log(this.likerList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikeListPage');
  }

}
