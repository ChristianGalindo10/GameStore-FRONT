import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../model/User';
import { HttpClientService } from '../../../service/http-client.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  @Input()
  user: User

  @Output()
  userAddedEvent = new EventEmitter();

  errMsj: string;

  constructor(private httpClientService: HttpClientService, private authService: AuthService,private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addUser() {
    this.user = new User(this.user.name, this.user.password,this.user.type);
    this.authService.nuevo(this.user).subscribe(
      data => {
        this.toastr.success('Account created', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.userAddedEvent.emit();
        this.router.navigate(['admin', 'users']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

}
