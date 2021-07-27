import { Component, OnInit } from '@angular/core';
import {
  DomSanitizer,
  Meta,
  MetaDefinition,
  SafeHtml,
} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ErrorAlertComponent } from '../shared/components/error-alert/error-alert.component';
import { ArticlesService } from '../shared/services/articles.service';
import { DateHelperService } from '../shared/services/date-helper.service';
import { GenericModalHelperService } from '../shared/services/generic-modal-helper.service';
import { LoaderHelperService } from '../shared/services/loader-helper.service';

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
    public dateHelper: DateHelperService,
    private loaderHelperService: LoaderHelperService,
    private genericModalService: GenericModalHelperService,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.loaderHelperService.showLoader();
    this.articleService.getById(this.route.snapshot.params.article).subscribe(
      (response) => {
        this.article = response;
        this.setMeta(this.article?.metas);
      },
      (error) => {
        console.log(error);
        this.genericModalService.showModal(ErrorAlertComponent);
      },
      () => {
        this.loaderHelperService.hideLoader();
      }
    );
  }

  public getSanitizedContent = (): SafeHtml => {
    const style = '<style> img.size-full { width: 100% !important }</style>';
    return this.sanitizer.bypassSecurityTrustHtml(this.article.content + style);
  };

  public getSanitized = (content: string): SafeHtml => {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  };

  public setMeta(tags: any) {
    const formatedTags: MetaDefinition[] = [
      { name: 'title', content: tags['title'] },
      { name: 'description', content: tags['description'] },
      { name: 'robots', content: tags['robots'] },
      { name: 'ampUrl', content: tags['ampUrl'] },
      { property: 'article:author', content: tags['article:author'] },
      { property: 'og:local', content: tags['og:local'] },
      { property: 'og:title', content: tags['og:title'] },
      { property: 'og:description', content: tags['og:description'] },
      { property: 'og:type', content: tags['og:type'] },
      { property: 'og:site_name', content: tags['og:site_name'] },
      { property: 'og:image', content: tags['og:image'] },
      { property: 'og:alt', content: tags['og:alt'] },
    ];

    this.metaService.addTags(formatedTags);
  }
}
