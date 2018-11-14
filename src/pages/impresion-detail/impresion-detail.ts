import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-impresion-detail',
  templateUrl: 'impresion-detail.html',
})
export class ImpresionDetailPage {

  tagList: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.tagList = this.navParams.get('tagList');
    console.log(this.tagList)
  }

  
}
