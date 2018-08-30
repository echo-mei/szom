import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WorkProvider } from '../../providers/work/work';

/**
 * Generated class for the TypeCustomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-type-custom',
  templateUrl: 'type-custom.html',
})
export class TypeCustomPage {

  typeName:string;

  onUpdateWeektableTypeList: () => {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public workProvider: WorkProvider) {
    this.onUpdateWeektableTypeList = this.navParams.get('onUpdateWeektableTypeList');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeCustomPage');
  }

  addWeektableType() {
    let params={
      typeName:this.typeName
    }
    this.workProvider.createWeektableType(params).subscribe(
      () => {
        this.navCtrl.pop();
        this.onUpdateWeektableTypeList();
      }
    );
  }
}

