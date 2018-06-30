import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  workspace = 'WorkspacePage';
  addresslist = 'AddresslistPage';
  dynamic = 'DynamicPage';
  me = 'MePage';

  constructor(

  ) {
  }

}
