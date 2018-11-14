import { Component } from '@angular/core';

@Component({
  selector: 'not-found-person',
  templateUrl: 'not-found-person.html'
})
export class NotFoundPersonComponent {

  text: string;

  constructor() {
    console.log('Hello NotFoundPersonComponent Component');
    this.text = 'Hello World';
  }

}
