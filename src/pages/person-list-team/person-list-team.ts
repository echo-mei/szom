import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
/**
 * Generated class for the PersonListTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person-list-team',
  templateUrl: 'person-list-team.html',
})
export class PersonListTeamPage {

  // personList=[];
  public personList: any;
  public personInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public addresslistProvider: AddresslistProvider) {
    this.personList = navParams.get('personList')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonListTeamPage');
    // this.personList=[
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    //   {img:'',name:'张爱民',unit:'宣传科干事'},
    // ];
  }

  goUserInfo(pid) {
    this.addresslistProvider.getPersonInfo(pid).subscribe(
      (obj) => {
        this.personInfo = obj
        this.navCtrl.push('UserInfoPage', {
          personInfo: this.personInfo
        });
      }
    )
    
  }

}
