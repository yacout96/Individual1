import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [ThemeModule, LoginRoutingModule,FormsModule],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule {}
