import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'between-date-picker',
  templateUrl: 'between-date-picker.html'
})
export class BetweenDatePickerComponent {

  @ViewChild('wrapper') wrapper: ElementRef;

  // 确认后置事件
  afterSure: any;
  // 最小可选时间
  minDate: Date;
  // 最大可选时间
  maxDate: Date;

  // 每列的状态存储
  columnsProp: {
    startTime: number,
    startY: number,
    startIndex: number,
    trans: number
  }[] = [];
  // 当前在选为：开始|结束
  selectStartOrEnd: 'start' | 'end' = 'start';
  // 当前正在滚动列
  scrollColumnIndex: number;
  // 列
  columns: Column[] = [];
  // 按钮
  buttons: Button[] = [];
  // 开始时间
  startDate: any;
  // 结束时间
  endDate: any;

  constructor(
    public navParams: NavParams,
    public domSanitizer: DomSanitizer,
    public viewContrl: ViewController,
    public elementRef: ElementRef,
    public renderer2: Renderer2
  ) {
    this.afterSure = this.navParams.get('afterSure');
    this.minDate = this.navParams.get('minDate');
    this.maxDate = this.navParams.get('maxDate');
    this.initButtons();
    this.initColumns();
    this.selectNow();
  }

  // 初始化按钮
  initButtons() {
    this.buttons = [
      {
        text: '取消',
        handler: () => {
          this.dismiss();
        }
      },
      {
        text: '确定',
        cls: 'sure',
        handler: () => {
          let year = this.getSelectedData(0).value;
          let month = this.getSelectedData(1).value;
          let date = this.getSelectedData(2).value;
          if(this.selectStartOrEnd == 'start') {
            this.startDate = new Date(year, month, date);
            this.selectStartOrEnd = 'end';
          }else if(this.selectStartOrEnd == 'end') {
            this.endDate = new Date(year, month, date);
            this.selectStartOrEnd = 'start';
          }
          if(this.startDate && this.endDate) {
            this.dismiss();
            this.afterSure && this.afterSure(this.startDate, this.endDate);
          }
        }
      }
    ];
  }

  // 初始化列
  initColumns() {
    this.columns[0] = {data: []};
    this.columns[1] = {data: []};
    this.columns[2] = {data: []};
    this.initColumnsProp();
    let isLeapYear = (year) => {
      return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    }
    let getMonthDays = (year, month) => {
      return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
    }
    let now = new Date();
    let year = now.getFullYear();
    let setYearColumn = () => {
      let column = {
        data: [],
        onSelected: () => {
          setMonthColumn();
          setDayColumn();
        }
      };
      let minYear = this.minDate ? this.minDate.getFullYear() : 1900;
      let maxYear = this.maxDate ? this.maxDate.getFullYear() : year;
      for(let i=1900; i<=year; i++) {
        if(i < minYear || i > maxYear) {continue};
        column.data.push({text: i+'年', value: i});
      }
      this.columns[0] = column;
    }
    let setMonthColumn = () => {
      let selectedIndex = 0;
      let yearData = this.getSelectedData(0);
      let monthData = this.getSelectedData(1);
      let minMonth = this.minDate && this.minDate.getFullYear()==yearData.value ? this.minDate.getMonth()+1 : 1;
      let maxMonth = this.maxDate && this.maxDate.getFullYear()==yearData.value ? this.maxDate.getMonth()+1 : 12;
      let column = {
        data: [],
        onSelected: () => {
          setDayColumn();
        }
      };
      for(let i=1; i<=12; i++) {
        if(i < minMonth || i > maxMonth ) continue;
        column.data.push({text: i+'月', value: i-1});
        if(monthData && i-1 == monthData.value) {
          selectedIndex = column.data.length - 1;
        }
      }
      this.columns[1] = column;
      this.selectIndex(1, selectedIndex);
    }
    let setDayColumn = () => {
      let selectedIndex = 0;
      let yearData = this.getSelectedData(0);
      let monthData = this.getSelectedData(1);
      let dayData = this.getSelectedData(2);
      let days = getMonthDays(yearData.value, monthData.value);
      let minDay = this.minDate && this.minDate.getFullYear()==yearData.value && this.minDate.getMonth()==monthData.value ? this.minDate.getMonth()+1 : 1;
      let maxDay = this.maxDate && this.maxDate.getFullYear()==yearData.value && this.maxDate.getMonth()==monthData.value ? this.maxDate.getDate() : days;
      let column = {
        data: []
      };
      for(let i=1; i<=days; i++) {
        if(i < minDay || i > maxDay ) continue;
        column.data.push({text: i+'日', value: i});
        if(dayData && i == dayData.value) {
          selectedIndex = column.data.length - 1;
        }
      }
      if(dayData && dayData.value > column.data.length - 1) {
        selectedIndex = column.data.length - 1;
      }
      this.columns[2] = column;
      this.selectIndex(2, selectedIndex);
    }
    setYearColumn();
    setMonthColumn();
    setDayColumn();
  }

