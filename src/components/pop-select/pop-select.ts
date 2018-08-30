import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'pop-select',
  templateUrl: 'pop-select.html'
})
export class PopSelectComponent {

  buttons: [
    {
      text: '',
      handler: () => {}
    }
  ];

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.buttons = navParams.get('buttons');
  }

  public getNavCtrl() {
    return this.navCtrl;
  }

}
