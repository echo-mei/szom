import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { DateTimeComponent } from './date-time/date-time';
@NgModule({
	declarations: [ProgressBarComponent,
    DateTimeComponent],
	imports: [],
	exports: [ProgressBarComponent,
    DateTimeComponent]
})
export class ComponentsModule {}
