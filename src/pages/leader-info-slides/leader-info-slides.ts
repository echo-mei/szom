import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-leader-info-slides',
  templateUrl: 'leader-info-slides.html',
})
export class LeaderInfoSlidesPage {

  index: number = 0;

  user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.index = this.navParams.get('index');
    this.user = this.navParams.get('user');
  }

}
