import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Response } from '../shared/models/response';
import { ArticlesService } from '../shared/services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public searchKey: FormControl = new FormControl('');
  public searchResponse: Response;
  public currentPage: string = '1';
  public maxSize: number = 5;
  constructor(private articleService: ArticlesService) {}

  ngOnInit(): void {}

  public search = (): void => {
    this.articleService
      .search(this.searchKey.value)
      .subscribe((response: Response) => {
        this.searchResponse = response;
      });
  };

  public nextPage = ({ page, itemsPerPage }): void => {
    this.articleService
      .search(this.searchKey.value, page)
      .subscribe((response) => {
        this.searchResponse = response;
        this.currentPage = page;
      });
  };

  public orderByRelevance = () => {
    this.articleService
      .search(this.searchKey.value, this.currentPage, 'relevance')
      .subscribe((response) => (this.searchResponse = response));
  };
}
