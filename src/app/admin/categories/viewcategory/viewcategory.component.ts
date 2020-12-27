import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../model/Category';
import { HttpClientService } from '../../../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {

  @Input()
  category: Category

  @Output()
  categoryDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteCategory() {
    this.httpClientService.deleteCategory(this.category.id).subscribe(
      (category) => {
        this.categoryDeletedEvent.emit();
        this.router.navigate(['admin', 'categories']);
      }
    );
  }

}
