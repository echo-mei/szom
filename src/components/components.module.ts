import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ImagePickerComponent } from './image-picker/image-picker';
import { TimeSelectComponent } from './time-select/time-select';

@NgModule({
	declarations: [
    ImagePickerComponent,
    TimeSelectComponent
  ],
	imports: [
    IonicModule
  ],
	exports: [
    ImagePickerComponent,
    TimeSelectComponent
  ],
  entryComponents: [
    ImagePickerComponent
  ]
})
export class ComponentsModule {}
