import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-like-statistics',
  templateUrl: 'like-statistics.html',
})
export class LikeStatisticsPage {

  @ViewChild('wrapper') wrapper: ElementRef;

  stlikeList: any;
  stlikeSum: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public renderer2: Renderer2,
    public elementRef: ElementRef
    ) {
    this.stlikeList = this.navParams.get('stlikeList');
    this.stlikeSum = this.navParams.get('stlikeSum');
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
