import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input() public article;
  constructor() {}

  ngOnInit(): void {}

  public castDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  public limtitText = (text: string, limiter: number): string => {
    return text.slice(0, limiter) + '...(ler mais)';
  };
}
