import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { notEmojiValidator } from '../../directives/not-emoji/not-emoji';

@Component({
  selector: 'page-bz-info-user-update-work',
  templateUrl: 'bz-info-user-update-work.html',
})
export class BzInfoUserUpdateWorkPage {

  fGongForm: FormGroup;
  maxLength: number = 196;
  user: any;
  onUpdate: any;
  divisiton: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bzInfoProvider: BzInfoProvider,
    public emojiProvider: EmojiProvider,
    public formBuilder: FormBuilder
  ) {
    this.user = this.navParams.get('user');
    this.onUpdate = this.navParams.get('onUpdate');
    this.divisiton = this.navParams.get = this.user.division;
    this.fGongForm = formBuilder.group({
      content: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxLength), notEmojiValidator()])]
    });
    this.fGongForm.controls['content'].setValue(this.divisiton);
  }

  update() {
    var me = this;
    let params = {
      leaderTeamMemberId: this.user.leaderTeamMemberId, 
      division: this.fGongForm.controls['content'].value
    }
    this.bzInfoProvider.updateDivision(params).subscribe(
      data => {
        this.navCtrl.pop();
        this.onUpdate();
      }
    )
  }
}
