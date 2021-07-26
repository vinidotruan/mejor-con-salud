import { Component, Input, OnInit } from '@angular/core';
import { DateHelperService } from '../shared/services/date-helper.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input() public article;
  constructor(public dateHelper: DateHelperService) {}

  ngOnInit(): void {}

  public limtitText = (text: string, limiter: number): string => {
    return text.slice(0, limiter) + '...(ler mais)';
  };
}
