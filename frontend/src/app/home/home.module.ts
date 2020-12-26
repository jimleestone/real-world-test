import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { HomeAuthResolver } from './home-auth.resolver';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [HomeComponent],
  providers: [HomeAuthResolver],
})
export class HomeModule {}
