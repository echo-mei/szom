import { Component, Input } from '@angular/core';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'list-item',
  templateUrl: 'list-item.html'
})
export class ListItemComponent {
  @Input() log: any;
  @Input() selectString: any;
  @Input() getImageUrl: any;
  constructor(
    public storage: StorageProvider,
  ) {
  
  }
}
