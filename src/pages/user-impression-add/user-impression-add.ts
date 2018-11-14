import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImpressionProvider } from '../../providers/impression/impression';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { notEmojiValidator } from '../../directives/not-emoji/not-emoji';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-user-impression-add',
  templateUrl: 'user-impression-add.html',
})
export class UserImpressionAddPage {

  form: FormGroup;

  onAdd: (tag) => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public impressionProvider: ImpressionProvider,
    public emojiProvider: EmojiProvider,
    public formBuilder: FormBuilder,
    public statusBar: StatusBar
  ) {
    this.onAdd = this.navParams.get('onAdd');
    this.form = this.formBuilder.group({
      tagName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(8),
        notEmojiValidator(),
      ])]
    });
  }

  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewWillLeave() {
    this.statusBar.styleDefault();
  }

  addImpression() {
    this.impressionProvider.add({
      tagName: this.form.value.tagName
    }).subscribe(
      (tag) => {
        this.navCtrl.pop();
        this.onAdd && this.onAdd(tag);
      }
    );
  }

}
