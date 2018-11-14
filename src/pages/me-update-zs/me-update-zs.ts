import { Component, Input } from '@angular/core';
import { NavController, NavParams, ViewController, TextInput } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-me-update-zs',
  templateUrl: 'me-update-zs.html',
})
export class MeUpdateZsPage {

  title: any;
  attr: any;
  user: any;
  selfInfo: any;
  value: any;

  maxLength: number;
  selfForm: FormGroup;
  onUpdate: () => {}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController
  ) {
    this.title = navParams.get('title');
    this.attr = navParams.get('attr');
    this.user = navParams.get('user');
    this.selfInfo = navParams.get('selfInfo');
    this.onUpdate = navParams.get('onUpdate');
    this.maxLength = navParams.get('maxLength');
    this.selfInfo && (this.value = this.selfInfo[this.attr]);
    this.selfForm = formBuilder.group({
      content: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxLength)])]
    });
  }

  save() {
    let selfInfo = {
      ...this.selfInfo,
      personId: this.user.personId
    };
    selfInfo[this.attr] = this.value;
    this.userProvider.saveMySelfInfo(selfInfo).subscribe(
      () => {
        this.navCtrl.pop();
        this.onUpdate();
      }
    );
  }

  focus(textarea: TextInput) {
    textarea.setFocus();
  }

  onEnter(e) {
    this.value = this.value.replace(/[\r\n]/g,"");
  }

}
