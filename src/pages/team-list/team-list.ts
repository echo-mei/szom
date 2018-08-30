import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PersonListTeamPage } from '../person-list-team/person-list-team';

/**
 * Generated class for the TeamListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-team-list',
  templateUrl: 'team-list.html',
})
export class TeamListPage {

  teamlist=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamListPage');
    this.teamlist = [
      {text:"领导班子"},
      {text:"第一秘书处"},
      {text:"第二秘书处(挂机关党委办公室牌子)"},
      {text:"综合处"},
      {text:"经济处"},
      {text:"财金处"},
      {text:"城建处"},
      {text:"社会一处"},
      {text:"社会二处"},
      {text:"信息化处"},
      {text:"新闻处"},
      {text:"绩效考核处"},
      {text:"市政府督查厅"}
    ];
  }

  getPersonList() {
    this.navCtrl.push(PersonListTeamPage);
  }
}
