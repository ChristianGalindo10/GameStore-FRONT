import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../model/Category';
import { HttpClientService } from '../../../service/http-client.service';
import { Router } from '@angular/router';
import { Game } from '../../../model/Game';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private httpClientService: HttpClientService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  editCategory() {
    this.router.navigate(['admin', 'categories'], { queryParams: { action: 'edit', id: this.category.idCat } });
  }

  deleteCategory() {
    this.httpClientService.deleteCategory(this.category.idCat).subscribe(
      (category) => {
        this.toastr.success('Category deleted', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.categoryDeletedEvent.emit();
        this.router.navigate(['admin', 'categories']);
      },
      err => {
        this.toastr.error("Error when deleting the category, if there are games you must delete them or change them category first", 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
