import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article, ArticlesService, UserService } from '../core';

@Injectable({
  providedIn: 'root',
})
export class EditableArticleResolver implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articlesService.get(route.params['slug']).pipe(
      map((article) => {
        if (
          this.userService.getCurrentUser().username === article.author.username
        ) {
          return article;
        } else {
          this.router.navigateByUrl('/');
        }
      }),
      catchError((err) => this.router.navigateByUrl('/'))
    );
  }
}
