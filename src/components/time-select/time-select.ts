import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'time-select',
  templateUrl: 'time-select.html'
})
export class TimeSelectComponent {

  showPicker: boolean = false;

  startTime: any;
  endTime: any;

  @Input('showButtons') showButtons: boolean;

  @Output('onChange') onChange = new EventEmitter();
  @Output('onReset') onReset = new EventEmitter();
  @Output('onSure') onSure = new EventEmitter();

  constructor() {
    this.startTime = '请选择';
  }

  onChangeStart() {
    this.onChange.emit(null);
  }

  onChangeEnd() {
    this.onChange.emit(null);
  }

}
