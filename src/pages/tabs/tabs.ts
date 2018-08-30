import { Component } from '@angular/core';
import { Events} from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { StorageProvider } from '../../providers/storage/storage';
import { MenuProvider } from '../../providers/menu/menu';
import { WorkspacePage } from '../workspace/workspace';
import { AddresslistPage } from '../addresslist/addresslist';
import { DynamicPage } from '../dynamic/dynamic';
import { MePage } from '../me/me';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { WEBSOCKET_URL } from '../../config';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  hasNewFollow: boolean;
  hasNewDynamic: boolean;

  workspace = WorkspacePage;
  addresslist = AddresslistPage;
  dynamic = DynamicPage;
  me = MePage;

  constructor(
    public addresslistProvider: AddresslistProvider,
    public events: Events,
    public menuProvider: MenuProvider,
    public storage: StorageProvider,
    public websocketProvider: WebsocketProvider
  ) {
    if(this.storage.get('token')) {
      this.menuProvider.listMenuTree().subscribe(
        (menus) => {
          this.menuProvider.storeMenu(menus);
        }
      );
      this.hasNewStAttention();
      this.events.subscribe('ws-addresslist', () => this.hasNewFollow = true);
      this.events.subscribe('ws-dynamic', () => this.hasNewDynamic = true);
    }
  }

  initData(){
    this.events.publish("dynamicListInit");
  }

  hasNewStAttention() {
    this.addresslistProvider.hasNewStAttention().subscribe(
      (obj) => {
        this.hasNewFollow = obj=='true' ? true : false;
      }
    );
  }

  onSelectAddresslistTab() {
    this.addresslistProvider.updateToViewed().subscribe(
      () => {
        this.hasNewFollow = false;
      }
    );
  }

}
