import { NgModule } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../shared';
import { ArticleRoutingModule } from './article-routing/article-routing.module';
import { ArticleResolver } from './article.resolver';

@NgModule({
  imports: [SharedModule, ArticleRoutingModule],
  declarations: [ArticleComponent, ArticleCommentComponent, MarkdownPipe],

  providers: [ArticleResolver],
})
export class ArticleModule {}
