import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { notEmojiValidator } from '../../directives/not-emoji/not-emoji';

@Component({
  selector: 'page-bz-info-update-intro',
  templateUrl: 'bz-info-update-intro.html',
})
export class BzInfoUpdateIntroPage {
  maxLength: number = 196;
  introForm: FormGroup;
  introValue: any = '';
  teamName: any;
  teamDesc: any;
  leaderTeamId: any;
  unitId: any;

  onUpdate: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public emojiProvider: EmojiProvider,
    public bzInfoProvider: BzInfoProvider
  ) {
    this.teamName = this.navParams.get('teamName');
    this.onUpdate = this.navParams.get('onUpdate');
    this.teamDesc = this.navParams.get('teamDesc');
    this.leaderTeamId = this.navParams.get('leaderTeamId');
    this.unitId = this.navParams.get('unitId');
    this.introForm = formBuilder.group({
      content: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxLength), notEmojiValidator()])]
    })
    this.teamDesc ? '':this.teamDesc = '';
    this.introForm.controls['content'].setValue(this.teamDesc)
  }

  goSuccess() {
    this.teamDesc = this.introForm.controls['content'].value;
    let params = {
      leaderTeamId: this.leaderTeamId,
      teamName: this.teamName,
      teamDesc: this.teamDesc,
      unitId: this.unitId
    };
    this.bzInfoProvider.updateBzDesc(params).subscribe(
      data => {
        this.navCtrl.pop();
        this.onUpdate();
      }
    )
  }
}
