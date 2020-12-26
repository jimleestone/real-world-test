import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared';
import { SettingsRoutingModule } from './settings-routing/settings-routing.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
