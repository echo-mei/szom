import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';

@IonicPage()
@Component({
  selector: 'page-daily-create',
  templateUrl: 'daily-create.html',
})
export class DailyCreatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;
  single:boolean = false;

  dailyId = 1;
  title:string = '';
  content:string = '';
  img:string = '';
  publisher = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public DailyProvider: DailyProvider,
    public alertController: AlertController,
  ) {
    this.single = this.navParams.get('single');
  }

  goDailyList() {
    let that = this;
    let getcontent =function(data){
      return new Promise (
        resolve=>{
          if(data){
            that.title = data.title;
            that.content = data.content;
          }else{
            console.log(data);
          }
          resolve();
        }
      )
    }
    this.navCtrl.push('DailyListRadioPage', {callback:getcontent});
  }

  postDailyCreate(){
    let params = {
      dailyId: this.dailyId,
      title: this.title,
      content: this.content,
      img: this.img,
      publisher: 1
    }
    this.DailyProvider.createDaily(params).subscribe(
      (data) => {
        console.log(data);
        this.dailyId +=1;
        this.navCtrl.pop();//返回上一级
      }
    );
  }


}
