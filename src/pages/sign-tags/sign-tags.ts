import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SignProvider } from '../../providers/sign/sign';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-sign-tags',
  templateUrl: 'sign-tags.html',
})
export class SignTagsPage {

  @ViewChild('wrapper') wrapper: ElementRef;

  tags: any[];

  onSign: () => {};

  date;

  selectedTag;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public signProvider: SignProvider,
    public viewCtrl: ViewController,
    public storage: StorageProvider,
    public renderer2: Renderer2,
    public elementRef: ElementRef
  ) {
    this.date = new Date();
    this.tags = this.navParams.get('tags');
    this.onSign = this.navParams.get('onSign');
    this.selectedTag = this.navParams.get('selectedTag');
  }

  selectTag(tag) {
    this.selectedTag = tag;
    this.sign();
  }

  sign() {
    if(!this.selectedTag) {
      return;
    }
    let sign = {
      signInType: this.selectedTag.dicItemCode
    };
    this.signProvider.signIn(sign).subscribe(
      () => {
        this.close();
        this.onSign();
      }
    );
  }

  close() {
    this.wrapper.nativeElement.classList.add('slideOutDown', 'fast');
    const modal = this.renderer2.parentNode(this.renderer2.parentNode(this.elementRef.nativeElement));
    this.renderer2.addClass(modal, 'animated');
    this.renderer2.addClass(modal, 'fadeOut');
    this.renderer2.addClass(modal, 'fast');
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 250);
  }

}
