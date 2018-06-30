import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';

@IonicPage()
@Component({
  selector: 'page-daily-update',
  templateUrl: 'daily-update.html',
})
export class DailyUpdatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  sendDataList: Array<object>;

  titleName: string;
  textName: string;

  single:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertController: AlertController,
    ) {
    this.single = this.navParams.get('single');
    this.titleName = this.navParams.get('title');
    this.textName = this.navParams.get('content');
  }
  //修改工作日志
  sendDailyList(){
    this.dailyProvider.sendDailyList(this.titleName,this.textName,null,null).subscribe(
      (data) => {
        this.sendDataList = data;
        this.navCtrl.pop();
      }
    )
  }

  goDailyList() {
    let that = this;
    let getcontent =function(data){
      return new Promise (
        resolve=>{
          if(data){
            that.titleName = data.title;
            that.textName = data.content;
          }else{
            console.log(data);
          }
          resolve();
        }
      ) 
    }
    this.navCtrl.push('DailyListRadioPage', {callback:getcontent});
  }

}
