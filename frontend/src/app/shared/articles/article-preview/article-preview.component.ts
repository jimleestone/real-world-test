import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css'],
})
export class ArticlePreviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() article: Article;

  onToggleFavorite(favorited: boolean) {
    this.article['favorited'] = favorited;

    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }
}
