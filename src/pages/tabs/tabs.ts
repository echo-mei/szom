import { Component, ViewChild, EventEmitter } from '@angular/core';
import { Events, App, Tabs} from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { StorageProvider } from '../../providers/storage/storage';
import { MenuProvider } from '../../providers/menu/menu';
import { WorkspacePage } from '../workspace/workspace';
import { AddresslistPage } from '../addresslist/addresslist';
import { DynamicPage } from '../dynamic/dynamic';
import { MePage } from '../me/me';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  @ViewChild('tabs') tabs: Tabs;

  workspace = WorkspacePage;
  addresslist = AddresslistPage;
  dynamic = DynamicPage;
  dynamicParams = {
    eve: new EventEmitter()
  };
  me = MePage;

  constructor(
    public addresslistProvider: AddresslistProvider,
    public events: Events,
    public menuProvider: MenuProvider,
    public storage: StorageProvider,
    public websocketProvider: WebsocketProvider,
    public app: App
  ) {
    this.hasNewStAttention();
  }

  hasNewStAttention() {
    this.addresslistProvider.hasNewStAttention().subscribe(
      (obj) => {
        obj=='true' && (this.storage.newAttention = 'Y');
      }
    );
  }

  onSelectAddresslistTab(){
  }

  onSelectDynamicTab() {
    this.dynamicParams.eve.emit({name: 'load'});
  }

}
