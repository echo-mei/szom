import { NgModule } from '@angular/core';
import { PopSelectComponent } from './pop-select/pop-select';
import { ImagePickerComponent } from './image-picker/image-picker';
@NgModule({
	declarations: [PopSelectComponent,
    ImagePickerComponent],
	imports: [],
	exports: [PopSelectComponent,
    ImagePickerComponent]
})
export class ComponentsModule {}
