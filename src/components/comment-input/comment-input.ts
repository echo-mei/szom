import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { TextInput, Footer } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'comment-input',
  templateUrl: 'comment-input.html'
})
export class CommentInputComponent {

  @ViewChild('wrapper') wrapper: ElementRef;

  @ViewChild(Footer) footer: Footer;
  @ViewChild('commentInput') commentInput: TextInput;

  // 评论框文本输入值
  commentData: string = "";
  // 提示
  placeholder:string = "";
  // 点击发送事件
  onSend:any;

  // 最大输入限制
  maxLength = 98;

  constructor(
    public navParams: NavParams,
    public keyboard: Keyboard,
    public viewContrl: ViewController,
    public renderer2: Renderer2
  ) {
    this.placeholder = this.navParams.get('placeholder');
    this.commentData = this.navParams.get('commentData');
    this.onSend = this.navParams.get('onSend');
    this.keyboard.onKeyboardShow().subscribe(
      (e) => {
        this.wrapper.nativeElement.style.bottom = e.keyboardHeight + 'px';
      }
    );
    this.keyboard.onKeyboardHide().subscribe(
      (e) => {
        this.wrapper.nativeElement.style.bottom = '0px';
      }
    );
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.commentInput.setFocus();
    }, 150);
  }

  onClickSend(){
    this.dismiss().then(()=>this.onSend(this.commentData));
  }

  dismiss() {
    this.commentInput.setBlur();
    return this.viewContrl.dismiss({
      commentData: this.commentData
    });
  }
}
