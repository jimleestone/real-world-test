import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css'],
})
export class ArticleMetaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() article: Article;
}
