import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  public currentPage: number = 1;
  constructor(private articleService: ArticlesService) {}

  ngOnInit(): void {}

  search = (): void => {
    this.articleService
      .search(this.searchKey.value)
      .subscribe((response: Response) => {
        this.searchResponse = response;
      });
  };
}
