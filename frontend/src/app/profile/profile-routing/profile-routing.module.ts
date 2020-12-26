import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileArticlesComponent } from '../profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from '../profile-favorites/profile-favorites.component';
import { ProfileResolver } from '../profile.resolver';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver,
    },
    children: [
      {
        path: '',
        component: ProfileArticlesComponent,
      },
      {
        path: 'favorites',
        component: ProfileFavoritesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
