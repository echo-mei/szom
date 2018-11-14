import {ElementRef, HostListener, Directive, OnInit} from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})
export class Autosize implements OnInit {
  @HostListener('input', ['$event.target'])
  @HostListener('focus', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjust();
  }

  constructor(public element:ElementRef) {
  }

  ngOnInit():void {
    setTimeout(() => this.adjust(), 0);
  }

  adjust():void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'auto';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + "px";

    if(!textArea.value){
      textArea.style.height = 'auto';
    }
  }
}
