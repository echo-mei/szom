import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
/**
 * Generated class for the TeamListUnitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-list-unit',
  templateUrl: 'team-list-unit.html',
})
export class TeamListUnitPage {

  // teamlist=[];
  public teamlist: any;
  public personList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public addresslistProvider: AddresslistProvider) {
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
        this.navCtrl.push('PersonListTeamPage', {
          personList: this.personList
        });
      }
    );
    
  }

}
