import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { StorageProvider } from '../../providers/storage/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  constructor(
    public app: App,
    public storage: StorageProvider
  ) {
  }

  reConnect() {
    if(navigator.onLine) {
      if(!this.storage.token) {
        this.app.getRootNav().setRoot(LoginPage);
      }else {
        this.app.getRootNav().setRoot(TabsPage);
      }
    }
  }

}
