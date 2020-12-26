import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileResolver } from './profile.resolver';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing/profile-routing.module';

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [
    ProfileArticlesComponent,
    ProfileComponent,
    ProfileFavoritesComponent,
  ],
  providers: [ProfileResolver],
})
export class ProfileModule {}
