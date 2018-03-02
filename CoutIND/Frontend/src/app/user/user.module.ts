import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


@NgModule({
  imports: [ThemeModule, UserRoutingModule],
  declarations: [UserComponent],
  entryComponents: [],
  providers: []
})
export class UserModule {}

