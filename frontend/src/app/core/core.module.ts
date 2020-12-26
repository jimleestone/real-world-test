import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import {
  ApiService,
  ArticlesService,
  AuthGuardService,
  CommentsService,
  JwtService,
  ProfilesService,
  TagsService,
  UserService,
} from './services';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },

    ApiService,
    ArticlesService,
    AuthGuardService,
    CommentsService,
    JwtService,
    ProfilesService,
    TagsService,
    UserService,
  ],
})
export class CoreModule {}
