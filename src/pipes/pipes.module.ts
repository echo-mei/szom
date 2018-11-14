import { NgModule } from '@angular/core';
import { HighLightPipe } from './high-light/high-light';
import { HowLongAgoPipe } from './how-long-ago/how-long-ago';
import { DigitalChineseConversionPipe } from './digital-chinese-conversion/digital-chinese-conversion';

@NgModule({
	declarations: [HighLightPipe,
    HowLongAgoPipe,
    DigitalChineseConversionPipe],
	imports: [],
	exports: [HighLightPipe,
    HowLongAgoPipe,
    DigitalChineseConversionPipe]
})
export class PipesModule {}
