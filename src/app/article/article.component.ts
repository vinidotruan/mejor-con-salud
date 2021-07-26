import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../shared/services/articles.service';
import { DateHelperService } from '../shared/services/date-helper.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  public article: any = {};
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticlesService,
    private sanitizer: DomSanitizer,
    public dateHelper: DateHelperService
  ) {}

  ngOnInit(): void {
    this.articleService
      .getById(this.route.snapshot.params.article)
      .subscribe((response) => (this.article = response));
  }

  public getSanitizedContent = (): SafeHtml => {
    const style = '<style> img.size-full { width: 100% !important }</style>';
    return this.sanitizer.bypassSecurityTrustHtml(this.article.content + style);
  };

  public getSanitized = (content: string): SafeHtml => {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  };
}
