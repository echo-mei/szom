import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-daily-create',
  templateUrl: 'daily-create.html',
})
export class DailyCreatePage {
  
  public msg='父组件';
  single:boolean = false;
  dailyForm: FormGroup;   
  public dailyCreateList=[];
  // public storage=new StorageProvider();   /*new用可以实例化,但不推荐，推荐使用官方方法*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public events: Events,
    private storage:StorageProvider
  ) {
    this.single = this.navParams.get('single');
    this.dailyForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])]
    });
  }
  ionViewDidEnter(){//ionic生命周期ionViewDidEnter--->每次进入页面触发
    //  this.storage.setItem('title','20180702');
    //  this.storage.setItem('content','内容');
     var dailyCreateList=this.storage.getItem('dailyCreateList');
     var dailyCreateListArr=[];
     this.dailyCreateList.push(dailyCreateListArr);
  }
  postDailyCreate(){
    this.dailyProvider.createDaily(this.dailyForm.value).subscribe(
      () => {
        this.navCtrl.pop();
        this.events.publish('daily:create');

        /*************localStorage*****************/
        var dailyFormData=this.dailyForm.value;
        var dailyCreateList=this.storage.getItem('dailyCreateList');
        if(dailyCreateList){
          //如果存在数据
          dailyCreateList.push(dailyFormData);
          this.storage.setItem('dailyCreateList',dailyCreateList);
        }else{
            //如果没有数据
            var arr=[];
            arr.push(dailyFormData);
            this.storage.setItem('dailyCreateList',arr);
        }
      }
    );
  }

}
