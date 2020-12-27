import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/Category';
import { HttpClientService } from '../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Array<Category>;
  selectedCategory: Category;
  action: string;

  constructor(private httpClientService: HttpClientService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getCategories().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const selectedCategoryId = params['id'];
        if (selectedCategoryId) {
          this.selectedCategory = this.categories.find(category => category.id === +selectedCategoryId);
        }
      }
    );
  }

  handleSuccessfulResponse(response) {
    this.categories = response;
  }

  viewCategory(id: number) {
    this.router.navigate(['admin','categories'], {queryParams : {id, action: 'view'}});
  }

  addCategory() {
    this.selectedCategory = new Category();
    this.router.navigate(['admin', 'categories'], { queryParams: { action: 'add' } });
  }

}
