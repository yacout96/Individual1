import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ItemRoutingModule } from './item-routing.module';

import { ItemComponent } from './item.component';

@NgModule({
    imports: [ThemeModule, ItemRoutingModule],
    declarations: [ItemComponent],
    providers: []
})
export class ItemModule {}
