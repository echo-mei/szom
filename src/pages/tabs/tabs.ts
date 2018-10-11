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
    }
  }

  hasNewStAttention() {
    this.addresslistProvider.hasNewStAttention().subscribe(
      (obj) => {
        obj=='true' && this.storage.set('ws-addresslist', 'Y');
      }
    );
  }

  onSelectAddresslistTab(){
    this.storage.remove('ws-addresslist');
  }

  onSelectDynamicTab() {
    this.storage.remove('ws-dynamic');
    this.events.publish('dynamicListInit');
  }

}
