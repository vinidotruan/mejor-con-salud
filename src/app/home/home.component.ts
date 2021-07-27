import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Response } from '../shared/models/response';
import { ArticlesService } from '../shared/services/articles.service';
import { LoaderHelperService } from '../shared/services/loader-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public searchKey: FormControl = new FormControl('');
  public searchResponse: Response;
  public currentPage: number = 1;
  public maxSize: number = 5;
  public isFiltered: boolean = false;
  private firstSearch: boolean = true;

  constructor(
    private articleService: ArticlesService,
    private loaderHelperService: LoaderHelperService
  ) {}

  ngOnInit(): void {}

  public search = (): void => {
    this.currentPage = 1;
    this.loaderHelperService.showLoader();
    this.articleService
      .search(this.searchKey.value)
      .subscribe((response: Response) => {
        this.searchResponse = response;
        this.isFiltered = false;
        this.firstSearch = true;
        this.loaderHelperService.hideLoader();
      });
  };

  public changePage = ({ page, itemsPerPage }): void => {
    if (this.firstSearch && page == 1) {
      this.firstSearch = false;
      return;
    }
    this.loaderHelperService.showLoader();
    this.articleService
      .search(this.searchKey.value, page)
      .subscribe((response) => {
        this.searchResponse = response;
        this.currentPage = page;
        this.loaderHelperService.hideLoader();
      });
  };

  public orderByRelevance = () => {
    this.loaderHelperService.showLoader();
    this.articleService
      .search(this.searchKey.value, this.currentPage, 'relevance')
      .subscribe((response) => {
        this.searchResponse = response;
        this.isFiltered = true;

        this.loaderHelperService.hideLoader();
      });
  };
}