  // 初始化列属性
  initColumnsProp() {
    this.columnsProp = [];
    this.columns.forEach(() => {
      this.columnsProp.push({
        startTime: undefined,
        startY: undefined,
        startIndex: 0,
        trans: 0,
      });
    });
  }

  // 选中今天
  selectNow() {
    let now = new Date();
    this.selectIndex(0, now.getFullYear() - 1900);
    this.selectIndex(1, now.getMonth());
    this.selectIndex(2, now.getDate() - 1);
  }

  // 获取y坐标
  getEventY(event) {
    const changedTouches = event.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0];
      return touch.clientY;
    } else if (event.pageX !== undefined) {
      return event.pageY;
    }
  }

  // 获取第几列被选中的数据的索引
  getSelectedIndex(columnIndex: number) {
    let columnProp = this.columnsProp[columnIndex];
    let minIndex = 0;
    let maxIndex = this.columns[columnIndex].data.length - 1;
    let currentIndex = parseInt(-columnProp.trans / 44 + '');
    if(currentIndex<minIndex) currentIndex = minIndex;
    if(currentIndex>maxIndex) currentIndex = maxIndex;
    return currentIndex;
  }

  // 获取第几列被选中的数据
  getSelectedData(columnIndex: number) {
    return this.columns[columnIndex].data[this.getSelectedIndex(columnIndex)];
  }

  // 选择第几列的第几个数据
  selectIndex(columnIndex: number, index: number) {
    let columnProp = this.columnsProp[columnIndex];
    let columns = this.columns[columnIndex];
    if(index > columns.data.length-1) {
      index = columns.data.length-1;
    }else if(index < 0) {
      index = 0;
    }
    columnProp.trans = -index*44;
    columns.onSelected && columns.onSelected();
  }

  // 计算第几列第几个数据的样式
  style(columnIndex: number, index: number) {
    let columnProp = this.columnsProp[columnIndex];
    let currentIndex = this.getSelectedIndex(columnIndex);
    let style = `transform: translateY(${index * 44 + columnProp.trans}px)`;
    if(index < currentIndex - 2 || index > currentIndex + 2) {
      style = 'display:none;';
    }else if(index == currentIndex || index == currentIndex) {
      style += ` scale(1);`;
    }else if(index == currentIndex+1 || index == currentIndex-1) {
      style += ` scale(.9);opacity: 0.5;font-size: 18px;`;
    }else if(index >= currentIndex+2 || index <= currentIndex-2) {
      style += ` scale(.8);opacity: 0.4;font-size: 15px;`
    }
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

  mousedownColumn(event, columnIndex: number) {
    this.columnsProp[columnIndex].startY = this.getEventY(event);
    this.scrollColumnIndex = columnIndex;
    this.columnsProp[columnIndex].startTime = new Date().getTime();
    this.columnsProp[columnIndex].startIndex = this.getSelectedIndex(columnIndex);
  }

  mousemoveColumn(event) {
    let columnProp = this.columnsProp[this.scrollColumnIndex];
    if(!columnProp.startY) {
      return;
    }
    columnProp.trans = this.getEventY(event) - columnProp.startY - columnProp.startIndex*44;
  }

  mouseupColumn(event) {
    let columnIndex = this.scrollColumnIndex;
    let columnProp = this.columnsProp[columnIndex];
    let currentIndex;
    if((new Date().getTime() - columnProp.startTime) < 200) {  // 不开放此效果，后期优化
      let y = this.getEventY(event) - columnProp.startY;
      let interval;
      let speed = Math.abs(y/3) > 100 ? 100 : Math.abs(y/3);
      interval = setInterval(() => {
        y>0 ? columnProp.trans += speed : columnProp.trans -= speed;
        speed--;
        if(speed<=0) {
          clearInterval(interval);
          currentIndex = this.getSelectedIndex(columnIndex);
          this.selectIndex(columnIndex, currentIndex);
        }
      });
    }else {
      currentIndex = this.getSelectedIndex(columnIndex);
      this.selectIndex(columnIndex, currentIndex);
    }
  }

  dismiss() {
    this.wrapper.nativeElement.classList.add('slideOutDown', 'fast');
    const modal = this.renderer2.parentNode(this.renderer2.parentNode(this.elementRef.nativeElement));
    this.renderer2.addClass(modal, 'animated');
    this.renderer2.addClass(modal, 'fadeOut');
    this.renderer2.addClass(modal, 'fast');
    setTimeout(() => {
      this.viewContrl.dismiss();
    }, 250);
  }

}

export interface Button {
  text: string,
  cls?: string,
  handler?: any
}

export interface Column {
  data: ColumnData[],
  onSelected?: any
}

export interface ColumnData {
  text: string,
  value: any
}
