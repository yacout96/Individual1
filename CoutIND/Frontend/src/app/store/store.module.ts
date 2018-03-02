import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';

import { StoreRoutingModule } from './store-routing.module';

import { StoreComponent } from './store.component';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [ThemeModule,StoreRoutingModule,FormsModule],
    declarations: [StoreComponent],
    entryComponents: [],
    providers: []
})
export class StoreModule {}