import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../model/Category';
import { HttpClientService } from '../../../service/http-client.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  @Input()
  category: Category

  @Output()
  categoryAddedEvent = new EventEmitter();

  errMsj: string;

  constructor(private httpClientService: HttpClientService, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addCategory() {
    if (this.category.idCat == null) {
      this.httpClientService.addCategory(this.category).subscribe(
        (category) => {
          this.toastr.success('Category created', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.categoryAddedEvent.emit();
          this.router.navigate(['admin', 'categories']);
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.toastr.error(this.errMsj, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      );
    }else{
      this.httpClientService.updateCategory(this.category).subscribe(
        (category) => {
          this.toastr.success('Category updated', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.categoryAddedEvent.emit();
          this.router.navigate(['admin', 'categories']);
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      );
    }
  }
}
