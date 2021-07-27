import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorAlertComponent } from '../shared/components/error-alert/error-alert.component';
import { Response } from '../shared/models/response';
import { ArticlesService } from '../shared/services/articles.service';
import { GenericModalHelperService } from '../shared/services/generic-modal-helper.service';
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
  /**
   * Solução para poder resetar a paginação sempre
   * que uma pesquisa for feita após a troca de página
   */
  private firstSearch: boolean = true;

  constructor(
    private articleService: ArticlesService,
    private loaderHelperService: LoaderHelperService,
    private genericModalService: GenericModalHelperService
  ) {}

  ngOnInit(): void {}

  public search = (): void => {
    this.currentPage = 1;
    this.loaderHelperService.showLoader();
    this.articleService.search(this.searchKey.value).subscribe(
      (response: Response) => {
        this.searchResponse = response;
        this.isFiltered = false;
        this.firstSearch = true;
      },
      (error) => {
        console.log(error);
        this.genericModalService.showModal(ErrorAlertComponent);
      },
      () => {
        this.loaderHelperService.hideLoader();
      }
    );
  };

  public changePage = ({ page }): void => {
    if (this.firstSearch && page == 1) {
      this.firstSearch = false;
      return;
    }
    const orderBy = this.isFiltered ? 'relevance' : null;
    this.loaderHelperService.showLoader();
    this.articleService.search(this.searchKey.value, page, orderBy).subscribe(
      (response) => {
        this.searchResponse = response;
        this.currentPage = page;
        this.loaderHelperService.hideLoader();
      },
      (error) => {
        console.log(error);
        this.genericModalService.showModal(ErrorAlertComponent);
      },
      () => {
        this.loaderHelperService.hideLoader();
      }
    );
  };

  public orderByRelevance = () => {
    this.loaderHelperService.showLoader();
    this.articleService
      .search(this.searchKey.value, this.currentPage, 'relevance')
      .subscribe(
        (response) => {
          this.searchResponse = response;
          this.isFiltered = true;

          this.loaderHelperService.hideLoader();
        },
        (error) => {
          console.log(error);
          this.genericModalService.showModal(ErrorAlertComponent);
        },
        () => {
          this.loaderHelperService.hideLoader();
        }
      );
  };
}
