import { NgModule } from '@angular/core';

import {ImagePickerComponent} from './image-picker';

import {IonicModule} from 'ionic-angular';

@NgModule({

declarations:[ImagePickerComponent],

imports:[IonicModule],

exports:[ImagePickerComponent]

})

export class ImagePickerModule{}