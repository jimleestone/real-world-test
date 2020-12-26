import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { NoAuthGuardService } from './no-auth-guard.service';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [AuthComponent],
  providers: [NoAuthGuardService],
})
export class AuthModule {}
